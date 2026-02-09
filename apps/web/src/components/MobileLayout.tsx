import { useState, useCallback } from 'react';
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

  // Aesthetic religious/Catholic-themed background images
  const religiousImages = [
    'https://images.unsplash.com/photo-1548407260-da850faa41e3?w=800&q=80', // Cross silhouette
    'https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=800&q=80', // Church interior
    'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80', // Stained glass
    'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80', // Cathedral
    'https://images.unsplash.com/photo-1548625361-9872e4533e36?w=800&q=80', // Church architecture
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Religious aesthetic background with overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background image layers */}
        <div className="absolute inset-0 opacity-15">
          <img
            src={religiousImages[0]}
            alt="Cross"
            className="absolute top-0 left-0 w-full h-1/3 object-cover"
          />
          <img
            src={religiousImages[1]}
            alt="Church"
            className="absolute top-1/4 right-0 w-1/2 h-1/3 object-cover rounded-full opacity-50"
          />
          <img
            src={religiousImages[2]}
            alt="Stained Glass"
            className="absolute bottom-0 left-0 w-1/2 h-1/3 object-cover"
          />
          <img
            src={religiousImages[3]}
            alt="Cathedral"
            className="absolute bottom-1/4 right-0 w-2/3 h-1/3 object-cover rounded-full opacity-40"
          />
        </div>

        {/* Animated gradient overlays - spiritual theme */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-56 h-56 bg-blue-300/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-rose-300/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

        {/* Floating religious elements */}
        <div className="absolute top-32 right-1/4 text-4xl opacity-40 animate-float" style={{ animationDuration: '8s' }}>✝️</div>
        <div className="absolute top-1/3 left-1/4 text-3xl opacity-30 animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }}>🕯️</div>
        <div className="absolute bottom-1/3 right-1/3 text-3xl opacity-35 animate-float" style={{ animationDuration: '9s', animationDelay: '3s' }}>📿</div>
        <div className="absolute bottom-1/4 left-1/5 text-4xl opacity-40 animate-float" style={{ animationDuration: '11s', animationDelay: '1s' }}>⛪</div>
        <div className="absolute top-1/2 right-1/5 text-3xl opacity-30 animate-float" style={{ animationDuration: '12s', animationDelay: '4s' }}>✨</div>
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
