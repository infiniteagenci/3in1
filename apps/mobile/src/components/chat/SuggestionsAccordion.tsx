import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../../utils/theme';

interface SuggestionsAccordionProps {
  suggestions: string[];
  visible: boolean;
  onToggle: () => void;
  onSelectSuggestion: (suggestion: string) => void;
}

export function SuggestionsAccordion({
  suggestions,
  visible,
  onToggle,
  onSelectSuggestion,
}: SuggestionsAccordionProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={onToggle}>
        <Text style={styles.headerText}>💭 Suggestions</Text>
        <Text style={styles.chevron}>{visible ? '▼' : '▶'}</Text>
      </TouchableOpacity>
      {visible && (
        <View style={styles.content}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestion}
              onPress={() => onSelectSuggestion(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  headerText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  chevron: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  suggestion: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  suggestionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
});
