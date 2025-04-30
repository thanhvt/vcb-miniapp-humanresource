import React from 'react';

import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import {MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PersonalNavigator from './PersonalNavigator';
import ContractNavigator from './ContractNavigator';
import IncomeNavigator from './IncomeNavigator';
import PerformanceNavigator from './PerformanceNavigator';

export type TabsParamList = {
  PersonalNavigator: undefined;
  ContractNavigator: undefined;
  IncomeNavigator: undefined;
  PerformanceNavigator: undefined;
};

const personIcon = Icon.getImageSourceSync('account', 24);
const contractIcon = Icon.getImageSourceSync('file-document', 24);
const incomeIcon = Icon.getImageSourceSync('currency-usd', 24);
const performanceIcon = Icon.getImageSourceSync('chart-line', 24);

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator tabBarActiveTintColor={MD3Colors.primary50}>
      <Tabs.Screen
        name="PersonalNavigator"
        component={PersonalNavigator}
        options={{
          title: 'Thông tin',
          tabBarIcon: () => personIcon,
        }}
      />
      <Tabs.Screen
        name="ContractNavigator"
        component={ContractNavigator}
        options={{
          title: 'Hợp đồng',
          tabBarIcon: () => contractIcon,
        }}
      />
      <Tabs.Screen
        name="IncomeNavigator"
        component={IncomeNavigator}
        options={{
          title: 'Thu nhập',
          tabBarIcon: () => incomeIcon,
        }}
      />
      <Tabs.Screen
        name="PerformanceNavigator"
        component={PerformanceNavigator}
        options={{
          title: 'Hiệu suất',
          tabBarIcon: () => performanceIcon,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
