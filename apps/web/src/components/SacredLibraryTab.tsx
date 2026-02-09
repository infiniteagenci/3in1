import CatholicMenu from './CatholicMenu';
import StudyPlans from './bible-chat/StudyPlans';
import BiblicalCharacters from './bible-chat/BiblicalCharacters';
import VerseWallpaper from './bible-chat/VerseWallpaper';
import RosaryTab from './RosaryTab';
import { useState } from 'react';

interface SacredLibraryTabProps {
  onSelectItem: (category: string, item: any) => void;
}

export default function SacredLibraryTab({ onSelectItem }: SacredLibraryTabProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showStudyPlans, setShowStudyPlans] = useState(false);
  const [showBiblicalCharacters, setShowBiblicalCharacters] = useState(false);
  const [showVerseWallpaper, setShowVerseWallpaper] = useState(false);
  const [showRosary, setShowRosary] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    if (category === 'study-plans') {
      setShowStudyPlans(true);
      return;
    }
    if (category === 'biblical-characters') {
      setShowBiblicalCharacters(true);
      return;
    }
    if (category === 'verse-wallpaper') {
      setShowVerseWallpaper(true);
      return;
    }
    if (category === 'rosary') {
      setShowRosary(true);
      return;
    }
    setSelectedCategory(category);
    setShowMenu(true);
  };

  const categories = [
    { id: 'study-plans', icon: '📚', title: 'Study Plans', description: 'Bible study courses', color: 'from-indigo-500 to-purple-500' },
    { id: 'biblical-characters', icon: '👤', title: 'Characters', description: 'Bible heroes & heroines', color: 'from-amber-500 to-orange-500' },
    { id: 'verse-wallpaper', icon: '🖼️', title: 'Wallpaper', description: 'Verse wallpapers', color: 'from-pink-500 to-rose-500' },
    { id: 'rosary', icon: '📿', title: 'Rosary', description: 'Daily rosary mysteries', color: 'from-rose-500 to-pink-500' },
    { id: 'prayers', icon: '🙏', title: 'Prayers', description: 'Traditional Catholic prayers', color: 'from-purple-500 to-blue-500' },
    { id: 'sacraments', icon: '✨', title: 'Sacraments', description: 'Seven sacred mysteries', color: 'from-blue-500 to-cyan-500' },
    { id: 'saints', icon: '👼', title: 'Saints', description: 'Inspiring holy lives', color: 'from-green-500 to-emerald-500' },
    { id: 'catechism', icon: '📖', title: 'Catechism', description: 'Church teachings', color: 'from-amber-500 to-orange-500' },
    { id: 'bible', icon: '✝️', title: 'Bible', description: 'Sacred Scripture', color: 'from-red-500 to-rose-500' },
    { id: 'traditions', icon: '⛪', title: 'Traditions', description: 'Catholic customs', color: 'from-indigo-500 to-violet-500' },
  ];

  if (showVerseWallpaper) {
    return (
      <div className="flex flex-col h-full bg-[var(--color-stone-50)]">
        <button
          onClick={() => {
            setShowVerseWallpaper(false);
          }}
          className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Library</span>
        </button>
        <div className="flex-1 overflow-y-auto p-4">
          <VerseWallpaper />
        </div>
      </div>
    );
  }

  if (showStudyPlans) {
    return (
      <div className="flex flex-col h-full bg-[var(--color-stone-50)]">
        <button
          onClick={() => {
            setShowStudyPlans(false);
          }}
          className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Library</span>
        </button>
        <div className="flex-1 overflow-y-auto p-4">
          <StudyPlans onLessonSelect={(planId, lessonId) => {
            // Handle lesson selection - could trigger a chat about the lesson
            onSelectItem('study-plans', { planId, lessonId });
            setShowStudyPlans(false);
          }} />
        </div>
      </div>
    );
  }

  if (showBiblicalCharacters) {
    return (
      <div className="flex flex-col h-full bg-[var(--color-stone-50)]">
        <button
          onClick={() => {
            setShowBiblicalCharacters(false);
          }}
          className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Library</span>
        </button>
        <div className="flex-1 overflow-y-auto p-4">
          <BiblicalCharacters onCharacterSelect={(characterId) => {
            // Handle character selection - could trigger a chat about the character
            onSelectItem('biblical-characters', { characterId });
          }} />
        </div>
      </div>
    );
  }

  if (showRosary) {
    return <RosaryTab onClose={() => setShowRosary(false)} />;
  }

  if (showMenu && selectedCategory) {
    return (
      <div className="flex flex-col h-full bg-[var(--color-stone-50)]">
        <button
          onClick={() => {
            setShowMenu(false);
            setSelectedCategory(null);
          }}
          className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Library</span>
        </button>
        <CatholicMenu
          onSelectItem={onSelectItem}
          onClose={() => {
            setShowMenu(false);
            setSelectedCategory(null);
          }}
          initialCategory={selectedCategory}
        />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-20 bg-[var(--color-stone-50)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">✝️ Sacred Library</h1>
        <p className="text-sm text-white/90">Explore the richness of Catholic faith</p>
      </div>

      {/* Categories Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 text-left group"
          >
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <span className="text-2xl">{category.icon}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{category.title}</h3>
            <p className="text-xs text-gray-500">{category.description}</p>
          </button>
        ))}
      </div>

      {/* Featured Section */}
      <div className="px-4 pb-4">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-4 border border-purple-200">
          <h3 className="font-semibold text-purple-900 mb-2">✨ Daily Inspiration</h3>
          <p className="text-sm text-purple-700 mb-3">Start your day with Gospel readings and saint of the day.</p>
          <button
            onClick={() => onSelectItem('readings', {
              title: 'Today\'s Gospel',
              description: 'Daily readings and reflections'
            })}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            View Today's Readings
          </button>
        </div>
      </div>
    </div>
  );
}
