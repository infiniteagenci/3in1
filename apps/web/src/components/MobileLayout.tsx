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

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-56 h-56 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-rose-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
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
