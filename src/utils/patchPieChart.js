/**
 * patchPieChart.js
 * 
 * This script patches the react-native-gifted-charts PieChart component to use our custom SVG wrapper
 */

const fs = require('fs');
const path = require('path');

// Path to the PieChart main.js file
const pieChartPath = path.resolve(
  __dirname,
  '../../node_modules/react-native-gifted-charts/dist/PieChart/main.js'
);

// Read the original file
const originalContent = fs.readFileSync(pieChartPath, 'utf8');

// Replace the SVG import with inline fallbacks
const patchedContent = originalContent.replace(
  "import Svg, { Path, Circle, Text as SvgText, Defs, RadialGradient, Stop, G, Line, } from 'react-native-svg';",
  `// Patched by patchPieChart.js
import React from 'react';
import { View, Text as RNText } from 'react-native';

// Create fallback components
const FallbackSvg = ({ width, height, viewBox, style, children }) => (
  <View style={[{ width, height }, style]}>
    {children}
  </View>
);

const FallbackG = ({ children }) => <View>{children}</View>;
const FallbackText = ({ children }) => <RNText>{children}</RNText>;
const EmptyComponent = () => null;

// Try to import SVG components
let Svg, Path, Circle, SvgText, Defs, RadialGradient, Stop, G, Line;

try {
  // Try direct import
  const RNSvg = require('react-native-svg');
  Svg = RNSvg.Svg;
  Path = RNSvg.Path;
  Circle = RNSvg.Circle;
  SvgText = RNSvg.Text;
  Defs = RNSvg.Defs;
  RadialGradient = RNSvg.RadialGradient;
  Stop = RNSvg.Stop;
  G = RNSvg.G;
  Line = RNSvg.Line;
  console.log('Successfully loaded SVG components from react-native-svg');
} catch (error) {
  console.error('Error: SVG components are not installed', error);
  // Provide fallback components
  Svg = FallbackSvg;
  Path = EmptyComponent;
  Circle = EmptyComponent;
  SvgText = FallbackText;
  Defs = EmptyComponent;
  RadialGradient = EmptyComponent;
  Stop = EmptyComponent;
  G = FallbackG;
  Line = EmptyComponent;
  console.log('Using fallback SVG components');
}`
);

// Write the patched file
fs.writeFileSync(pieChartPath, patchedContent);
console.log(`Patched ${pieChartPath}`);
