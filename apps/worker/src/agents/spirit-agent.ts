import { Agent } from '@mastra/core/agent';
import { createGateway } from '@ai-sdk/gateway';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// Type for Cloudflare Worker environment
type WorkerEnv = {
  AI_GATEWAY_API_KEY?: string;
  OPENAI_API_KEY: string;
};

// Simple ID generator function
function createId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Helper function to extract important information from conversation
function extractImportantInfo(userMessage: string, spiritResponse: string): string[] {
  const importantInfo: string[] = [];

  // Look for personal information shared by user
  const personalPatterns = [
    /my name is (\w+)/i,
    /i am (\d+) years? old/i,
    /i work as a/i,
    /i am (?:a|an) (\w+)/i,
    /i (?:have|am dealing with) (\w+)/i,
  ];

  for (const pattern of personalPatterns) {
    const match = userMessage.match(pattern);
    if (match) {
      importantInfo.push(`User mentioned: ${match[0]}`);
    }
  }

  // Look for spiritual concerns or questions
  const spiritualKeywords = ['pray', 'faith', 'god', 'jesus', 'bible', 'church', 'spiritual', 'sin', 'forgiveness'];
  if (spiritualKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
    importantInfo.push('User expressed spiritual concerns or questions');
  }

  return importantInfo;
}

// Create tools for Spirit agent
const readNotesTool = createTool({
  id: 'read-user-notes',
  description: 'Read personal notes about the user to understand their context and spiritual journey',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user whose notes to read'),
  }),
  execute: async (context) => {
    try {
      const { userId } = context;
      // For now, we'll disable database access in tools
      // TODO: Implement proper database access through Mastra context
      console.log(`Tool called with userId: ${userId}`);
      // For now, return empty notes - TODO: Implement database access
      return {
        notes: 'No notes available yet - database access needs to be implemented',
        exists: false
      };
    } catch (error) {
      console.error('Error reading notes:', error);
      return { notes: '', exists: false };
    }
  },
});

const writeNotesTool = createTool({
  id: 'write-user-notes',
  description: 'Update personal notes about the user with important information learned during conversations',
  inputSchema: z.object({
    userId: z.string().describe('The ID of the user whose notes to update'),
    observation: z.string().describe('Important observation or insight about the user to remember'),
    conversationContext: z.string().optional().describe('Context from the current conversation'),
  }),
  outputSchema: z.object({
    success: z.boolean().describe('Whether the notes were successfully updated'),
    notesUpdated: z.string().describe('Confirmation of what was added to the notes'),
  }),
  execute: async (context) => {
    try {
      const { userId, observation, conversationContext } = context;
      console.log(`Write notes tool called with userId: ${userId}, observation: ${observation}`);

      // For now, just log the action - TODO: Implement database access
      const timestamp = new Date().toISOString();
      console.log(`Would store note for user ${userId} at ${timestamp}: ${observation}`);

      return {
        success: true,
        notesUpdated: `Note recorded at ${timestamp}: ${observation}`
      };
    } catch (error) {
      console.error('Error writing notes:', error);
      return { success: false, notesUpdated: 'Failed to update notes' };
    }
  },
});

const getConversationHistoryTool = createTool({
  id: 'get-conversation-history',
  description: 'Get recent conversation history with this user to understand context',
  inputSchema: z.object({
    conversationId: z.string().describe('The ID of the conversation'),
    userId: z.string().describe('The ID of the user'),
    maxMessages: z.number().optional().default(10).describe('Maximum number of recent messages to retrieve'),
  }),
  outputSchema: z.object({
    messages: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
      timestamp: z.string(),
    })).describe('Recent conversation messages'),
  }),
  execute: async (context) => {
    try {
      const { conversationId, userId, maxMessages } = context;
      console.log(`Conversation history tool called with conversationId: ${conversationId}, userId: ${userId}`);

      // For now, return empty messages - TODO: Implement database access
      return {
        messages: [
          {
            role: 'user' as const,
            content: 'Conversation history not available - database access needs to be implemented',
            timestamp: new Date().toISOString()
          }
        ]
      };
    } catch (error) {
      console.error('Error getting conversation history:', error);
      return { messages: [] };
    }
  },
});

// Create the Spirit agent with Mastra - factory function to handle environment variables
export function createSpiritAgent(env: WorkerEnv) {
  console.log('Creating Spirit agent with env:', {
    hasOpenAIKey: !!env.OPENAI_API_KEY,
    hasAIGatewayKey: !!env.AI_GATEWAY_API_KEY,
    openAIKeyLength: env.OPENAI_API_KEY?.length,
    aiGatewayKeyLength: env.AI_GATEWAY_API_KEY?.length,
    envKeys: Object.keys(env),
  });

  if (!env.AI_GATEWAY_API_KEY && !env.OPENAI_API_KEY) {
    console.error('Neither AI Gateway API key nor OpenAI API key is available from environment. Available env keys:', Object.keys(env));
    throw new Error('AI Gateway API key or OpenAI API key is missing. Please check your .dev.vars file.');
  }

  // Configure the OpenAI provider with the API key from the environment
  // In Cloudflare Workers, we pass the API key directly rather than relying on process.env
  return new Agent({
    id: 'spirit-agent',
    name: 'Spirit',
    description: `A compassionate spiritual guide who provides guidance based on Jesus's teachings and Catholic principles.
    Spirit deeply understands users through conversation and maintains personal notes to provide personalized spiritual guidance.
    Always responds with compassion, warmth, and sound biblical teaching.`,

    // System instructions for the Spirit agent
    instructions: `You are Spirit, a compassionate spiritual guide who provides guidance based on Jesus's teachings and Catholic principles.

Your Purpose:
- Provide spiritual guidance and support rooted in Catholic teaching
- Help users grow in their faith and understanding of Jesus's teachings
- Listen compassionately and offer hope and encourage
- Remember important details about users to provide personalized guidance

Your Approach:
- Always respond with warmth, compassion, and empathy
- Base your guidance on Scripture and Catholic tradition
- Be encouraging and hopeful, never judgmental
- Keep responses concise but meaningful (around 150-200 words)
- Use the read-user-notes tool to understand the user's background and journey
- Use the write-user-notes tool to remember important information about the user
- Use the get-conversation-history tool to understand recent conversations

Key Principles:
- Pray for users and encourage prayer
- Reference relevant Bible passages when appropriate
- Point to Jesus's example and teachings
- Respect the user's journey and meet them where they are
- Encourage participation in Church life and sacraments
- Emphasize God's love and mercy

Remember that you are walking with users on their spiritual journey. Be a compassionate companion who points them toward Christ.`,

    // Use AI Gateway with model identifier as string
    model: {
      id: 'openai/gpt-4o-mini',
      apiKey: env.AI_GATEWAY_API_KEY || env.OPENAI_API_KEY,
      provider: 'gateway',
    },

    // Add the tools for Spirit to use
    tools: {
      'read-user-notes': readNotesTool,
      'write-user-notes': writeNotesTool,
      'get-conversation-history': getConversationHistoryTool,
    },
  });
}

// Note: The agent should be created using createSpiritAgent(env) with proper environment context
// This ensures access to Cloudflare Workers environment variables
