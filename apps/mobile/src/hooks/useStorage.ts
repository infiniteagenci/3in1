import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

export function useStorage() {
  const get = useCallback(
    async (key: string): Promise<string | null> => {
      try {
        return await AsyncStorage.getItem(key);
      } catch (error) {
        console.error('Storage get error:', error);
        return null;
      }
    },
    []
  );

  const set = useCallback(async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }, []);

  const remove = useCallback(async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  }, []);

  const getAgeGroup = useCallback(async () => {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_AGE_GROUP);
  }, []);

  const setAgeGroup = useCallback(async (ageGroup: string) => {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_AGE_GROUP, ageGroup);
  }, []);

  const getLastCheckinDate = useCallback(async () => {
    return await AsyncStorage.getItem(STORAGE_KEYS.LAST_CHECKIN_DATE);
  }, []);

  const setLastCheckinDate = useCallback(async (date: string) => {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_CHECKIN_DATE, date);
  }, []);

  const getSeenAgePrompt = useCallback(async () => {
    return await AsyncStorage.getItem(STORAGE_KEYS.SEEN_AGE_PROMPT);
  }, []);

  const setSeenAgePrompt = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.SEEN_AGE_PROMPT, 'true');
  }, []);

  return {
    get,
    set,
    remove,
    getAgeGroup,
    setAgeGroup,
    getLastCheckinDate,
    setLastCheckinDate,
    getSeenAgePrompt,
    setSeenAgePrompt,
  };
}
