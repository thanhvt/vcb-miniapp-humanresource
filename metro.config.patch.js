/**
 * metro.config.patch.js
 * 
 * This script patches the Metro bundler configuration to exclude problematic modules
 * from the bundle, preventing "Module not found" errors in the micro-frontend architecture.
 */

module.exports = {
  resolver: {
    blockList: [
      // Block the problematic PieChart module from react-native-gifted-charts
      /node_modules\/react-native-gifted-charts\/dist\/PieChart\/.*/,
    ],
    extraNodeModules: {
      // Provide empty implementations for problematic modules
      'react-native-svg': require.resolve('./src/components/EmptySvg'),
    },
  },
};
