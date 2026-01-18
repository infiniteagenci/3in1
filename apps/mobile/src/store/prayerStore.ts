import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PrayerProgress, DailyCheckinData } from '../types';

interface PrayerState {
  lastCheckinDate: string | null;
  lastCheckinData: DailyCheckinData | null;
  progress: PrayerProgress | null;
  activeNovena: string | null;
  setCheckinDate: (date: string) => void;
  setCheckinData: (data: DailyCheckinData) => void;
  setProgress: (progress: PrayerProgress) => void;
  setActiveNovena: (novenaId: string | null) => void;
  clearCheckin: () => void;
}

export const usePrayerStore = create<PrayerState>((set) => ({
  lastCheckinDate: null,
  lastCheckinData: null,
  progress: null,
  activeNovena: null,

  setCheckinDate: async (date) => {
    await AsyncStorage.setItem('lastCheckinDate', date);
    set({ lastCheckinDate: date });
  },

  setCheckinData: async (data) => {
    await AsyncStorage.setItem('lastCheckinData', JSON.stringify(data));
    set({ lastCheckinData: data });
  },

  setProgress: async (progress) => {
    await AsyncStorage.setItem('prayerProgress', JSON.stringify(progress));
    set({ progress });
  },

  setActiveNovena: async (novenaId) => {
    await AsyncStorage.setItem('activeNovena', novenaId || '');
    set({ activeNovena: novenaId });
  },

  clearCheckin: async () => {
    await AsyncStorage.multiRemove(['lastCheckinDate', 'lastCheckinData']);
    set({ lastCheckinDate: null, lastCheckinData: null });
  },
}));
