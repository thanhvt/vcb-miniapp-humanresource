import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';

// Import screens
// These screens will be created later
const PersonalDashboardScreen = () => <></>;
const PersonalInfoScreen = () => <></>;
const ManagementChartScreen = () => <></>;
const EditProfileScreen = () => <></>;

export type PersonalStackParamList = {
  PersonalDashboard: undefined;
  PersonalInfo: undefined;
  ManagementChart: undefined;
  EditProfile: undefined;
};

const Personal = createNativeStackNavigator<PersonalStackParamList>();

const PersonalNavigator = () => {
  return (
    <Personal.Navigator
      screenOptions={{
        header: (props: any) => <NavBar {...props} />,
      }}>
      <Personal.Screen 
        name="PersonalDashboard" 
        component={PersonalDashboardScreen} 
        options={{ title: 'Thông tin cá nhân' }} 
      />
      <Personal.Screen 
        name="PersonalInfo" 
        component={PersonalInfoScreen} 
        options={{ title: 'Chi tiết thông tin' }} 
      />
      <Personal.Screen 
        name="ManagementChart" 
        component={ManagementChartScreen} 
        options={{ title: 'Sơ đồ quản lý' }} 
      />
      <Personal.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Cập nhật thông tin' }} 
      />
    </Personal.Navigator>
  );
};

export default PersonalNavigator;
