import { useState } from 'react';

interface TabItem {
  id: string;
  icon: string;
  label: string;
  activeIcon?: string;
}

const tabs: TabItem[] = [
  { id: 'chat', icon: '💬', label: 'Chat' },
  { id: 'library', icon: '✝️', label: 'Sacred Library' },
  { id: 'calendar', icon: '📅', label: 'Calendar' },
  { id: 'prayers', icon: '🙏', label: 'Prayers' },
  { id: 'profile', icon: '👤', label: 'Profile' },
];

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 safe-area-bottom z-50 shadow-lg">
      <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative ${
                isActive ? 'text-amber-600' : 'text-gray-400 hover:text-gray-500'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active indicator */}
              {isActive && (
                <span className="absolute -top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-b-full"></span>
              )}

              {/* Icon with animated background */}
              <div className={`relative mb-1 transition-all duration-300 ${
                isActive ? 'scale-110' : 'scale-100'
              }`}>
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl blur-md"></span>
                )}
                <span
                  className={`relative text-2xl transition-transform duration-300 ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                >
                  {tab.icon}
                </span>
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? 'font-semibold text-amber-700' : 'font-normal text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
