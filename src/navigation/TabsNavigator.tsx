import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MD3Colors, useTheme} from 'react-native-paper';
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

interface TabBarIconProps {
  focused: boolean;
  color: string;
}

const getTabBarIcon = (name: string, focused: boolean, color: string) => {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      <Icon name={name} size={24} color={color} />
    </View>
  );
};

const Tabs = createBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  const theme = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'rgba(0,0,0,0.6)',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tabs.Screen
        name="PersonalNavigator"
        component={PersonalNavigator}
        options={{
          title: 'Thông tin',
          tabBarIcon: ({focused, color}: TabBarIconProps) => getTabBarIcon('account', focused, color),
        }}
      />
      <Tabs.Screen
        name="ContractNavigator"
        component={ContractNavigator}
        options={{
          title: 'Hợp đồng',
          tabBarIcon: ({focused, color}: TabBarIconProps) => getTabBarIcon('file-document', focused, color),
        }}
      />
      <Tabs.Screen
        name="IncomeNavigator"
        component={IncomeNavigator}
        options={{
          title: 'Thu nhập',
          tabBarIcon: ({focused, color}: TabBarIconProps) => getTabBarIcon('currency-usd', focused, color),
        }}
      />
      <Tabs.Screen
        name="PerformanceNavigator"
        component={PerformanceNavigator}
        options={{
          title: 'Hiệu suất',
          tabBarIcon: ({focused, color}: TabBarIconProps) => getTabBarIcon('chart-line', focused, color),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  tabBarItem: {
    height: 44,
  },
  iconContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginBottom: -8,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

export default TabsNavigator;
