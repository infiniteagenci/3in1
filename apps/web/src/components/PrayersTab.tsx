import DailyCheckin from './DailyCheckin';
import QuickPrayers from './QuickPrayers';
import PrayerProgress from './PrayerProgress';
import PrayerCommunity from './bible-chat/PrayerCommunity';
import StayFocused from './bible-chat/StayFocused';
import { useState, useEffect } from 'react';

interface PrayersTabProps {
  onPrayerSelect: (prayerId: string) => void;
  onCheckinComplete: (data: any) => void;
}

type SubView = 'prayers' | 'community' | 'focused';

export default function PrayersTab({ onPrayerSelect, onCheckinComplete }: PrayersTabProps) {
  const [showDailyCheckin, setShowDailyCheckin] = useState(false);
  const [showQuickPrayers, setShowQuickPrayers] = useState(true);
  const [prayerProgress, setPrayerProgress] = useState<any>(null);
  const [currentView, setCurrentView] = useState<SubView>('prayers');

  useEffect(() => {
    // Check if we need to show daily check-in
    const lastCheckin = localStorage.getItem('last_checkin_date');
    const today = new Date().toISOString().split('T')[0];

    if (lastCheckin !== today) {
      setShowDailyCheckin(true);
      setShowQuickPrayers(false);
    }

    // Fetch prayer progress
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('session_token');
        if (!token) return;

        const PUBLIC_BASE_API_URL = typeof window !== 'undefined'
          ? (window as any).PUBLIC_BASE_API_URL || 'http://localhost:8787'
          : 'http://localhost:8787';

        const response = await fetch(`${PUBLIC_BASE_API_URL}/api/prayer/progress`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPrayerProgress(data);
        }
      } catch (error) {
        console.error('Failed to fetch prayer progress:', error);
      }
    };

    fetchProgress();
  }, []);

  const handleCheckinComplete = (data: any) => {
    onCheckinComplete(data);
    setShowDailyCheckin(false);
    setShowQuickPrayers(true);
    localStorage.setItem('last_checkin_date', new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="h-full overflow-y-auto pb-20 bg-[var(--color-stone-50)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">🙏 Prayer Time</h1>
        <p className="text-sm text-white/90">Grow your spiritual practice</p>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 py-3 flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setCurrentView('prayers')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentView === 'prayers'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Prayers
        </button>
        <button
          onClick={() => setCurrentView('community')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentView === 'community'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Community
        </button>
        <button
          onClick={() => setCurrentView('focused')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentView === 'focused'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Focus
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Daily Check-in */}
        {showDailyCheckin && currentView === 'prayers' && (
          <DailyCheckin onComplete={handleCheckinComplete} />
        )}

        {/* Prayers View */}
        {currentView === 'prayers' && !showDailyCheckin && (
          <>
            {/* Prayer Progress */}
            {prayerProgress && (
              <PrayerProgress progress={prayerProgress} />
            )}

            {/* Quick Prayers Header */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800">Quick Prayers</h2>
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  Tap to begin
                </span>
              </div>
              <QuickPrayers onSelect={onPrayerSelect} />
            </div>

            {/* Prayer Info Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-4 border border-purple-200">
                <div className="text-2xl mb-2">📿</div>
                <h3 className="font-semibold text-purple-900 text-sm mb-1">Rosary</h3>
                <p className="text-xs text-purple-700">Step-by-step guided prayer</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border border-green-200">
                <div className="text-2xl mb-2">✨</div>
                <h3 className="font-semibold text-green-900 text-sm mb-1">Examen</h3>
                <p className="text-xs text-green-700">Daily reflection with God</p>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-4 border border-amber-200">
                <div className="text-2xl mb-2">🌅</div>
                <h3 className="font-semibold text-amber-900 text-sm mb-1">Morning</h3>
                <p className="text-xs text-amber-700">Start your day with prayer</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-100 to-violet-100 rounded-xl p-4 border border-indigo-200">
                <div className="text-2xl mb-2">🌙</div>
                <h3 className="font-semibold text-indigo-900 text-sm mb-1">Evening</h3>
                <p className="text-xs text-indigo-700">End your day in gratitude</p>
              </div>
            </div>

            {/* Novenas Section */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">🕯️ Novenas</h2>
              <p className="text-sm text-gray-600 mb-3">
                Join a 9-day prayer journey for special intentions
              </p>
              <button
                onClick={() => onPrayerSelect('novena')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                My Novenas
              </button>
            </div>
          </>
        )}

        {/* Community View */}
        {currentView === 'community' && (
          <PrayerCommunity />
        )}

        {/* Focus View */}
        {currentView === 'focused' && (
          <StayFocused />
        )}
      </div>
    </div>
  );
}
