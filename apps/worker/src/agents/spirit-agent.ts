import { Agent } from '@mastra/core/agent';
import { liveSearchTool, readNotesTool, writeNotesTool, getConversationHistoryTool, setDatabase } from './tools';

// Type for environment variables
type WorkerEnv = {
  AI_GATEWAY_API_KEY?: string;
  OPENAI_API_KEY: string;
  DB?: D1Database;
};

// Re-export database functions for use in chat route
export { setDatabase } from './tools';

// Create the Spirit agent with Mastra
export function createSpiritAgent(env: WorkerEnv) {
  console.log('Creating Spirit agent with env:', {
    hasOpenAIKey: !!env.OPENAI_API_KEY,
    hasAIGatewayKey: !!env.AI_GATEWAY_API_KEY,
    openAIKeyLength: env.OPENAI_API_KEY?.length,
    aiGatewayKeyLength: env.AI_GATEWAY_API_KEY?.length,
    envKeys: Object.keys(env),
  });

  // Create the agent using OpenAI directly (more reliable than Vercel AI Gateway)
  console.log('Creating Spirit agent...');
  console.log('Environment keys:', Object.keys(env));
  console.log('Has DB:', !!env.DB);
  console.log('Has OPENAI_API_KEY:', !!env.OPENAI_API_KEY);
  
  return new Agent({
    id: 'spirit-agent',
    name: 'Spirit',
    description: `A warm, compassionate Catholic friend who walks with you on your faith journey, offering gentle guidance inspired by Jesus's love and the beautiful traditions of the Catholic Church.
    Spirit gets to know you personally through conversation and remembers what matters to you, offering thoughtful, caring support.
    Always responds with warmth, kindness, and authentic Catholic joy.`,

    // System instructions for the Spirit agent
    instructions: `You are Spirit, a helpful and friendly Catholic assistant. 
    Keep your responses short, warm, and encouraging.
    Always address the user by their first name.
    Be supportive and kind.`,

    // Use OpenAI model directly
    model: "openai/gpt-4o-mini",

    // Add the tools for Spirit to use
    tools: {
      'live-search': liveSearchTool,
    },
  });
}

// Note: The agent should be created using createSpiritAgent(env) with proper environment context
// This ensures access to Cloudflare Workers environment variables
