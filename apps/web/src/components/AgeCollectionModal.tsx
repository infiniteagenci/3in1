import { useEffect, useState } from 'react';

interface AgeCollectionModalProps {
  onComplete: (ageGroup: string) => void;
}

const ageGroups = [
  { id: 'child', label: 'Under 13', icon: '👶', range: '0-12' },
  { id: 'teen', label: 'Teen (13-17)', icon: '🧑', range: '13-17' },
  { id: 'young-adult', label: 'Young Adult (18-25)', icon: '🎓', range: '18-25' },
  { id: 'adult', label: 'Adult (26-45)', icon: '👨', range: '26-45' },
  { id: 'midlife', label: 'Midlife (46-65)', icon: '🌟', range: '46-65' },
  { id: 'senior', label: 'Senior (65+)', icon: '👴', range: '65+' },
];

export default function AgeCollectionModal({ onComplete }: AgeCollectionModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  useEffect(() => {
    // Check if age has already been collected
    const hasCollectedAge = localStorage.getItem('user_age_group');
    if (!hasCollectedAge) {
      // Small delay to show after page loads
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleSelect = (ageGroup: string) => {
    setSelectedAge(ageGroup);
  };

  const handleSubmit = () => {
    if (selectedAge) {
      localStorage.setItem('user_age_group', selectedAge);
      setIsVisible(false);
      onComplete(selectedAge);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('user_age_group', 'adult'); // Default to adult
    setIsVisible(false);
    onComplete('adult');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">👋</div>
          <h2 className="text-xl font-semibold text-[var(--color-stone-900)] font-geist tracking-tight mb-2">
            Welcome! Let's get to know you
          </h2>
          <p className="text-sm text-[var(--color-stone-600)] font-geist font-light">
            This helps Spirit provide conversations that resonate with you
          </p>
        </div>

        {/* Age Groups */}
        <div className="space-y-2 mb-6">
          {ageGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => handleSelect(group.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all font-geist tracking-tight ${
                selectedAge === group.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-bg)]'
                  : 'border-[var(--color-stone-200)] hover:border-[var(--color-primary)] hover:bg-[var(--color-stone-50)]'
              }`}
            >
              <span className="text-2xl">{group.icon}</span>
              <span className="text-[var(--color-stone-700)] font-medium">{group.label}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--color-stone-300)] text-[var(--color-stone-600)] hover:bg-[var(--color-stone-50)] transition-colors font-geist tracking-tight text-sm"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedAge}
            className="flex-1 px-4 py-2.5 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-geist tracking-tight text-sm"
            style={{
              background: selectedAge
                ? 'var(--color-primary)'
                : 'var(--color-stone-300)'
            }}
          >
            Continue
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-[var(--color-stone-400)] text-center mt-4 font-geist">
          This helps personalize your experience. You can change this anytime.
        </p>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
