import PrayerProgress from './PrayerProgress';
import SpiritualJournal from './bible-chat/SpiritualJournal';
import PrayerReminders from './bible-chat/PrayerReminders';
import AdminDashboard from './AdminDashboard';
import { useState, useEffect, useRef } from 'react';
import { getAllStudyPlans, getStudyProgress, type StudyPlan, type StudyLesson } from '../data/bible-study-plans';

const SUPERADMIN_EMAILS = ['infinite.agenci@gmail.com', 'rainavinci@gmail.com'];

export default function ProfileTab() {
  const [prayerProgress, setPrayerProgress] = useState<any>(null);
  const [userName, setUserName] = useState('Friend');
  const [userEmail, setUserEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [showJournal, setShowJournal] = useState(false);
  const [showReminders, setShowReminders] = useState(false);
  const [showStudyProgress, setShowStudyProgress] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });
  const [studyNotes, setStudyNotes] = useState<Record<string, { lesson: StudyLesson; plan: StudyPlan; notes: string; questionNotes: Record<string, string> }>>({});

  // Account settings form states
  const [editAgeGroup, setEditAgeGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [uploadProgress, setUploadProgress] = useState(0);

  // Photo upload
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          if (profile.name) {
            setUserName(profile.name);
            setEditUsername(profile.name);
          }
          if (profile.email) setUserEmail(profile.email);
          if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
          if (profile.ageGroup) {
            setAgeGroup(profile.ageGroup);
            setEditAgeGroup(profile.ageGroup);
            // Store in localStorage for immediate access by other components
            localStorage.setItem('user_age_group', profile.ageGroup);
          }
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

        // Load study notes from localStorage
        const allPlans = getAllStudyPlans();
        const loadedNotes: Record<string, { lesson: StudyLesson; plan: StudyPlan; notes: string; questionNotes: Record<string, string> }> = {};

        allPlans.forEach(plan => {
          const progress = getStudyProgress(plan.id);
          const completedLessons = progress?.completed || [];

          completedLessons.forEach((lessonId: string) => {
            const lesson = plan.lessons.find(l => l.id === lessonId);
            if (lesson) {
              const storageKey = `study_notes_${plan.id}_${lessonId}`;
              const savedData = localStorage.getItem(storageKey);
              if (savedData) {
                const parsed = JSON.parse(savedData);
                loadedNotes[`${plan.id}_${lessonId}`] = {
                  lesson,
                  plan,
                  notes: parsed.personal || '',
                  questionNotes: parsed.questionNotes || {}
                };
              }
            }
          });
        });

        setStudyNotes(loadedNotes);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      const body = document.body;

      if (theme === 'dark') {
        html.classList.add('dark');
        body.classList.add('dark');
      } else {
        html.classList.remove('dark');
        body.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

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

  // Helper function to get API URL
  const getApiUrl = () => {
    return typeof window !== 'undefined'
      ? (window as any).PUBLIC_BASE_API_URL || 'http://localhost:8787'
      : 'http://localhost:8787';
  };

  // Helper function to get auth token
  const getToken = () => {
    return localStorage.getItem('session_token');
  };

  // Show message with auto-dismiss
  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Handle username update (removed - only keeping for localStorage compatibility)
  // const handleUpdateUsername = async () => { ... }

  // Password change removed - only keeping age group and photo upload
  // const handleChangePassword = async () => { ... }

  // Handle photo upload
  const handlePhotoUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please select an image file (JPG, PNG, GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showMessage('error', 'Photo must be less than 5MB');
      return;
    }

    setIsLoading(true);
    setUploadProgress(10);
    try {
      const token = getToken();

      // Convert file to base64 for more reliable upload
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });

      const base64 = await base64Promise;
      setUploadProgress(50);

      // Upload photo using the dedicated photo endpoint
      const response = await fetch(`${getApiUrl()}/api/user/photo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar_url: base64 }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvatarUrl(data.avatar_url || base64);
        setUploadProgress(100);
        showMessage('success', '✓ Photo uploaded successfully!');
      } else {
        const data = await response.json();
        showMessage('error', data.error || 'Failed to upload photo');
        setUploadProgress(0);
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      showMessage('error', 'Network error. Please try again.');
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  // Handle photo delete
  const handleDeletePhoto = async () => {
    if (!confirm('Are you sure you want to remove your profile photo?')) {
      return;
    }

    setIsLoading(true);
    try {
      const token = getToken();
      const response = await fetch(`${getApiUrl()}/api/user/photo`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAvatarUrl(null);
        showMessage('success', 'Photo removed successfully!');
      } else {
        const data = await response.json();
        showMessage('error', data.error || 'Failed to remove photo');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle age group update
  const handleUpdateAgeGroup = async () => {
    if (!editAgeGroup) {
      showMessage('error', 'Please select an age group');
      return;
    }

    setIsLoading(true);
    try {
      const token = getToken();
      const apiUrl = getApiUrl();

      if (!token) {
        showMessage('error', 'Please log in first');
        setIsLoading(false);
        return;
      }

      console.log('Saving age group:', { apiUrl, ageGroup: editAgeGroup });

      const response = await fetch(`${apiUrl}/api/user/profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ageGroup: editAgeGroup }),
      });

      if (response.ok) {
        const data = await response.json();
        setAgeGroup(editAgeGroup);
        // Store in localStorage for immediate access by other components
        localStorage.setItem('user_age_group', editAgeGroup);
        // Trigger custom event for other components to listen to
        window.dispatchEvent(new CustomEvent('ageGroupChange', { detail: { ageGroup: editAgeGroup } }));
        showMessage('success', '✓ Age group saved successfully!');
      } else {
        const data = await response.json();
        console.error('Server error:', data);
        showMessage('error', data.error || 'Failed to update age group');
      }
    } catch (error) {
      console.error('Network error:', error);
      showMessage('error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const ageGroupOptions = [
    { value: 'child', label: '👶 Child (under 13)', description: 'For our youngest faith explorers' },
    { value: 'teen', label: '🌟 Teen (13-17)', description: 'For teenagers navigating faith' },
    { value: 'young-adult', label: '🎓 Young Adult (18-25)', description: 'For students and young professionals' },
    { value: 'adult', label: '🌿 Adult (26-45)', description: 'For adults in their prime years' },
    { value: 'midlife', label: '🌅 Midlife (46-64)', description: 'For those in their middle years' },
    { value: 'senior', label: '🌺 Senior (65+)', description: 'For our wise elders' },
  ];

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

  // Study Progress view
  if (showStudyProgress) {
    return (
      <div className="h-full overflow-y-auto pb-20 bg-[var(--color-stone-50)]">
        <button
          onClick={() => setShowStudyProgress(false)}
          className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Profile</span>
        </button>
        <div className="p-4">
          <h2 className="text-xl font-bold font-playfair text-gray-900 mb-4">📚 My Study Progress</h2>

          {Object.keys(studyNotes).length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No completed lessons yet</h3>
              <p className="text-sm text-gray-600 mb-4">
                Complete lessons in Study Plans to track your progress and notes here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(studyNotes).map(([key, data]) => (
                <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 text-white">
                    <h3 className="font-semibold font-playfair">{data.lesson.title}</h3>
                    <p className="text-xs text-indigo-100">{data.plan.title}</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {/* Personal Notes */}
                    {data.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">📝 Your Notes:</h4>
                        <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">{data.notes}</p>
                      </div>
                    )}

                    {/* Question Notes */}
                    {Object.keys(data.questionNotes).length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">💭 Your Answers:</h4>
                        <div className="space-y-2">
                          {data.lesson.questions.map((question, idx) => (
                            data.questionNotes[idx] ? (
                              <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-600 mb-1">{question}</p>
                                <p className="text-sm text-gray-700 italic">{data.questionNotes[idx]}</p>
                              </div>
                            ) : null
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Account Settings view
  if (showAccountSettings) {
    return (
      <div className="h-full overflow-y-auto pb-20 bg-[var(--color-stone-50)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setShowAccountSettings(false)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
        </div>

        <div className="p-4 space-y-4">
          {/* Message display */}
          {message.text && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.text}
            </div>
          )}

          {/* Profile Photo Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePhotoUpload(file);
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-medium">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                {uploadProgress > 0 ? (
                  <span className="text-sm">{uploadProgress}%</span>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Upload
                  </>
                )}
              </button>
              {avatarUrl && (
                <button
                  onClick={handleDeletePhoto}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors border border-red-200"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 5MB.</p>
          </div>

          {/* Age Group Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Group</h3>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">Select your age group to help us provide personalized spiritual guidance:</p>

              <div className="grid grid-cols-1 gap-2">
                {ageGroupOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setEditAgeGroup(option.value)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      editAgeGroup === option.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900">{option.label}</span>
                      {editAgeGroup === option.value && (
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={handleUpdateAgeGroup}
                className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                {isLoading ? 'Saving...' : 'Save Age Group'}
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-600">
              Signed in as <span className="font-medium text-gray-900">{userEmail}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard view
  if (showAdminDashboard) {
    return (
      <AdminDashboard
        onClose={() => setShowAdminDashboard(false)}
        userEmail={userEmail}
      />
    );
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

        {/* Study Progress Button */}
        <button
          onClick={() => setShowStudyProgress(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <div className="text-left">
                <h3 className="font-semibold">My Study Progress</h3>
                <p className="text-xs text-blue-100">{Object.keys(studyNotes).length} completed lessons</p>
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

          {/* Admin Dashboard - Only show for superadmin */}
          {SUPERADMIN_EMAILS.includes(userEmail) && (
            <button
              onClick={() => setShowAdminDashboard(true)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-purple-50 transition-colors border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">👑</span>
                <span className="text-sm font-semibold text-purple-700">Admin Dashboard</span>
              </div>
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <button
            onClick={() => setShowAccountSettings(true)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">⚙️</span>
              <span className="text-sm text-gray-700">Account Settings</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

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
              const newTheme = theme === 'light' ? 'dark' : 'light';
              setTheme(newTheme);
            }}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{theme === 'light' ? '🌙' : '☀️'}</span>
              <div>
                <span className="text-sm text-gray-700">Appearance</span>
                <p className="text-xs text-gray-500">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
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
