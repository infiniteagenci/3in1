import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * Simple ID generator
 */
function createId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Mood encouragements for different states
 */
function getMoodEncouragement(mood: string): string {
  const encouragements: Record<string, string> = {
    joyful: 'Your joy is a gift from God! "Rejoice in the Lord always. I will say it again: Rejoice!" - Philippians 4:4. Your joyful spirit is a witness to God\'s love.',
    grateful: 'Gratitude opens our hearts to God\'s presence. "Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus." - 1 Thessalonians 5:18. What a beautiful way to begin prayer!',
    peaceful: 'Peace is Christ\'s gift to you. "Peace I leave with you; my peace I give you." - John 14:27. Rest in this peace and let it carry you through your day.',
    anxious: "It's okay to feel anxious. God is with you in this moment. \"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.\" - Philippians 4:6. You're not alone.",
    sad: "God holds your tears. \"The Lord is close to the brokenhearted and saves those who are crushed in spirit.\" - Psalm 34:18. Your sadness is safe in God's loving hands.",
    struggling: "You're not alone in this struggle. \"Come to me, all you who are weary and burdened, and I will give you rest.\" - Matthew 11:28. God's strength is made perfect in weakness.",
    tired: "Rest in God's love. \"My soul finds rest in God alone; my salvation comes from him.\" - Psalm 62:1. Even in exhaustion, God holds you with tender care.",
  };
  return encouragements[mood] || 'God is with you in every moment.';
}

/**
 * Daily Check-in Tool
 * Records user's daily check-in with mood, energy level, and prayer intentions
 */
export const dailyCheckinTool = createTool({
  id: 'daily-checkin',
  description: 'Record user\'s daily check-in with mood, energy level, and prayer intentions. Track patterns over time and provide encouragement.',
  inputSchema: z.object({
    mood: z.enum(['joyful', 'grateful', 'peaceful', 'anxious', 'sad', 'struggling', 'tired']).describe('How the user is feeling today'),
    energyLevel: z.number().min(1).max(5).optional().describe('Energy level from 1 (very low) to 5 (very high)'),
    prayerFocus: z.string().optional().describe('What they want to pray about or focus on today'),
    gratitudeNotes: z.string().optional().describe('Things they\'re grateful for'),
  }),
  execute: async ({ mood, energyLevel, prayerFocus, gratitudeNotes }, context) => {
    const db = (context as any)?.db;
    const userId = (context as any)?.userId;

    if (!db || !userId) {
      return {
        error: 'Database or user context not available',
      };
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const checkinId = createId();

      // Insert or replace today's check-in
      await db
        .prepare(
          `INSERT INTO daily_checkins (id, user_id, checkin_date, mood, energy_level, prayer_focus, gratitude_notes)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(user_id, checkin_date) DO UPDATE SET
             mood = excluded.mood,
             energy_level = excluded.energy_level,
             prayer_focus = excluded.prayer_focus,
             gratitude_notes = excluded.gratitude_notes`
        )
        .bind(
          checkinId,
          userId,
          today,
          mood,
          energyLevel ?? null,
          prayerFocus ?? null,
          gratitudeNotes ?? null
        )
        .run();

      // Calculate check-in streak (consecutive days)
      const streakResult = await db
        .prepare(`
          WITH dates AS (
            SELECT DISTINCT checkin_date
            FROM daily_checkins
            WHERE user_id = ?
            ORDER BY checkin_date DESC
          )
          SELECT COUNT(*) as streak
          FROM dates
          WHERE checkin_date >= date(
            (SELECT checkin_date FROM dates LIMIT 1),
            '-' || CAST((SELECT COUNT(*) FROM dates) AS TEXT) || ' days'
          )
        `)
        .bind(userId)
        .first();

      const streak = (streakResult as any)?.streak || 0;

      // Get recent mood patterns (last 7 days)
      const recentMoods = await db
        .prepare(`
          SELECT checkin_date, mood, energy_level
          FROM daily_checkins
          WHERE user_id = ?
          AND checkin_date >= date('now', '-7 days')
          ORDER BY checkin_date DESC
        `)
        .bind(userId)
        .all();

      const moods = (recentMoods?.results || []).map((row: any) => ({
        date: row.checkin_date,
        mood: row.mood,
        energy: row.energy_level,
      }));

      return {
        checkinId,
        mood,
        energyLevel,
        streak,
        recentMoods: moods,
        encouragement: getMoodEncouragement(mood),
        suggestions: getPrayerSuggestions(mood, energyLevel, prayerFocus),
      };
    } catch (error) {
      console.error('Error recording daily check-in:', error);
      return {
        error: 'Failed to record daily check-in',
        message: (error as Error).message,
      };
    }
  },
});

/**
 * Get prayer suggestions based on mood and energy
 */
function getPrayerSuggestions(
  mood: string,
  energyLevel?: number,
  prayerFocus?: string
): string[] {
  const suggestions: string[] = [];

  // Mood-based suggestions
  const moodSuggestions: Record<string, string[]> = {
    joyful: [
      'Pray the Glorious Mysteries of the Rosary to celebrate God\'s goodness',
      'Offer a prayer of thanksgiving for the blessings in your life',
      'Share your joy with others through kind words and actions',
    ],
    grateful: [
      'Pray Psalm 100 or Psalm 136 as a song of thanksgiving',
      'Write down three things you\'re grateful for and thank God for each',
      'Consider sharing your gratitude with someone who blessed you today',
    ],
    peaceful: [
      'Enjoy a time of silent prayer, resting in God\'s presence',
      'Pray with Scripture, letting the words sink deeply into your heart',
      'Take a prayerful walk, noticing God\'s goodness in creation',
    ],
    anxious: [
      'Pray the Serenity Prayer or Psalm 23 for comfort',
      'Practice the Jesus Prayer: "Lord Jesus Christ, Son of God, have mercy on me"',
      'Write down your worries and place them in God\'s hands',
    ],
    sad: [
      'Pray with Psalm 34 or Psalm 42, honest cries to God',
      'Know that God holds your tears - pour out your heart to Him',
      'Consider speaking with a trusted friend or spiritual mentor',
    ],
    struggling: [
      'Pray the Serenity Prayer, asking for God\'s help',
      'Remember that God\'s grace is sufficient - you don\'t have to be strong right now',
      'Consider the Prayer of Surrender: "Jesus, I trust in You"',
    ],
    tired: [
      'Rest in God\'s presence without words - simply be still',
      'Pray a short breath prayer: "Lord Jesus Christ, have mercy on me"',
      'Ask God for the strength you need for just this moment',
    ],
  };

  suggestions.push(...(moodSuggestions[mood] || []));

  // Energy-based suggestions
  if (energyLevel !== undefined) {
    if (energyLevel >= 4) {
      suggestions.push('With your good energy, consider praying a full Rosary or engaging in active praise');
    } else if (energyLevel <= 2) {
      suggestions.push('When energy is low, short prayers are perfect - God hears every word');
    }
  }

  // Prayer focus suggestions
  if (prayerFocus) {
    suggestions.push(`Bring your focus on "${prayerFocus}" to God in honest conversation`);
    suggestions.push('Consider writing your prayer focus down and placing it where you\'ll see it today');
  }

  return suggestions.slice(0, 4); // Return max 4 suggestions
}
