import type { Message } from '@ai-sdk/react';
import { useCallback, useState, useEffect, useRef } from 'react';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from './ai-elements/reasoning';
import { Response } from './ai-elements/response';
import { Message as MessageComponent, MessageContent } from './ai-elements/message';
import { Conversation, ConversationContent } from './ai-elements/conversation';
import { Loader } from './ai-elements/loader';
import { Suggestions, Suggestion } from './ai-elements/suggestion';
import CatholicMenu from './CatholicMenu';
import DailyCheckin from './DailyCheckin';
import QuickPrayers from './QuickPrayers';
import PrayerProgress from './PrayerProgress';
import DailyVerse from './bible-chat/DailyVerse';

interface ChatInterfaceProps {
  triggerPrayer?: { prayerId: string } | null;
  onPrayerHandled?: () => void;
}

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


const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// Default suggestions for new users
const defaultSuggestions = [
  "What's something encouraging in the Bible?",
  "How do I make prayer feel more meaningful?",
  "Teach me about the Catechism",
  "Stories of the Saints that inspire me",
  "Prayers for peace and trust",
  "Help me understand God's love for me",
];

// Age options for the conversation flow
const ageOptions = [
  { id: 'child', label: "I'm a kid! 🎈", icon: '👶' },
  { id: 'teen', label: "Teen years! 🌈", icon: '🧑' },
  { id: 'young-adult', label: "Young adult ✨", icon: '🎓' },
  { id: 'adult', label: "Adult life 🌿", icon: '👨' },
  { id: 'midlife', label: "Midlife journey 🌅", icon: '🌟' },
  { id: 'senior', label: "Golden years 💫", icon: '👴' },
];

export default function ChatInterface({ triggerPrayer, onPrayerHandled }: ChatInterfaceProps) {
  const PUBLIC_BASE_API_URL = typeof window !== 'undefined'
    ? (window as any).PUBLIC_BASE_API_URL || 'http://localhost:8787'
    : 'http://localhost:8787';

  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [personalizedSuggestions, setPersonalizedSuggestions] = useState(defaultSuggestions);
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitted' | 'streaming' | 'ready'>('idle');
  const [showAgePrompt, setShowAgePrompt] = useState(false);
  const [hasCollectedAge, setHasCollectedAge] = useState(false);
  const [showCatholicMenu, setShowCatholicMenu] = useState(false);
  const [showDailyCheckin, setShowDailyCheckin] = useState(false);
  const [showQuickPrayers, setShowQuickPrayers] = useState(false);
  const [prayerProgress, setPrayerProgress] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if we need to collect age
  useEffect(() => {
    const checkAgeCollection = () => {
      const hasCollected = localStorage.getItem('user_age_group');
      const hasSeenAgePrompt = localStorage.getItem('seen_age_prompt');

      if (!hasCollected && !hasSeenAgePrompt && messages.length === 0) {
        // Show age prompt after a short delay
        setTimeout(() => {
          setShowAgePrompt(true);
          localStorage.setItem('seen_age_prompt', 'true');
        }, 500);
      } else if (hasCollected) {
        setHasCollectedAge(true);
        setShowAgePrompt(false);
      }
    };

    checkAgeCollection();
  }, [messages.length]);

  // Check for daily check-in - show every time on app load when no messages
  useEffect(() => {
    const checkDailyCheckin = () => {
      // Show compact check-in every time when there are no messages
      if (messages.length === 0) {
        setTimeout(() => {
          setShowDailyCheckin(true);
        }, 300);
      }
    };

    checkDailyCheckin();
  }, []);

  // Fetch personalized suggestions on mount and after messages change
  useEffect(() => {
    const fetchPersonalizedSuggestions = async () => {
      try {
        const token = localStorage.getItem('session_token');
        if (!token) return;

        const response = await fetch(`${PUBLIC_BASE_API_URL}/api/suggestions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.suggestions && data.suggestions.length > 0) {
            setPersonalizedSuggestions(data.suggestions);
          }
        }
      } catch (error) {
        console.error('Failed to fetch personalized suggestions:', error);
      }
    };

    if (messages.length > 0) {
      fetchPersonalizedSuggestions();
    }
  }, [messages.length, PUBLIC_BASE_API_URL]);

  // Handle triggerPrayer prop
  useEffect(() => {
    if (triggerPrayer) {
      const { prayerId } = triggerPrayer;

      if (prayerId.startsWith('library:')) {
        // Handle library item selection
        const [, category, title] = prayerId.split(':');
        const query = `Tell me about ${title}`;
        setInput(query);
      } else if (prayerId.startsWith('checkin:')) {
        // Handle check-in completion - just dismiss, don't auto-send
        // The user will send their message manually
        setShowDailyCheckin(false);
      } else {
        // Handle prayer selection
        const prompts: Record<string, string> = {
          rosary: 'I want to pray the Rosary',
          examen: 'I want to do a Daily Examen',
          morning: 'I want to pray Morning Prayer',
          evening: 'I want to pray Evening Prayer',
          breath: 'I want to do a Breath Prayer',
          meditation: 'I want to do a Guided Meditation',
          readings: 'What are today\'s readings?',
          saint: 'Who is the saint of today?',
          novena: 'Show me my active novenas',
          'divine-office': 'I want to pray the Divine Office',
        };
        setInput(prompts[prayerId] || prayerId);
      }

      // Notify parent that prayer was handled
      if (onPrayerHandled) {
        onPrayerHandled();
      }
    }
  }, [triggerPrayer, onPrayerHandled]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'streaming') return;

    const userMessage = input.trim();
    setInput('');
    setShowSuggestions(false);
    setStatus('submitted');

    // Add user message to the list
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: '',
      parts: [{ type: 'text' as const, text: userMessage }],
    };

    setMessages(prev => [...prev, userMsg]);

    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        console.error('No session token found');
        return;
      }

      // Prepare messages in the format expected by the backend
      const messagesPayload = messages.concat([userMsg]).map(msg => ({
        role: msg.role,
        content: msg.parts?.[0]?.text || msg.content || '',
        parts: msg.parts,
      }));

      const response = await fetch(`${PUBLIC_BASE_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messagesPayload,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setStatus('streaming');

      // Create AI message placeholder
      const aiMsgId = (Date.now() + 1).toString();
      const aiMsg: Message = {
        id: aiMsgId,
        role: 'assistant',
        content: '',
        parts: [{ type: 'text' as const, text: '' }],
      };

      setMessages(prev => [...prev, aiMsg]);

      // Read the stream
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let assistantText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Parse AI SDK data stream format: 0:"text"1:"more text"
        const lines = buffer.split(/(?=0:|1:|2:)/);
        buffer = lines.pop() || ''; // Keep incomplete chunk in buffer

        for (const line of lines) {
          if (!line) continue;

          // Extract the content from the format: 0:"content" or 1:"content"
          const match = line.match(/^[012]:"(.*)"(?:,"[0-9]+:")?$/s);
          if (match) {
            const content = match[1]
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, '\\')
              .replace(/\\n/g, '\n');
            assistantText += content;

            // Update the AI message with the accumulated text
            setMessages(prev => prev.map(msg => {
              if (msg.id === aiMsgId) {
                return {
                  ...msg,
                  content: assistantText,
                  parts: [{ type: 'text' as const, text: assistantText }],
                };
              }
              return msg;
            }));
          }
        }
      }

      setStatus('ready');
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('ready');
    }
  }, [input, status, messages, PUBLIC_BASE_API_URL]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  }, []);

  const handleAgeSelection = useCallback(async (ageGroupId: string, label: string) => {
    // Save to localStorage
    localStorage.setItem('user_age_group', ageGroupId);

    // Update the age banner at the top of the page
    if (typeof window !== 'undefined' && (window as any).updateAgeBanner) {
      (window as any).updateAgeBanner();
    }

    // Set the input for user to review and send
    setInput(label);
    setShowAgePrompt(false);
    setHasCollectedAge(true);

    // Try to save to backend if token exists
    try {
      const token = localStorage.getItem('session_token');
      if (token) {
        await fetch(`${PUBLIC_BASE_API_URL}/api/user/profile`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ageGroup: ageGroupId })
        });
      }
    } catch (error) {
      console.error('Failed to save age group:', error);
    }
  }, [PUBLIC_BASE_API_URL]);

  const toggleSuggestions = useCallback(() => {
    setShowSuggestions(prev => !prev);
  }, []);

  const handleCatholicMenuItemSelection = useCallback((category: string, item: any) => {
    // Create a query about the selected item
    const query = `Tell me about ${item.title}${item.description ? ` - ${item.description}` : ''}`;

    // If there are prayers, add them to the content
    let fullContent = query;
    if (item.prayers && item.prayers.length > 0) {
      fullContent = `${query}\n\nPrayers:\n${item.prayers.join('\n\n')}`;
    }

    // Set the input for user to review and send
    setInput(fullContent);
    setShowSuggestions(false);
  }, []);

  // Handle daily check-in dismiss
  const handleCheckinDismiss = useCallback(() => {
    setShowDailyCheckin(false);
  }, []);

  // Handle daily check-in completion
  const handleCheckinComplete = useCallback((data: any) => {
    // Check-in is automatically registered, no message shown in chat
    setShowDailyCheckin(false);
    setShowSuggestions(false);

    // Save check-in date to localStorage
    localStorage.setItem('last_checkin_date', new Date().toISOString().split('T')[0]);
  }, []);

  // Handle quick prayer selection
  const handleQuickPrayer = useCallback((prayerId: string) => {
    const prompts: Record<string, string> = {
      rosary: 'I want to pray the Rosary',
      examen: 'I want to do a Daily Examen',
      morning: 'I want to pray Morning Prayer',
      evening: 'I want to pray Evening Prayer',
      breath: 'I want to do a Breath Prayer',
      meditation: 'I want to do a Guided Meditation',
      readings: 'What are today\'s readings?',
      saint: 'Who is the saint of today?',
      novena: 'Show me my active novenas',
      'divine-office': 'I want to pray the Divine Office',
    };

    const prompt = prompts[prayerId];
    if (prompt) {
      setInput(prompt);
      setShowQuickPrayers(false);
    }
  }, []);

  return (
    <div id='chatbox' className="flex flex-col h-full bg-gradient-to-br from-amber-50/50 to-orange-50/50">
      <Conversation className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 pb-20">
        <ConversationContent>
          {/* Daily Check-in - shown at the top when no messages */}
          {messages.length === 0 && showDailyCheckin && (
            <DailyCheckin
              onComplete={handleCheckinComplete}
              onDismiss={handleCheckinDismiss}
              compact={true}
            />
          )}

          {/* Daily Verse - shown when no messages */}
          {messages.length === 0 && !showAgePrompt && !showDailyCheckin && (
            <div className="mb-6">
              <DailyVerse />
            </div>
          )}

          {/* Welcome message when no messages */}
          {messages.length === 0 && !showAgePrompt && !showDailyCheckin && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🙏</div>
              <h3 className="font-playfair text-2xl text-gray-800 mb-2">Welcome, friend!</h3>
              <p className="font-geist text-gray-600">Share what's on your heart. I'm here to listen and help you grow in faith.</p>
            </div>
          )}

          {messages.map((message) => (
            <MessageComponent key={message.id} from={message.role === 'user' ? 'user' : 'ai'}>
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
                        <ReasoningTrigger title="✨ Reflecting..." />
                        <ReasoningContent>
                          <div className="whitespace-pre-wrap font-geist text-[var(--color-stone-600)]">{part.text}</div>
                        </ReasoningContent>
                      </Reasoning>
                    );
                  }

                  return null;
                })}
              </MessageContent>
            </MessageComponent>
          ))}

          {/* Age Collection Prompt */}
          {showAgePrompt && (
            <MessageComponent from="ai">
              <MessageContent>
                <Response>
                  Hey there! 👋 So happy to meet you! I'm Spirit, and I'm super excited to explore faith with you! Quick question - which age group do you fall into? It just helps me chat with you in a way that feels right for you! ✨
                </Response>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {ageOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAgeSelection(option.id, option.label)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border-2 border-[var(--color-stone-200)] hover:border-[var(--color-primary)] hover:bg-[var(--color-stone-50)] transition-all text-left font-geist tracking-tight text-sm"
                    >
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-[var(--color-stone-700)]">{option.label}</span>
                    </button>
                  ))}
                </div>
              </MessageContent>
            </MessageComponent>
          )}

          {(status === 'submitted' || status === 'streaming') && <Loader />}
          <div ref={messagesEndRef} />
        </ConversationContent>
      </Conversation>

      {/* Suggestions - collapsible accordion */}
      {status !== 'streaming' && status !== 'submitted' && (
        <div className="border-t border-gray-100 bg-white/80 backdrop-blur-sm">
          {/* Accordion Header */}
          <button
            onClick={toggleSuggestions}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-amber-50/50 transition-colors"
          >
            <span className="text-sm text-gray-700 font-medium tracking-tight font-geist">
              {messages.length === 0 ? '✨ Ideas to get started' : '💭 Continue exploring'}
            </span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showSuggestions ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              showSuggestions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 pb-4">
              <Suggestions className="justify-center">
                {(messages.length === 0 ? personalizedSuggestions : [
                  "Explore the Catechism with me",
                  "Tell me about inspiring Saints",
                  ...personalizedSuggestions.slice(0, 4)
                ]).map((question) => (
                  <Suggestion
                    key={question}
                    suggestion={question}
                    onClick={handleSuggestionClick}
                  />
                ))}
              </Suggestions>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-gray-100 p-4 pb-20 bg-white/80 backdrop-blur-sm">
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
            placeholder="Share what's on your heart..."
            rows={2}
            className="flex-1 w-full resize-none border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all font-geist text-gray-700 placeholder:text-gray-400 bg-white"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={status === 'streaming' || !input?.trim()}
            className="flex items-center justify-center w-12 h-12 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 shrink-0 bg-gradient-to-br from-amber-500 to-orange-600"
          >
            {status === 'streaming' ? <SpinnerIcon /> : <SendIcon />}
          </button>
        </form>
      </div>
    </div>
  );
}
