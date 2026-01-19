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
  onDismiss?: () => void;
  compact?: boolean;
}

export default function DailyCheckin({ onComplete, onDismiss, compact = false }: DailyCheckinProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setIsSubmitting(true);

    const data = {
      mood: selectedMood,
      energyLevel: 3,
      prayerFocus: undefined,
      gratitudeNotes: undefined,
    };

    onComplete(data);

    setTimeout(() => {
      setSelectedMood(null);
      setIsSubmitting(false);
    }, 500);
  };

  const handleQuickSubmit = (moodId: string) => {
    setSelectedMood(moodId);
    setIsSubmitting(true);

    const data = {
      mood: moodId,
      energyLevel: 3,
      prayerFocus: undefined,
      gratitudeNotes: undefined,
    };

    onComplete(data);

    setTimeout(() => {
      setSelectedMood(null);
      setIsSubmitting(false);
    }, 500);
  };

  if (compact) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 mb-2 border border-purple-200 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <span className="text-sm font-semibold text-purple-900">How are you feeling?</span>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Dismiss"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleQuickSubmit(mood.id)}
              disabled={isSubmitting}
              className={`px-2 py-1.5 rounded-lg transition-all text-xs font-medium ${
                mood.color
              } hover:scale-105 active:scale-95 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              aria-label={`Feeling ${mood.label}`}
              title={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-4 mb-3 border border-purple-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-semibold text-purple-900 flex items-center gap-2">
            <span>✨</span> How are you feeling today?
          </h3>
          <p className="text-xs text-purple-700 mt-1">Take a moment to check in with yourself and God.</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Dismiss"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

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
                  onClick={() => {}}
                  disabled={isSubmitting}
                  className={`flex-1 h-8 rounded text-xs font-medium transition-all bg-purple-500 text-white shadow-md ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  aria-label={`Energy level ${level}`}
                >
                  {3}
                </button>
              ))}
              <span className="text-xs text-gray-500">High</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedMood || isSubmitting}
            className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-all shadow-md ${
              selectedMood && !isSubmitting
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
