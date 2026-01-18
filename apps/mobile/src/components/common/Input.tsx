import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '../../utils/theme';

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  style?: any;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  style,
  multiline = false,
  numberOfLines = 1,
  editable = true,
}: InputProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.textTertiary}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      multiline={multiline}
      numberOfLines={numberOfLines}
      editable={editable}
      style={[styles.input, multiline && styles.inputMultiline, !editable && styles.inputDisabled, style]}
      textAlignVertical={multiline ? 'top' : 'center'}
      textBreakStrategy="simple"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.inputBackground,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.fontSize.md,
    color: Colors.text,
    minHeight: 48,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: Spacing.md,
  },
  inputDisabled: {
    backgroundColor: Colors.background,
    color: Colors.textTertiary,
  },
});
