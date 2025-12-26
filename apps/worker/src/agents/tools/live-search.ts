import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Live search tool for Bible readings and spiritual content
export const liveSearchTool = createTool({
  id: 'live-search',
  description: 'Search for Bible readings, spiritual content, and daily readings. Use this when users ask about today\'s reading, Saint\'s feast, upcoming days of obligation, Bible passages, or specific spiritual topics.',
  inputSchema: z.object({
    query: z.string().describe('The search query for finding Bible readings or spiritual content'),
    searchType: z.enum(['bible-reading', 'daily-reading', 'saint\'s feast', 'days of obligation', 'bible-passage', 'spiritual-topic']).optional().default('bible-reading').describe('Type of search to perform'),
  }),
  outputSchema: z.object({
    results: z.array(z.object({
      title: z.string(),
      content: z.string(),
      source: z.string(),
      reference: z.string().optional(),
    })).describe('Search results with relevant Bible passages and spiritual content'),
  }),
  execute: async (context) => {
    try {
      const { query, searchType } = context;

      // Get current date and time context
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      console.log(`Live search called with query: ${query}, type: ${searchType}, date: ${dateStr}, time: ${timeStr}`);

      // For now, return structured mock data based on search type
      // In production, you would integrate with a real Bible API (e.g., Bible API, API.Bible)
      if (searchType === 'daily-reading' || query.toLowerCase().includes('today') || query.toLowerCase().includes('reading')) {
        return {
          results: [
            {
              title: `Daily Reading for ${dateStr}`,
              content: `Today's Gospel reading reflects on God's unconditional love and mercy. The passage reminds us that no matter what we face, God is always with us, offering hope and guidance through Jesus Christ.`,
              source: 'Daily Roman Missal',
              reference: 'Based on the liturgical calendar',
            },
            {
              title: 'First Reading',
              content: 'The Lord is my shepherd; there is nothing I lack. The Lord makes me lie down in green pastures, and leads me beside refreshing waters.',
              source: 'Psalm 23',
              reference: 'Psalm 23:1-2',
            },
          ]
        };
      }

      // General Bible search
      return {
        results: [
          {
            title: 'Search Results',
            content: `Based on your search for "${query}", here are relevant spiritual insights. Remember that God's word is living and active, speaking to us in every moment of our lives.`,
            source: 'Spiritual Guide',
            reference: 'Scripture-based guidance',
          }
        ]
      };
    } catch (error) {
      console.error('Error in live search:', error);
      return {
        results: [{
          title: 'Search Error',
          content: 'Unable to perform search at this time. Please try again.',
          source: 'System',
        }]
      };
    }
  },
});
