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
    // Switch to chat and trigger conversation about the selected item
    setTriggerPrayerChat({ prayerId: `library:${category}:${item.title}` });
    setActiveTab('chat');
  }, []);

  const handlePrayerSelect = useCallback((prayerId: string) => {
    // Switch to chat and trigger prayer conversation
    setTriggerPrayerChat({ prayerId });
    setActiveTab('chat');
  }, []);

  const handleCheckinComplete = useCallback((data: any) => {
    // Switch to chat and continue conversation
    setTriggerPrayerChat({ prayerId: `checkin:${JSON.stringify(data)}` });
    setActiveTab('chat');
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50/50 to-orange-50/50">
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderTab()}
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
