import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import {hideSplashScreen} from './utils/bootSplash';
import {theme} from './theme';
import {StatusBar, Platform, View} from 'react-native';

const App = () => {
  useEffect(() => {
    // Hide the splash screen after a short delay
    const timer = setTimeout(() => {
      hideSplashScreen();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar 
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

// Export the standard App component for standalone usage
export default App;

// Export a component that just provides the necessary context for federation
export const AppWithProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <PaperProvider theme={theme}>
      {children}
    </PaperProvider>
  );
};
