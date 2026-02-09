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

  // Nature-themed background images
  const natureImages = [
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80', // Mountains
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80', // Green hills
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80', // Lake
    'https://images.unsplash.com/photo-1518173946687-a4c036bc1c9a?w=800&q=80', // Forest
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80', // Nature sky
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden">
      {/* Nature background images with overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background image layers */}
        <div className="absolute inset-0 opacity-20">
          <img
            src={natureImages[0]}
            alt="Mountains"
            className="absolute top-0 left-0 w-full h-1/3 object-cover"
          />
          <img
            src={natureImages[1]}
            alt="Hills"
            className="absolute top-1/4 right-0 w-1/2 h-1/3 object-cover rounded-full opacity-60"
          />
          <img
            src={natureImages[2]}
            alt="Lake"
            className="absolute bottom-0 left-0 w-1/2 h-1/3 object-cover"
          />
          <img
            src={natureImages[3]}
            alt="Forest"
            className="absolute bottom-1/4 right-0 w-2/3 h-1/3 object-cover rounded-full opacity-50"
          />
        </div>

        {/* Animated gradient overlays */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-56 h-56 bg-amber-300/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-rose-300/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

        {/* Floating nature elements */}
        <div className="absolute top-32 right-1/4 text-4xl opacity-40 animate-float" style={{ animationDuration: '8s' }}>🌿</div>
        <div className="absolute top-1/3 left-1/4 text-3xl opacity-30 animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }}>🍃</div>
        <div className="absolute bottom-1/3 right-1/3 text-3xl opacity-35 animate-float" style={{ animationDuration: '9s', animationDelay: '3s' }}>🌸</div>
        <div className="absolute bottom-1/4 left-1/5 text-4xl opacity-40 animate-float" style={{ animationDuration: '11s', animationDelay: '1s' }}>🌺</div>
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
