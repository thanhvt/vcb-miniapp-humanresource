import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';

export type MainStackParamList = {
  Tabs: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          zIndex: 999,
        },
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
    </Main.Navigator>
  );
};

export default MainNavigator;