/**
 * GradientWrapper.js
 * 
 * Provides a wrapper for LinearGradient that works in the micro-frontend environment
 * with inline fallbacks to avoid path resolution issues
 */

import React from 'react';
import { View } from 'react-native';

// Try to import from SafeModules first
let LinearGradientComponent;

try {
  // Try to import from our SafeModules
  const SafeModules = require('./SafeModules');
  LinearGradientComponent = SafeModules.SafeLinearGradient;
  console.log('Successfully loaded LinearGradient from SafeModules');
} catch (error) {
  console.warn('Failed to load LinearGradient from SafeModules:', error);
  
  // Try to import directly from react-native-linear-gradient
  try {
    LinearGradientComponent = require('react-native-linear-gradient').default;
    console.log('Successfully loaded LinearGradient from react-native-linear-gradient');
  } catch (importError) {
    console.warn('Failed to import from react-native-linear-gradient:', importError);
    
    // Fallback to a simple View component
    LinearGradientComponent = ({ style, children, colors = ['#fff', '#fff'] }) => {
      return (
        <View style={[style, { backgroundColor: colors[0] }]}>
          {children}
        </View>
      );
    };
    console.log('Using fallback LinearGradient component');
  }
}

// Export in the format that react-native-gifted-charts expects
export const LinearGradient = LinearGradientComponent;

// Also provide a default export for compatibility
export default LinearGradientComponent;
