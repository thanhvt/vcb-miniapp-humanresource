import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';

// Import screens
import PersonalDashboardScreen from '../screens/personal/PersonalDashboardScreen';
import PersonalInfoScreen from '../screens/personal/PersonalInfoScreen';
import ManagementChartScreen from '../screens/personal/ManagementChartScreen';
import EditProfileScreen from '../screens/personal/EditProfileScreen';

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
        headerShown: false
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
