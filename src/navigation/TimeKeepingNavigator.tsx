import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator();

const TimeKeepingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TimeKeeping Screen</Text>
    </View>
  );
};

const TimeKeepingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TimeKeepingScreen"
        component={TimeKeepingScreen}
        options={{
          title: 'Chấm công',
        }}
      />
    </Stack.Navigator>
  );
};

export default TimeKeepingNavigator;
