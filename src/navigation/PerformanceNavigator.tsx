import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';

// Import implemented screen components
import PerformanceDashboardScreen from '../screens/performance/PerformanceDashboardScreen';
import PMSDetailsScreen from '../screens/performance/PMSDetailsScreen';
import KPIDetailsScreen from '../screens/performance/KPIDetailsScreen';
import PerformanceHistoryScreen from '../screens/performance/PerformanceHistoryScreen';

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
      screenOptions={{
        headerShown: false
      }}>
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
