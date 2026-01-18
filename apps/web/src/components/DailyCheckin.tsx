import { useState } from 'react';

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
}

const moods: MoodOption[] = [
  { id: 'joyful', emoji: '😊', label: 'Joyful', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { id: 'grateful', emoji: '🙏', label: 'Grateful', color: 'bg-green-100 hover:bg-green-200' },
  { id: 'peaceful', emoji: '😌', label: 'Peaceful', color: 'bg-blue-100 hover:bg-blue-200' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: 'bg-orange-100 hover:bg-orange-200' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: 'bg-purple-100 hover:bg-purple-200' },
  { id: 'struggling', emoji: '😣', label: 'Struggling', color: 'bg-red-100 hover:bg-red-200' },
  { id: 'tired', emoji: '😴', label: 'Tired', color: 'bg-gray-100 hover:bg-gray-200' },
];

interface DailyCheckinProps {
  onComplete: (data: {
    mood: string;
    energyLevel?: number;
    prayerFocus?: string;
    gratitudeNotes?: string;
  }) => void;
}

export default function DailyCheckin({ onComplete }: DailyCheckinProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [prayerFocus, setPrayerFocus] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setIsSubmitting(true);

    const data = {
      mood: selectedMood,
      energyLevel,
      prayerFocus: prayerFocus || undefined,
      gratitudeNotes: gratitude || undefined,
    };

    onComplete(data);

    // Reset form after submission
    setTimeout(() => {
      setSelectedMood(null);
      setEnergyLevel(3);
      setPrayerFocus('');
      setGratitude('');
      setIsSubmitting(false);
    }, 500);
  };

  const canSubmit = selectedMood !== null;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-4 mb-3 border border-purple-200">
      <h3 className="text-base font-semibold text-purple-900 mb-1 flex items-center gap-2">
        <span>✨</span> How are you feeling today?
      </h3>
      <p className="text-xs text-purple-700 mb-3">Take a moment to check in with yourself and God.</p>

      {/* Mood Selection */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            disabled={isSubmitting}
            className={`p-2 rounded-lg transition-all ${mood.color} ${
              selectedMood === mood.id
                ? 'ring-2 ring-purple-500 scale-105 shadow-md'
                : 'hover:scale-102'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={`Feeling ${mood.label}`}
          >
            <div className="text-xl mb-1">{mood.emoji}</div>
            <div className="text-xs text-gray-700 font-medium">{mood.label}</div>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="space-y-3 animate-fade-in">
          {/* Energy Level */}
          <div>
            <label className="text-xs text-gray-700 mb-2 block font-medium">
              Energy Level (1-5)
            </label>
            <div className="flex gap-2 items-center">
              <span className="text-xs text-gray-500">Low</span>
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setEnergyLevel(level)}
                  disabled={isSubmitting}
                  className={`flex-1 h-8 rounded text-xs font-medium transition-all ${
                    energyLevel === level
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  aria-label={`Energy level ${level}`}
                >
                  {level}
                </button>
              ))}
              <span className="text-xs text-gray-500">High</span>
            </div>
          </div>

          {/* Prayer Focus */}
          <div>
            <label className="text-xs text-gray-700 mb-1 block font-medium">
              What would you like to pray about?
            </label>
            <textarea
              value={prayerFocus}
              onChange={(e) => setPrayerFocus(e.target.value)}
              disabled={isSubmitting}
              placeholder="What's on your heart..."
              className="w-full p-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all resize-none text-sm"
              rows={2}
            />
          </div>

          {/* Gratitude */}
          <div>
            <label className="text-xs text-gray-700 mb-1 block font-medium">
              What are you grateful for?
            </label>
            <textarea
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              disabled={isSubmitting}
              placeholder="Count your blessings..."
              className="w-full p-2 rounded-lg border border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all resize-none text-sm"
              rows={2}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all shadow-md ${
              canSubmit && !isSubmitting
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Checking in...' : '🙏 Begin Prayer Time'}
          </button>
        </div>
      )}
    </div>
  );
}
