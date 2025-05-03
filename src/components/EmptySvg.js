/**
 * EmptySvg.js
 * 
 * This file provides empty implementations for SVG components
 * to prevent "Module not found" errors in the micro-frontend architecture.
 */

import React from 'react';
import { View, Text } from 'react-native';

// Create a simple component that renders nothing
const EmptyComponent = () => null;

// Create a component that renders its children in a View
const ContainerComponent = ({ children }) => <View>{children}</View>;

// Create a component that renders text
const TextComponent = ({ children }) => <Text>{children}</Text>;

// Export all the SVG components with empty implementations
module.exports = {
  Svg: ContainerComponent,
  Circle: EmptyComponent,
  Rect: EmptyComponent,
  Path: EmptyComponent,
  G: ContainerComponent,
  Defs: EmptyComponent,
  LinearGradient: ContainerComponent,
  RadialGradient: ContainerComponent,
  Stop: EmptyComponent,
  Text: TextComponent,
  Line: EmptyComponent
};
