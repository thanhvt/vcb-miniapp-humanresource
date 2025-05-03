/**
 * patchGiftedCharts.js
 * 
 * This script patches the react-native-gifted-charts library to use our custom wrappers
 * for LinearGradient and SVG components
 */

const fs = require('fs');
const path = require('path');

// Path to the LinearGradient.js file in react-native-gifted-charts
const linearGradientPath = path.resolve(
  __dirname,
  '../../node_modules/react-native-gifted-charts/dist/Components/common/LinearGradient.js'
);

// Note: We're only patching LinearGradient since we're using a custom SafePieChart component
// that doesn't rely on SVG components

// Our custom LinearGradient implementation
const patchedLinearGradientContent = `
// Patched by patchGiftedCharts.js
import React from 'react';
import { View } from 'react-native';

// Fallback LinearGradient component
const FallbackLinearGradient = ({ style, children, colors = ['#fff', '#fff'] }) => {
  return (
    <View style={[style, { backgroundColor: colors[0] }]}>
      {children}
    </View>
  );
};

// Try different ways to get LinearGradient
let LinearGradient;

try {
  // First try direct import
  LinearGradient = require('react-native-linear-gradient').default;
  console.log('Successfully loaded LinearGradient from react-native-linear-gradient');
} catch (error) {
  try {
    // Try expo version
    LinearGradient = require('expo-linear-gradient').LinearGradient;
    console.log('Successfully loaded LinearGradient from expo-linear-gradient');
  } catch (error) {
    // Use fallback
    LinearGradient = FallbackLinearGradient;
    console.log('Using fallback LinearGradient component');
  }
}

export default LinearGradient;
`;

// Write the patched LinearGradient file
fs.writeFileSync(linearGradientPath, patchedLinearGradientContent);
console.log(`Patched ${linearGradientPath}`);
