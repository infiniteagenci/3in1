export const Colors = {
  primary: '#9333ea',
  primaryLight: '#a855f7',
  accentBlue: '#2563eb',
  accentBlueLight: '#3b82f6',
  background: '#fafaf9',
  card: '#ffffff',
  inputBackground: '#ffffff',
  text: '#1c1917',
  textSecondary: '#57534e',
  textTertiary: '#a8a29e',
  textLight: '#fafaf9',
  border: '#e7e5e4',
  borderFocused: '#9333ea',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  gradientPrimary: ['#9333ea', '#2563eb'],
  gradientGreen: ['#22c55e', '#10b981'],
  gradientAmber: ['#f59e0b', '#f97316'],
  gradientRose: ['#f43f5e', '#ec4899'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
