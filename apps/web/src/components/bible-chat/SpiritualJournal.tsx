import { useState, useEffect } from 'react';

interface JournalEntry {
  id: string;
  date: string;
  closenessToGod: number;
  mood: 'joyful' | 'peaceful' | 'anxious' | 'sad' | 'grateful' | 'hopeful' | 'struggling';
  title: string;
  content: string;
  verses?: string[];
  prayerPoints?: string[];
  answeredPrayer?: boolean;
}

interface SpiritualJournalProps {
  className?: string;
}

const moods = {
  joyful: { emoji: '😊', label: 'Joyful', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  peaceful: { emoji: '😌', label: 'Peaceful', color: 'bg-blue-100 text-blue-700 border-blue-300' },
  grateful: { emoji: '🙏', label: 'Grateful', color: 'bg-green-100 text-green-700 border-green-300' },
  hopeful: { emoji: '🌟', label: 'Hopeful', color: 'bg-purple-100 text-purple-700 border-purple-300' },
  anxious: { emoji: '😰', label: 'Anxious', color: 'bg-orange-100 text-orange-700 border-orange-300' },
  sad: { emoji: '😢', label: 'Sad', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  struggling: { emoji: '😔', label: 'Struggling', color: 'bg-red-100 text-red-700 border-red-300' }
};

export default function SpiritualJournal({ className = '' }: SpiritualJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'insights'>('list');

  // Form state
  const [formData, setFormData] = useState({
    closenessToGod: 5,
    mood: 'grateful' as JournalEntry['mood'],
    title: '',
    content: '',
    verses: '',
    prayerPoints: '',
    answeredPrayer: false
  });

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const saved = localStorage.getItem('spiritual-journal-entries');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Sort by date descending
      parsed.sort((a: JournalEntry, b: JournalEntry) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setEntries(parsed);
    }
  };

  const saveEntry = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please provide a title and content for your journal entry.');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      closenessToGod: formData.closenessToGod,
      mood: formData.mood,
      title: formData.title.trim(),
      content: formData.content.trim(),
      verses: formData.verses ? formData.verses.split(',').map(v => v.trim()).filter(v => v) : [],
      prayerPoints: formData.prayerPoints ? formData.prayerPoints.split('\n').filter(p => p.trim()) : [],
      answeredPrayer: formData.answeredPrayer
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('spiritual-journal-entries', JSON.stringify(updatedEntries));

    // Reset form
    setFormData({
      closenessToGod: 5,
      mood: 'grateful',
      title: '',
      content: '',
      verses: '',
      prayerPoints: '',
      answeredPrayer: false
    });
    setIsCreatingEntry(false);
  };

  const deleteEntry = (entryId: string) => {
    const updatedEntries = entries.filter(e => e.id !== entryId);
    setEntries(updatedEntries);
    localStorage.setItem('spiritual-journal-entries', JSON.stringify(updatedEntries));
    if (selectedEntry?.id === entryId) {
      setSelectedEntry(null);
    }
  };

  const toggleAnsweredPrayer = (entryId: string) => {
    const updatedEntries = entries.map(e =>
      e.id === entryId ? { ...e, answeredPrayer: !e.answeredPrayer } : e
    );
    setEntries(updatedEntries);
    localStorage.setItem('spiritual-journal-entries', JSON.stringify(updatedEntries));
    if (selectedEntry?.id === entryId) {
      setSelectedEntry({ ...selectedEntry, answeredPrayer: !selectedEntry.answeredPrayer });
    }
  };

  const getAverageCloseness = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.closenessToGod, 0);
    return Math.round((sum / entries.length) * 10) / 10;
  };

  const getMoodCounts = () => {
    const counts: Record<string, number> = {};
    entries.forEach(entry => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    });
    return counts;
  };

  const getEntriesThisWeek = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return entries.filter(e => new Date(e.date) >= oneWeekAgo);
  };

  const getAnsweredPrayers = () => {
    return entries.filter(e => e.answeredPrayer).length;
  };

  // New entry form
  if (isCreatingEntry) {
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-6 text-white">
          <button
            onClick={() => setIsCreatingEntry(false)}
            className="flex items-center gap-2 text-purple-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Journal</span>
          </button>
          <h2 className="text-2xl font-bold font-playfair">New Journal Entry</h2>
          <p className="text-purple-100 text-sm mt-1">Record your spiritual journey</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Closeness to God Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-geist">
              How close do you feel to God today?
            </label>
            <div className="flex items-center gap-4">
              <span className="text-2xl">😔</span>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.closenessToGod}
                onChange={(e) => setFormData({ ...formData, closenessToGod: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <span className="text-2xl">😄</span>
            </div>
            <div className="text-center text-sm font-medium text-purple-600 mt-2">
              {formData.closenessToGod}/10
            </div>
          </div>

          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 font-geist">
              How are you feeling?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.entries(moods) as [JournalEntry['mood'], typeof moods[keyof typeof moods]][]).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: key })}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                    formData.mood === key
                      ? `${value.color} border-current`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{value.emoji}</span>
                  <span className="text-xs font-medium">{value.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-geist">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What's on your heart today?"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-geist"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-geist">
              Your Reflection
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Share your thoughts, prayers, or what God is showing you..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-geist resize-none"
            />
          </div>

          {/* Bible Verses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-geist">
              Related Bible Verses (optional)
            </label>
            <input
              type="text"
              value={formData.verses}
              onChange={(e) => setFormData({ ...formData, verses: e.target.value })}
              placeholder="John 3:16, Psalm 23:1-3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-geist"
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple verses with commas</p>
          </div>

          {/* Prayer Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-geist">
              Prayer Points (optional)
            </label>
            <textarea
              value={formData.prayerPoints}
              onChange={(e) => setFormData({ ...formData, prayerPoints: e.target.value })}
              placeholder="List things you're praying for...&#10;One point per line"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none font-geist resize-none"
            />
          </div>

          {/* Answered Prayer Checkbox */}
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <input
              type="checkbox"
              id="answeredPrayer"
              checked={formData.answeredPrayer}
              onChange={(e) => setFormData({ ...formData, answeredPrayer: e.target.checked })}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
            />
            <label htmlFor="answeredPrayer" className="flex-1">
              <span className="font-medium text-green-800">God answered a prayer!</span>
              <p className="text-sm text-green-600">Mark this entry to celebrate God's faithfulness</p>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={saveEntry}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold font-geist hover:shadow-lg transition-all"
          >
            Save Journal Entry
          </button>
        </div>
      </div>
    );
  }

  // Single entry view
  if (selectedEntry) {
    const moodInfo = moods[selectedEntry.mood];
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-6 text-white">
          <button
            onClick={() => setSelectedEntry(null)}
            className="flex items-center gap-2 text-purple-100 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Journal</span>
          </button>
          <h2 className="text-xl font-bold font-playfair">{selectedEntry.title}</h2>
          <p className="text-purple-100 text-sm mt-1">
            {new Date(selectedEntry.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Entry Content */}
        <div className="p-6 space-y-6">
          {/* Closeness and Mood */}
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-purple-50 rounded-xl p-4">
              <div className="text-sm text-purple-600 font-medium mb-1">Closeness to God</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-purple-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    style={{ width: `${selectedEntry.closenessToGod * 10}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-purple-700">{selectedEntry.closenessToGod}/10</span>
              </div>
            </div>
            <div className={`px-4 py-3 rounded-xl border-2 ${moodInfo.color}`}>
              <span className="text-2xl">{moodInfo.emoji}</span>
              <div className="text-sm font-medium">{moodInfo.label}</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2 font-geist">Reflection</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed font-geist font-light">
              {selectedEntry.content}
            </p>
          </div>

          {/* Verses */}
          {selectedEntry.verses && selectedEntry.verses.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 font-geist">Related Verses</h3>
              <div className="space-y-2">
                {selectedEntry.verses.map((verse, index) => (
                  <div key={index} className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                    <p className="text-sm text-gray-700 font-crimson italic">{verse}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prayer Points */}
          {selectedEntry.prayerPoints && selectedEntry.prayerPoints.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 font-geist">Prayer Points</h3>
              <ul className="space-y-2">
                {selectedEntry.prayerPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="flex-1 font-geist font-light">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Answered Prayer Badge */}
          {selectedEntry.answeredPrayer && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-700">
                <span className="text-2xl">🎉</span>
                <span className="font-semibold">God Answered This Prayer!</span>
              </div>
              <p className="text-sm text-green-600 mt-1 font-geist font-light">
                Rejoice in God's faithfulness and continue to trust Him with your prayers.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
          <button
            onClick={() => toggleAnsweredPrayer(selectedEntry.id)}
            className={`flex-1 py-3 rounded-xl font-semibold font-geist transition-all ${
              selectedEntry.answeredPrayer
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {selectedEntry.answeredPrayer ? 'Unmark as Answered' : 'Mark as Answered ✨'}
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this entry?')) {
                deleteEntry(selectedEntry.id);
              }
            }}
            className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-semibold font-geist hover:bg-red-200 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  // Insights view
  if (viewMode === 'insights') {
    const moodCounts = getMoodCounts();
    const entriesThisWeek = getEntriesThisWeek();
    const answeredPrayers = getAnsweredPrayers();

    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2 text-purple-100 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            <h2 className="text-2xl font-bold font-playfair">Spiritual Insights</h2>
            <div className="w-20" /> {/* Spacer */}
          </div>
          <p className="text-purple-100 text-sm">Track your spiritual growth over time</p>
        </div>

        {/* Insights Content */}
        <div className="p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-700">{entries.length}</div>
              <div className="text-sm text-purple-600">Total Entries</div>
            </div>
            <div className="bg-indigo-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-indigo-700">{entriesThisWeek.length}</div>
              <div className="text-sm text-indigo-600">This Week</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-700">{getAverageCloseness()}</div>
              <div className="text-sm text-blue-600">Avg. Closeness</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-700">{answeredPrayers}</div>
              <div className="text-sm text-green-600">Answered Prayers</div>
            </div>
          </div>

          {/* Mood Breakdown */}
          {Object.keys(moodCounts).length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 font-geist">Mood Distribution</h3>
              <div className="space-y-2">
                {(Object.entries(moodCounts) as [string, number][]).map(([mood, count]) => {
                  const moodInfo = moods[mood as JournalEntry['mood']];
                  return (
                    <div key={mood} className="flex items-center gap-3">
                      <span className="text-2xl">{moodInfo.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{moodInfo.label}</span>
                          <span className="text-sm text-gray-500">{count} entries</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(count / entries.length) * 100}%`,
                              backgroundColor: moodInfo.color.split(' ')[1]?.replace('text-', '') || '#8b5cf6'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Closeness Trend */}
          {entries.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 font-geist">Recent Closeness to God</h3>
              <div className="space-y-2">
                {entries.slice(0, 5).map((entry) => {
                  const moodInfo = moods[entry.mood];
                  return (
                    <div key={entry.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-xl">{moodInfo.emoji}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">{entry.title}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-purple-600">{entry.closenessToGod}/10</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main list view
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold font-playfair">Spiritual Journal</h2>
            <p className="text-purple-100 text-sm mt-1">Track your walk with God</p>
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'insights' ? 'list' : 'insights')}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
          >
            {viewMode === 'list' ? '📊 Insights' : '📝 Entries'}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{entries.length}</div>
            <div className="text-xs text-purple-100">Total Entries</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{getAnsweredPrayers()}</div>
            <div className="text-xs text-purple-100">Answered Prayers</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{getAverageCloseness()}</div>
            <div className="text-xs text-purple-100">Avg. Closeness</div>
          </div>
        </div>
      </div>

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">📖</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Spiritual Journal</h3>
          <p className="text-gray-600 text-sm font-geist font-light mb-6">
            Record your thoughts, prayers, and how God is working in your life.
          </p>
          <button
            onClick={() => setIsCreatingEntry(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold font-geist hover:shadow-lg transition-all"
          >
            Write Your First Entry
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
          {entries.map((entry) => {
            const moodInfo = moods[entry.mood];
            return (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{moodInfo.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 truncate font-geist group-hover:text-purple-700">
                        {entry.title}
                      </h4>
                      {entry.answeredPrayer && (
                        <span className="text-green-500 text-sm">✓ Answered</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 font-geist font-light">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2 font-geist font-light">
                      {entry.content}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-bold text-purple-600">{entry.closenessToGod}/10</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* FAB - Add Entry */}
      {entries.length > 0 && (
        <button
          onClick={() => setIsCreatingEntry(true)}
          className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl z-10"
        >
          ✏️
        </button>
      )}
    </div>
  );
}
