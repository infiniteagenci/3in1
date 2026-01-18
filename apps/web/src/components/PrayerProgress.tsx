interface PrayerProgressProps {
  progress: {
    streak: number;
    consistency: number;
    weeklyActivity: Array<{ date: string; day: string; count: number }>;
    encouragement?: string;
  };
}

export default function PrayerProgress({ progress }: PrayerProgressProps) {
  const { streak, consistency, weeklyActivity, encouragement } = progress;

  // Get last 7 days of activity
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const activityByDay = weekDays.map((day) => {
    const activity = weeklyActivity.find((a) => a.day === day);
    return {
      day,
      count: activity?.count || 0,
      date: activity?.date || '',
    };
  });

  // Reorder to start from today
  const today = new Date().getDay();
  const reorderedActivity = [
    ...activityByDay.slice(today),
    ...activityByDay.slice(0, today),
  ];

  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
          <span>🙏</span> Your Prayer Journey
        </h3>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-3 mb-3">
        <div className="text-2xl">🔥</div>
        <div className="flex-1">
          <div className="text-xl font-bold text-purple-600">{streak} days</div>
          <div className="text-xs text-gray-500">Current streak</div>
        </div>
        {streak >= 7 && (
          <div className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
            Amazing!
          </div>
        )}
        {streak >= 3 && streak < 7 && (
          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            Great!
          </div>
        )}
      </div>

      {/* This Week */}
      <div className="mb-3">
        <div className="text-xs text-gray-600 mb-2 font-medium">This Week</div>
        <div className="flex gap-1">
          {reorderedActivity.map((day, index) => (
            <div
              key={day.date || index}
              className={`flex-1 flex flex-col items-center gap-1`}
            >
              <div
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                  day.count > 0
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
                title={`${day.day}: ${day.count} prayers`}
              >
                {day.count > 0 ? day.count : day.day.charAt(0)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consistency */}
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600">Consistency</span>
          <span className="font-semibold text-purple-600">{consistency}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${consistency}%` }}
          />
        </div>
      </div>

      {/* Encouragement */}
      {encouragement && (
        <div className="text-xs text-gray-600 italic bg-purple-50 p-2 rounded-lg border border-purple-100">
          {encouragement}
        </div>
      )}
    </div>
  );
}
