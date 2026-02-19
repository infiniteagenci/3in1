// API utility functions for database-backed data storage

const API_BASE_URL = typeof window !== 'undefined'
  ? (window as any).PUBLIC_BASE_API_URL || 'https://3in1-worker.ailabs-hq.workers.dev'
  : 'https://3in1-worker.ailabs-hq.workers.dev';

async function getAuthHeaders() {
  const token = localStorage.getItem('session_token');
  if (!token) throw new Error('No session token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

// ==================== STUDY PROGRESS ====================

export async function getStudyProgressFromAPI(planId: string) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/study/progress/${planId}`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return { completed: [], inProgress: [], current: null, startedAt: null };
  } catch (error) {
    console.error('Error fetching study progress:', error);
    return { completed: [], inProgress: [], current: null, startedAt: null };
  }
}

export async function saveStudyProgressToAPI(planId: string, progress: {
  completed?: string[];
  inProgress?: string[];
  current?: string;
}) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/study/progress/${planId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(progress)
    });

    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error('Error saving study progress:', error);
    return { success: false };
  }
}

export async function getStudyNotesFromAPI(planId: string, lessonId: string) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/study/notes/${planId}/${lessonId}`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return { personal: '', questionNotes: {}, completedAt: null };
  } catch (error) {
    console.error('Error fetching study notes:', error);
    return { personal: '', questionNotes: {}, completedAt: null };
  }
}

export async function saveStudyNotesToAPI(planId: string, lessonId: string, notes: {
  personal?: string;
  questionNotes?: Record<string, string>;
  completed?: boolean;
}) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/study/notes/${planId}/${lessonId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(notes)
    });

    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error('Error saving study notes:', error);
    return { success: false };
  }
}

export async function getAllStudyDataFromAPI() {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/study/all`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return { progress: {}, notes: {} };
  } catch (error) {
    console.error('Error fetching all study data:', error);
    return { progress: {}, notes: {} };
  }
}

// ==================== FOCUS SESSIONS ====================

export async function getFocusSessionsFromAPI() {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/focus/sessions`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();
      return data.sessions || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching focus sessions:', error);
    return [];
  }
}

export async function saveFocusSessionToAPI(session: {
  startTime: string;
  endTime?: string;
  duration: number;
  completed: boolean;
  notes?: string;
  selectedMusic?: string;
}) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/focus/sessions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(session)
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, id: data.id };
    }
    return { success: false };
  } catch (error) {
    console.error('Error saving focus session:', error);
    return { success: false };
  }
}

export async function deleteFocusSessionFromAPI(sessionId: string) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/focus/sessions/${sessionId}`, {
      method: 'DELETE',
      headers
    });

    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error('Error deleting focus session:', error);
    return { success: false };
  }
}

export async function getFocusStatsFromAPI() {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/focus/stats`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return { totalSeconds: 0, weekSessions: 0, weekMinutes: 0, uniqueDays: 0 };
  } catch (error) {
    console.error('Error fetching focus stats:', error);
    return { totalSeconds: 0, weekSessions: 0, weekMinutes: 0, uniqueDays: 0 };
  }
}

// ==================== ACHIEVEMENTS ====================

export async function getAchievementsFromAPI() {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/focus/achievements`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();
      return data.achievements || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
}

export async function saveAchievementsToAPI(achievements: Array<{
  id: string;
  current: number;
  requirement: number;
  unlocked: boolean;
  unlockedAt?: string;
}>) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/focus/achievements`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ achievements })
    });

    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error('Error saving achievements:', error);
    return { success: false };
  }
}

// ==================== SPIRITUAL JOURNAL ====================

export async function getJournalEntriesFromAPI() {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/journal/entries`, {
      headers
    });

    if (response.ok) {
      const data = await response.json();
      return data.entries || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return [];
  }
}

export async function saveJournalEntryToAPI(entry: {
  id?: string;
  date: string;
  closenessToGod: number;
  mood: string;
  title: string;
  content: string;
  verses?: string[];
  prayerPoints?: string[];
  answeredPrayer?: boolean;
}) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/journal/entries`, {
      method: entry.id ? 'PATCH' : 'POST',
      headers,
      body: JSON.stringify(entry)
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, entry: data.entry };
    }
    return { success: false };
  } catch (error) {
    console.error('Error saving journal entry:', error);
    return { success: false };
  }
}

export async function deleteJournalEntryFromAPI(entryId: string) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/journal/entries/${entryId}`, {
      method: 'DELETE',
      headers
    });

    if (response.ok) {
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    return { success: false };
  }
}
