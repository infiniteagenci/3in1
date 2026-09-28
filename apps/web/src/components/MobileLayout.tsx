import { useEffect, useState } from 'react';
import ChatInterface from './ChatInterface';
import ProfileTab from './ProfileTab';

// Single-view layout: chat fills the app; Profile opens from the top
// header (profile button) instead of a bottom tab bar.
export default function MobileLayout() {
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const toggle = () => setShowProfile((v) => !v);
    window.addEventListener('toggle-profile', toggle);
    return () => window.removeEventListener('toggle-profile', toggle);
  }, []);

  return (
    <div className="flex flex-col h-[100dvh] relative">
      {/* Main Content Area (sits on the dawn aurora background from the page) */}
      <div className="flex-1 min-h-0 relative z-10">
        {showProfile ? (
          <ProfileTab onClose={() => setShowProfile(false)} />
        ) : (
          <ChatInterface />
        )}
      </div>
    </div>
  );
}