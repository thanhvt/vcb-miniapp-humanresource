import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, Dimensions, Platform, TouchableOpacity, StatusBar, SafeAreaView} from 'react-native';
import {Avatar, Card, Text, IconButton, useTheme, Surface, Button} from 'react-native-paper';
import type {Theme} from '../../theme/theme';
import * as ReactNavigation from '@react-navigation/native';
const {useNavigation} = ReactNavigation;
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {ContractStackParamList} from '../../navigation/ContractNavigator';
import {containers, layout, margin, padding} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeLinearGradient as LinearGradient} from '../../utils/SafeModules';
import {contracts, Contract} from '../../utils/mock/contractData';
import {format} from 'date-fns';

type NavigationProp = NativeStackNavigationProp<ContractStackParamList>;

// Lấy hợp đồng hiện tại (active) hoặc hợp đồng mới nhất
const getCurrentContract = (): Contract | undefined => {
  // Sắp xếp theo ngày bắt đầu, mới nhất trước
  const sortedContracts = [...contracts].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  
  // Tìm hợp đồng active trước
  const activeContract = sortedContracts.find(c => c.status === 'active');
  if (activeContract) return activeContract;
  
  // Nếu không có active thì lấy cái mới nhất
  return sortedContracts[0];
};

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

const ContractDashboardScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp>();
  const screenWidth = Dimensions.get('window').width;
  
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
  
  // Lấy hợp đồng hiện tại và danh sách hợp đồng
  const currentContract = getCurrentContract();
  const contractHistory = [...contracts].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const navigateToDetails = (contractId: string) => {
    navigation.navigate('ContractDetails', {contractId});
  };

  const navigateToHistory = () => {
    navigation.navigate('ContractHistory');
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
        
        {/* Thông tin hợp đồng hiện tại */}
        {currentContract && (
          <Surface style={styles.contractCard} elevation={3}>
            <LinearGradient 
              colors={['#000000', '#1a1a1a', '#333333']} 
              start={{x: 0, y: 0}} 
              end={{x: 1, y: 0}} 
              style={styles.headerBackground}>
              <View style={styles.cardHeader}>
                <View style={styles.titleContainer}>
                  <MaterialCommunityIcons name="file-document-outline" size={24} color="#0a6640" />
                  <Text variant="titleMedium" style={styles.cardTitle}>Hợp đồng hiện tại</Text>
                </View>
                
                <IconButton
                  icon="arrow-right"
                  iconColor="#fff"
                  size={20}
                  onPress={() => navigateToDetails(currentContract.id)}
                />
              </View>
            </LinearGradient>

            <View style={styles.contractContent}>
              <View style={styles.contractTypeContainer}>
                <Text variant="titleLarge" style={styles.contractType}>
                  {currentContract.type}
                </Text>
                
                <View style={[styles.statusBadge, {backgroundColor: getStatusColor(currentContract.status)}]}>
                  <MaterialCommunityIcons name="certificate" size={14} color="#0a6640" />
                  <Text variant="bodySmall" style={styles.statusText}>
                    {getStatusLabel(currentContract.status)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.contractDetailsContainer}>
                {/* Ngày ký */}
                <View style={styles.contractDetailItem}>
                  <View style={styles.detailItemHeader}>
                    <View style={styles.detailIconCircle}>
                      <MaterialIcons name="create" size={16} color="#fff" />
                    </View>
                    <Text style={styles.detailLabel}>Ngày ký</Text>
                  </View>
                  <Text style={styles.detailValue}>{formatDate(currentContract.signDate)}</Text>
                </View>
                
                {/* Ngày hiệu lực */}
                <View style={styles.contractDetailItem}>
                  <View style={styles.detailItemHeader}>
                    <View style={styles.detailIconCircle}>
                      <MaterialIcons name="date-range" size={16} color="#fff" />
                    </View>
                    <Text style={styles.detailLabel}>Ngày hiệu lực</Text>
                  </View>
                  <Text style={styles.detailValue}>{formatDate(currentContract.startDate)}</Text>
                </View>
                
                {/* Ngày kết thúc */}
                {currentContract.endDate && (
                  <View style={styles.contractDetailItem}>
                    <View style={styles.detailItemHeader}>
                      <View style={styles.detailIconCircle}>
                        <MaterialIcons name="event-busy" size={16} color="#fff" />
                      </View>
                      <Text style={styles.detailLabel}>Ngày kết thúc</Text>
                    </View>
                    <Text style={styles.detailValue}>{formatDate(currentContract.endDate)}</Text>
                  </View>
                )}
                
                {/* Nút tải văn bản */}
                <Button 
                  mode="contained" 
                  style={styles.downloadButton}
                  icon="download" 
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                  onPress={() => console.log('Download contract')}>
                  Tải văn bản hợp đồng
                </Button>
              </View>
            </View>
          </Surface>
        )}

        {/* Lịch sử hợp đồng */}
        <Surface style={styles.historyCard} elevation={3}>
          <LinearGradient 
            colors={['#000000', '#1a1a1a', '#333333']} 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            style={styles.headerBackground}>
            <View style={styles.cardHeader}>
              <View style={styles.titleContainer}>
                <MaterialCommunityIcons name="history" size={24} color="#0a6640" />
                <Text variant="titleMedium" style={styles.cardTitle}>Lịch sử hợp đồng</Text>
              </View>
              
              <IconButton
                icon="arrow-right"
                iconColor="#fff"
                size={20}
                onPress={navigateToHistory}
              />
            </View>
          </LinearGradient>

          <View style={styles.contractHistoryList}>
            {contractHistory.slice(0, 3).map((contract, index) => (
              <TouchableOpacity 
                key={contract.id}
                style={[styles.historyItem, index < contractHistory.length - 1 && styles.historyItemBorder]}
                onPress={() => navigateToDetails(contract.id)}>
                <View style={styles.historyItemContent}>
                  <View style={styles.historyItemLeft}>
                    <View style={[styles.contractDot, {backgroundColor: getStatusColor(contract.status)}]} />
                    <View>
                      <Text style={styles.historyItemType}>{contract.type}</Text>
                      <Text style={styles.historyItemDate}>{formatDate(contract.startDate)}{contract.endDate ? ` - ${formatDate(contract.endDate)}` : ''}</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.miniStatusBadge, {backgroundColor: getStatusColor(contract.status)}]}>
                    <Text style={styles.miniStatusText}>{getStatusLabel(contract.status)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
            {contractHistory.length > 3 && (
              <Button 
                mode="outlined" 
                style={styles.viewAllButton}
                contentStyle={styles.viewAllButtonContent}
                labelStyle={styles.viewAllButtonLabel}
                onPress={navigateToHistory}>
                Xem tất cả
              </Button>
            )}
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
    height: 250,
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
  contractCard: {
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
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // paddingVertical: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    marginLeft: 8,
    color: '#0a6640',
    fontWeight: '700',
  },
  contractContent: {
    padding: 16,
  },
  contractTypeContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  contractType: {
    fontWeight: '700',
    color: '#0a6640',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
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
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  contractDetailsContainer: {
    marginTop: 8,
  },
  contractDetailItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16,
    borderRadius: 6,
  },
  detailItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0a6640',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  detailLabel: {
    color: '#0a6640',
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  detailValue: {
    marginLeft: 42,
    color: '#333333',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  downloadButton: {
    marginTop: 10,
    backgroundColor: '#0a6640',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonContent: {
    height: 44,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  historyCard: {
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
  contractHistoryList: {
    padding: 16,
  },
  historyItem: {
    paddingVertical: 12,
  },
  historyItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contractDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  historyItemType: {
    fontWeight: '700',
    color: '#333',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  historyItemDate: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  miniStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  miniStatusText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  viewAllButton: {
    marginTop: 12,
    borderColor: '#0a6640',
    borderRadius: 8,
  },
  viewAllButtonContent: {
    height: 40,
  },
  viewAllButtonLabel: {
    color: '#0a6640',
    fontSize: 13,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    textAlign: 'center',
  },
});

export default ContractDashboardScreen;
