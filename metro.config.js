/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  
  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs', 'mjs'],
      blockList: [
        // Block the problematic PieChart module from react-native-gifted-charts
        /node_modules\/react-native-gifted-charts\/dist\/PieChart\/.*/,
      ],
      extraNodeModules: {
        // Provide empty implementations for problematic modules
        'react-native-svg': require.resolve('./src/components/EmptySvg'),
      },
    },
    transformer: {
      ...defaultConfig.transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: true,
          inlineRequires: true,
        },
      }),
    },
  };
})();
