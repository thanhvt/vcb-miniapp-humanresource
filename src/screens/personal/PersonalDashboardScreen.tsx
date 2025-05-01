import React from 'react';
import {ScrollView, View} from 'react-native';
import {Avatar, Card, Text, IconButton, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {PersonalStackParamList} from '../../navigation/PersonalNavigator';
import {containers, layout, margin, padding} from '../../theme';

type NavigationProp = NativeStackNavigationProp<PersonalStackParamList>;

// Mock data - will be replaced with real API data later
const personalInfo = {
  fullName: 'Nguyễn Văn A',
  employeeId: 'NV001',
  position: 'Chuyên viên cao cấp',
  department: 'Phòng Công nghệ thông tin',
  email: 'nguyenvana@vcb.com.vn',
  phone: '0912345678',
  joinDate: '01/01/2020',
  status: 'active',
};

const PersonalDashboardScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const navigateToInfo = () => navigation.navigate('PersonalInfo');
  const navigateToChart = () => navigation.navigate('ManagementChart');
  const navigateToEdit = () => navigation.navigate('EditProfile');

  return (
    <ScrollView style={containers.screen}>
      {/* Profile Summary Card */}
      <Card style={[margin.m3, {backgroundColor: theme.colors.surface}]}>
        <Card.Content>
          <View style={[layout.row, layout.alignCenter, margin.mb3]}>
            <Avatar.Image
              size={80}
              source={{uri: 'https://ui-avatars.com/api/?name=' + personalInfo.fullName}}
            />
            <View style={[margin.mh3, layout.fill]}>
              <Text variant="titleLarge">{personalInfo.fullName}</Text>
              <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant}}>
                {personalInfo.position}
              </Text>
              <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant}}>
                {personalInfo.department}
              </Text>
            </View>
            <IconButton
              icon="pencil"
              mode="contained"
              onPress={navigateToEdit}
              containerColor={theme.colors.primary}
              iconColor={theme.colors.surface}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Quick Info Cards */}
      <View style={[layout.row, layout.wrap, padding.ph3]}>
        <Card
          style={[{width: '48%'}, margin.m1]}
          onPress={navigateToInfo}>
          <Card.Content>
            <Text variant="titleMedium">Thông tin</Text>
            <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant}}>
              Chi tiết cá nhân
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={[{width: '48%'}, margin.m1]}
          onPress={navigateToChart}>
          <Card.Content>
            <Text variant="titleMedium">Sơ đồ</Text>
            <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant}}>
              Cấp quản lý
            </Text>
          </Card.Content>
        </Card>
      </View>

      {/* Contact Information */}
      <Card style={[margin.m3, {backgroundColor: theme.colors.surface}]}>
        <Card.Content>
          <Text variant="titleMedium" style={margin.mb2}>
            Thông tin liên hệ
          </Text>
          
          <View style={margin.mb2}>
            <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
              Email
            </Text>
            <Text variant="bodyLarge">{personalInfo.email}</Text>
          </View>

          <View style={margin.mb2}>
            <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
              Số điện thoại
            </Text>
            <Text variant="bodyLarge">{personalInfo.phone}</Text>
          </View>

          <View>
            <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
              Ngày vào làm
            </Text>
            <Text variant="bodyLarge">{personalInfo.joinDate}</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default PersonalDashboardScreen;
