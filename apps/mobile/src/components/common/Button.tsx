import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography } from '../../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  full?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  full = false,
}: ButtonProps) {
  const buttonStyle = [
    styles.button,
    variant === 'outline' && styles.buttonOutline,
    variant === 'secondary' && styles.buttonSecondary,
    disabled && styles.buttonDisabled,
    full && styles.buttonFull,
    style,
  ];

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? Colors.primary : '#fff'} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'outline' && styles.textOutline,
            variant === 'secondary' && styles.textSecondary,
          ]}
        >
          {title}
        </Text>
      )}
    </>
  );

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.9}
        style={buttonStyle}
      >
        <LinearGradient
          colors={Colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.gradientContent}>{content}</View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyle}
      activeOpacity={0.7}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    overflow: 'hidden',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.textSecondary,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
    borderColor: Colors.border,
  },
  buttonFull: {
    width: '100%',
  },
  gradientContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  text: {
    color: '#fff',
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  textOutline: {
    color: Colors.primary,
  },
  textSecondary: {
    color: '#fff',
  },
});
