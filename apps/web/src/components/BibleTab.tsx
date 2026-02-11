import { useState, useEffect } from 'react';

// Bible books organized by testament - Catholic Bible (73 books)
const bibleBooks = {
  oldTestament: [
    // Pentateuch (5 books)
    { id: 'genesis', name: 'Genesis', chapters: 50 },
    { id: 'exodus', name: 'Exodus', chapters: 40 },
    { id: 'leviticus', name: 'Leviticus', chapters: 27 },
    { id: 'numbers', name: 'Numbers', chapters: 36 },
    { id: 'deuteronomy', name: 'Deuteronomy', chapters: 34 },
    // Historical Books (16 books)
    { id: 'joshua', name: 'Joshua', chapters: 24 },
    { id: 'judges', name: 'Judges', chapters: 21 },
    { id: 'ruth', name: 'Ruth', chapters: 4 },
    { id: '1-samuel', name: '1 Samuel', chapters: 31 },
    { id: '2-samuel', name: '2 Samuel', chapters: 24 },
    { id: '1-kings', name: '1 Kings', chapters: 22 },
    { id: '2-kings', name: '2 Kings', chapters: 25 },
    { id: '1-chronicles', name: '1 Chronicles', chapters: 29 },
    { id: '2-chronicles', name: '2 Chronicles', chapters: 36 },
    { id: 'ezra', name: 'Ezra', chapters: 10 },
    { id: 'nehemiah', name: 'Nehemiah', chapters: 13 },
    { id: 'esther', name: 'Esther', chapters: 10 },
    // Wisdom Books (7 books)
    { id: 'job', name: 'Job', chapters: 42 },
    { id: 'psalms', name: 'Psalms', chapters: 150 },
    { id: 'proverbs', name: 'Proverbs', chapters: 31 },
    { id: 'ecclesiastes', name: 'Ecclesiastes', chapters: 12 },
    { id: 'song-of-solomon', name: 'Song of Solomon', chapters: 8 },
    { id: 'wisdom', name: 'Wisdom', chapters: 19, deuterocanonical: true },
    { id: 'sirach', name: 'Sirach (Ecclesiasticus)', chapters: 51, deuterocanonical: true },
    // Prophets (18 books)
    { id: 'isaiah', name: 'Isaiah', chapters: 66 },
    { id: 'jeremiah', name: 'Jeremiah', chapters: 52 },
    { id: 'lamentations', name: 'Lamentations', chapters: 5 },
    { id: 'baruch', name: 'Baruch', chapters: 6, deuterocanonical: true },
    { id: 'ezekiel', name: 'Ezekiel', chapters: 48 },
    { id: 'daniel', name: 'Daniel', chapters: 14 },
    { id: 'hosea', name: 'Hosea', chapters: 14 },
    { id: 'joel', name: 'Joel', chapters: 3 },
    { id: 'amos', name: 'Amos', chapters: 9 },
    { id: 'obadiah', name: 'Obadiah', chapters: 1 },
    { id: 'jonah', name: 'Jonah', chapters: 4 },
    { id: 'micah', name: 'Micah', chapters: 7 },
    { id: 'nahum', name: 'Nahum', chapters: 3 },
    { id: 'habakkuk', name: 'Habakkuk', chapters: 3 },
    { id: 'zephaniah', name: 'Zephaniah', chapters: 3 },
    { id: 'haggai', name: 'Haggai', chapters: 2 },
    { id: 'zechariah', name: 'Zechariah', chapters: 14 },
    { id: 'malachi', name: 'Malachi', chapters: 4 },
    // Deuterocanonical Books (7 books)
    { id: 'tobit', name: 'Tobit', chapters: 14, deuterocanonical: true },
    { id: 'judith', name: 'Judith', chapters: 16, deuterocanonical: true },
    { id: '1-maccabees', name: '1 Maccabees', chapters: 16, deuterocanonical: true },
    { id: '2-maccabees', name: '2 Maccabees', chapters: 15, deuterocanonical: true },
    { id: 'wisdom', name: 'Wisdom', chapters: 19, deuterocanonical: true },
    { id: 'sirach', name: 'Sirach (Ecclesiasticus)', chapters: 51, deuterocanonical: true },
    { id: 'baruch', name: 'Baruch', chapters: 6, deuterocanonical: true },
  ],
  newTestament: [
    { id: 'matthew', name: 'Matthew', chapters: 28 },
    { id: 'mark', name: 'Mark', chapters: 16 },
    { id: 'luke', name: 'Luke', chapters: 24 },
    { id: 'john', name: 'John', chapters: 21 },
    { id: 'acts', name: 'Acts', chapters: 28 },
    { id: 'romans', name: 'Romans', chapters: 16 },
    { id: '1-corinthians', name: '1 Corinthians', chapters: 16 },
    { id: '2-corinthians', name: '2 Corinthians', chapters: 13 },
    { id: 'galatians', name: 'Galatians', chapters: 6 },
    { id: 'ephesians', name: 'Ephesians', chapters: 6 },
    { id: 'philippians', name: 'Philippians', chapters: 4 },
    { id: 'colossians', name: 'Colossians', chapters: 4 },
    { id: '1-thessalonians', name: '1 Thessalonians', chapters: 5 },
    { id: '2-thessalonians', name: '2 Thessalonians', chapters: 3 },
    { id: '1-timothy', name: '1 Timothy', chapters: 6 },
    { id: '2-timothy', name: '2 Timothy', chapters: 4 },
    { id: 'titus', name: 'Titus', chapters: 3 },
    { id: 'philemon', name: 'Philemon', chapters: 1 },
    { id: 'hebrews', name: 'Hebrews', chapters: 13 },
    { id: 'james', name: 'James', chapters: 5 },
    { id: '1-peter', name: '1 Peter', chapters: 5 },
    { id: '2-peter', name: '2 Peter', chapters: 3 },
    { id: '1-john', name: '1 John', chapters: 5 },
    { id: '2-john', name: '2 John', chapters: 1 },
    { id: '3-john', name: '3 John', chapters: 1 },
    { id: 'jude', name: 'Jude', chapters: 1 },
    { id: 'revelation', name: 'Revelation', chapters: 22 },
  ]
};

// Sample verses for search demo
const sampleVerses = [
  { text: 'For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.', reference: 'John 3:16', book: 'John', chapter: 3, verse: 16 },
  { text: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1', book: 'Psalms', chapter: 23, verse: 1 },
  { text: 'I can do all things through Christ who strengthens me.', reference: 'Philippians 4:13', book: 'Philippians', chapter: 4, verse: 13 },
  { text: 'In the beginning God created the heaven and the earth.', reference: 'Genesis 1:1', book: 'Genesis', chapter: 1, verse: 1 },
  { text: 'Be still and know that I am God.', reference: 'Psalm 46:10', book: 'Psalms', chapter: 46, verse: 10 },
  { text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.', reference: '1 Corinthians 13:4', book: '1 Corinthians', chapter: 13, verse: 4 },
  { text: 'Trust in the Lord with all your heart and lean not on your own understanding.', reference: 'Proverbs 3:5', book: 'Proverbs', chapter: 3, verse: 5 },
  { text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', reference: 'Jeremiah 29:11', book: 'Jeremiah', chapter: 29, verse: 11 },
  { text: 'The Lord is my light and my salvation—whom shall I fear?', reference: 'Psalm 27:1', book: 'Psalms', chapter: 27, verse: 1 },
  { text: 'Come to me, all you who are weary and burdened, and I will give you rest.', reference: 'Matthew 11:28', book: 'Matthew', chapter: 11, verse: 28 },
  { text: 'I am the way and the truth and the life. No one comes to the Father except through me.', reference: 'John 14:6', book: 'John', chapter: 14, verse: 6 },
  { text: 'But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness.', reference: 'Galatians 5:22', book: 'Galatians', chapter: 5, verse: 22 },
  { text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.', reference: 'Philippians 4:6', book: 'Philippians', chapter: 4, verse: 6 },
  { text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.', reference: 'Romans 8:28', book: 'Romans', chapter: 8, verse: 28 },
  { text: 'Let all that you do be done in love.', reference: '1 Corinthians 16:14', book: '1 Corinthians', chapter: 16, verse: 14 },
];

interface BibleTabProps {
  onClose: () => void;
}

export default function BibleTab({ onClose }: BibleTabProps) {
  const [selectedTestament, setSelectedTestament] = useState<'old' | 'new' | null>(null);
  const [selectedBook, setSelectedBook] = useState<typeof bibleBooks.oldTestament[0] | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof sampleVerses>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch verses from an API - using GNTCE (Good News Bible Today's English Version Catholic)
  const fetchBibleVerse = async (bookId: string, chapter: number) => {
    try {
      const response = await fetch(`https://bible-api.com/${bookId}+${chapter}?translation=gnbce-c`);
      if (response.ok) {
        const data = await response.json();
        return data.verses || [];
      }
    } catch (error) {
      console.log('Using fallback verses');
    }

    // Fallback: Generate placeholder verses
    const book = selectedBook || bibleBooks.oldTestament[0];
    const chapterCount = book.chapters;
    const verses = [];
    for (let i = 1; i <= Math.min(20, chapterCount); i++) {
      verses.push({
        verse: i,
        text: `[Verse content for ${book.name} ${chapter}:${i} - Full integration with Bible API coming soon]`,
      });
    }
    return verses;
  };

  const [verses, setVerses] = useState<any[]>([]);

  const handleBookSelect = async (book: typeof bibleBooks.oldTestament[0]) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    const chapterVerses = await fetchBibleVerse(book.id, 1);
    setVerses(chapterVerses);
  };

  const handleChapterSelect = async (chapter: number) => {
    if (!selectedBook) return;
    setSelectedChapter(chapter);
    const chapterVerses = await fetchBibleVerse(selectedBook.id, chapter);
    setVerses(chapterVerses);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = sampleVerses.filter(
      (verse) =>
        verse.text.toLowerCase().includes(query.toLowerCase()) ||
        verse.reference.toLowerCase().includes(query.toLowerCase()) ||
        verse.book.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  // Main view - Testament selection
  if (!selectedTestament) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Library
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <div>
              <h1 className="text-2xl font-bold font-playfair">Holy Bible</h1>
              <p className="text-sm text-purple-100">Good News Bible (Today's English Version) - Catholic</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search verses (e.g., 'love', 'peace', 'John 3:16')..."
                className="flex-1 bg-transparent outline-none text-gray-700"
              />
            </div>

            {/* Search Results */}
            {searchQuery.length >= 2 && searchResults.length > 0 && (
              <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <p className="text-sm text-gray-700 italic font-crimson">"{result.text}"</p>
                    <p className="text-xs text-purple-600 mt-2 font-medium">{result.reference}</p>
                  </div>
                ))}
              </div>
            )}

            {searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="mt-4 text-center text-gray-500 text-sm">
                No verses found. Try different keywords.
              </div>
            )}
          </div>

          {/* Testament Selection */}
          <h3 className="font-semibold text-gray-800 mb-4 font-geist">Choose Testament</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setSelectedTestament('old')}
              className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
            >
              <div className="text-4xl mb-3">📜</div>
              <h3 className="font-bold text-gray-800 font-playfair">Old Testament</h3>
              <p className="text-xs text-gray-500 mt-1">46 Books (Catholic)</p>
            </button>

            <button
              onClick={() => setSelectedTestament('new')}
              className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
            >
              <div className="text-4xl mb-3">✝️</div>
              <h3 className="font-bold text-gray-800 font-playfair">New Testament</h3>
              <p className="text-xs text-gray-500 mt-1">27 Books</p>
            </button>
          </div>

          {/* Quick Access */}
          <h3 className="font-semibold text-gray-800 mb-3 font-geist">Popular Books</h3>
          <div className="grid grid-cols-4 gap-2">
            {['Genesis', 'Psalms', 'Proverbs', 'Matthew', 'John', 'Romans', 'Revelation'].map((bookName) => (
              <button
                key={bookName}
                onClick={() => {
                  const allBooks = [...bibleBooks.oldTestament, ...bibleBooks.newTestament];
                  const book = allBooks.find(b => b.name === bookName);
                  if (book) {
                    setSelectedTestament(bookName === 'Psalms' ? 'old' : 'new');
                    setSelectedBook(book);
                    setSelectedChapter(1);
                    fetchBibleVerse(book.id, 1).then(setVerses);
                  }
                }}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-center"
              >
                <span className="text-sm font-medium text-gray-700">{bookName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Book list view
  if (selectedTestament && !selectedBook) {
    const books = selectedTestament === 'old' ? bibleBooks.oldTestament : bibleBooks.newTestament;

    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
          <button
            onClick={() => setSelectedTestament(null)}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Bible
          </button>
          <h1 className="text-xl font-bold font-playfair">
            {selectedTestament === 'old' ? 'Old Testament' : 'New Testament'}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-20">
          <div className="grid grid-cols-2 gap-3">
            {books.map((book) => (
              <button
                key={book.id}
                onClick={() => handleBookSelect(book)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
              >
                <h3 className="font-semibold text-gray-800 font-geist">{book.name}</h3>
                <p className="text-xs text-gray-500">{book.chapters} chapters</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Chapter/Verse view
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6">
        <button
          onClick={() => {
            setSelectedBook(null);
            setSelectedChapter(null);
          }}
          className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </button>
        <h1 className="text-xl font-bold font-playfair">{selectedBook?.name}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {/* Chapter Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 font-geist">Select Chapter</h3>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {selectedBook && Array.from({ length: selectedBook.chapters }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handleChapterSelect(i + 1)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedChapter === i + 1
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Verses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700 font-geist">
              Chapter {selectedChapter}
            </h3>
            <span className="text-xs text-purple-600 font-medium">GNTCE</span>
          </div>
          <div className="space-y-4">
            {verses.map((verse: any) => (
              <div key={verse.verse} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                  {verse.verse}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed flex-1 font-crimson">{verse.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
