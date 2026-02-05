import { useState, useEffect } from 'react';

interface PrayerTime {
  id: string;
  label: string;
  emoji: string;
  time: string;
  enabled: boolean;
}

interface PrayerRemindersProps {
  onClose: () => void;
}

const defaultPrayerTimes: PrayerTime[] = [
  { id: 'morning', label: 'Morning Prayer', emoji: '🌅', time: '07:00', enabled: false },
  { id: 'angelus', label: 'Angelus', emoji: '⛪', time: '12:00', enabled: false },
  { id: 'afternoon', label: 'Afternoon Prayer', emoji: '☀️', time: '15:00', enabled: false },
  { id: 'evening', label: 'Evening Prayer', emoji: '🌙', time: '19:00', enabled: false },
  { id: 'night', label: 'Night Prayer', emoji: '🌃', time: '21:00', enabled: false },
];

const prayerIntents = [
  { id: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { id: 'guidance', label: 'Guidance', emoji: '🧭' },
  { id: 'protection', label: 'Protection', emoji: '🛡️' },
  { id: 'peace', label: 'Peace', emoji: '☮️' },
  { id: 'healing', label: 'Healing', emoji: '💚' },
];

export default function PrayerReminders({ onClose }: PrayerRemindersProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(defaultPrayerTimes);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
  const [notificationTestResult, setNotificationTestResult] = useState<string>('');

  useEffect(() => {
    // Load saved settings
    const savedTimes = localStorage.getItem('prayer_times');
    const savedIntents = localStorage.getItem('prayer_intents');
    if (savedTimes) setPrayerTimes(JSON.parse(savedTimes));
    if (savedIntents) setSelectedIntents(JSON.parse(savedIntents));

    // Check notification permission on mount
    checkNotificationPermission();

    // Set up notification checks
    const checkNotifications = setInterval(() => {
      checkAndSendNotifications();
    }, 60000); // Check every minute

    return () => clearInterval(checkNotifications);
  }, []);

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    } else {
      setNotificationPermission('denied');
    }
  };

  const requestNotificationPermission = async () => {
    setNotificationTestResult('');
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        if (permission === 'granted') {
          setNotificationTestResult('✓ Permission granted!');
          // Show a test notification
          setTimeout(() => {
            new Notification('🙏 Prayer Reminders Enabled', {
              body: 'You will receive notifications for your scheduled prayer times. Keep this app open for reminders.',
              icon: '/icon-192x192.svg',
              requireInteraction: false,
            });
          }, 500);
        } else if (permission === 'denied') {
          setNotificationTestResult('✗ Permission denied. Please enable notifications in your browser settings.');
        } else {
          setNotificationTestResult('Permission request dismissed. Please try again.');
        }
      } catch (error) {
        setNotificationTestResult('✗ Error requesting notification permission.');
        console.error('Notification permission error:', error);
      }
    } else {
      setNotificationTestResult('✗ Notifications are not supported in this browser.');
    }
  };

  const checkAndSendNotifications = () => {
    // Only check if permission is granted
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const currentSeconds = now.getSeconds();

    // Only check at the start of each minute (0-5 seconds) to avoid duplicate notifications
    if (currentSeconds > 5) {
      return;
    }

    prayerTimes.forEach((prayer) => {
      if (prayer.enabled && prayer.time === currentTime) {
        const notificationKey = `last_notification_${prayer.id}`;
        const lastPrayerNotification = localStorage.getItem(notificationKey);
        const today = now.toDateString();

        // Only send if we haven't sent one today for this prayer time
        if (lastPrayerNotification !== today) {
          sendPrayerNotification(prayer);
          localStorage.setItem(notificationKey, today);
        }
      }
    });
  };

  const sendPrayerNotification = (prayer: PrayerTime) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const intent = selectedIntents.length > 0
        ? `Focus: ${selectedIntents.map(i => prayerIntents.find(p => p.id === i)?.label).join(', ')}`
        : 'Take a moment to pray and connect with God.';

      new Notification(`${prayer.emoji} ${prayer.label}`, {
        body: intent,
        icon: '/icon-192x192.svg',
        tag: prayer.id,
        requireInteraction: false,
      });
    }
  };

  const togglePrayerTime = (id: string) => {
    const updated = prayerTimes.map(p =>
      p.id === id ? { ...p, enabled: !p.enabled } : p
    );
    setPrayerTimes(updated);
    localStorage.setItem('prayer_times', JSON.stringify(updated));
  };

  const updateTime = (id: string, time: string) => {
    const updated = prayerTimes.map(p =>
      p.id === id ? { ...p, time } : p
    );
    setPrayerTimes(updated);
    localStorage.setItem('prayer_times', JSON.stringify(updated));
  };

  const toggleIntent = (intentId: string) => {
    const updated = selectedIntents.includes(intentId)
      ? selectedIntents.filter(i => i !== intentId)
      : [...selectedIntents, intentId];
    setSelectedIntents(updated);
    localStorage.setItem('prayer_intents', JSON.stringify(updated));
  };

  const testNotification = () => {
    setNotificationTestResult('');
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        try {
          const notification = new Notification('🔔 Test Notification', {
            body: 'Your prayer reminders are working! You will receive reminders at your scheduled times.',
            icon: '/icon-192x192.svg',
            requireInteraction: false,
            tag: 'test-notification',
          });
          setNotificationTestResult('✓ Test notification sent successfully!');
          setTimeout(() => setNotificationTestResult(''), 3000);
        } catch (error) {
          setNotificationTestResult('✗ Error sending test notification.');
          console.error('Test notification error:', error);
        }
      } else {
        setNotificationTestResult('✗ Please enable notifications first.');
        setTimeout(() => setNotificationTestResult(''), 3000);
      }
    } else {
      setNotificationTestResult('✗ Notifications are not supported in this browser.');
      setTimeout(() => setNotificationTestResult(''), 3000);
    }
  };

  const enabledCount = prayerTimes.filter(p => p.enabled).length;

  return (
    <div className="bg-[var(--color-stone-50)] min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold font-playfair">Prayer Reminders</h1>
            <p className="text-sm text-white/90">Set times for daily prayer</p>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-white/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔔</span>
              <div>
                <p className="text-sm font-medium">{enabledCount} Active Reminders</p>
                <p className="text-xs text-white/80">
                  {notificationPermission === 'granted' ? 'Notifications enabled' : 'Enable notifications'}
                </p>
              </div>
            </div>
            <button
              onClick={testNotification}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              Test
            </button>
          </div>
          {notificationTestResult && (
            <p className={`text-xs mt-2 ${notificationTestResult.startsWith('✓') ? 'text-green-200' : 'text-red-200'}`}>
              {notificationTestResult}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Notification Permission */}
        {notificationPermission !== 'granted' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900 mb-1">Enable Notifications</h3>
                <p className="text-sm text-yellow-700 mb-2">
                  Allow notifications to receive prayer reminders at your scheduled times.
                </p>
                <p className="text-xs text-yellow-600 mb-3">
                  Note: Keep this app open in your browser to receive reminders.
                </p>
                <button
                  onClick={requestNotificationPermission}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                >
                  Enable Notifications
                </button>
                {notificationTestResult && (
                  <p className={`text-xs mt-2 ${notificationTestResult.startsWith('✓') ? 'text-green-700' : 'text-red-700'}`}>
                    {notificationTestResult}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Prayer Times */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Daily Prayer Times</h2>
            <p className="text-xs text-gray-500 mt-1">Toggle to enable, tap time to adjust</p>
          </div>

          <div className="divide-y divide-gray-100">
            {prayerTimes.map((prayer) => (
              <div
                key={prayer.id}
                className={`flex items-center justify-between px-4 py-3 ${
                  prayer.enabled ? 'bg-purple-50' : ''
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{prayer.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{prayer.label}</p>
                    <input
                      type="time"
                      value={prayer.time}
                      onChange={(e) => updateTime(prayer.id, e.target.value)}
                      className="text-sm text-gray-600 bg-transparent border-none p-0 focus:ring-0"
                    />
                  </div>
                </div>

                <button
                  onClick={() => togglePrayerTime(prayer.id)}
                  className={`relative inline-flex h-12 w-20 items-center rounded-full transition-colors ${
                    prayer.enabled ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-10 w-10 transform rounded-full bg-white shadow transition-transform ${
                      prayer.enabled ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Prayer Intentions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Prayer Intentions</h2>
            <p className="text-xs text-gray-500 mt-1">Select focus areas for your prayers</p>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-2">
              {prayerIntents.map((intent) => (
                <button
                  key={intent.id}
                  onClick={() => toggleIntent(intent.id)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedIntents.includes(intent.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{intent.emoji}</span>
                  <p className="text-sm font-medium mt-1">{intent.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 text-sm mb-1">How it works</h3>
              <p className="text-xs text-blue-700">
                Keep this app open in your browser tab to receive prayer reminder notifications at your scheduled times.
                You can set up to 5 daily prayer times with custom intentions.
              </p>
            </div>
          </div>
        </div>

        {/* Permission Info */}
        {notificationPermission === 'granted' && (
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-start gap-3">
              <span className="text-xl">✅</span>
              <div>
                <h3 className="font-semibold text-green-900 text-sm mb-1">Notifications Enabled</h3>
                <p className="text-xs text-green-700">
                  Prayer reminders will appear at your scheduled times. Make sure to keep this tab open and don't put your browser to sleep.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
