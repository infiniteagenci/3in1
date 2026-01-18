import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * Get Prayer Progress Tool
 * Retrieves user's prayer progress including streaks, consistency stats, and completed routines
 */
export const getProgressTool = createTool({
  id: 'get-prayer-progress',
  description: 'Get user\'s prayer progress including streaks, consistency stats, and completed routines. Track spiritual growth over time.',
  inputSchema: z.object({
    timeframe: z.enum(['week', 'month', 'year', 'all-time']).optional().describe('Timeframe for progress stats'),
  }),
  execute: async ({ timeframe = 'week' }, context) => {
    const db = (context as any)?.db;
    const userId = (context as any)?.userId;

    if (!db || !userId) {
      return {
        error: 'Database or user context not available',
      };
    }

    try {
      // Calculate date range
      const daysBack =
        timeframe === 'week'
          ? 7
          : timeframe === 'month'
          ? 30
          : timeframe === 'year'
          ? 365
          : 0;

      // Get completed prayers in timeframe
      let completedQuery = `
        SELECT
          DATE(completed_at) as date,
          routine_type,
          duration_minutes,
          COUNT(*) as count
        FROM prayer_progress
        WHERE user_id = ?
        AND completed = 1
      `;

      const params: any[] = [userId];

      if (daysBack > 0) {
        completedQuery += ` AND completed_at >= datetime('now', '-${daysBack} days')`;
      }

      completedQuery += ` GROUP BY DATE(completed_at), routine_type ORDER BY date DESC`;

      const completedResult = await db.prepare(completedQuery).bind(...params).all();
      const completed = completedResult?.results || [];

      // Get current check-in streak
      const streakResult = await db
        .prepare(`
          WITH dates AS (
            SELECT DISTINCT checkin_date
            FROM daily_checkins
            WHERE user_id = ?
            ORDER BY checkin_date DESC
          )
          SELECT
            COUNT(*) as streak,
            MIN(checkin_date) as streak_start
          FROM dates
          WHERE checkin_date >= date(
            (SELECT checkin_date FROM dates LIMIT 1),
            '-' || CAST((SELECT COUNT(*) FROM dates) AS TEXT) || ' days'
          )
        `)
        .bind(userId)
        .first();

      const streakInfo = streakResult as any;
      const streak = streakInfo?.streak || 0;

      // Get longest streak ever
      const longestStreakResult = await db
        .prepare(`
          WITH ordered_dates AS (
            SELECT checkin_date,
            date(checkin_date, '-' || rowid || ' days') as group_date
            FROM daily_checkins
            WHERE user_id = ?
            GROUP BY checkin_date
            ORDER BY checkin_date
          )
          SELECT COUNT(*) as longest_streak
          FROM ordered_dates
          GROUP BY group_date
          ORDER BY longest_streak DESC
          LIMIT 1
        `)
        .bind(userId)
        .first();

      const longestStreak = (longestStreakResult as any)?.longest_streak || 0;

      // Get activity by day of week (last 7 days)
      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = new Date();
      const weeklyActivity: any = {};

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayName = weekDays[date.getDay()];

        const activityResult = await db
          .prepare(`
            SELECT COUNT(*) as count
            FROM prayer_progress
            WHERE user_id = ?
            AND date = ?
            AND completed = 1
          `)
          .bind(userId, dateStr)
          .first();

        weeklyActivity[dateStr] = {
          day: dayName,
          count: (activityResult as any)?.count || 0,
          date: dateStr,
        };
      }

      // Get most prayed routines
      const routineStatsResult = await db
        .prepare(`
          SELECT
            routine_type,
            COUNT(*) as total,
            COUNT(CASE WHEN completed = 1 THEN 1 END) as completed,
            AVG(CASE WHEN completed = 1 AND duration_minutes IS NOT NULL THEN duration_minutes END) as avg_duration
          FROM prayer_progress
          WHERE user_id = ?
          ${daysBack > 0 ? `AND date >= date('now', '-${daysBack} days')` : ''}
          GROUP BY routine_type
          ORDER BY total DESC
        `)
        .bind(userId)
        .all();

      const routineStats = (routineStatsResult?.results || []).map((row: any) => ({
        routine: row.routine_type,
        total: row.total,
        completed: row.completed,
        completionRate: row.total > 0 ? Math.round((row.completed / row.total) * 100) : 0,
        avgDuration: row.avg_duration ? Math.round(row.avg_duration) : null,
      }));

      // Get total prayers completed
      const totalCountResult = await db
        .prepare(`
          SELECT COUNT(*) as total
          FROM prayer_progress
          WHERE user_id = ?
          AND completed = 1
        `)
        .bind(userId)
        .first();

      const totalPrayers = (totalCountResult as any)?.total || 0;

      // Calculate consistency percentage
      const daysInPeriod = daysBack || 7;
      const consistency = Math.min(
        100,
        Math.round((Object.values(weeklyActivity).filter((day: any) => day.count > 0).length / daysInPeriod) * 100)
      );

      // Get active novenas
      const activeNovenasResult = await db
        .prepare(`
          SELECT id, novena_type, intention, day_number, started_at
          FROM novena_journeys
          WHERE user_id = ?
          AND completed_at IS NULL
        `)
        .bind(userId)
        .all();

      const activeNovenas = (activeNovenasResult?.results || []).map((row: any) => ({
        id: row.id,
        novenaType: row.novena_type,
        intention: row.intention,
        dayNumber: row.day_number,
        daysLeft: 9 - row.day_number,
        startedAt: row.started_at,
      }));

      return {
        timeframe,
        streak,
        longestStreak,
        consistency,
        totalPrayers,
        weeklyActivity,
        routineStats,
        activeNovenas,
        encouragement: getProgressEncouragement(streak, consistency, totalPrayers),
        insights: generateProgressInsights(routineStats, streak, consistency),
      };
    } catch (error) {
      console.error('Error getting prayer progress:', error);
      return {
        error: 'Failed to get prayer progress',
        message: (error as Error).message,
      };
    }
  },
});

/**
 * Get encouragement based on progress
 */
function getProgressEncouragement(streak: number, consistency: number, totalPrayers: number): string {
  if (streak >= 30) {
    return `Amazing! You've maintained a ${streak}-day prayer streak! Your faithfulness is inspiring. "Well done, good and faithful servant!" - Matthew 25:21`;
  } else if (streak >= 7) {
    return `Wonderful! You've been consistent in prayer for ${streak} days! God is honoring your commitment. "The Lord is faithful to all his promises." - Psalm 145:13`;
  } else if (consistency >= 70) {
    return `Great consistency! You're praying ${consistency}% of the time. Keep building this habit - God is working through your faithfulness.`;
  } else if (totalPrayers > 10) {
    return `You've completed ${totalPrayers} prayer sessions! Every prayer is a step closer to God. "Draw near to God, and he will draw near to you." - James 4:8`;
  } else if (streak >= 3) {
    return `You're building momentum with a ${streak}-day streak! Keep going - small consistent steps lead to great spiritual growth.`;
  } else {
    return `Every prayer matters. God's mercies are new every morning. Start where you are - God meets you there.`;
  }
}

/**
 * Generate insights from progress data
 */
function generateProgressInsights(routineStats: any[], streak: number, consistency: number): string[] {
  const insights: string[] = [];

  // Most prayed routine
  if (routineStats.length > 0) {
    const mostPrayed = routineStats[0];
    insights.push(
      `Your most prayed routine is ${mostPrayed.routine} with ${mostPrayed.completed} completions.`
    );
  }

  // Streak insight
  if (streak >= 7) {
    insights.push(
      `Your ${streak}-day streak shows you're building a strong prayer habit. Consistency is key to spiritual growth!`
    );
  } else if (streak === 0 && consistency > 0) {
    insights.push(
      `You're active in prayer but haven't maintained a streak yet. Try praying daily to build momentum.`
    );
  }

  // Consistency insight
  if (consistency >= 80) {
    insights.push(`Your ${consistency}% consistency is excellent! You're making prayer a priority.`);
  } else if (consistency < 40) {
    insights.push(
      `Consider setting a specific time for prayer to improve consistency. Even 5 minutes a day makes a difference.`
    );
  }

  // Routine diversity insight
  const activeRoutines = routineStats.filter((r) => r.total > 0).length;
  if (activeRoutines >= 3) {
    insights.push(`You practice ${activeRoutines} different prayer types - great variety!`);
  } else if (activeRoutines === 1) {
    insights.push(
      `Consider trying a new prayer type to enrich your spiritual life. The Rosary, Examen, or Lectio Divina are great options.`
    );
  }

  return insights.slice(0, 3); // Return max 3 insights
}
