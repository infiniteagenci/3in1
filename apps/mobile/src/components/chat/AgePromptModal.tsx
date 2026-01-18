import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AGE_OPTIONS } from '../../utils/constants';
import { Colors, Spacing, BorderRadius, Typography } from '../../utils/theme';

interface AgePromptModalProps {
  visible: boolean;
  onSelect: (ageGroupId: string) => void;
}

export function AgePromptModal({ visible, onSelect }: AgePromptModalProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👋 Welcome!</Text>
        <Text style={styles.subtitle}>
          Hey there! I'm Spirit, and I'm excited to explore faith with you! Quick
          question - which age group do you fall into? This helps me chat with you
          in a way that feels right for you! ✨
        </Text>
      </View>
      <View style={styles.grid}>
        {AGE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.ageOption}
            onPress={() => onSelect(option.id)}
          >
            <Text style={styles.ageIcon}>{option.icon}</Text>
            <Text style={styles.ageLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    backgroundColor: Colors.card,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  ageOption: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  ageIcon: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  ageLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
    textAlign: 'center',
  },
});
