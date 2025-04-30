import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import {hideSplashScreen} from './utils/bootSplash';

const App = () => {
  useEffect(() => {
    // Hide the splash screen after a short delay
    const timer = setTimeout(() => {
      hideSplashScreen();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
