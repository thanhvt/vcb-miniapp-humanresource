import { MD3LightTheme, configureFonts } from 'react-native-paper';
import { Platform } from 'react-native';

// VCB Brand Colors
const colors = {
  // Primary colors
  primary: '#4CAF50', // Light Green
  primaryDark: '#388E3C',
  primaryLight: '#81C784',
  
  // Secondary colors
  secondary: '#FFB81C', // VCB Gold
  secondaryDark: '#D99B00',
  secondaryLight: '#FFC64D',
  
  // Neutral colors with green tint
  background: '#F1F8E9', // Lightest green background
  surface: '#E8F5E9', // Light green surface
  surfaceVariant: '#C8E6C9', // Slightly darker green surface
  text: '#1A1A1A',
  textSecondary: '#2E7D32', // Dark green for secondary text
  border: '#A5D6A7', // Medium green for borders
  
  // Status colors
  success: '#2E7D32',
  warning: '#ED6C02',
  error: '#D32F2F',
  info: '#0288D1',
  
  // Additional UI colors
  disabled: '#BDBDBD',
  placeholder: '#9E9E9E',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

// Font configuration
const fontConfig = {
  displayLarge: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0,
    fontWeight: '400' as const,
    lineHeight: 40,
    fontSize: 32,
  },
  displayMedium: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0,
    fontWeight: '400' as const,
    lineHeight: 36,
    fontSize: 28,
  },
  displaySmall: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0,
    fontWeight: '400' as const,
    lineHeight: 32,
    fontSize: 24,
  },
  headlineLarge: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0,
    fontWeight: '400' as const,
    lineHeight: 28,
    fontSize: 20,
  },
  headlineMedium: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0.15,
    fontWeight: '400' as const,
    lineHeight: 24,
    fontSize: 18,
  },
  headlineSmall: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0.15,
    fontWeight: '400' as const,
    lineHeight: 22,
    fontSize: 16,
  },
  titleLarge: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif-medium',
      default: 'sans-serif-medium',
    }),
    letterSpacing: 0,
    fontWeight: '500' as const,
    lineHeight: 28,
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif-medium',
      default: 'sans-serif-medium',
    }),
    letterSpacing: 0.15,
    fontWeight: '500' as const,
    lineHeight: 24,
    fontSize: 16,
  },
  titleSmall: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif-medium',
      default: 'sans-serif-medium',
    }),
    letterSpacing: 0.1,
    fontWeight: '500' as const,
    lineHeight: 20,
    fontSize: 14,
  },
  labelLarge: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif-medium',
      default: 'sans-serif-medium',
    }),
    letterSpacing: 0.1,
    fontWeight: '500' as const,
    lineHeight: 20,
    fontSize: 14,
  },
  labelMedium: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif-medium',
      default: 'sans-serif-medium',
    }),
    letterSpacing: 0.5,
    fontWeight: '500' as const,
    lineHeight: 16,
    fontSize: 12,
  },
  labelSmall: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif-medium',
      default: 'sans-serif-medium',
    }),
    letterSpacing: 0.5,
    fontWeight: '500' as const,
    lineHeight: 16,
    fontSize: 11,
  },
  bodyLarge: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0.15,
    fontWeight: '400' as const,
    lineHeight: 24,
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0.25,
    fontWeight: '400' as const,
    lineHeight: 20,
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: Platform.select({
      web: 'Roboto, sans-serif',
      ios: 'System',
      android: 'sans-serif',
      default: 'sans-serif',
    }),
    letterSpacing: 0.4,
    fontWeight: '400' as const,
    lineHeight: 16,
    fontSize: 12,
  },
};

// Typography scale
const typography = {
  displayLarge: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  displayMedium: {
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  displaySmall: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  headlineSmall: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.15,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
};

// Common spacing units
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Border radius
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  round: 999,
};

// Shadow styles
export const shadows = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
} as const;

// Create custom theme
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  fonts: configureFonts({ config: fontConfig }),
  typography,
  spacing,
  borderRadius,
  shadows,
};

// Type definition for the theme
import type {MD3Theme} from 'react-native-paper';

export type Theme = MD3Theme;

export const appTheme = theme;
