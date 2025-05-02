import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator();

const LeaveScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Leave Screen</Text>
    </View>
  );
};

const LeaveNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LeaveScreen"
        component={LeaveScreen}
        options={{
          title: 'Nghỉ phép',
        }}
      />
    </Stack.Navigator>
  );
};

export default LeaveNavigator;
