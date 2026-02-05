import { useState, useEffect, useRef } from 'react';

interface StayFocusedProps {
  className?: string;
}

interface FocusSession {
  id: string;
  startTime: string;
  endTime?: string;
  duration: number;
  completed: boolean;
  notes?: string;
  selectedMusic?: string;
}

interface WorshipMusic {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: string;
  category: 'ambient' | 'hymns' | 'instrumental' | 'praise';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  current: number;
  unlocked: boolean;
  unlockedAt?: string;
}

const achievements: Achievement[] = [
  { id: 'first-session', title: 'First Steps', description: 'Complete your first focus session', icon: '🌱', requirement: 1, current: 0, unlocked: false },
  { id: 'week-streak', title: 'Week Warrior', description: 'Complete 7 focus sessions in a week', icon: '🔥', requirement: 7, current: 0, unlocked: false },
  { id: 'focused-hour', title: 'Focused Hour', description: 'Total 60 minutes of focus time', icon: '⏰', requirement: 60, current: 0, unlocked: false },
  { id: 'early-bird', title: 'Early Bird', description: 'Complete a session before 8 AM', icon: '🌅', requirement: 1, current: 0, unlocked: false },
  { id: 'night-owl', title: 'Night Owl', description: 'Complete a session after 10 PM', icon: '🦉', requirement: 1, current: 0, unlocked: false },
  { id: 'consistent', title: 'Consistent Soul', description: '7 day streak of focus sessions', icon: '💎', requirement: 7, current: 0, unlocked: false }
];

const worshipMusic: WorshipMusic[] = [
  {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    artist: 'Traditional Catholic Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Amazing-Grace-Instrumental.mp3',
    duration: '4:30',
    category: 'hymns'
  },
  {
    id: 'adoro-te-devote',
    title: 'Adoro Te Devote',
    artist: 'St. Thomas Aquinas Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Adoro-Te-Devote-Instrumental.mp3',
    duration: '3:45',
    category: 'hymns'
  },
  {
    id: 'ave-maria',
    title: 'Ave Maria',
    artist: 'Traditional Marian Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Ave-Maria-Instrumental.mp3',
    duration: '4:15',
    category: 'hymns'
  },
  {
    id: 'tantum-ergo',
    title: 'Tantum Ergo',
    artist: 'St. Thomas Aquinas',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Tantum-Ergo-Instrumental.mp3',
    duration: '3:30',
    category: 'hymns'
  },
  {
    id: 'panis-angelicus',
    title: 'Panis Angelicus',
    artist: 'Traditional Eucharistic Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Panis-Angelicus-Instrumental.mp3',
    duration: '4:00',
    category: 'hymns'
  },
  {
    id: 'o-sacrum-convivium',
    title: 'O Sacrum Convivium',
    artist: 'Traditional Latin Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/O-Sacrum-Convivium-Instrumental.mp3',
    duration: '5:15',
    category: 'hymns'
  },
  {
    id: 'jesu-dulcis-memoria',
    title: 'Jesu Dulcis Memoria',
    artist: 'Traditional Catholic Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Jesu-Dulcis-Memoria-Instrumental.mp3',
    duration: '4:45',
    category: 'hymns'
  },
  {
    id: 'prayer-st-patrick',
    title: 'Prayer of St. Patrick',
    artist: 'Traditional Irish Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/St-Patrick-Breastplate-Instrumental.mp3',
    duration: '5:30',
    category: 'hymns'
  },
  {
    id: 'quiet-prayer',
    title: 'Quiet Prayer Music',
    artist: 'Instrumental Worship',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Quiet-Prayer-Music.mp3',
    duration: '6:00',
    category: 'ambient'
  },
  {
    id: 'eucharistic-adortion',
    title: 'Eucharistic Adoration',
    artist: 'Piano Worship',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Eucharistic-Adoration-Music.mp3',
    duration: '7:30',
    category: 'instrumental'
  },
  {
    id: 'immaculate-mary',
    title: 'Immaculate Mary',
    artist: 'Traditional Marian Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Immaculate-Mary-Instrumental.mp3',
    duration: '3:50',
    category: 'hymns'
  },
  {
    id: 'holy-holy-holy',
    title: 'Holy Holy Holy',
    artist: 'Traditional Catholic Hymn',
    url: 'https://www.churchservices.org/wp-content/uploads/2023/02/Holy-Holy-Holy-Instrumental.mp3',
    duration: '4:20',
    category: 'hymns'
  }
];

export default function StayFocused({ className = '' }: StayFocusedProps) {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showNewSession, setShowNewSession] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(15);
  const [sessionNotes, setSessionNotes] = useState('');
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [showAchievements, setShowAchievements] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusicUrl, setCurrentMusicUrl] = useState<string>('');
  const [showMusicSelector, setShowMusicSelector] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    loadSessions();
    loadAchievements();
    checkActiveSession();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(activeSession.startTime);
        setElapsedTime(Math.floor((now.getTime() - start.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  const loadSessions = () => {
    const saved = localStorage.getItem('focus_sessions');
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.sort((a: FocusSession, b: FocusSession) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      );
      setSessions(parsed);
    }
  };

  const loadAchievements = () => {
    const saved = localStorage.getItem('user_achievements');
    if (saved) {
      setUserAchievements(JSON.parse(saved));
    } else {
      // Calculate achievements from sessions
      calculateAchievements();
    }
  };

  const calculateAchievements = () => {
    const allSessions = [...sessions];
    if (activeSession) {
      allSessions.push(activeSession);
    }

    const totalMinutes = Math.floor(allSessions.reduce((sum, s) => sum + (s.duration / 60), 0));
    const uniqueDays = new Set(allSessions.map(s => new Date(s.startTime).toDateString())).size;
    const now = new Date().getHours();
    const earlyMorning = allSessions.some(s => new Date(s.startTime).getHours() < 8);
    const lateNight = allSessions.some(s => new Date(s.startTime).getHours() >= 22);

    const updated = userAchievements.map(ach => {
      switch (ach.id) {
        case 'first-session':
          return { ...ach, current: allSessions.length, unlocked: allSessions.length >= 1 };
        case 'week-streak':
          return { ...ach, current: allSessions.length, unlocked: allSessions.length >= 7 };
        case 'focused-hour':
          return { ...ach, current: totalMinutes, unlocked: totalMinutes >= 60 };
        case 'early-bird':
          return { ...ach, current: earlyMorning ? 1 : 0, unlocked: earlyMorning };
        case 'night-owl':
          return { ...ach, current: lateNight ? 1 : 0, unlocked: lateNight };
        case 'consistent':
          return { ...ach, current: uniqueDays, unlocked: uniqueDays >= 7 };
        default:
          return ach;
      }
    });

    // Unlock new achievements
    updated.forEach(ach => {
      if (ach.unlocked && !userAchievements.find(a => a.id === ach.id)?.unlocked) {
        ach.unlockedAt = new Date().toISOString();
      }
    });

    setUserAchievements(updated);
    localStorage.setItem('user_achievements', JSON.stringify(updated));
  };

  const checkActiveSession = () => {
    const active = localStorage.getItem('active_focus_session');
    if (active) {
      setActiveSession(JSON.parse(active));
    }
  };

  const startSession = () => {
    const session: FocusSession = {
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      duration: sessionDuration * 60,
      completed: false,
      selectedMusic: selectedMusic
    };

    setActiveSession(session);
    localStorage.setItem('active_focus_session', JSON.stringify(session));

    // Start playing music if selected
    if (selectedMusic) {
      const music = worshipMusic.find(m => m.id === selectedMusic);
      if (music) {
        setCurrentMusicUrl(music.url);
        setIsPlaying(true);
      }
    }

    setShowNewSession(false);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const selectMusic = (musicId: string) => {
    setSelectedMusic(musicId);
    const music = worshipMusic.find(m => m.id === musicId);
    if (music && activeSession) {
      setCurrentMusicUrl(music.url);
      setIsPlaying(true);
      // Update active session with music selection
      const updatedSession = { ...activeSession, selectedMusic: musicId };
      setActiveSession(updatedSession);
      localStorage.setItem('active_focus_session', JSON.stringify(updatedSession));
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentMusicUrl('');
  };

  const completeSession = (notes?: string) => {
    if (!activeSession) return;

    const now = new Date();
    const actualDuration = Math.floor((now.getTime() - new Date(activeSession.startTime).getTime()) / 1000);

    const completedSession: FocusSession = {
      ...activeSession,
      endTime: now.toISOString(),
      duration: actualDuration,
      completed: true,
      notes: notes || sessionNotes
    };

    const updatedSessions = [completedSession, ...sessions];
    setSessions(updatedSessions);
    localStorage.setItem('focus_sessions', JSON.stringify(updatedSessions));
    localStorage.removeItem('active_focus_session');

    setActiveSession(null);
    setElapsedTime(0);
    setSessionNotes('');
    calculateAchievements();
  };

  const cancelSession = () => {
    if (!confirm('Are you sure you want to cancel this session?')) return;

    localStorage.removeItem('active_focus_session');
    setActiveSession(null);
    setElapsedTime(0);
  };

  const deleteSession = (sessionId: string) => {
    if (confirm('Delete this session?')) {
      const updated = sessions.filter(s => s.id !== sessionId);
      setSessions(updated);
      localStorage.setItem('focus_sessions', JSON.stringify(updated));
      calculateAchievements();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalFocusTime = () => {
    return sessions.reduce((sum, s) => sum + s.duration, 0);
  };

  const getWeeklyStats = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weekSessions = sessions.filter(s => new Date(s.startTime) >= oneWeekAgo);
    return {
      sessions: weekSessions.length,
      minutes: Math.floor(weekSessions.reduce((sum, s) => sum + s.duration, 0) / 60),
      completed: weekSessions.filter(s => s.completed).length
    };
  };

  // Active session timer
  if (activeSession) {
    const progressPercent = (elapsedTime / (sessionDuration * 60)) * 100;
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-6 text-white">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧘</span>
            <div>
              <h2 className="text-2xl font-bold font-playfair">Focus Session</h2>
              <p className="text-green-100 text-sm">Time with God, free from distractions</p>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="p-8 text-center">
          <div className="mb-6">
            <div className="text-7xl font-bold text-gray-900 font-mono mb-2">
              {formatTime(elapsedTime)}
            </div>
            <p className="text-gray-500 font-geist">
              of {formatTime(sessionDuration * 60)} target
            </p>
          </div>

          {/* Progress */}
          <div className="max-w-md mx-auto mb-6">
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2 font-geist">
              {Math.round(progressPercent)}% complete
            </p>
          </div>

          {/* Worship Music Player */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6 border border-purple-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎵</span>
                <span className="font-semibold text-purple-800 font-geist">Worship Music</span>
              </div>
              <button
                onClick={() => setShowMusicSelector(!showMusicSelector)}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium"
              >
                {showMusicSelector ? 'Close' : 'Change'}
              </button>
            </div>

            {showMusicSelector ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {worshipMusic.map((music) => (
                  <button
                    key={music.id}
                    onClick={() => selectMusic(music.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      activeSession?.selectedMusic === music.id
                        ? 'bg-purple-100 border-purple-400'
                        : 'bg-white border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900">{music.title}</div>
                    <div className="text-xs text-gray-500">{music.artist} • {music.duration}</div>
                  </button>
                ))}
                <button
                  onClick={stopMusic}
                  className="w-full text-center p-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium"
                >
                  Stop Music
                </button>
              </div>
            ) : (
              <>
                {activeSession?.selectedMusic ? (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">
                        {worshipMusic.find(m => m.id === activeSession.selectedMusic)?.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {worshipMusic.find(m => m.id === activeSession.selectedMusic)?.artist}
                      </div>
                    </div>
                    <button
                      onClick={toggleMusic}
                      className="ml-3 w-10 h-10 flex items-center justify-center bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                    >
                      {isPlaying ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowMusicSelector(true)}
                    className="w-full py-3 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors text-sm"
                  >
                    🎵 Select Worship Music
                  </button>
                )}
              </>
            )}

            {/* Hidden audio element */}
            {currentMusicUrl && (
              <audio
                ref={audioRef}
                src={currentMusicUrl}
                autoPlay={isPlaying}
                loop
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            )}
          </div>

          {/* Guidance */}
          <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
            <p className="text-green-800 text-sm font-geist font-light">
              Use this time for prayer, Bible reading, meditation, or simply being still in God's presence.
            </p>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <textarea
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="What did you focus on with God? (optional)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none font-geist resize-none"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => completeSession()}
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold font-geist hover:shadow-lg transition-all"
            >
              Complete Session
            </button>
            <button
              onClick={cancelSession}
              className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-semibold font-geist hover:bg-red-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Achievements view
  if (showAchievements) {
    const unlockedCount = userAchievements.filter(a => a.unlocked).length;

    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-6 text-white">
          <button
            onClick={() => setShowAchievements(false)}
            className="flex items-center gap-2 text-yellow-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          <h2 className="text-2xl font-bold font-playfair">Achievements</h2>
          <p className="text-yellow-100 text-sm">
            {unlockedCount} of {userAchievements.length} unlocked
          </p>
        </div>

        {/* Achievements List */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {userAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold font-geist ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm mt-1 ${achievement.unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{achievement.current}/{achievement.requirement}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          achievement.unlocked
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gray-400'
                        }`}
                        style={{ width: `${Math.min((achievement.current / achievement.requirement) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-yellow-600 mt-2">
                      Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // New session form
  if (showNewSession) {
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-6 text-white">
          <button
            onClick={() => setShowNewSession(false)}
            className="flex items-center gap-2 text-green-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          <h2 className="text-2xl font-bold font-playfair">Start Focus Session</h2>
          <p className="text-green-100 text-sm">Set aside dedicated time with God</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 font-geist">
              Session Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 30].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setSessionDuration(mins)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    sessionDuration === mins
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl font-bold">{mins}</div>
                  <div className="text-xs">minutes</div>
                </button>
              ))}
            </div>
          </div>

          {/* Worship Music Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 font-geist">
              🎵 Worship Music (Optional)
            </label>
            <div className="space-y-2">
              {!selectedMusic ? (
                <button
                  onClick={() => setShowMusicSelector(!showMusicSelector)}
                  className="w-full p-4 bg-purple-50 border-2 border-purple-200 rounded-xl text-center hover:bg-purple-100 transition-colors"
                >
                  <div className="text-purple-700 font-medium">
                    {showMusicSelector ? 'Hide Music Options' : 'Select Worship Music'}
                  </div>
                  <div className="text-xs text-purple-500 mt-1">
                    Add peaceful music to your focus time
                  </div>
                </button>
              ) : (
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎵</span>
                    <div>
                      <div className="font-medium text-purple-900 text-sm">
                        {worshipMusic.find(m => m.id === selectedMusic)?.title}
                      </div>
                      <div className="text-xs text-purple-600">
                        {worshipMusic.find(m => m.id === selectedMusic)?.artist}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMusic('')}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Change
                  </button>
                </div>
              )}
              {showMusicSelector && (
                <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                  {worshipMusic.map((music) => (
                    <button
                      key={music.id}
                      onClick={() => {
                        setSelectedMusic(music.id);
                        setShowMusicSelector(false);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        selectedMusic === music.id
                          ? 'bg-purple-100 border-purple-500'
                          : 'bg-white border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{music.title}</div>
                      <div className="text-xs text-gray-500">{music.artist} • {music.duration}</div>
                      <div className="text-xs text-purple-600 mt-1 capitalize">{music.category}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-blue-800 font-geist font-light">
              During your focus session, you'll be free from distractions. Use this time for prayer, reading Scripture, meditation, or quiet reflection with God.
            </p>
          </div>

          {/* Start */}
          <button
            onClick={startSession}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold font-geist hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>🧘</span>
            Begin Focus Session
          </button>
        </div>
      </div>
    );
  }

  // Main view
  const weeklyStats = getWeeklyStats();

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧘</span>
            <div>
              <h2 className="text-2xl font-bold font-playfair">Stay Focused</h2>
              <p className="text-green-100 text-sm">Dedicated time with God</p>
            </div>
          </div>
          <button
            onClick={() => setShowAchievements(true)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <span>🏆</span>
            Achievements
          </button>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{weeklyStats.sessions}</div>
            <div className="text-xs text-green-100">This Week</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{weeklyStats.minutes}</div>
            <div className="text-xs text-green-100">Minutes</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{Math.floor(getTotalFocusTime() / 60)}</div>
            <div className="text-xs text-green-100">Total Hours</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-b border-gray-200 flex gap-2">
        <button
          onClick={() => setShowNewSession(true)}
          className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium font-geist hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>🧘</span>
          Start Focus Session
        </button>
      </div>

      {/* Recent Sessions */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3 font-geist">Recent Sessions</h3>
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">🧘</div>
            <p className="text-gray-600 text-sm font-geist font-light mb-4">
              Begin your journey of focused time with God
            </p>
            <button
              onClick={() => setShowNewSession(true)}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors"
            >
              Start Your First Session
            </button>
          </div>
        ) : (
          <div className="space-y-2 max-h-[40vh] overflow-y-auto">
            {sessions.slice(0, 10).map((session) => (
              <div key={session.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {session.completed ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-gray-400">○</span>
                      )}
                      <span className="text-sm font-medium text-gray-900 font-geist">
                        {formatTime(session.duration)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(session.startTime).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {session.notes && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1 font-geist font-light">
                        "{session.notes}"
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSession(session.id)}
                    className="text-red-400 hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
