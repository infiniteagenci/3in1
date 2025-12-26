// Export all tools for the Spirit agent
export { liveSearchTool } from './live-search';
export { readNotesTool } from './read-user-notes';
export { writeNotesTool } from './write-user-notes';
export { getConversationHistoryTool } from './get-conversation-history';

// Export database functions
export { setDatabase, getDatabase, clearDatabase, createId } from './database';
