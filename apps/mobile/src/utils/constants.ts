export const API_BASE_URL = __DEV__
  ? 'http://localhost:8787'
  : 'https://your-worker-url.workers.dev';

export const GOOGLE_WEB_CLIENT_ID = __DEV__
  ? 'your-dev-client-id.apps.googleusercontent.com'
  : 'your-prod-client-id.apps.googleusercontent.com';

export const STORAGE_KEYS = {
  SESSION_TOKEN: 'session_token',
  USER_DATA: 'user_data',
  USER_AGE_GROUP: 'user_age_group',
  LAST_CHECKIN_DATE: 'last_checkin_date',
  SEEN_AGE_PROMPT: 'seen_age_prompt',
} as const;

export const AGE_OPTIONS = [
  { id: 'child', label: "I'm a kid! 🎈", icon: '👶' },
  { id: 'teen', label: 'Teen years! 🌈', icon: '🧑' },
  { id: 'young-adult', label: 'Young adult ✨', icon: '🎓' },
  { id: 'adult', label: 'Adult life 🌿', icon: '👨' },
  { id: 'midlife', label: 'Midlife journey 🌅', icon: '🌟' },
  { id: 'senior', label: 'Golden years 💫', icon: '👴' },
] as const;

export const DEFAULT_SUGGESTIONS = [
  "What's something encouraging in the Bible?",
  'How do I make prayer feel more meaningful?',
  'Teach me about the Catechism',
  'Stories of the Saints that inspire me',
  'Prayers for peace and trust',
  "Help me understand God's love for me",
] as const;

export const QUICK_PRAYERS = [
  { id: 'rosary', title: 'Rosary', icon: '📿', color: ['#a855f7', '#6366f1'] },
  { id: 'examen', title: 'Daily Examen', icon: '✨', color: ['#22c55e', '#10b981'] },
  { id: 'morning', title: 'Morning Prayer', icon: '🌅', color: ['#f59e0b', '#f97316'] },
  { id: 'evening', title: 'Evening Prayer', icon: '🌙', color: ['#3b82f6', '#6366f1'] },
  { id: 'breath', title: 'Breath Prayer', icon: '🌬️', color: ['#06b6d4', '#3b82f6'] },
  { id: 'meditation', title: 'Guided Meditation', icon: '🧘', color: ['#8b5cf6', '#a855f7'] },
  { id: 'readings', title: 'Daily Readings', icon: '📖', color: ['#ef4444', '#f97316'] },
  { id: 'saint', title: 'Saint of the Day', icon: '✝️', color: ['#f59e0b', '#eab308'] },
  { id: 'novena', title: 'My Novenas', icon: '🕯️', color: ['#ec4899', '#f43f5e'] },
  { id: 'divine-office', title: 'Divine Office', icon: '⛪', color: ['#6366f1', '#8b5cf6'] },
] as const;

export const MOOD_OPTIONS = [
  { id: 'joyful', label: 'Joyful', emoji: '😊', color: '#22c55e' },
  { id: 'grateful', label: 'Grateful', emoji: '🙏', color: '#10b981' },
  { id: 'peaceful', label: 'Peaceful', emoji: '😌', color: '#3b82f6' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: '#f59e0b' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: '#6b7280' },
  { id: 'struggling', label: 'Struggling', emoji: '😔', color: '#8b5cf6' },
  { id: 'tired', label: 'Tired', emoji: '😴', color: '#64748b' },
] as const;
