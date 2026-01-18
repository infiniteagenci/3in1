import { useState, useEffect } from 'react';
import { getDailyVerse, getRandomVerse, type BibleVerse } from '../../data/bible-verses';

interface VerseWallpaperProps {
  className?: string;
}

const wallpapers = [
  { id: 1, name: 'Mountain Sunrise', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#ffffff' },
  { id: 2, name: 'Ocean Waves', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', textColor: '#ffffff' },
  { id: 3, name: 'Forest Path', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', textColor: '#ffffff' },
  { id: 4, name: 'Golden Hour', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', textColor: '#ffffff' },
  { id: 5, name: 'Desert Dunes', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', textColor: '#ffffff' },
  { id: 6, name: 'Night Sky', gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)', textColor: '#ffffff' },
  { id: 7, name: 'Soft Purple', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', textColor: '#4a5568' },
  { id: 8, name: 'Rose Garden', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', textColor: '#ffffff' },
  { id: 9, name: 'Sunset Glow', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', textColor: '#ffffff' },
  { id: 10, name: 'Ocean Blue', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', textColor: '#4a5568' },
  { id: 11, name: 'Minimal Dark', gradient: 'linear-gradient(135deg, #434343 0%, #2c2c2c 100%)', textColor: '#ffffff' },
  { id: 12, name: 'Heavenly Light', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', textColor: '#4a5568' }
];

const fonts = [
  { id: 'serif', name: 'Classic Serif', fontFamily: 'Georgia, serif' },
  { id: 'sans', name: 'Modern Sans', fontFamily: 'Inter, sans-serif' },
  { id: 'script', name: 'Elegant Script', fontFamily: 'Brush Script MT, cursive' },
  { id: 'display', name: 'Bold Display', fontFamily: 'Impact, sans-serif' }
];

export default function VerseWallpaper({ className = '' }: VerseWallpaperProps) {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState(wallpapers[0]);
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [showCustomize, setShowCustomize] = useState(true);

  useEffect(() => {
    setCurrentVerse(getDailyVerse());
  }, []);

  const handleNewVerse = () => {
    setCurrentVerse(getRandomVerse());
  };

  const handleDownloadWallpaper = () => {
    if (!currentVerse) return;

    // Create canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (phone wallpaper dimensions)
    canvas.width = 1080;
    canvas.height = 1920;

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw verse text
    const fontSize = 48;
    ctx.font = `${fontSize}px Georgia, serif`;

    const maxWidth = canvas.width - 120;
    const words = currentVerse.text.split(' ');
    let lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());

    // Calculate vertical positioning
    const lineHeight = fontSize * 1.4;
    const totalHeight = lines.length * lineHeight;
    const startY = (canvas.height - totalHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + (index * lineHeight));
    });

    // Draw reference
    ctx.font = 'italic 32px Georgia, serif';
    ctx.fillText(currentVerse.reference, canvas.width / 2, startY + (lines.length * lineHeight) + 60);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `verse-wallpaper-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  if (!currentVerse) {
    return (
      <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Verse Wallpaper</h3>
          <p className="text-gray-600 text-sm font-geist font-light">
            Create beautiful wallpapers with Bible verses
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🖼️</span>
          <div>
            <h2 className="text-2xl font-bold font-playfair">Verse Wallpaper</h2>
            <p className="text-purple-100 text-sm">Beautiful wallpapers with daily verses</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Preview Section */}
        <div className="flex-1 p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-3 font-geist">Preview</h3>
          </div>

          {/* Phone mockup */}
          <div className="relative mx-auto" style={{ width: '280px', height: '500px' }}>
            {/* Phone frame */}
            <div className="absolute inset-0 bg-gray-900 rounded-[3rem] p-3">
              {/* Screen */}
              <div
                className="relative w-full h-full rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center p-6"
                style={{
                  background: selectedWallpaper.gradient,
                  color: selectedWallpaper.textColor
                }}
              >
                {/* Verse content */}
                <div className="text-center" style={{ fontFamily: selectedFont.fontFamily }}>
                  <p className="text-lg leading-relaxed mb-4 italic font-crimson">
                    "{currentVerse.text}"
                  </p>
                  <p className="text-sm font-semibold font-geist">
                    {currentVerse.reference}
                  </p>
                </div>

                {/* Date badge */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <p className="text-xs font-medium">
                      {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleNewVerse}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-geist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              New Verse
            </button>
            <button
              onClick={handleDownloadWallpaper}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-colors font-geist font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        </div>

        {/* Customization Section */}
        <div className="flex-1 p-6 border-l border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 font-geist">Customize</h3>
            <button
              onClick={() => setShowCustomize(!showCustomize)}
              className="text-sm text-purple-600 hover:text-purple-700 font-geist"
            >
              {showCustomize ? 'Hide' : 'Show'}
            </button>
          </div>

          {showCustomize && (
            <div className="space-y-6">
              {/* Backgrounds */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 font-geist">Background</h4>
                <div className="grid grid-cols-4 gap-2">
                  {wallpapers.map((wallpaper) => (
                    <button
                      key={wallpaper.id}
                      onClick={() => setSelectedWallpaper(wallpaper)}
                      className={`relative rounded-lg overflow-hidden aspect-square ${
                        selectedWallpaper.id === wallpaper.id ? 'ring-2 ring-purple-500 ring-offset-2' : ''
                      }`}
                    >
                      <div
                        className="w-full h-full"
                        style={{ background: wallpaper.gradient }}
                      />
                      {selectedWallpaper.id === wallpaper.id && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 font-geist">
                  Selected: {selectedWallpaper.name}
                </p>
              </div>

              {/* Fonts */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3 font-geist">Font Style</h4>
                <div className="space-y-2">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font)}
                      className={`w-full px-4 py-3 rounded-lg text-left border-2 transition-colors ${
                        selectedFont.id === font.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span style={{ fontFamily: font.fontFamily }}>{font.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
