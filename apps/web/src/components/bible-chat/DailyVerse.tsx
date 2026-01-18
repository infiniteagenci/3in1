import { useState, useEffect, useRef } from 'react';
import { getDailyVerse, getVersesByTheme, getRandomVerse, type BibleVerse } from '../../data/bible-verses';

interface DailyVerseProps {
  className?: string;
}

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const BookmarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default function DailyVerse({ className = '' }: DailyVerseProps) {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(null);
  const [savedVerses, setSavedVerses] = useState<string[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [likedVerses, setLikedVerses] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Load saved verses from localStorage
    const saved = localStorage.getItem('saved_verses');
    if (saved) {
      setSavedVerses(JSON.parse(saved));
    }

    // Load liked verses from localStorage
    const liked = localStorage.getItem('liked_verses');
    if (liked) {
      setLikedVerses(JSON.parse(liked));
    }

    // Set daily verse
    const dailyVerse = getDailyVerse();
    setCurrentVerse(dailyVerse);
  }, []);

  // Text-to-speech functionality
  const speakVerse = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    // Stop any ongoing speech
    stopSpeaking();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Get available voices
    const voices = synth.getVoices();
    const englishVoice = voices.find(voice =>
      voice.lang.startsWith('en') && voice.name.includes('Google')
    ) || voices.find(voice =>
      voice.lang.startsWith('en')
    );

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = 0.9; // Slightly slower for Bible verses
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };

    speechRef.current = utterance;
    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synth.cancel();
    }
  };

  const handlePlayPause = () => {
    if (!currentVerse) return;

    if (isPlaying && !isPaused) {
      // Pause
      stopSpeaking();
      setIsPaused(true);
    } else {
      // Play
      speakVerse(currentVerse.text);
    }
  };

  const handleShare = async (method: 'twitter' | 'facebook' | 'whatsapp' | 'copy') => {
    if (!currentVerse) return;

    const shareText = `"${currentVerse.text}" - ${currentVerse.reference}`;
    const shareUrl = window.location.href;

    switch (method) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(shareText);
          alert('Verse copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy:', err);
        }
        break;
    }
    setShowShareMenu(false);
  };

  const handleBookmark = () => {
    if (!currentVerse) return;

    const newSavedVerses = savedVerses.includes(currentVerse.id)
      ? savedVerses.filter(id => id !== currentVerse.id)
      : [...savedVerses, currentVerse.id];

    setSavedVerses(newSavedVerses);
    localStorage.setItem('saved_verses', JSON.stringify(newSavedVerses));
  };

  const handleLike = () => {
    if (!currentVerse) return;

    const newLikedVerses = likedVerses.includes(currentVerse.id)
      ? likedVerses.filter(id => id !== currentVerse.id)
      : [...likedVerses, currentVerse.id];

    setLikedVerses(newLikedVerses);
    localStorage.setItem('liked_verses', JSON.stringify(newLikedVerses));
  };

  const handleNewVerse = () => {
    const newVerse = getRandomVerse();
    setCurrentVerse(newVerse);
  };

  if (!currentVerse) return null;

  const isSaved = savedVerses.includes(currentVerse.id);
  const isLiked = likedVerses.includes(currentVerse.id);

  return (
    <div className={`relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-6 border border-indigo-100 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-playfair">Daily Verse</h3>
            <p className="text-xs text-gray-500 font-geist">{currentVerse.version}</p>
          </div>
        </div>
        <button
          onClick={handleNewVerse}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors"
        >
          <RefreshIcon />
          New Verse
        </button>
      </div>

      {/* Verse Content */}
      <div className="mb-4">
        <p className="text-lg text-gray-800 leading-relaxed font-crimson italic mb-3">
          "{currentVerse.text}"
        </p>
        <p className="text-sm font-semibold text-indigo-600 font-geist">
          {currentVerse.reference}
        </p>
        {currentVerse.theme && (
          <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            {currentVerse.theme.charAt(0).toUpperCase() + currentVerse.theme.slice(1)}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-indigo-100">
        <div className="flex items-center gap-2">
          {/* Audio Play Button */}
          <button
            onClick={handlePlayPause}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
              isPlaying && !isPaused
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {isPlaying && !isPaused ? <PauseIcon /> : <PlayIcon />}
            <span className="text-xs font-medium">{isPlaying && !isPaused ? 'Playing' : 'Listen'}</span>
          </button>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
              isLiked
                ? 'text-red-500 bg-red-50'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HeartIcon />
            <span className="text-xs font-medium">{isLiked ? 'Liked' : 'Like'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
              isSaved
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookmarkIcon />
            <span className="text-xs font-medium">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        {/* Share Button */}
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-1.5 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShareIcon />
            <span className="text-xs font-medium">Share</span>
          </button>

          {/* Share Dropdown Menu */}
          {showShareMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowShareMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <span>📋</span> Copy to clipboard
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <span>🐦</span> Share on Twitter
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <span>👤</span> Share on Facebook
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <span>💬</span> Share on WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
