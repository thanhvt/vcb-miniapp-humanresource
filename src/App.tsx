import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import {hideSplashScreen} from './utils/bootSplash';
import {theme} from './theme';

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
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;
