import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, Dimensions, Platform, Linking, StatusBar, SafeAreaView} from 'react-native';
import {Text, useTheme, Surface, Button, Divider} from 'react-native-paper';
import type {Theme} from '../../theme/theme';
import * as ReactNavigation from '@react-navigation/native';
const {useNavigation, useRoute} = ReactNavigation;
import type {NativeStackNavigationProp, NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ContractStackParamList} from '../../navigation/ContractNavigator';
import {containers, layout, margin, padding} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeLinearGradient as LinearGradient} from '../../utils/SafeModules';
import {contracts} from '../../utils/mock/contractData';
import {format} from 'date-fns';

type NavigationProp = NativeStackNavigationProp<ContractStackParamList>;
type RouteProps = NativeStackScreenProps<ContractStackParamList, 'ContractDetails'>['route'];

// Định dạng ngày tháng
const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'dd/MM/yyyy');
  } catch (error) {
    return dateString;
  }
};

// Hàm lấy màu sắc cho status
const getStatusColor = (status: string): string => {
  switch(status) {
    case 'active': return '#0a6640';
    case 'expired': return '#BF7326';
    case 'terminated': return '#C23934';
    default: return '#0a6640';
  }
};

// Hàm lấy tên hiển thị cho status
const getStatusLabel = (status: string): string => {
  switch(status) {
    case 'active': return 'Đang hiệu lực';
    case 'expired': return 'Đã hết hạn';
    case 'terminated': return 'Đã chấm dứt';
    default: return 'Đang hiệu lực';
  }
};

const ContractDetailsScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const {contractId} = route.params;
  
  // Set status bar config
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setTranslucent(true);
    
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
    }
    
    return () => {
      StatusBar.setBarStyle('default');
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(false);
      }
    };
  }, []);
  
  // Tìm hợp đồng theo ID
  const contract = contracts.find(c => c.id === contractId);
  
  if (!contract) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={60} color="#C23934" />
        <Text style={styles.errorText}>Không tìm thấy hợp đồng</Text>
        <Button 
          mode="contained" 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          Quay lại
        </Button>
      </View>
    );
  }
  
  const handleDownloadContract = () => {
    // Giả lập mở liên kết đến hợp đồng
    Linking.openURL(contract.documentUrl)
      .catch(err => console.error('Không thể mở liên kết', err));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
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
        
        {/* Header Card */}
        <Surface style={styles.headerCard} elevation={3}>
          <LinearGradient 
            colors={['#000000', '#1a1a1a', '#333333']} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            style={styles.headerBackground}>
            <View style={styles.headerContent}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="file-document-outline" size={32} color="#0a6640" />
              </View>
              <View style={styles.headerTextContainer}>
                <Text variant="titleLarge" style={styles.headerTitle}>
                  {contract.type}
                </Text>
                <View style={[styles.statusBadge, {backgroundColor: getStatusColor(contract.status)}]}>
                  <MaterialCommunityIcons name="certificate" size={14} color="#fff" />
                  <Text variant="bodySmall" style={styles.statusText}>
                    {getStatusLabel(contract.status)}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Surface>

        {/* Contract Details Card */}
        <Surface style={styles.detailsCard} elevation={3}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="info-outline" size={20} color="#0a6640" />
            <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.detailsContainer}>
            {/* ID hợp đồng */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Mã hợp đồng</Text>
              <Text style={styles.detailValue}>{contract.id}</Text>
            </View>
            
            {/* Loại hợp đồng */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Loại hợp đồng</Text>
              <Text style={styles.detailValue}>{contract.type}</Text>
            </View>
            
            {/* Ngày ký */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Ngày ký</Text>
              <Text style={styles.detailValue}>{formatDate(contract.signDate)}</Text>
            </View>
            
            {/* Ngày hiệu lực */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Ngày hiệu lực</Text>
              <Text style={styles.detailValue}>{formatDate(contract.startDate)}</Text>
            </View>
            
            {/* Ngày kết thúc */}
            {contract.endDate && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Ngày kết thúc</Text>
                <Text style={styles.detailValue}>{formatDate(contract.endDate)}</Text>
              </View>
            )}
            
            {/* Trạng thái */}
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Trạng thái</Text>
              <View style={[styles.inlineStatusBadge, {backgroundColor: getStatusColor(contract.status)}]}>
                <Text style={styles.inlineStatusText}>{getStatusLabel(contract.status)}</Text>
              </View>
            </View>
          </View>
        </Surface>
        
        {/* Actions Card */}
        <Surface style={styles.actionsCard} elevation={3}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="touch-app" size={20} color="#0a6640" />
            <Text style={styles.sectionTitle}>Thao tác</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.actionsContainer}>
            <Button 
              mode="contained" 
              icon="download"
              style={styles.actionButton}
              contentStyle={styles.actionButtonContent}
              onPress={handleDownloadContract}>
              Tải văn bản hợp đồng
            </Button>
            
            <Button 
              mode="contained" 
              icon="eye-outline"
              style={[styles.actionButton, styles.secondaryButton]}
              contentStyle={styles.actionButtonContent}
              onPress={() => console.log('Xem trước hợp đồng')}>
              Xem trước
            </Button>
            
            <Button 
              mode="contained" 
              icon="share-variant"
              style={[styles.actionButton, styles.secondaryButton]}
              contentStyle={styles.actionButtonContent}
              onPress={() => console.log('Chia sẻ hợp đồng')}>
              Chia sẻ
            </Button>
          </View>
        </Surface>
        
        {/* Notes Card - Optional */}
        <Surface style={styles.notesCard} elevation={3}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="sticky-note-2" size={20} color="#0a6640" />
            <Text style={styles.sectionTitle}>Ghi chú</Text>
          </View>
          <Divider style={styles.divider} />

          <View style={styles.notesContainer}>
            <Text style={styles.noteText}>
              • Hợp đồng này có hiệu lực kể từ ngày {formatDate(contract.startDate)}
              {contract.endDate ? ` đến ngày ${formatDate(contract.endDate)}` : ''}
            </Text>
            
            <Text style={styles.noteText}>
              • Mọi thắc mắc về hợp đồng vui lòng liên hệ phòng Nhân sự qua email: hr@vcb.com.vn
            </Text>
            
            <Text style={styles.noteText}>
              • Văn bản hợp đồng đã được ký điện tử và có giá trị như bản gốc
            </Text>
          </View>
        </Surface>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: Theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 64,
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 180,
    zIndex: 0,
  },
  container: {
    flex: 1,
    zIndex: 1,
    paddingTop: 8,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#0a6640',
  },
  headerCard: {
    margin: 16,
    marginTop: 16,
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
  headerBackground: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#0a6640',
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  detailsCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a6640',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  divider: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginHorizontal: 16,
  },
  detailsContainer: {
    padding: 16,
  },
  detailItem: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  inlineStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  inlineStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  actionsCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionsContainer: {
    padding: 16,
  },
  actionButton: {
    marginBottom: 12,
    backgroundColor: '#0a6640',
    borderRadius: 8,
  },
  actionButtonContent: {
    height: 44,
  },
  secondaryButton: {
    borderColor: '#0a6640',
    borderWidth: 1.5,
  },
  notesCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  notesContainer: {
    padding: 16,
  },
  noteText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});

export default ContractDetailsScreen;
