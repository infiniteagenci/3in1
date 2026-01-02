import { Hono } from 'hono';
import type { Bindings, Variables } from './common';
import { validateSession } from './common';

const suggestions = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Helper function to generate personalized suggestions based on user notes and conversation context
function generatePersonalizedSuggestions(notes: string, conversations: any[], userName: string): string[] {
  const suggestions: string[] = [];

  // If no notes exist and no conversations, return default suggestions with greeting
  const hasNotes = notes && notes.trim().length > 0;
  const conversationCount = conversations?.length || 0;

  if (!hasNotes && conversationCount === 0) {
    return [
      `Hi ${userName.split(' ')[0]}, how are you feeling today?`,
      "What's the Gospel reading for today?",
      "How can I find peace in difficult times?",
      "What does Jesus say about forgiveness?",
    ];
  }

  // Parse notes for user information
  const notesLower = notes?.toLowerCase() || '';

  // Check for age/life stage
  if (notesLower.includes('teen') || notesLower.includes('young adult')) {
    suggestions.push("How can I grow in my faith as a young person?");
  } else if (notesLower.includes('parent') || notesLower.includes('children')) {
    suggestions.push("How can I teach my children about God's love?");
  } else if (notesLower.includes('retired') || notesLower.includes('elderly')) {
    suggestions.push("How can I find purpose in this season of life?");
  }

  // Check for work-related concerns
  if (notesLower.includes('work') || notesLower.includes('job') || notesLower.includes('career')) {
    suggestions.push("How can I balance my work and spiritual life?");
  }

  // Check for relationship concerns
  if (notesLower.includes('married') || notesLower.includes('spouse') || notesLower.includes('relationship')) {
    suggestions.push("What does Scripture say about marriage?");
  }

  // Check for spiritual interests
  if (notesLower.includes('pray') || notesLower.includes('prayer')) {
    suggestions.push("Can you teach me more about prayer?");
  }

  // Check for challenges
  if (notesLower.includes('anxiety') || notesLower.includes('worry') || notesLower.includes('fear')) {
    suggestions.push("What verses help with anxiety and worry?");
  }

  // Check for faith journey
  if (notesLower.includes('new to faith') || notesLower.includes('recently converted')) {
    suggestions.push("Where should I start reading Scripture?");
  }

  // Add contextual follow-up suggestions based on conversation depth
  const conversationDepth = conversationCount > 5 ? 'deep' : conversationCount > 2 ? 'medium' : 'shallow';

  // Vary suggestions based on conversation stage
  const followUpSuggestions: { [key: string]: string[] } = {
    shallow: [
      "Tell me more about yourself",
      "How can I pray for you today?",
      "What's on your heart?",
      "What would bring you peace right now?",
    ],
    medium: [
      "How can I apply this to my daily life?",
      "Can we dig deeper into this topic?",
      "What does Scripture say about this?",
      "How can I grow in this area?",
    ],
    deep: [
      "Help me understand this more deeply",
      "What's the spiritual truth here?",
      "How can I be transformed by this?",
      "What's my next step?",
    ],
  };

  // Add appropriate follow-ups based on conversation depth
  const stageSuggestions = followUpSuggestions[conversationDepth];
  for (const suggestion of stageSuggestions) {
    if (suggestions.length < 4 && !suggestions.includes(suggestion)) {
      suggestions.push(suggestion);
    }
  }

  // If we don't have enough suggestions, add contextual ones
  while (suggestions.length < 4) {
    const contextualSuggestions = [
      "Can you explain that more deeply?",
      "What's a practical way to apply this?",
      "Can you pray with me about this?",
      "What guidance does Scripture offer?",
      "How can I find peace in this?",
    ];
    const nextSuggestion = contextualSuggestions.find(s => !suggestions.includes(s));
    if (nextSuggestion) suggestions.push(nextSuggestion);
    else break;
  }

  return suggestions.slice(0, 4);
}

// POST /api/suggestions - Get personalized suggestions based on user notes
suggestions.post('/', validateSession, async (c) => {
  try {
    const user = c.get('user') as { id: string; name: string; email: string };

    // Get user's notes
    const notes = await c.env.DB.prepare(
      'SELECT content FROM notes WHERE user_id = ? ORDER BY updated_at DESC LIMIT 1'
    ).bind(user.id).first();

    // Get recent conversations for context
    const conversations = await c.env.DB.prepare(
      'SELECT messages FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 3'
    ).bind(user.id).all();

    // Generate personalized suggestions based on notes and conversation history
    const suggestions = generatePersonalizedSuggestions(
      (notes as any)?.content || '',
      conversations.results || [],
      user.name
    );

    return c.json({ suggestions });
  } catch (error) {
    console.error('Get suggestions error:', error);
    return c.json({ error: 'Failed to generate suggestions' }, 500);
  }
});

export default suggestions;
