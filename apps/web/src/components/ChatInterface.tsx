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
import DailyVerse from './bible-chat/DailyVerse';
import { speechSupported, startListening, speak, stopSpeaking } from './voice';

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
  "What does Jesus say about worry?",
  "Help me pray when I don't have words",
  "A verse for when I feel alone",
  "What's a simple prayer for today?",
  "I'm stressed and could use some encouragement",
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

interface ConversationMeta {
  id: string;
  title: string;
  updated_at: string;
}

// Groups a conversation's update time into ChatGPT-style buckets
function conversationGroup(iso: string): string {
  const t = new Date(iso).getTime();
  if (isNaN(t)) return 'Older';
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const day = 86400000;
  const start = startOfToday.getTime();
  if (t >= start) return 'Today';
  if (t >= start - day) return 'Yesterday';
  if (t >= start - 7 * day) return 'Previous 7 days';
  if (t >= start - 30 * day) return 'Previous 30 days';
  return 'Older';
}

function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (isNaN(t)) return '';
  const mins = Math.floor((Date.now() - t) / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(t).toLocaleDateString();
}

export default function ChatInterface() {
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
  const [showDailyVerse, setShowDailyVerse] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationList, setConversationList] = useState<ConversationMeta[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice: talk to Spirit with the mic, hear Spirit's replies read aloud.
  // With "voice conversation" on, whatever you say is sent automatically
  // when you finish speaking, and Spirit reads every reply aloud.
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const hasSpeech = speechSupported();

  // Voice-conversation mode (auto-send what you say + auto-read replies).
  // Persisted so the choice sticks between visits; on by default so the
  // first mic tap starts a real spoken conversation.
  const [autoVoice, setAutoVoice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('spirit_voice_auto') !== '0';
  });
  const autoVoiceRef = useRef(autoVoice);
  autoVoiceRef.current = autoVoice;
  // Latest final transcript heard by the mic, sent when recognition ends
  const voiceTextRef = useRef('');
  // Always-current handleSubmit, callable from recognition callbacks
  const handleSubmitRef = useRef<(e: React.FormEvent, overrideText?: string) => void>(() => {});

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop?.();
    recognitionRef.current = null;
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
      return;
    }
    stopSpeaking(); // never talk over each other
    setSpeakingMessageId(null);
    const lang = localStorage.getItem('app_language') || 'en';
    voiceTextRef.current = '';
    const rec = startListening(
      lang,
      (finalText) => {
        // Keep the newest words visible while Spirit keeps listening
        voiceTextRef.current = voiceTextRef.current
          ? `${voiceTextRef.current} ${finalText}`
          : finalText;
        setInterimTranscript('');
      },
      (interim) => setInterimTranscript(interim),
      () => {
        // Recognition ended (silence or stop) — send what was heard, no
        // send-button tap needed. Falls back to the composer if it can't send.
        const finalText = voiceTextRef.current.trim();
        voiceTextRef.current = '';
        setIsListening(false);
        setInterimTranscript('');
        if (finalText) {
          // Show the words in the composer; handleSubmit clears it on send,
          // and if Spirit is still mid-reply the text stays for one tap.
          setInput(finalText);
          handleSubmitRef.current({ preventDefault() {} } as unknown as React.FormEvent, finalText);
        }
      },
    );
    if (rec) {
      recognitionRef.current = rec;
      setIsListening(true);
    }
  }, [isListening, stopListening]);

  const toggleSpeakMessage = useCallback((id: string, text: string) => {
    if (speakingMessageId === id) {
      stopSpeaking();
      setSpeakingMessageId(null);
      return;
    }
    stopListening(); // can't listen and hear at the same time
    const lang = localStorage.getItem('app_language') || 'en';
    if (speak(text, lang, () => setSpeakingMessageId((cur) => (cur === id ? null : cur)))) {
      setSpeakingMessageId(id);
    } else {
      setSpeakingMessageId(null);
    }
  }, [speakingMessageId, stopListening]);

  const toggleAutoVoice = useCallback(() => {
    setAutoVoice((v) => {
      const next = !v;
      localStorage.setItem('spirit_voice_auto', next ? '1' : '0');
      if (!next) {
        stopSpeaking();
        setSpeakingMessageId(null);
      }
      return next;
    });
  }, []);

  // Clean up speech when the chat unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
      recognitionRef.current?.stop?.();
    };
  }, []);

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

  // Fetch the user's saved chats for the history drawer
  const fetchConversations = useCallback(async () => {
    try {
      const token = localStorage.getItem('session_token');
      if (!token) return;

      const response = await fetch(`${PUBLIC_BASE_API_URL}/api/conversations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setConversationList(data.conversations || []);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  }, [PUBLIC_BASE_API_URL]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Header history button toggles the drawer (via custom event from chat.astro)
  useEffect(() => {
    const toggle = () => {
      setSidebarOpen((open) => {
        if (!open) fetchConversations();
        return !open;
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('toggle-chat-sidebar', toggle);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('toggle-chat-sidebar', toggle);
      window.removeEventListener('keydown', onKey);
    };
  }, [fetchConversations]);

  // Open a saved chat
  const loadConversation = useCallback(async (id: string) => {
    setLoadingConversation(true);
    try {
      const token = localStorage.getItem('session_token');
      if (!token) return;

      const response = await fetch(`${PUBLIC_BASE_API_URL}/api/conversations/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) return;

      const data = await response.json();
      let rawMessages = data.conversation?.messages ?? [];
      if (typeof rawMessages === 'string') {
        try { rawMessages = JSON.parse(rawMessages); } catch { rawMessages = []; }
      }
      const loaded: Message[] = rawMessages.map((m: any, i: number) => {
        const text = m.content || m.parts?.[0]?.text || '';
        return {
          id: `${id}-${i}`,
          role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
          content: text,
          parts: m.parts?.length ? m.parts : [{ type: 'text' as const, text }],
        };
      });

      setMessages(loaded);
      setConversationId(id);
      setShowAgePrompt(false);
      setShowSuggestions(false);
      setSidebarOpen(false);
    } catch (error) {
      console.error('Failed to load conversation:', error);
    } finally {
      setLoadingConversation(false);
    }
  }, [PUBLIC_BASE_API_URL]);

  // Start a fresh chat
  const newChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setShowAgePrompt(false);
    setShowSuggestions(false);
    setShowDailyVerse(true);
    setSidebarOpen(false);
    stopSpeaking();
    setSpeakingMessageId(null);
  }, []);

  // Delete a saved chat
  const deleteConversation = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem('session_token');
      if (!token) return;

      await fetch(`${PUBLIC_BASE_API_URL}/api/conversations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setConversationList((prev) => prev.filter((c) => c.id !== id));
      if (id === conversationId) {
        setMessages([]);
        setConversationId(null);
        setShowDailyVerse(true);
      }
    } catch (error) {
      console.error('Failed to delete conversation:', error);
    }
  }, [PUBLIC_BASE_API_URL, conversationId]);

  // Accepts an optional overrideText so voice input can auto-send what was
  // heard without racing the (stale) composer state.
  const handleSubmit = useCallback(async (e: React.FormEvent, overrideText?: string) => {
    e.preventDefault();
    if ((!overrideText && !input.trim()) || status === 'streaming') return;

    stopSpeaking(); // pause any read-aloud when the user speaks
    setSpeakingMessageId(null);

    const userMessage = (overrideText ?? input).trim();
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

      // Reuse the open conversation, or start one with a client-generated id
      // that the backend upserts on first save
      let convId = conversationId;
      if (!convId) {
        convId = crypto.randomUUID();
        setConversationId(convId);
      }

      const response = await fetch(`${PUBLIC_BASE_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messagesPayload,
          conversationId: convId,
          language: (typeof window !== 'undefined' && localStorage.getItem('app_language')) || 'en',
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
      fetchConversations();

      // Voice conversation: Spirit reads the finished reply aloud so the
      // exchange feels like two voices, not a screenful of text.
      if (autoVoiceRef.current && assistantText.trim()) {
        const lang = (typeof window !== 'undefined' && localStorage.getItem('app_language')) || 'en';
        if (speak(assistantText, lang, () => setSpeakingMessageId((cur) => (cur === aiMsgId ? null : cur)))) {
          setSpeakingMessageId(aiMsgId);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('ready');
    }
  }, [input, status, messages, conversationId, fetchConversations, PUBLIC_BASE_API_URL]);

  // Keep the ref pointing at the latest handleSubmit (fresh `input`, `status`)
  handleSubmitRef.current = handleSubmit;

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    // Auto-submit the suggestion
    setTimeout(() => {
      const syntheticEvent = new Event('submit', { cancelable: true }) as any;
      syntheticEvent.preventDefault = () => {};
      handleSubmit(syntheticEvent);
    }, 100);
  }, [handleSubmit]);

  const handleAgeSelection = useCallback(async (ageGroupId: string, label: string) => {
    // Save to localStorage
    localStorage.setItem('user_age_group', ageGroupId);

    // Update the age banner at the top of the page
    if (typeof window !== 'undefined' && (window as any).updateAgeBanner) {
      (window as any).updateAgeBanner();
    }

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

    // Auto-send a message to Spirit acknowledging the age group
    const greeting = `Hi! I'm ${label.split('!')[0].trim()}. I'm excited to explore faith with you!`;
    setInput(greeting);

    // Auto-submit after a short delay
    setTimeout(() => {
      const syntheticEvent = new Event('submit', { cancelable: true }) as any;
      syntheticEvent.preventDefault = () => {};
      handleSubmit(syntheticEvent);
    }, 500);
  }, [PUBLIC_BASE_API_URL, handleSubmit]);

  const toggleSuggestions = useCallback(() => {
    setShowSuggestions(prev => !prev);
  }, []);

  return (
    <div id='chatbox' className="flex flex-col h-full relative bg-transparent">
      <Conversation className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
        <ConversationContent>
          {/* Daily Verse - shown when no messages */}
          {messages.length === 0 && !showAgePrompt && showDailyVerse && (
            <div className="mb-6">
              <DailyVerse onClose={() => setShowDailyVerse(false)} />
            </div>
          )}

          {/* Welcome message when no messages */}
          {messages.length === 0 && !showAgePrompt && (
            <div className="text-center py-8">
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

              {/* Listen to Spirit's reply */}
              {message.role === 'assistant' &&
                message.parts?.some((p) => p.type === 'text' && p.text?.trim()) && (
                <button
                  onClick={() => {
                    const text = message.parts
                      .filter((p) => p.type === 'text')
                      .map((p) => p.text)
                      .join(' ');
                    toggleSpeakMessage(message.id, text);
                  }}
                  className={`self-end mb-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    speakingMessageId === message.id
                      ? 'bg-[#e8a24c]/20 text-[#b97a2e]'
                      : 'text-gray-400 hover:text-[#3d6e9e] hover:bg-white/80'
                  }`}
                  aria-label={speakingMessageId === message.id ? 'Stop reading' : 'Listen to this message'}
                >
                  {speakingMessageId === message.id ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    </svg>
                  )}
                </button>
              )}
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
        <div className="border-t border-white/60 bg-white/55 backdrop-blur-xl">
          {/* Accordion Header */}
          <button
            onClick={toggleSuggestions}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#f4f7fc]/40 transition-colors"
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
                  "What does the Bible say about my situation?",
                  "Help me pray about what's on my mind",
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

      <div className="border-t border-white/60 p-4 pb-20 bg-white/55 backdrop-blur-xl">
        {/* Live transcript while the mic is listening */}
        {isListening && (
          <div className="mb-2 flex items-start gap-2 px-4 py-2.5 rounded-2xl bg-white/85 border border-[#e8a24c]/40 shadow-sm">
            <span className="relative flex h-3 w-3 mt-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8a24c] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e8a24c]"></span>
            </span>
            <span className="text-sm text-gray-600 font-geist italic flex-1">
              {interimTranscript
                ? `${interimTranscript}…`
                : autoVoice
                  ? "Listening… I'll send your message when you pause ✨"
                  : "Listening… speak what's on your heart"}
            </span>
          </div>
        )}
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
            className="flex-1 w-full resize-none border border-white/70 rounded-2xl px-4 py-3 focus:outline-none focus:border-[#e8a24c] focus:ring-2 focus:ring-[#e8a24c]/35 transition-all font-geist text-gray-700 placeholder:text-gray-400 bg-white/75 shadow-sm"
          />

          {/* Voice-conversation toggle: Spirit auto-sends your speech and
              reads every reply aloud, like a real conversation */}
          {hasSpeech && (
            <button
              type="button"
              onClick={toggleAutoVoice}
              className={`flex items-center justify-center w-10 h-12 rounded-full shrink-0 transition-all duration-200 ${
                autoVoice
                  ? 'text-[#d89135]'
                  : 'text-gray-400 hover:text-[#3d6e9e]'
              }`}
              aria-label={autoVoice ? 'Voice conversation on — Spirit reads replies aloud' : 'Voice conversation off'}
              title={autoVoice ? 'Voice conversation: on (tap to mute Spirit)' : 'Voice conversation: off (tap to hear Spirit)'}
            >
              {autoVoice ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              )}
            </button>
          )}

          {/* Microphone: talk to Spirit */}
          {hasSpeech && (
            <button
              type="button"
              onClick={toggleListening}
              className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 transition-all duration-200 shadow-md hover:shadow-lg shrink-0 ${
                isListening
                  ? 'bg-gradient-to-br from-[#e8a24c] to-[#d89135] text-white animate-pulse'
                  : 'bg-white/85 text-[#3d6e9e] border border-white/80 hover:scale-105'
              }`}
              aria-label={isListening ? 'Stop listening' : 'Speak to Spirit'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
          )}

          {/* Send Button */}
          <button
            type="submit"
            disabled={status === 'streaming' || !input?.trim()}
            className="flex items-center justify-center w-12 h-12 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 shrink-0 bg-gradient-to-br from-[#3d6e9e] to-[#6e9cc4]"
          >
            {status === 'streaming' ? <SpinnerIcon /> : <SendIcon />}
          </button>
        </form>
      </div>

      {/* Saved-chats drawer (ChatGPT-style history) */}
      <div className={`fixed inset-0 z-[60] ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl border-r border-gray-200/70 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 pt-5 pb-2">
            <h2 className="font-playfair text-lg text-gray-800">Your chats</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all"
              aria-label="Close chat history"
            >
              ✕
            </button>
          </div>

          {/* New chat */}
          <div className="px-3 pb-1">
            <button
              onClick={newChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3d6e9e] to-[#6e9cc4] text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.01] transition-all font-geist"
            >
              ✨ New chat
            </button>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto px-3 pb-6">
            {conversationList.length === 0 ? (
              <p className="text-sm text-gray-400 px-2 pt-6 text-center font-geist">
                No saved chats yet. Your conversations will appear here. 🕊️
              </p>
            ) : (
              ['Today', 'Yesterday', 'Previous 7 days', 'Previous 30 days', 'Older'].map((group) => {
                const items = conversationList.filter((c) => conversationGroup(c.updated_at) === group);
                if (items.length === 0) return null;
                return (
                  <div key={group} className="mt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-1 font-geist">
                      {group}
                    </p>
                    {items.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => loadConversation(c.id)}
                        className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                          c.id === conversationId ? 'bg-[#e4eef6]/80' : 'hover:bg-gray-100/80'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className={`text-sm truncate font-geist ${c.id === conversationId ? 'text-[#2a4a66] font-medium' : 'text-gray-700'}`}>
                            {c.title || 'New conversation'}
                          </p>
                          <p className="text-[11px] text-gray-400 font-geist">{relativeTime(c.updated_at)}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteConversation(c.id); }}
                          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all"
                          aria-label="Delete chat"
                        >
                          🗑
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
