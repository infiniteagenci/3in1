import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { AgePromptModal } from './AgePromptModal';
import { SuggestionsAccordion } from './SuggestionsAccordion';
import { useStorage } from '../../hooks/useStorage';
import { DEFAULT_SUGGESTIONS } from '../../utils/constants';
import { Colors, Spacing } from '../../utils/theme';

export function ChatScreen() {
  const flatListRef = useRef<FlatList>(null);
  const { messages, isStreaming, currentResponse, send, loadSuggestions } = useChat();
  const { user, updateUserAgeGroup } = useAuth();
  const { getAgeGroup, setAgeGroup, getLastCheckinDate, setLastCheckinDate, getSeenAgePrompt, setSeenAgePrompt } =
    useStorage();

  const [showAgePrompt, setShowAgePrompt] = useState(false);
  const [showDailyCheckin, setShowDailyCheckin] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(DEFAULT_SUGGESTIONS);

  useEffect(() => {
    checkAgeCollection();
    checkDailyCheckin();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      loadSuggestions().then(setSuggestions);
      scrollToBottom();
    }
  }, [messages.length]);

  const checkAgeCollection = async () => {
    const hasCollected = await getAgeGroup();
    const hasSeenPrompt = await getSeenAgePrompt();

    if (!hasCollected && !hasSeenPrompt && messages.length === 0) {
      setTimeout(() => setShowAgePrompt(true), 500);
      await setSeenAgePrompt();
    }
  };

  const checkDailyCheckin = async () => {
    const lastCheckin = await getLastCheckinDate();
    const today = new Date().toISOString().split('T')[0];

    if (lastCheckin !== today && messages.length === 0) {
      setTimeout(() => setShowDailyCheckin(true), 1000);
    }
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleSendMessage = async (text: string) => {
    Keyboard.dismiss();
    setShowSuggestions(false);
    await send(text);
  };

  const handleAgeSelect = async (ageGroupId: string) => {
    await setAgeGroup(ageGroupId);
    await updateUserAgeGroup(ageGroupId);
    setShowAgePrompt(false);
    const ageLabels: Record<string, string> = {
      child: "I'm a kid! 🎈",
      teen: 'Teen years! 🌈',
      'young-adult': 'Young adult ✨',
      adult: 'Adult life 🌿',
      midlife: 'Midlife journey 🌅',
      senior: 'Golden years 💫',
    };
    await send(ageLabels[ageGroupId]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={scrollToBottom}
        ListFooterComponent={
          isStreaming && currentResponse ? (
            <MessageBubble
              message={{
                id: 'streaming',
                role: 'assistant',
                content: currentResponse,
                parts: [{ type: 'text', text: currentResponse }],
              }}
              isStreaming
            />
          ) : null
        }
        ListHeaderComponent={
          showAgePrompt ? (
            <AgePromptModal onSelect={handleAgeSelect} visible={showAgePrompt} />
          ) : null
        }
        ListEmptyComponent={
          !showAgePrompt && !showDailyCheckin ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyGreeting}>
                {user?.name ? `Hi ${user.name.split(' ')[0]}! 👋` : 'Hi there! 👋'}
              </Text>
              <Text style={styles.emptySubtext}>Share what's on your heart...</Text>
            </View>
          ) : null
        }
      />

      {showDailyCheckin && (
        <View style={styles.checkinBanner}>
          <Text style={styles.checkinText}>Daily check-in ready!</Text>
          <TouchableOpacity
            style={styles.checkinButton}
            onPress={() => send('I want to do my daily check-in')}
          >
            <Text style={styles.checkinButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isStreaming && messages.length === 0 && !showAgePrompt && (
        <SuggestionsAccordion
          suggestions={suggestions}
          visible={showSuggestions}
          onToggle={() => setShowSuggestions(!showSuggestions)}
          onSelectSuggestion={handleSendMessage}
        />
      )}

      <ChatInput
        onSend={handleSendMessage}
        disabled={isStreaming}
        placeholder="Share what's on your heart..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messagesList: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyGreeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  checkinBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  checkinText: {
    fontSize: 14,
    color: Colors.text,
  },
  checkinButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  checkinButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

function Text({ style, children }: { style?: any; children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}
