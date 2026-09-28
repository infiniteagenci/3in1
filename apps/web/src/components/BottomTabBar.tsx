import { useState } from 'react';

interface TabItem {
  id: string;
  icon: string;
  label: string;
  activeIcon?: string;
  gradient?: string;
  glow?: string;
}

const tabs: TabItem[] = [
  { id: 'chat', icon: '💬', label: 'Chat', gradient: 'from-amber-400 to-orange-500', glow: 'from-amber-200 to-orange-200' },
  { id: 'profile', icon: '👤', label: 'Profile', gradient: 'from-teal-400 to-emerald-500', glow: 'from-teal-200 to-emerald-200' },
];

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-[#f4f7fc]/50 backdrop-blur-md border-t border-[#e4eef6]/50 safe-area-bottom z-50 shadow-lg">
      <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative ${
                isActive ? '' : 'text-gray-400 hover:text-gray-500'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active indicator */}
              {isActive && (
                <span className={`absolute -top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r ${tab.gradient} rounded-b-full shadow-lg`}></span>
              )}

              {/* Icon with animated background */}
              <div className={`relative mb-1 transition-all duration-300 ${
                isActive ? 'scale-110' : 'scale-100'
              }`}>
                {isActive && (
                  <span className={`absolute inset-0 bg-gradient-to-br ${tab.glow} rounded-2xl blur-md animate-pulse-slow`}></span>
                )}
                <span
                  className={`relative text-2xl transition-transform duration-300 ${
                    isActive ? 'scale-110 drop-shadow-sm' : 'scale-100'
                  }`}
                >
                  {tab.icon}
                </span>
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  isActive ? 'font-semibold bg-gradient-to-r bg-clip-text text-transparent' : 'font-normal text-gray-500'
                }`}
                style={isActive ? { backgroundImage: `linear-gradient(to right, var(--color-primary), var(--color-secondary-orange))` } : {}}
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
