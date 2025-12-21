import { Mastra } from '@mastra/core';
import { createSpiritAgent } from './agents/spirit-agent';

// Factory function to create Mastra instance with proper environment
export function createMastra(env: any) {
  const spiritAgent = createSpiritAgent(env);

  return new Mastra({
    agents: {
      spirit: spiritAgent,
    },
  });
}

export default createMastra;