import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, Dimensions, Platform, ImageBackground, StatusBar} from 'react-native';
import {Avatar, Card, Text, IconButton, useTheme, Surface, Button} from 'react-native-paper';
import type {Theme} from '../../theme/theme';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {PersonalStackParamList} from '../../navigation/PersonalNavigator';
import {containers, layout, margin, padding} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeLinearGradient as LinearGradient} from '../../utils/SafeModules';

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
    <View style={styles.mainContainer}>
      <LinearGradient 
        colors={[
          '#85c625', 
          '#d87716', 
          '#16d8c1',
          '#16d8c1'
        ]} 
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.backgroundGradient} />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        
        {/* Profile Summary Card */}
        <Surface style={styles.profileCard} elevation={3}>
          <LinearGradient 
            colors={['#000000', '#1a1a1a', '#333333']} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            style={styles.headerBackground}>
            <View style={styles.profileContent}>
            <IconButton
                icon="account-edit"
                mode="contained"
                size={24}
                onPress={navigateToEdit}
                containerColor="#ffffff"
                iconColor={"#0a6640"}
                style={styles.utilityButton}
              />
              {/* Avatar section */}
              <View style={styles.avatarSection}>
                <Surface style={styles.avatarContainer} elevation={4}>
                  <LinearGradient 
                    colors={['#fff', '#f0f0f0']} 
                    style={styles.avatarGradient}>
                    <Avatar.Image
                      size={100}
                      source={{uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}}
                      style={styles.avatar}
                    />
                  </LinearGradient>
                </Surface>
              </View>
              
              {/* Text information section */}
              <View style={styles.profileTextContainer}>
                <Text variant="titleLarge" style={styles.nameText}>{personalInfo.fullName}</Text>
                
                <View style={styles.idBadge}>
                  <MaterialCommunityIcons name="card-account-details-outline" size={14} color="#fff" />
                  <Text variant="bodySmall" style={styles.idText}>{personalInfo.employeeId}</Text>
                </View>
                
                <Text variant="bodyLarge" style={styles.positionText}>
                  {personalInfo.position}
                </Text>
                
                <Text variant="bodyMedium" style={styles.departmentText}>
                  {personalInfo.department}
                </Text>
              </View>
              
              {/* Edit button */}
              <IconButton
                icon="pencil-outline"
                mode="contained"
                size={24}
                onPress={navigateToEdit}
                containerColor="#ffffff"
                iconColor={"#0a6640"}
                style={styles.editButton}
              />
            </View>
          </LinearGradient>
        </Surface>

        {/* Quick Info Cards */}
        <View style={styles.quickInfoContainer}>
          <Surface style={styles.quickInfoCard} elevation={4}>
            <LinearGradient 
              colors={['#fff', '#f7f9f8']} 
              style={styles.cardGradient}>
              <Card
                mode="contained"
                onPress={navigateToInfo}
                style={styles.card}>
                <Card.Content style={styles.quickInfoContent}>
                  <View style={styles.iconContainer}>
                    <LinearGradient 
                      colors={['#0a6640', '#044d29']} 
                      style={styles.iconBackground}>
                      <MaterialCommunityIcons name="account-details" size={30} color="#ffffff" />
                    </LinearGradient>
                  </View>
                  <Text variant="titleMedium" style={styles.quickInfoTitle}>Thông tin</Text>
                  <Text variant="bodyMedium" style={styles.quickInfoSubtitle}>
                    Chi tiết cá nhân
                  </Text>
                </Card.Content>
              </Card>
            </LinearGradient>
          </Surface>

          <Surface style={styles.quickInfoCard} elevation={4}>
            <LinearGradient 
              colors={['#fff', '#f7f9f8']} 
              style={styles.cardGradient}>
              <Card
                mode="contained"
                onPress={navigateToChart}
                style={styles.card}>
                <Card.Content style={styles.quickInfoContent}>
                  <View style={styles.iconContainer}>
                    <LinearGradient 
                      colors={['#0a6640', '#044d29']} 
                      style={styles.iconBackground}>
                      <MaterialCommunityIcons name="account-supervisor" size={30} color="#ffffff" />
                    </LinearGradient>
                  </View>
                  <Text variant="titleMedium" style={styles.quickInfoTitle}>Sơ đồ</Text>
                  <Text variant="bodyMedium" style={styles.quickInfoSubtitle}>
                    Cấp quản lý
                  </Text>
                </Card.Content>
              </Card>
            </LinearGradient>
          </Surface>
        </View>

        {/* Contact Information */}
        <Surface style={styles.contactCard} elevation={4}>
          <LinearGradient 
            colors={['#ffffff', '#f7f9f8']} 
            style={styles.contactGradient}>
            <View style={styles.contactContent}>
              <View style={styles.contactHeader}>
                <LinearGradient 
                  colors={['#08735c', '#0a5847']} 
                  style={styles.contactIconBackground}>
                  <MaterialCommunityIcons name="card-account-details-outline" size={22} color="#ffffff" />
                </LinearGradient>
                <Text variant="titleMedium" style={styles.contactTitle}>
                  Thông tin liên hệ
                </Text>
              </View>
              
              <View style={styles.contactItem}>
                <View style={styles.contactItemHeader}>
                  <View style={styles.contactIconCircle}>
                    <MaterialCommunityIcons name="email-outline" size={18} color="#ffffff" />
                  </View>
                  <Text variant="bodySmall" style={styles.contactLabel}>
                    Email
                  </Text>
                </View>
                <Text variant="bodyLarge" style={styles.contactValue}>{personalInfo.email}</Text>
              </View>

              <View style={styles.contactItem}>
                <View style={styles.contactItemHeader}>
                  <View style={styles.contactIconCircle}>
                    <MaterialCommunityIcons name="phone-outline" size={18} color="#ffffff" />
                  </View>
                  <Text variant="bodySmall" style={styles.contactLabel}>
                    Số điện thoại
                  </Text>
                </View>
                <Text variant="bodyLarge" style={styles.contactValue}>{personalInfo.phone}</Text>
              </View>

              <View style={styles.contactItem}>
                <View style={styles.contactItemHeader}>
                  <View style={styles.contactIconCircle}>
                    <MaterialCommunityIcons name="calendar-outline" size={18} color="#ffffff" />
                  </View>
                  <Text variant="bodySmall" style={styles.contactLabel}>
                    Ngày vào làm
                  </Text>
                </View>
                <Text variant="bodyLarge" style={styles.contactValue}>{personalInfo.joinDate}</Text>
              </View>
              
              <View style={styles.statusContainer}>
                <LinearGradient 
                  colors={['#149473', '#0a5847']} 
                  style={styles.statusBadge}>
                  <MaterialCommunityIcons name="check-circle-outline" size={16} color="#ffffff" />
                  <Text style={styles.statusText}>Đang hoạt động</Text>
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </Surface>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#02451f',
    marginBottom: 44,
  },
  backgroundGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    marginBottom: 44,
  },
  contentContainer: {
    paddingTop: StatusBar.currentHeight || 0,
    paddingBottom: 24,
  },
  profileCard: {
    // margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  headerBackground: {
    borderRadius: 20,
    paddingTop: 10,
    // paddingBottom: 25,
    overflow: 'hidden',
  },
  profileContent: {
    padding: 20,
    alignItems: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
  },
  profileTextContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  avatarContainer: {
    borderRadius: 45,
    padding: 0,
    backgroundColor: 'transparent',
    marginRight: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  avatarGradient: {
    borderRadius: 45,
    padding: 3,
  },
  avatar: {
    backgroundColor: '#ffffff',
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    marginBottom: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  idText: {
    color: '#ffffff',
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  nameText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 24,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  positionText: {
    color: '#ffeb3b',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  departmentText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  editButton: {
    margin: 0,
    position: 'absolute',
    top: 20,
    right: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  utilityButton: {
    margin: 0,
    position: 'absolute',
    top: 20,
    left: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
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
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  cardGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: 'transparent',
  },
  quickInfoContent: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0a6640',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickInfoTitle: {
    marginBottom: 4,
    fontWeight: '700',
    color: '#0a6640',
    fontSize: 17,
  },
  quickInfoSubtitle: {
    color: '#20894d',
    textAlign: 'center',
    fontWeight: '600',
  },
  contactCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  contactGradient: {
    borderRadius: 16,
  },
  contactContent: {
    padding: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a6640',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  contactTitle: {
    marginLeft: 12,
    fontWeight: '700',
    color: '#006d5b',
    fontSize: 18,
  },
  contactItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16,
  },
  contactItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0a6640',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactLabel: {
    color: '#0a6640',
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 13,
  },
  contactValue: {
    marginLeft: 42,
    color: '#000000',
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#0a6640',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 13,
  },
});

export default PersonalDashboardScreen;
