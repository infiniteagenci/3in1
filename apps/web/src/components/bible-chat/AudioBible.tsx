import { useState, useRef, useEffect } from 'react';

interface BibleVerse {
  id: string;
  reference: string;
  text: string;
  version: string;
}

interface AudioBibleProps {
  verses?: BibleVerse[];
  className?: string;
  initialVerse?: BibleVerse;
}

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PauseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const StopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12"></rect>
  </svg>
);

const VolumeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const VolumeMuteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

export default function AudioBible({ verses = [], className = '', initialVerse }: AudioBibleProps) {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [progress, setProgress] = useState(0);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);

  const currentVerse = verses[currentVerseIndex] || initialVerse;

  useEffect(() => {
    // Check if speech synthesis is supported
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      // Load voices
      synth.getVoices();
    }
  }, []);

  useEffect(() => {
    if (isPlaying && currentVerse && !isPaused) {
      speak(currentVerse.text);
    } else if (!isPlaying || isPaused) {
      stopSpeaking();
    }
  }, [isPlaying, isPaused, currentVerseIndex]);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    stopSpeaking();

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Get available voices
    const voices = synth.getVoices();
    // Try to find a good English voice
    const englishVoice = voices.find(voice =>
      voice.lang.startsWith('en') && voice.name.includes('Google')
    ) || voices.find(voice =>
      voice.lang.startsWith('en')
    );

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = isMuted ? 0 : volume;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      if (isPlaying && currentVerseIndex < verses.length - 1) {
        // Auto-play next verse
        setCurrentVerseIndex(currentVerseIndex + 1);
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
    };

    // Simulate progress (since we can't get actual progress from speech synthesis)
    let duration = text.length * 50; // Rough estimate: 50ms per character
    let elapsed = 0;
    const progressInterval = setInterval(() => {
      if (isPlaying && !isPaused) {
        elapsed += 100;
        setProgress(Math.min((elapsed / duration) * 100, 100));
      } else {
        clearInterval(progressInterval);
      }
    }, 100);

    utterance.onend = () => {
      clearInterval(progressInterval);
      setProgress(0);
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

  const handlePlay = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    stopSpeaking();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    stopSpeaking();
    setCurrentVerseIndex(0);
  };

  const handleNext = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(currentVerseIndex - 1);
      setProgress(0);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    // Restart speaking if currently playing
    if (isPlaying && currentVerse) {
      stopSpeaking();
      setTimeout(() => {
        speak(currentVerse.text);
      }, 100);
    }
  };

  const formatTime = () => {
    if (!currentVerse) return '0:00';
    const duration = Math.ceil(currentVerse.text.length / 15); // Rough estimate
    const current = Math.ceil((progress / 100) * duration);
    const currentMin = Math.floor(current / 60);
    const currentSec = Math.floor(current % 60);
    const totalMin = Math.floor(duration / 60);
    const totalSec = Math.floor(duration % 60);
    return `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${totalMin}:${totalSec.toString().padStart(2, '0')}`;
  };

  if (!currentVerse) {
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">🔊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Audio Bible</h3>
          <p className="text-gray-600 text-sm font-geist font-light">
            Listen to God's Word with text-to-speech
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🔊</span>
          <div>
            <h2 className="text-2xl font-bold font-playfair">Audio Bible</h2>
            <p className="text-indigo-100 text-sm">Listen to God's Word</p>
          </div>
        </div>

        {/* Rate Selector */}
        <div className="mt-4">
          <label className="text-xs text-indigo-100 mb-2 block">Speed: {rate}x</label>
          <div className="flex gap-2">
            {[0.5, 0.75, 1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleRateChange(speed)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  rate === speed
                    ? 'bg-white text-indigo-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Verse Display */}
      <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="mb-4">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
            {currentVerse.version}
          </span>
        </div>
        <p className="text-lg text-gray-800 leading-relaxed font-crimson italic mb-3">
          "{currentVerse.text}"
        </p>
        <p className="text-sm font-semibold text-indigo-600 font-geist">
          {currentVerse.reference}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="mb-2 flex items-center justify-between text-xs text-gray-500 font-geist">
          <span>Verse {currentVerseIndex + 1} of {verses.length || 1}</span>
          <span>{formatTime()}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentVerseIndex === 0}
            className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </button>

          {/* Play/Pause/Stop Controls */}
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button
                onClick={handlePlay}
                className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
              >
                <PlayIcon />
              </button>
            ) : (
              <>
                {!isPaused ? (
                  <button
                    onClick={handlePause}
                    className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
                  >
                    <PauseIcon />
                  </button>
                ) : (
                  <button
                    onClick={handlePlay}
                    className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg transition-all"
                  >
                    <PlayIcon />
                  </button>
                )}
                <button
                  onClick={handleStop}
                  className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                >
                  <StopIcon />
                </button>
              </>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!verses.length || currentVerseIndex >= verses.length - 1}
            className="p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </button>
        </div>

        {/* Volume Control */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleMuteToggle}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isMuted ? <VolumeMuteIcon /> : <VolumeIcon />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
          />
          <span className="text-xs text-gray-600 font-geist w-8">
            {Math.round((isMuted ? 0 : volume) * 100)}
          </span>
        </div>
      </div>

      {/* Tips */}
      <div className="px-6 py-4 bg-indigo-50 border-t border-indigo-100">
        <p className="text-xs text-indigo-700 font-geist font-light">
          💡 Tip: For best results, use Chrome, Edge, or Safari. Adjust the speed to match your preferred listening pace.
        </p>
      </div>
    </div>
  );
}
