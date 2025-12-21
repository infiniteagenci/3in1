import { Mastra } from '@mastra/core';
import { spiritAgent } from './agents/spirit-agent';

// Create Mastra instance and register the Spirit agent
export const mastra = new Mastra({
  agents: {
    spirit: spiritAgent,
  },
});

export default mastra;