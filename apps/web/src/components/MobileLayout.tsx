import { useState, useCallback, useEffect } from 'react';
import { type Message } from '@ai-sdk/react';
import BottomTabBar from './BottomTabBar';
import ChatInterface from './ChatInterface';
import SacredLibraryTab from './SacredLibraryTab';
import LiturgicalCalendarTab from './LiturgicalCalendarTab';
import PrayersTab from './PrayersTab';
import ProfileTab from './ProfileTab';

interface MobileLayoutProps {
  onSendMessage?: (messages: any[]) => void;
}

export default function MobileLayout({ onSendMessage }: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [triggerPrayerChat, setTriggerPrayerChat] = useState<{ prayerId: string } | null>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const handleLibraryItemSelect = useCallback((category: string, item: any) => {
    // Library item selected - stay on library tab, just for tracking if needed
    // No longer redirects to chat
  }, []);

  const handlePrayerSelect = useCallback((prayerId: string) => {
    // Prayer selected - stay on prayers tab, just for tracking if needed
    // No longer redirects to chat
  }, []);

  const handleCheckinComplete = useCallback((data: any) => {
    // Check-in completed - stay on prayers tab
    // No longer redirects to chat
  }, []);

  // Auto-rotate background images every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <ChatInterface
            key={`chat-${activeTab}`}
            triggerPrayer={triggerPrayerChat}
            onPrayerHandled={() => setTriggerPrayerChat(null)}
          />
        );
      case 'library':
        return <SacredLibraryTab key={activeTab} onSelectItem={handleLibraryItemSelect} />;
      case 'calendar':
        return <LiturgicalCalendarTab key={activeTab} />;
      case 'prayers':
        return <PrayersTab key={activeTab} onPrayerSelect={handlePrayerSelect} onCheckinComplete={handleCheckinComplete} />;
      case 'profile':
        return <ProfileTab key={activeTab} />;
      default:
        return <ChatInterface key={`chat-${activeTab}`} />;
    }
  };

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      {/* Full-screen background images */}
      <div className="absolute inset-0">
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background image with parallax effect */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
              style={{ backgroundImage: `url(${bg.url})` }}
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-black/50" />
            {/* Soft vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_70%,rgba(0,0,0,0.5)_100%)]" />
            {/* Soft color tint overlay */}
            <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply" />
          </div>
        ))}

        {/* Animated light rays effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] opacity-20">
            <div
              className="absolute inset-0"
              style={{
                background: 'conic-gradient(from 0deg at 50% 0%, transparent 0deg, rgba(255,255,255,0.1) 30deg, transparent 60deg, rgba(255,255,255,0.05) 120deg, transparent 150deg, rgba(255,255,255,0.1) 210deg, transparent 240deg)',
                animation: 'spin 60s linear infinite',
              }}
            />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative z-10">
        {renderTab()}
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

// High-quality aesthetic religious background images
const backgroundImages = [
  {
    url: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&q=90',
    name: 'Stained glass',
  },
  {
    url: 'https://images.unsplash.com/photo-1548625361-9872e4533e36?w=1920&q=90',
    name: 'Church architecture',
  },
  {
    url: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1920&q=90',
    name: 'Cathedral',
  },
  {
    url: 'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=1920&q=90',
    name: 'Church light',
  },
  {
    url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=90',
    name: 'Mountains',
  },
  {
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=90',
    name: 'Green hills',
  },
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=90',
    name: 'Lake',
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=90',
    name: 'Sunrise landscape',
  },
];
