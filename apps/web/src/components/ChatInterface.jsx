import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useCallback, useState, useEffect, useMemo } from 'react';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from './ai-elements/reasoning';
import { Response } from './ai-elements/response';
import { Message, MessageContent } from './ai-elements/message';
import { Conversation, ConversationContent } from './ai-elements/conversation';
import { Loader } from './ai-elements/loader';
import { Suggestions, Suggestion } from './ai-elements/suggestion';

// Icons
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

// Default suggestions for new users
const defaultSuggestions = [
  "What's the Bible reading for today?",
  "How can I find peace in difficult times?",
  "What does Jesus say about forgiveness?",
  "Help me understand God's plan for my life",
];

// Generate contextual suggestions based on conversation
function generateContextualSuggestions(messages) {
  if (messages.length === 0) return defaultSuggestions;

  // Get recent conversation text
  const recentText = messages
    .slice(-6) // Last 3 exchanges
    .map(m => m.parts?.map((p) => p.text).join(' ') || '')
    .join(' ')
    .toLowerCase();

  // Extract key themes and generate follow-up suggestions
  const suggestions = [];

  // Prayer-related suggestions
  if (recentText.includes('pray') || recentText.includes('prayer')) {
    suggestions.push("Can you teach me how to pray?");
    suggestions.push("What's a good prayer for right now?");
  }

  // Forgiveness-related
  if (recentText.includes('forgiv') || recentText.includes('sorry') || recentText.includes('guilt')) {
    suggestions.push("How do I forgive myself?");
    suggestions.push("What does Jesus say about second chances?");
  }

  // Faith/doubt-related
  if (recentText.includes('faith') || recentText.includes('doubt') || recentText.includes('believe')) {
    suggestions.push("How can I strengthen my faith?");
    suggestions.push("Is it normal to have doubts?");
  }

  // Bible/Scripture-related
  if (recentText.includes('bible') || recentText.includes('scripture') || recentText.includes('verse')) {
    suggestions.push("What's a good verse for encouragement?");
    suggestions.push("How should I start reading the Bible?");
  }

  // Struggle/hardship-related
  if (recentText.includes('struggle') || recentText.includes('hard') || recentText.includes('difficult') || recentText.includes('suffer')) {
    suggestions.push("Why does God allow suffering?");
    suggestions.push("How do I trust God in hard times?");
  }

  // Love/relationships
  if (recentText.includes('love') || recentText.includes('relationship') || recentText.includes('marriage') || recentText.includes('family')) {
    suggestions.push("What does the Bible say about love?");
    suggestions.push("How do I show Christ's love to others?");
  }

  // Fear/anxiety
  if (recentText.includes('fear') || recentText.includes('anxious') || recentText.includes('worried') || recentText.includes('stress')) {
    suggestions.push("What verses help with anxiety?");
    suggestions.push("How can I give my worries to God?");
  }

  // Church/community
  if (recentText.includes('church') || recentText.includes('community') || recentText.includes('fellowship')) {
    suggestions.push("Why is church community important?");
    suggestions.push("How do I find a good church?");
  }

  // Sin/temptation
  if (recentText.includes('sin') || recentText.includes('temptation') || recentText.includes('addict')) {
    suggestions.push("How do I overcome temptation?");
    suggestions.push("What does God say about repentance?");
  }

  // Grace/mercy
  if (recentText.includes('grace') || recentText.includes('mercy')) {
    suggestions.push("Can you explain God's grace?");
    suggestions.push("What's the difference between grace and mercy?");
  }

  // Purpose/calling
  if (recentText.includes('purpose') || recentText.includes('calling') || recentText.includes('vocation') || recentText.includes('mission')) {
    suggestions.push("How do I discover my God-given purpose?");
    suggestions.push("What does it mean to be called by God?");
  }

  // Hope/joy
  if (recentText.includes('hope') || recentText.includes('joy') || recentText.includes('happy')) {
    suggestions.push("How do I find lasting joy?");
    suggestions.push("What gives Christians hope?");
  }

  // Add general follow-ups if we didn't generate enough
  while (suggestions.length < 3) {
    const generalFollowUps = [
      "Can you explain that more deeply?",
      "What's a practical way to apply this?",
      "Can you pray with me about this?",
      "What should I do next?",
      "How can I grow in this area?",
    ];
    const nextSuggestion = generalFollowUps.find(s => !suggestions.includes(s));
    if (nextSuggestion) suggestions.push(nextSuggestion);
    else break;
  }

  // Shuffle and return up to 4 suggestions
  return suggestions.slice(0, 4);
}

export default function ChatInterface() {
  const PUBLIC_WORKER_API_URL = typeof window !== 'undefined'
    ? window.PUBLIC_WORKER_API_URL || 'http://localhost:8787'
    : 'http://localhost:8787';

  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${PUBLIC_WORKER_API_URL}/api/chat`,
      headers: () => ({
        'Authorization': `Bearer ${localStorage.getItem('session_token')}`
      }),
    }),
  });

  // Generate dynamic suggestions based on conversation
  const suggestedQuestions = useMemo(() => {
    return generateContextualSuggestions(messages);
  }, [messages]);

  // Show suggestions when not streaming and user is not typing
  useEffect(() => {
    if (status !== 'streaming' && status !== 'submitted' && !input) {
      setShowSuggestions(true);
    } else if (input) {
      setShowSuggestions(false);
    }
  }, [status, input]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
      setShowSuggestions(false);
    }
  }, [input, sendMessage]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0 max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <Conversation className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <ConversationContent>
          {messages.map((message) => (
            <Message key={message.id} from={message.role === 'user' ? 'user' : 'ai'}>
              <MessageContent>
                {message.parts?.map((part, index) => {
                  if (part.type === 'text') {
                    return <Response key={`${message.id}-${index}`}>{part.text}</Response>;
                  }

                  if (part.type === 'reasoning') {
                    const isStreaming = status === 'streaming' &&
                      index === message.parts.length - 1 &&
                      message.id === messages.at(-1)?.id;

                    return (
                      <Reasoning
                        key={`${message.id}-${index}`}
                        className="mb-2 w-full"
                        isStreaming={isStreaming}
                      >
                        <ReasoningTrigger title="💭 Spiritual Reasoning" />
                        <ReasoningContent>
                          <div className="whitespace-pre-wrap">{part.text}</div>
                        </ReasoningContent>
                      </Reasoning>
                    );
                  }

                  return null;
                })}
              </MessageContent>
            </Message>
          ))}
          {(status === 'submitted' || status === 'streaming') && <Loader />}
        </ConversationContent>
      </Conversation>

      {/* Suggestions - shown based on conversation state */}
      {showSuggestions && status !== 'streaming' && status !== 'submitted' && (
        <div className="px-4 py-3 bg-gradient-to-b from-purple-50 to-white border-t border-purple-100">
          <p className="text-sm text-purple-700 font-medium mb-3 text-center">
            {messages.length === 0
              ? '✨ What would you like to ask Spirit?'
              : '💫 Continue the conversation...'}
          </p>
          <Suggestions className="justify-center">
            {suggestedQuestions.map((question) => (
              <Suggestion
                key={question}
                suggestion={question}
                onClick={handleSuggestionClick}
              />
            ))}
          </Suggestions>
        </div>
      )}

      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.metaKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask Spirit for spiritual guidance..."
            rows={2}
            className="flex-1 w-full resize-none border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'streaming' || !input?.trim()}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg shrink-0"
          >
            {status === 'streaming' ? <SpinnerIcon /> : <SendIcon />}
          </button>
        </form>
      </div>
    </div>
  );
}
