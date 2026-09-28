import { useState } from 'react';
import BottomTabBar from './BottomTabBar';
import ChatInterface from './ChatInterface';
import ProfileTab from './ProfileTab';

interface MobileLayoutProps {
  onSendMessage?: (messages: any[]) => void;
}

export default function MobileLayout({ onSendMessage }: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState('chat');

  const renderTab = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface key={`chat-${activeTab}`} />;
      case 'profile':
        return <ProfileTab key={activeTab} />;
      default:
        return <ChatInterface key={`chat-${activeTab}`} />;
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] relative">
      {/* Main Content Area (sits on the dawn aurora background from the page) */}
      <div className="flex-1 min-h-0 relative z-10">
        {renderTab()}
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}