import { useState, useEffect } from 'react';
import {
  getAllStudyPlans,
  getStudyPlansByCategory,
  getStudyProgress,
  saveLessonProgress,
  saveLessonInProgress,
  getUnlockedLessonCount,
  type StudyPlan,
  type StudyLesson
} from '../../data/bible-study-plans';

interface StudyPlansProps {
  onLessonSelect?: (planId: string, lessonId: string) => void;
  className?: string;
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const categories = {
  foundations: { label: 'Foundations', color: 'bg-blue-100 text-blue-700', icon: '🏛️' },
  character: { label: 'Biblical Characters', color: 'bg-purple-100 text-purple-700', icon: '👤' },
  themes: { label: 'Biblical Themes', color: 'bg-green-100 text-green-700', icon: '💡' },
  'life-application': { label: 'Life Application', color: 'bg-orange-100 text-orange-700', icon: '🌱' }
};

const difficulties = {
  beginner: { label: 'Beginner', color: 'text-green-600 bg-green-50' },
  intermediate: { label: 'Intermediate', color: 'text-yellow-600 bg-yellow-50' },
  advanced: { label: 'Advanced', color: 'text-red-600 bg-red-50' }
};

export default function StudyPlans({ onLessonSelect, className = '' }: StudyPlansProps) {
  const [plans] = useState<StudyPlan[]>(getAllStudyPlans());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<StudyLesson | null>(null);
  const [progressData, setProgressData] = useState<Record<string, any>>({});
  const [personalNotes, setPersonalNotes] = useState<string>('');
  const [selectedQuestionNotes, setSelectedQuestionNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load progress for all plans
    const allProgress: Record<string, any> = {};
    plans.forEach(plan => {
      allProgress[plan.id] = getStudyProgress(plan.id);
    });
    setProgressData(allProgress);

    // Load saved notes for the current lesson
    if (selectedLesson && selectedPlan) {
      const storageKey = `study_notes_${selectedPlan.id}_${selectedLesson.id}`;
      const savedNotes = localStorage.getItem(storageKey);
      if (savedNotes) {
        const parsed = JSON.parse(savedNotes);
        setPersonalNotes(parsed.personal || '');
        setSelectedQuestionNotes(parsed.questionNotes || {});
      }
    }
  }, [plans, selectedLesson, selectedPlan]);

  const handlePlanSelect = (plan: StudyPlan) => {
    setSelectedPlan(plan);
    setSelectedLesson(null);
  };

  const handleLessonSelect = (lesson: StudyLesson) => {
    if (!selectedPlan) return;

    // Mark lesson as in progress
    saveLessonInProgress(selectedPlan.id, lesson.id);

    // Update local state
    setProgressData(prev => ({
      ...prev,
      [selectedPlan.id]: {
        ...prev[selectedPlan.id],
        current: lesson.id,
        inProgress: [...(prev[selectedPlan.id]?.inProgress || []), lesson.id]
      }
    }));

    setSelectedLesson(lesson);

    // Load saved notes for this lesson
    const storageKey = `study_notes_${selectedPlan.id}_${lesson.id}`;
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      const parsed = JSON.parse(savedNotes);
      setPersonalNotes(parsed.personal || '');
      setSelectedQuestionNotes(parsed.questionNotes || {});
    } else {
      setPersonalNotes('');
      setSelectedQuestionNotes({});
    }
  };

  const handleBackToPlans = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else if (selectedPlan) {
      setSelectedPlan(null);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleMarkComplete = () => {
    if (!selectedPlan || !selectedLesson) return;

    // Save notes before marking complete
    const storageKey = `study_notes_${selectedPlan.id}_${selectedLesson.id}`;
    const notesData = {
      personal: personalNotes,
      questionNotes: selectedQuestionNotes,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify(notesData));

    saveLessonProgress(selectedPlan.id, selectedLesson.id);

    // Update local state
    setProgressData(prev => ({
      ...prev,
      [selectedPlan.id]: {
        ...prev[selectedPlan.id],
        completed: [...(prev[selectedPlan.id]?.completed || []), selectedLesson.id]
      }
    }));

    setSelectedLesson(null);
  };

  const handleSaveNotes = () => {
    if (!selectedPlan || !selectedLesson) return;

    const storageKey = `study_notes_${selectedPlan.id}_${selectedLesson.id}`;
    const notesData = {
      personal: personalNotes,
      questionNotes: selectedQuestionNotes,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem(storageKey, JSON.stringify(notesData));
  };

  const handleQuestionNoteChange = (questionIndex: number, note: string) => {
    setSelectedQuestionNotes(prev => ({
      ...prev,
      [questionIndex]: note
    }));
  };

  const filteredPlans = selectedCategory
    ? getStudyPlansByCategory(selectedCategory as StudyPlan['category'])
    : plans;

  const getLessonStatus = (lessonId: string, lessonIndex: number) => {
    if (!selectedPlan) return 'locked';
    const progress = progressData[selectedPlan.id];
    if (progress?.completed?.includes(lessonId)) return 'completed';
    if (progress?.inProgress?.includes(lessonId) || progress?.current === lessonId) return 'in-progress';

    // Check if lesson is unlocked based on days elapsed
    const unlockedCount = getUnlockedLessonCount(selectedPlan.id, selectedPlan.lessons.length);
    if (lessonIndex < unlockedCount) return 'available';

    return 'locked';
  };

  // Main plans view
  if (!selectedPlan) {
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <BookOpenIcon />
            <h2 className="text-2xl font-bold font-playfair">Bible Study Plans</h2>
          </div>
          <p className="text-indigo-100 font-geist text-sm">
            Structured plans to help you grow in faith and understanding
          </p>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-4 border-b border-gray-200 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Plans
            </button>
            {(Object.entries(categories) as [StudyPlan['category'], typeof categories[keyof typeof categories]][]).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === key
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{value.icon}</span>
                {value.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="p-6">
          <div className="grid gap-4">
            {filteredPlans.map((plan) => {
              const category = categories[plan.category];
              const difficulty = difficulties[plan.difficulty];
              const progress = progressData[plan.id];
              const completedCount = progress?.completed?.length || 0;
              const progressPercent = Math.round((completedCount / plan.totalLessons) * 100);

              return (
                <button
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan)}
                  className="w-full text-left p-5 rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl shrink-0">
                      {category.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 font-geist group-hover:text-indigo-700 transition-colors">
                          {plan.title}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficulty.color}`}>
                          {difficulty.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-geist font-light">
                        {plan.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 font-geist whitespace-nowrap">
                          {completedCount}/{plan.totalLessons}
                        </span>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 font-geist">
                        <span className="flex items-center gap-1">
                          <ClockIcon />
                          {plan.duration}
                        </span>
                        <span className={category.color}>
                          {category.label}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Lesson view (when a plan is selected)
  if (!selectedLesson) {
    const category = categories[selectedPlan.category];
    const difficulty = difficulties[selectedPlan.difficulty];
    const progress = progressData[selectedPlan.id];

    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-6 text-white">
          <button
            onClick={handleBackToPlans}
            className="flex items-center gap-2 text-indigo-100 hover:text-white mb-4 transition-colors"
          >
            <BackIcon />
            <span className="text-sm font-medium">Back to Plans</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              {category.icon}
            </div>
            <h2 className="text-xl font-bold font-playfair">{selectedPlan.title}</h2>
          </div>
          <p className="text-indigo-100 text-sm mb-4 font-geist font-light">
            {selectedPlan.description}
          </p>
          <div className="flex items-center gap-3 text-sm">
            <span className={`px-3 py-1 rounded-full ${difficulty.color}`}>{difficulty.label}</span>
            <span className="flex items-center gap-1">
              <ClockIcon />
              {selectedPlan.duration}
            </span>
            <span>{selectedPlan.totalLessons} lessons</span>
          </div>
        </div>

        {/* Lessons List */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-geist">Lessons</h3>
          <div className="space-y-3">
            {selectedPlan.lessons.map((lesson, index) => {
              const status = getLessonStatus(lesson.id, index);
              const isLocked = status === 'locked';
              const unlockedCount = getUnlockedLessonCount(selectedPlan.id, selectedPlan.lessons.length);

              return (
                <button
                  key={lesson.id}
                  onClick={() => !isLocked && handleLessonSelect(lesson)}
                  disabled={isLocked}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    status === 'completed'
                      ? 'border-green-300 bg-green-50'
                      : status === 'in-progress'
                      ? 'border-indigo-300 bg-indigo-50'
                      : isLocked
                      ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      status === 'completed'
                        ? 'bg-green-500 text-white'
                        : status === 'in-progress'
                        ? 'bg-indigo-500 text-white'
                        : isLocked
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {status === 'completed' ? (
                        <CheckIcon />
                      ) : status === 'in-progress' ? (
                        <span className="text-xs font-bold">{index + 1}</span>
                      ) : isLocked ? (
                        <LockIcon />
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold font-geist ${
                        status === 'completed' ? 'text-green-700' : status === 'in-progress' ? 'text-indigo-700' : 'text-gray-900'
                      }`}>
                        {lesson.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 font-geist font-light line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 font-geist">
                        <span>{lesson.verses.length} verses</span>
                        <span>•</span>
                        <span>{lesson.questions.length} questions</span>
                      </div>
                      {isLocked && (
                        <p className="text-xs text-gray-500 mt-2">
                          🔒 Unlocks in {index + 1 - unlockedCount} day{index + 1 - unlockedCount > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>

                    {/* Arrow (if not locked) */}
                    {!isLocked && (
                      <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              ℹ️ Lessons unlock one per day. You have access to {unlockedCount} of {selectedPlan.lessons.length} lessons.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Individual lesson view
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-6 text-white">
        <button
          onClick={handleBackToPlans}
          className="flex items-center gap-2 text-indigo-100 hover:text-white mb-4 transition-colors"
        >
          <BackIcon />
          <span className="text-sm font-medium">Back to Lessons</span>
        </button>
        <h2 className="text-xl font-bold font-playfair mb-2">{selectedLesson.title}</h2>
        <p className="text-indigo-100 text-sm font-geist font-light">{selectedLesson.description}</p>
      </div>

      {/* Lesson Content */}
      <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
        {/* Verses */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
            <span>📖</span> Key Verses
          </h4>
          <div className="space-y-2">
            {selectedLesson.verses.map((verse, index) => (
              <div key={index} className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                <p className="text-sm text-gray-700 font-crimson italic">{verse}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
            <span>❓</span> Reflection Questions
          </h4>
          <div className="space-y-3">
            {selectedLesson.questions.map((question, index) => (
              <div key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <p className="text-sm text-gray-700 pt-0.5 font-geist font-light">{question}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prayer */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
            <span>🙏</span> Prayer
          </h4>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-lg p-4">
            <p className="text-sm text-gray-700 font-crimson italic leading-relaxed">{selectedLesson.prayer}</p>
          </div>
        </div>

        {/* Reflection */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
            <span>✨</span> Personal Reflection
          </h4>
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <p className="text-sm text-gray-700 font-geist font-light leading-relaxed">{selectedLesson.reflection}</p>
          </div>
        </div>

        {/* Personal Notes Section - NEW */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
            <span>📝</span> Your Personal Notes
          </h4>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 space-y-3">
            <textarea
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              placeholder="Write your personal thoughts, insights, or reflections here..."
              className="w-full px-3 py-2 border border-purple-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
            />
            <button
              onClick={handleSaveNotes}
              className="w-full py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Save Notes
            </button>
          </div>
        </div>

        {/* Question Notes Section - NEW */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 font-geist">
            <span>💭</span> Your Answers to Questions
          </h4>
          <div className="space-y-3">
            {selectedLesson.questions.map((question, index) => (
              <div key={index} className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-sm text-gray-700 mb-2 font-medium">{question}</p>
                <textarea
                  value={selectedQuestionNotes[index] || ''}
                  onChange={(e) => handleQuestionNoteChange(index, e.target.value)}
                  placeholder="Write your answer or thoughts..."
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button
          onClick={handleMarkComplete}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold font-geist hover:shadow-lg transition-all"
        >
          Mark Complete & Continue
        </button>
      </div>
    </div>
  );
}
