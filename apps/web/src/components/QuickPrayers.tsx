const quickPrayers = [
  { id: 'rosary', icon: '🙏', label: 'Pray Rosary', description: 'Step-by-step guided Rosary' },
  { id: 'examen', icon: '✨', label: 'Daily Examen', description: 'Reflect on your day with God' },
  { id: 'morning', icon: '🌅', label: 'Morning Prayer', description: 'Start your day with God' },
  { id: 'evening', icon: '🌙', label: 'Evening Prayer', description: 'End your day in gratitude' },
  { id: 'breath', icon: '🌬️', label: 'Breath Prayer', description: 'Simple, repetitive prayer' },
  { id: 'meditation', icon: '🧘', label: 'Guided Meditation', description: 'Scripture meditation' },
  { id: 'readings', icon: '📖', label: 'Daily Readings', description: "Today's Scripture" },
  { id: 'saint', icon: '✝️', label: 'Saint of Day', description: 'Inspiring saint story' },
  { id: 'novena', icon: '🕯️', label: 'My Novenas', description: 'Active prayer journeys' },
  { id: 'divine-office', icon: '⛪', label: 'Divine Office', description: 'Prayer of the Church' },
];

interface QuickPrayersProps {
  onSelect: (prayerId: string) => void;
}

export default function QuickPrayers({ onSelect }: QuickPrayersProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      {quickPrayers.map((prayer) => (
        <button
          key={prayer.id}
          onClick={() => onSelect(prayer.id)}
          className="bg-white rounded-lg p-3 border border-gray-200 hover:border-[#9cbedc] hover:shadow-md transition-all text-left group"
        >
          <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{prayer.icon}</div>
          <div className="font-semibold text-gray-800 text-sm">{prayer.label}</div>
          <div className="text-xs text-gray-500">{prayer.description}</div>
        </button>
      ))}
    </div>
  );
}
