import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';

// Import screens
// These screens will be created later
const ContractDashboardScreen = () => <></>;
const ContractDetailsScreen = () => <></>;
const ContractHistoryScreen = () => <></>;

export type ContractStackParamList = {
  ContractDashboard: undefined;
  ContractDetails: { contractId: string };
  ContractHistory: undefined;
};

const Contract = createNativeStackNavigator<ContractStackParamList>();

const ContractNavigator = () => {
  return (
    <Contract.Navigator
      screenOptions={{
        header: (props: any) => <NavBar {...props} />,
      }}>
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
