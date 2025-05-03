/**
 * patchGiftedCharts.js
 * 
 * This script patches the react-native-gifted-charts library to use our custom LinearGradient wrapper
 */

const fs = require('fs');
const path = require('path');

// Path to the LinearGradient.js file in react-native-gifted-charts
const linearGradientPath = path.resolve(
  __dirname,
  '../../node_modules/react-native-gifted-charts/dist/Components/common/LinearGradient.js'
);

// Our custom implementation
const patchedContent = `
// Patched by patchGiftedCharts.js
var LinearGradient;

try {
  // Use our custom wrapper that handles both react-native-linear-gradient and expo-linear-gradient
  LinearGradient = require('../../../src/utils/GradientWrapper').LinearGradient;
  console.log('Successfully loaded LinearGradient from custom wrapper');
} catch (error) {
  console.warn('Failed to load custom LinearGradient wrapper:', error);
  
  // Fallback to original implementation
  try {
    LinearGradient = require('react-native-linear-gradient').default;
    console.log('Successfully loaded LinearGradient from react-native-linear-gradient');
  } catch (error) {
    try {
      LinearGradient = require('expo-linear-gradient').LinearGradient;
      console.log('Successfully loaded LinearGradient from expo-linear-gradient');
    } catch (error) {
      console.error('Error: Linear gradient is not installed', error);
    }
  }
}

export default LinearGradient;
`;

// Write the patched file
fs.writeFileSync(linearGradientPath, patchedContent);
console.log(`Patched ${linearGradientPath}`);
