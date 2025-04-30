import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabsNavigator from './TabsNavigator';

export type MainStackParamList = {
  Tabs: undefined;
};

const Main = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
    </Main.Navigator>
  );
};

export default MainNavigator;
