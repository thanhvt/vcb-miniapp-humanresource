import React from 'react';
import {ScrollView, View, StyleSheet, Dimensions, Platform} from 'react-native';
import {Avatar, Card, Text, IconButton, useTheme, Surface} from 'react-native-paper';
import type {Theme} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {PersonalStackParamList} from '../../navigation/PersonalNavigator';
import {containers, layout, margin, padding} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp>();
  const screenWidth = Dimensions.get('window').width;

  const navigateToInfo = () => navigation.navigate('PersonalInfo');
  const navigateToChart = () => navigation.navigate('ManagementChart');
  const navigateToEdit = () => navigation.navigate('EditProfile');

  return (
    <ScrollView 
      style={[containers.screen, styles.container]}
      showsVerticalScrollIndicator={false}>
      
      {/* Profile Summary Card */}
      <Surface style={styles.profileCard} elevation={2}>
          <View style={[styles.headerBackground, { backgroundColor: '#81C784' }]}>
            <View style={styles.profileContent}>
              <View style={[layout.row, layout.alignCenter]}>
            <Surface style={styles.avatarContainer} elevation={4}>
              <Avatar.Image
                size={84}
                source={{uri: 'https://ui-avatars.com/api/?name=' + personalInfo.fullName + '&background=fff&color=000'}}
              />
            </Surface>
            <View style={[margin.mh3, layout.fill]}>
              <Text variant="titleLarge" style={styles.nameText}>{personalInfo.fullName}</Text>
              <Text variant="bodyLarge" style={styles.positionText}>
                {personalInfo.position}
              </Text>
              <Text variant="bodyMedium" style={styles.departmentText}>
                {personalInfo.department}
              </Text>
            </View>
            <IconButton
              icon="pencil"
              mode="contained"
              size={20}
              onPress={navigateToEdit}
              containerColor="rgba(255, 255, 255, 0.9)"
              iconColor={theme.colors.primary}
              style={styles.editButton}
            />
              </View>
            </View>
          </View>
      </Surface>

      {/* Quick Info Cards */}
      <View style={styles.quickInfoContainer}>
        <Surface style={styles.quickInfoCard} elevation={2}>
          <Card
            mode="contained"
            onPress={navigateToInfo}>
            <Card.Content style={styles.quickInfoContent}>
              <MaterialCommunityIcons name="account-details" size={32} color={theme.colors.primary} />
              <Text variant="titleMedium" style={styles.quickInfoTitle}>Thông tin</Text>
              <Text variant="bodyMedium" style={styles.quickInfoSubtitle}>
                Chi tiết cá nhân
              </Text>
            </Card.Content>
          </Card>
        </Surface>

        <Surface style={styles.quickInfoCard} elevation={2}>
          <Card
            mode="contained"
            onPress={navigateToChart}>
            <Card.Content style={styles.quickInfoContent}>
              <MaterialCommunityIcons name="account-supervisor" size={32} color={theme.colors.primary} />
              <Text variant="titleMedium" style={styles.quickInfoTitle}>Sơ đồ</Text>
              <Text variant="bodyMedium" style={styles.quickInfoSubtitle}>
                Cấp quản lý
              </Text>
            </Card.Content>
          </Card>
        </Surface>
      </View>

      {/* Contact Information */}
      <Surface style={styles.contactCard} elevation={2}>
        <View style={styles.contactContent}>
          <View style={styles.contactHeader}>
            <MaterialCommunityIcons name="card-account-details" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={styles.contactTitle}>
              Thông tin liên hệ
            </Text>
          </View>
          
          <View style={styles.contactItem}>
            <View style={styles.contactItemHeader}>
              <MaterialCommunityIcons name="email" size={20} color={theme.colors.primary} />
              <Text variant="bodySmall" style={styles.contactLabel}>
                Email
              </Text>
            </View>
            <Text variant="bodyLarge" style={styles.contactValue}>{personalInfo.email}</Text>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactItemHeader}>
              <MaterialCommunityIcons name="phone" size={20} color={theme.colors.primary} />
              <Text variant="bodySmall" style={styles.contactLabel}>
                Số điện thoại
              </Text>
            </View>
            <Text variant="bodyLarge" style={styles.contactValue}>{personalInfo.phone}</Text>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactItemHeader}>
              <MaterialCommunityIcons name="calendar" size={20} color={theme.colors.primary} />
              <Text variant="bodySmall" style={styles.contactLabel}>
                Ngày vào làm
              </Text>
            </View>
            <Text variant="bodyLarge" style={styles.contactValue}>{personalInfo.joinDate}</Text>
          </View>
        </View>
      </Surface>
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  profileCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
  },
  headerBackground: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#4CAF50',
    paddingTop: 16,
  },
  profileContent: {
    padding: 16,
  },
  avatarContainer: {
    borderRadius: 42,
    padding: 3,
    backgroundColor: theme.colors.surface,
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  nameText: {
    color: '#1A1A1A',
    fontWeight: '600',
    fontSize: 24,
    marginBottom: 4,
  },
  positionText: {
    color: '#2E7D32',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 2,
  },
  departmentText: {
    color: '#388E3C',
    fontSize: 14,
  },
  editButton: {
    margin: 0,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    marginHorizontal: 8,
    justifyContent: 'space-between',
  },
  quickInfoCard: {
    width: '48%',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
  },
  quickInfoContent: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  quickInfoTitle: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  quickInfoSubtitle: {
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  contactCard: {
    margin: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
  },
  contactContent: {
    padding: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactTitle: {
    marginLeft: 8,
    fontWeight: '600',
  },
  contactItem: {
    marginBottom: 16,
  },
  contactItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactLabel: {
    color: theme.colors.onSurfaceVariant,
    marginLeft: 8,
  },
  contactValue: {
    marginLeft: 28,
  },
});

export default PersonalDashboardScreen;
