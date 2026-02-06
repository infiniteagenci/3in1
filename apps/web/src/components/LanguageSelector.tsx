import { useState, useEffect } from 'react';

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر' },
  { code: 'la', name: 'Latin', nativeName: 'Latina' },
];

interface LanguageSelectorProps {
  className?: string;
  onLanguageChange?: (languageCode: string) => void;
  showLabel?: boolean;
  compact?: boolean;
}

export default function LanguageSelector({
  className = '',
  onLanguageChange,
  showLabel = true,
  compact = false
}: LanguageSelectorProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('app_language') || 'en';
    }
    return 'en';
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Apply language preference
    const applyLanguage = (langCode: string) => {
      // Set lang attribute on html
      document.documentElement.lang = langCode;

      // Store in localStorage
      localStorage.setItem('app_language', langCode);
    };

    applyLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLanguage(langCode);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  const selectedLanguage = languages.find(l => l.code === currentLanguage) || languages[0];

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-white/90 hover:bg-white rounded-lg shadow-sm border border-gray-200 transition-all"
        >
          <span className="text-xl">🌐</span>
          <span className="text-sm font-medium text-gray-700">{selectedLanguage.nativeName}</span>
          <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
            <div className="p-2 space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{lang.nativeName}</span>
                  <span className="text-xs text-gray-500 ml-2">({lang.name})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🌐 Language
        </label>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-purple-300 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌐</span>
          <div className="text-left">
            <span className="text-sm font-medium text-gray-900">{selectedLanguage.nativeName}</span>
            <p className="text-xs text-gray-500">{selectedLanguage.name}</p>
          </div>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
          <div className="p-2 space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentLanguage === lang.code
                    ? 'bg-purple-50 text-purple-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-sm">{lang.nativeName}</span>
                <span className="text-xs text-gray-500 ml-2">({lang.name})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}

// Hook to use language throughout the app
export function useLanguage() {
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('app_language') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('app_language');
      if (stored) {
        setLanguage(stored);
        document.documentElement.lang = stored;
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return language;
}
