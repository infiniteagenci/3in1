import DailyCheckin from './DailyCheckin';
import StayFocused from './bible-chat/StayFocused';
import { useState, useEffect } from 'react';

interface PrayersTabProps {
  onPrayerSelect: (prayerId: string) => void;
  onCheckinComplete: (data: any) => void;
}

export default function PrayersTab({ onPrayerSelect, onCheckinComplete }: PrayersTabProps) {
  const [showDailyCheckin, setShowDailyCheckin] = useState(false);

  useEffect(() => {
    // Check if we need to show daily check-in
    const lastCheckin = localStorage.getItem('last_checkin_date');
    const today = new Date().toISOString().split('T')[0];

    if (lastCheckin !== today) {
      setShowDailyCheckin(true);
    }
  }, []);

  const handleCheckinComplete = (data: any) => {
    onCheckinComplete(data);
    setShowDailyCheckin(false);
    localStorage.setItem('last_checkin_date', new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="h-full overflow-y-auto pb-20 bg-[var(--color-stone-50)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">🙏 Focus</h1>
        <p className="text-sm text-white/90">Center your heart and mind</p>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Daily Check-in */}
        {showDailyCheckin ? (
          <DailyCheckin onComplete={handleCheckinComplete} />
        ) : (
          <StayFocused />
        )}
      </div>
    </div>
  );
}
