import PrayerProgress from './PrayerProgress';
import SpiritualJournal from './bible-chat/SpiritualJournal';
import PrayerReminders from './bible-chat/PrayerReminders';
import { useState, useEffect } from 'react';

export default function ProfileTab() {
  const [prayerProgress, setPrayerProgress] = useState<any>(null);
  const [userName, setUserName] = useState('Friend');
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [showJournal, setShowJournal] = useState(false);
  const [showReminders, setShowReminders] = useState(false);

  useEffect(() => {
    // Load user data
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('session_token');
        if (!token) return;

        const PUBLIC_BASE_API_URL = typeof window !== 'undefined'
          ? (window as any).PUBLIC_BASE_API_URL || 'http://localhost:8787'
          : 'http://localhost:8787';

        // Fetch user profile
        const profileResponse = await fetch(`${PUBLIC_BASE_API_URL}/api/user/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          if (profile.name) setUserName(profile.name.split(' ')[0]);
          if (profile.ageGroup) setAgeGroup(profile.ageGroup);
        }

        // Fetch prayer progress
        const progressResponse = await fetch(`${PUBLIC_BASE_API_URL}/api/prayer/progress`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (progressResponse.ok) {
          const data = await progressResponse.json();
          setPrayerProgress(data);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  const getAgeGroupLabel = (group: string) => {
    const labels: Record<string, string> = {
      'child': '👶 Young Explorer',
      'teen': '🌟 Teen',
      'young-adult': '🎓 Young Adult',
      'adult': '🌿 Adult',
      'midlife': '🌅 Midlife Journey',
      'senior': '🌺 Golden Years',
    };
    return labels[group] || '✨ Faith Journey';
  };

  // Journal view
  if (showJournal) {
    return (
      <div className="h-full overflow-y-auto pb-20 bg-[var(--color-stone-50)]">
        <button
          onClick={() => setShowJournal(false)}
          className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Profile</span>
        </button>
        <div className="p-4">
          <SpiritualJournal />
        </div>
      </div>
    );
  }

  // Prayer Reminders view
  if (showReminders) {
    return <PrayerReminders onClose={() => setShowReminders(false)} />;
  }

  return (
    <div className="h-full overflow-y-auto pb-20 bg-[var(--color-stone-50)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">👤 Profile</h1>
        <p className="text-sm text-white/90">Your spiritual journey</p>
      </div>

      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{userName}</h2>
              <p className="text-sm text-purple-600">{getAgeGroupLabel(ageGroup)}</p>
            </div>
          </div>
        </div>

        {/* Prayer Progress */}
        {prayerProgress && (
          <PrayerProgress progress={prayerProgress} />
        )}

        {/* Spiritual Journal Button */}
        <button
          onClick={() => setShowJournal(true)}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📖</span>
              <div className="text-left">
                <h3 className="font-semibold">Spiritual Journal</h3>
                <p className="text-xs text-purple-100">Record your walk with God</p>
              </div>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-purple-600">{prayerProgress?.streak || 0}</div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-blue-600">{prayerProgress?.consistency || 0}%</div>
            <div className="text-xs text-gray-500">Consistency</div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-100">Settings</h3>

          <button
            onClick={() => setShowReminders(true)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <span className="text-sm text-gray-700">Prayer Reminders</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => {
              const currentTheme = localStorage.getItem('theme') || 'light';
              const newTheme = currentTheme === 'light' ? 'dark' : 'light';
              localStorage.setItem('theme', newTheme);
              alert(`Theme changed to ${newTheme}. Refresh the page to see changes.`);
            }}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎨</span>
              <span className="text-sm text-gray-700">Appearance</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => alert('3in1 Catholic App v1.0\n\nA spiritual companion for your faith journey.\n\nFeatures:\n• Chat with Spirit AI guide\n• Daily Bible verses\n• Spiritual journaling\n• Prayer community\n• Bible study plans\n• Biblical characters\n• And much more!\n\nMade with ❤️ for the Catholic community.')}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">ℹ️</span>
              <span className="text-sm text-gray-700">About 3in1</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/logout';
            }
          }}
          className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 transition-colors border border-red-200"
        >
          Sign Out
        </button>

        {/* Version Info */}
        <p className="text-center text-xs text-gray-400 pb-4">
          3in1 Catholic App v1.0
        </p>
      </div>
    </div>
  );
}
