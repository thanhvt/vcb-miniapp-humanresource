// Safe handling of RNBootSplash module
let RNBootSplash;
try {
  RNBootSplash = require('react-native-bootsplash');
} catch (error) {
  // Module not available or not properly linked
  console.warn('RNBootSplash module not available:', error);
  RNBootSplash = {
    hide: () => {},
    show: () => {},
    getVisibilityStatus: () => Promise.resolve('hidden')
  };
}

export const hideSplashScreen = () => {
  try {
    RNBootSplash.hide({fade: true});
  } catch (error) {
    console.warn('Error hiding splash screen:', error);
  }
};
