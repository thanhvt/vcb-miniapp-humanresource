import { StyleSheet } from 'react-native';
import { theme, spacing, shadows, borderRadius } from './theme';

// Common layout styles
export const layout = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  wrap: {
    flexWrap: 'wrap',
  },
});

// Common container styles
export const containers = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  section: {
    marginVertical: spacing.md,
  },
});

// Common spacing styles
export const margin = {
  m0: { margin: 0 },
  m1: { margin: spacing.xs },
  m2: { margin: spacing.sm },
  m3: { margin: spacing.md },
  m4: { margin: spacing.lg },
  m5: { margin: spacing.xl },
  mv0: { marginVertical: 0 },
  mv1: { marginVertical: spacing.xs },
  mv2: { marginVertical: spacing.sm },
  mv3: { marginVertical: spacing.md },
  mv4: { marginVertical: spacing.lg },
  mv5: { marginVertical: spacing.xl },
  mh0: { marginHorizontal: 0 },
  mh1: { marginHorizontal: spacing.xs },
  mh2: { marginHorizontal: spacing.sm },
  mh3: { marginHorizontal: spacing.md },
  mh4: { marginHorizontal: spacing.lg },
  mh5: { marginHorizontal: spacing.xl },
  mt0: { marginTop: 0 },
  mt1: { marginTop: spacing.xs },
  mt2: { marginTop: spacing.sm },
  mt3: { marginTop: spacing.md },
  mt4: { marginTop: spacing.lg },
  mt5: { marginTop: spacing.xl },
  mb0: { marginBottom: 0 },
  mb1: { marginBottom: spacing.xs },
  mb2: { marginBottom: spacing.sm },
  mb3: { marginBottom: spacing.md },
  mb4: { marginBottom: spacing.lg },
  mb5: { marginBottom: spacing.xl },
};

export const padding = {
  p0: { padding: 0 },
  p1: { padding: spacing.xs },
  p2: { padding: spacing.sm },
  p3: { padding: spacing.md },
  p4: { padding: spacing.lg },
  p5: { padding: spacing.xl },
  pv0: { paddingVertical: 0 },
  pv1: { paddingVertical: spacing.xs },
  pv2: { paddingVertical: spacing.sm },
  pv3: { paddingVertical: spacing.md },
  pv4: { paddingVertical: spacing.lg },
  pv5: { paddingVertical: spacing.xl },
  ph0: { paddingHorizontal: 0 },
  ph1: { paddingHorizontal: spacing.xs },
  ph2: { paddingHorizontal: spacing.sm },
  ph3: { paddingHorizontal: spacing.md },
  ph4: { paddingHorizontal: spacing.lg },
  ph5: { paddingHorizontal: spacing.xl },
  pt0: { paddingTop: 0 },
  pt1: { paddingTop: spacing.xs },
  pt2: { paddingTop: spacing.sm },
  pt3: { paddingTop: spacing.md },
  pt4: { paddingTop: spacing.lg },
  pt5: { paddingTop: spacing.xl },
  pb0: { paddingBottom: 0 },
  pb1: { paddingBottom: spacing.xs },
  pb2: { paddingBottom: spacing.sm },
  pb3: { paddingBottom: spacing.md },
  pb4: { paddingBottom: spacing.lg },
  pb5: { paddingBottom: spacing.xl },
};

// Common typography styles
export const typography = StyleSheet.create({
  displayLarge: theme.typography.displayLarge,
  displayMedium: theme.typography.displayMedium,
  displaySmall: theme.typography.displaySmall,
  headlineLarge: theme.typography.headlineLarge,
  headlineMedium: theme.typography.headlineMedium,
  headlineSmall: theme.typography.headlineSmall,
  bodyLarge: theme.typography.bodyLarge,
  bodyMedium: theme.typography.bodyMedium,
  bodySmall: theme.typography.bodySmall,
});

// Common border styles
export const borders = {
  rounded0: { borderRadius: 0 },
  rounded1: { borderRadius: borderRadius.xs },
  rounded2: { borderRadius: borderRadius.sm },
  rounded3: { borderRadius: borderRadius.md },
  rounded4: { borderRadius: borderRadius.lg },
  rounded5: { borderRadius: borderRadius.xl },
  roundedFull: { borderRadius: borderRadius.round },
  separator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
};

// Helper function to create shadow styles
export const createShadow = (size: 'small' | 'medium' | 'large') => shadows[size] || {};

// Helper function to combine styles
export const combineStyles = (...styles: Array<any>) => {
  return styles.filter(Boolean);
};
