import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import NavBar from '../components/NavBar';

// Placeholder screen components
const PerformanceDashboardScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Performance Dashboard</Text>
  </View>
);
const PMSDetailsScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>PMS Details</Text>
  </View>
);
const KPIDetailsScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>KPI Details</Text>
  </View>
);
const PerformanceHistoryScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Performance History</Text>
  </View>
);

export type PerformanceStackParamList = {
  PerformanceDashboard: undefined;
  PMSDetails: { period: string; periodType: 'month' | 'quarter' | 'year' };
  KPIDetails: { kpiId: string };
  PerformanceHistory: { periodType: 'month' | 'quarter' | 'year' };
};

const Performance = createNativeStackNavigator<PerformanceStackParamList>();

const PerformanceNavigator = () => {
  return (
    <Performance.Navigator
      // screenOptions={{
      //   header: (props: any) => <NavBar {...props} />,
      // }}
      >
      <Performance.Screen 
        name="PerformanceDashboard" 
        component={PerformanceDashboardScreen} 
        options={{ title: 'Hiệu suất' }} 
      />
      <Performance.Screen 
        name="PMSDetails" 
        component={PMSDetailsScreen} 
        options={{ title: 'Chi tiết điểm PMS' }} 
      />
      <Performance.Screen 
        name="KPIDetails" 
        component={KPIDetailsScreen} 
        options={{ title: 'Chi tiết KPI' }} 
      />
      <Performance.Screen 
        name="PerformanceHistory" 
        component={PerformanceHistoryScreen} 
        options={{ title: 'Lịch sử đánh giá' }} 
      />
    </Performance.Navigator>
  );
};

export default PerformanceNavigator;
