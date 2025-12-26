import { Hono } from 'hono';
import type { Bindings, Variables } from './common';
import { validateSession } from './common';

const suggestions = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Helper function to generate personalized suggestions based on user notes
function generatePersonalizedSuggestions(notes: string, conversations: any[], userName: string): string[] {
  const suggestions: string[] = [];

  // If no notes exist, return default suggestions
  if (!notes || notes.trim().length === 0) {
    return [
      "What's the Bible reading for today?",
      "How can I find peace in difficult times?",
      "What does Jesus say about forgiveness?",
      "Help me understand God's plan for my life",
    ];
  }

  // Parse notes for user information
  const notesLower = notes.toLowerCase();

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
    suggestions.push("What does the Bible say about marriage?");
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
    suggestions.push("Where should I start reading the Bible?");
  }

  // Always add a personalized greeting suggestion
  suggestions.unshift(`Hi ${userName.split(' ')[0]}, how are you feeling today?`);

  // If we don't have enough suggestions, add some contextual ones
  while (suggestions.length < 4) {
    const contextualSuggestions = [
      "Can you explain that more deeply?",
      "What's a practical way to apply this?",
      "Can you pray with me about this?",
      "How can I grow in this area?",
      "What guidance does Scripture offer?",
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
