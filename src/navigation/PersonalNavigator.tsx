import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavBar from '../components/NavBar';

// Import screens
import PersonalDashboardScreen from '../screens/personal/PersonalDashboardScreen';
import PersonalInfoScreen from '../screens/personal/PersonalInfoScreen';
import ManagementChartScreen from '../screens/personal/ManagementChartScreen';
import EditProfileScreen from '../screens/personal/EditProfileScreen';
import UtilitiesScreen from '../screens/Utilities/UtilitiesScreen';
import WebViewTestScreen from '../screens/Utilities/WebViewTestScreen';
import BluetoothTestScreen from '../screens/Utilities/BluetoothTestScreen';
import NFCTestScreen from '../screens/Utilities/NFCTestScreen';
import CameraTestScreen from '../screens/Utilities/CameraTestScreen';
import OCRTestScreen from '../screens/Utilities/OCRTestScreen';
import ShareTestScreen from '../screens/Utilities/ShareTestScreen';
import PDFViewerScreen from '../screens/Utilities/PDFViewerScreen';

export type PersonalStackParamList = {
  PersonalDashboard: undefined;
  PersonalInfo: undefined;
  ManagementChart: undefined;
  EditProfile: undefined;
  Utilities: undefined;
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
      <Personal.Screen 
        name="Utilities" 
        component={UtilitiesScreen} 
        options={{ title: 'Tiện ích' }} 
      />
      <Personal.Screen
          name="WebViewTest"
          component={WebViewTestScreen}
          options={{ title: 'WebView Test' }}
        />
      <Personal.Screen
          name="BluetoothTest"
          component={BluetoothTestScreen}
          options={{ title: 'Bluetooth Test' }}
        />
      <Personal.Screen
          name="NFCTest"
          component={NFCTestScreen}
          options={{ title: 'NFC Test' }}
        />
      <Personal.Screen
          name="CameraTest"
          component={CameraTestScreen}
          options={{ title: 'Camera Test' }}
        />
      <Personal.Screen
          name="OCRTest"
          component={OCRTestScreen}
          options={{ title: 'OCR Test' }}
        />
      <Personal.Screen
          name="ShareTest"
          component={ShareTestScreen}
          options={{ title: 'Share Test' }}
        />
      <Personal.Screen
          name="PDFViewer"
          component={PDFViewerScreen}
          options={{ title: 'PDF Viewer' }}
        />
    </Personal.Navigator>
  );
};

export default PersonalNavigator;
