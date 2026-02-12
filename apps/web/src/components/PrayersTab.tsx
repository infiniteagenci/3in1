import StayFocused from './bible-chat/StayFocused';

interface PrayersTabProps {
  onPrayerSelect?: (prayerId: string) => void;
}

export default function PrayersTab({ onPrayerSelect }: PrayersTabProps) {
  return (
    <div className="h-full overflow-y-auto pb-20 bg-[var(--color-stone-50)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">🙏 Focus</h1>
        <p className="text-sm text-white/90">Center your heart and mind</p>
      </div>

      {/* Content */}
      <div className="p-4">
        <StayFocused />
      </div>
    </div>
  );
}
