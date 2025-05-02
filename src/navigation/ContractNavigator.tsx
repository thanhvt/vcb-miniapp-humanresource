import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';
import ContractDashboardScreen from '../screens/contract/ContractDashboardScreen';
import ContractDetailsScreen from '../screens/contract/ContractDetailsScreen';
import ContractHistoryScreen from '../screens/contract/ContractHistoryScreen';

// Contract screens imported from actual implementation



export type ContractStackParamList = {
  ContractDashboard: undefined;
  ContractDetails: { contractId: string };
  ContractHistory: undefined;
};

const Contract = createNativeStackNavigator<ContractStackParamList>();

const ContractNavigator = () => {
  return (
    <Contract.Navigator
      // screenOptions={{
      //   header: (props: any) => <NavBar {...props} />,
      // }}
      >
      <Contract.Screen 
        name="ContractDashboard" 
        component={ContractDashboardScreen} 
        options={{ title: 'Hợp đồng lao động' }} 
      />
      <Contract.Screen 
        name="ContractDetails" 
        component={ContractDetailsScreen} 
        options={{ title: 'Chi tiết hợp đồng' }} 
      />
      <Contract.Screen 
        name="ContractHistory" 
        component={ContractHistoryScreen} 
        options={{ title: 'Lịch sử hợp đồng' }} 
      />
    </Contract.Navigator>
  );
};

export default ContractNavigator;
