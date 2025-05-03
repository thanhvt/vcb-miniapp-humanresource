/**
 * SVGWrapper.js
 * 
 * Provides safe SVG components for react-native-gifted-charts
 * with inline fallbacks to avoid path resolution issues
 */

import React from 'react';
import { View, Text as RNText } from 'react-native';

// Initialize component variables
let SvgComponent;
let CircleComponent;
let RectComponent;
let PathComponent;
let GComponent;
let DefsComponent;
let LinearGradientComponent;
let StopComponent;
let TextComponent;

try {
  // Try to import from our SafeModules
  const SafeModules = require('./SafeModules');
  SvgComponent = SafeModules.SafeSvg;
  CircleComponent = SafeModules.SafeCircle;
  RectComponent = SafeModules.SafeRect;
  PathComponent = SafeModules.SafePath;
  GComponent = SafeModules.SafeG;
  DefsComponent = SafeModules.SafeDefs;
  LinearGradientComponent = SafeModules.SafeLinearGradientSvg;
  StopComponent = SafeModules.SafeStop;
  TextComponent = SafeModules.SafeSvgText;
  console.log('Successfully loaded SVG components from SafeModules');
} catch (error) {
  console.warn('Failed to load SVG components from SafeModules:', error);
  
  // Try to import directly from react-native-svg
  try {
    const RNSvg = require('react-native-svg');
    SvgComponent = RNSvg.Svg;
    CircleComponent = RNSvg.Circle;
    RectComponent = RNSvg.Rect;
    PathComponent = RNSvg.Path;
    GComponent = RNSvg.G;
    DefsComponent = RNSvg.Defs;
    LinearGradientComponent = RNSvg.LinearGradient;
    StopComponent = RNSvg.Stop;
    TextComponent = RNSvg.Text;
    console.log('Successfully loaded SVG components from react-native-svg');
  } catch (importError) {
    console.warn('Failed to import from react-native-svg:', importError);
    
    // Fallback to simple components
    SvgComponent = ({ width, height, viewBox, style, children }) => (
      <View style={[{ width, height }, style]}>
        <RNText style={{ textAlign: 'center', marginTop: 20 }}>SVG not available</RNText>
        {children}
      </View>
    );
    
    CircleComponent = () => null;
    RectComponent = () => null;
    PathComponent = () => null;
    GComponent = ({ children }) => <View>{children}</View>;
    DefsComponent = () => null;
    LinearGradientComponent = () => null;
    StopComponent = () => null;
    TextComponent = ({ children }) => <RNText>{children}</RNText>;
    console.log('Using fallback SVG components');
  }
}

// Export all SVG components with their expected names
export const Svg = SvgComponent;
export const Circle = CircleComponent;
export const Rect = RectComponent;
export const Path = PathComponent;
export const G = GComponent;
export const Defs = DefsComponent;
export const LinearGradient = LinearGradientComponent;
export const RadialGradient = LinearGradientComponent; // Use LinearGradient as fallback
export const Stop = StopComponent;
export const Text = TextComponent;
export const Line = PathComponent; // Use Path as fallback for Line
