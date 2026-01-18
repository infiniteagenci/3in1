import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * Get Daily Readings Tool
 * Fetches today's Catholic daily readings from USCCB with caching
 */
export const getDailyReadingsTool = createTool({
  id: 'get-daily-readings',
  description: 'Fetch today\'s Catholic daily readings from USCCB. Returns first reading, psalm, gospel, and reflection.',
  inputSchema: z.object({
    date: z.string().optional().describe('Date in YYYY-MM-DD format (optional, defaults to today)'),
  }),
  execute: async ({ date }, context) => {
    const db = (context as any)?.db;
    const targetDate = date || new Date().toISOString().split('T')[0];

    if (!db) {
      return {
        error: 'Database not available',
        date: targetDate,
      };
    }

    try {
      // Check cache first
      const cached = await db
        .prepare(
          'SELECT content FROM daily_content WHERE date = ? AND reading_type = ?'
        )
        .bind(targetDate, 'usccb-readings')
        .first();

      if (cached) {
        const content = JSON.parse((cached as any).content);
        return {
          ...content,
          cached: true,
        };
      }

      // Fetch from USCCB API
      const dateNum = targetDate.replace(/-/g, ''); // YYYYMMDD
      const response = await fetch(
        `https://bible.usccb.org/api/v3/dailyReadings/${dateNum}`
      );

      if (!response.ok) {
        throw new Error(`USCCB API error: ${response.status}`);
      }

      const data = await response.json() as any;

      // Parse and structure the readings
      const readings = {
        date: targetDate,
        title: data.title || 'Daily Readings',
        firstReading: {
          citation: data.readings?.[0]?.citation || '',
          text: data.readings?.[0]?.text || '',
        },
        responsorialPsalm: {
          citation: data.readings?.[1]?.citation || '',
          text: data.readings?.[1]?.text || '',
        },
        gospel: {
          citation: data.readings?.[2]?.citation || '',
          text: data.readings?.[2]?.text || '',
        },
      };

      // Cache for 24 hours
      const id = `${targetDate}-usccb`;
      await db
        .prepare(
          'INSERT INTO daily_content (id, date, reading_type, content) VALUES (?, ?, ?, ?)'
        )
        .bind(
          id,
          targetDate,
          'usccb-readings',
          JSON.stringify(readings)
        )
        .run();

      return readings;
    } catch (error) {
      console.error('Error fetching daily readings:', error);
      return {
        error: 'Failed to fetch daily readings',
        date: targetDate,
        message: (error as Error).message,
      };
    }
  },
});
