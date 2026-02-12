import { useState, useEffect } from 'react';

interface Analytics {
  users: {
    total: number;
    newThisWeek: number;
  };
  sessions: {
    active: number;
  };
  focus: {
    totalSessions: number;
    totalMinutes: number;
  };
  study: {
    totalLessonsCompleted: number;
  };
  dailyActivity: Array<{
    date: string;
    new_users: number;
  }>;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

interface UserStats {
  user: User;
  stats: {
    focusSessions: number;
    focusMinutes: number;
    studyPlans: number;
    lessonsCompleted: number;
    achievementsUnlocked: number;
  };
  recentFocus: Array<{
    start_time: string;
    duration: number;
    completed: number;
  }>;
}

export default function AdminDashboard({ onClose, userEmail }: { onClose: () => void; userEmail: string }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'users'>('overview');
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserStats, setSelectedUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('session_token');
      const response = await fetch(`${window.PUBLIC_BASE_API_URL || 'https://3in1-worker.ailabs-hq.workers.dev'}/api/admin/analytics`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else if (response.status === 403) {
        setError('Access denied. Superadmin privileges required.');
      } else {
        setError('Failed to load analytics');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('session_token');
      const response = await fetch(`${window.PUBLIC_BASE_API_URL || 'https://3in1-worker.ailabs-hq.workers.dev'}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchUserStats = async (userId: string) => {
    try {
      const token = localStorage.getItem('session_token');
      const response = await fetch(`${window.PUBLIC_BASE_API_URL || 'https://3in1-worker.ailabs-hq.workers.dev'}/api/admin/users/${userId}/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedUserStats(data);
      }
    } catch (err) {
      console.error('Error fetching user stats:', err);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const token = localStorage.getItem('session_token');
      const response = await fetch(`${window.PUBLIC_BASE_API_URL || 'https://3in1-worker.ailabs-hq.workers.dev'}/api/admin/users/${userId}/role`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role })
      });

      if (response.ok) {
        // Refresh user list
        fetchUsers();
      }
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold">⚠️ Access Denied</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-700">{error}</p>
          <p className="text-sm text-gray-500 mt-2">Logged in as: {userEmail}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">👑</span>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-purple-100">Superadmin Analytics</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              setActiveTab('users');
              if (users.length === 0) fetchUsers();
            }}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Users
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && analytics && (
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Total Users */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">👥</span>
                  <span className="text-sm text-gray-500">Total Users</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{analytics.users.total}</div>
                <div className="text-xs text-green-600 mt-1">+{analytics.users.newThisWeek} this week</div>
              </div>

              {/* Active Sessions */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🟢</span>
                  <span className="text-sm text-gray-500">Active Sessions</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{analytics.sessions.active}</div>
              </div>

              {/* Focus Sessions */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🙏</span>
                  <span className="text-sm text-gray-500">Focus Sessions</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{analytics.focus.totalSessions}</div>
                <div className="text-xs text-gray-500 mt-1">{analytics.focus.totalMinutes} total minutes</div>
              </div>

              {/* Study Lessons */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📚</span>
                  <span className="text-sm text-gray-500">Lessons Completed</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{analytics.study.totalLessonsCompleted}</div>
              </div>
            </div>

            {/* Daily Activity Chart */}
            {analytics.dailyActivity.length > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">New Users (Last 30 Days)</h3>
                <div className="space-y-2">
                  {analytics.dailyActivity.slice(0, 10).map((day) => (
                    <div key={day.date} className="flex items-center gap-3">
                      <div className="w-24 text-xs text-gray-500">{day.date}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-full flex items-center justify-end pr-2"
                          style={{ width: `${Math.min(day.new_users * 20, 100)}%` }}
                        >
                          <span className="text-xs text-white font-medium">{day.new_users}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">All Users</h3>
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="user">User</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                    <button
                      onClick={() => fetchUserStats(user.id)}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200"
                    >
                      View Stats
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Stats Modal */}
      {selectedUserStats && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedUserStats(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{selectedUserStats.user.name}</h3>
              <button onClick={() => setSelectedUserStats(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">{selectedUserStats.stats.focusSessions}</div>
                <div className="text-xs text-gray-500">Focus Sessions</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{selectedUserStats.stats.focusMinutes}</div>
                <div className="text-xs text-gray-500">Focus Minutes</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{selectedUserStats.stats.studyPlans}</div>
                <div className="text-xs text-gray-500">Study Plans</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-orange-600">{selectedUserStats.stats.lessonsCompleted}</div>
                <div className="text-xs text-gray-500">Lessons Done</div>
              </div>
            </div>

            <div className="text-sm text-gray-500 text-center">
              {selectedUserStats.stats.achievementsUnlocked} achievements unlocked
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
