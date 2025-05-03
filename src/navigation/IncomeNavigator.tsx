import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';

// Import screens
import IncomeDashboardScreen from '../screens/income/IncomeDashboardScreen';
import MonthlyPayslipScreen from '../screens/income/MonthlyPayslipScreen';
import YearlyIncomeScreen from '../screens/income/YearlyIncomeScreen';
import IncomeDetailsScreen from '../screens/income/IncomeDetailsScreen';

export type IncomeStackParamList = {
  IncomeDashboard: undefined;
  MonthlyPayslip: { month?: number; year?: number };
  YearlyIncome: { year?: number };
  IncomeDetails: { periodId: string; periodType: 'month' | 'year' };
};

const Income = createNativeStackNavigator<IncomeStackParamList>();

const IncomeNavigator = () => {
  return (
    <Income.Navigator
      // screenOptions={{
      //   headerShown: false
      // }}
      >
      <Income.Screen 
        name="IncomeDashboard" 
        component={IncomeDashboardScreen} 
        options={{ title: 'Thu nhập' }} 
      />
      <Income.Screen 
        name="MonthlyPayslip" 
        component={MonthlyPayslipScreen} 
        options={{ title: 'Bảng lương hàng tháng' }} 
      />
      <Income.Screen 
        name="YearlyIncome" 
        component={YearlyIncomeScreen} 
        options={{ title: 'Thu nhập hàng năm' }} 
      />
      <Income.Screen 
        name="IncomeDetails" 
        component={IncomeDetailsScreen} 
        options={{ title: 'Chi tiết thu nhập' }} 
      />
    </Income.Navigator>
  );
};

export default IncomeNavigator;
