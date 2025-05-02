import React, {useEffect} from 'react';
import {ScrollView, View, StyleSheet, Platform, TouchableOpacity, FlatList, StatusBar, SafeAreaView} from 'react-native';
import {Text, useTheme, Surface, Divider} from 'react-native-paper';
import type {Theme} from '../../theme/theme';
import * as ReactNavigation from '@react-navigation/native';
const {useNavigation} = ReactNavigation;
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {ContractStackParamList} from '../../navigation/ContractNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeLinearGradient as LinearGradient} from '../../utils/SafeModules';
import {contracts, Contract} from '../../utils/mock/contractData';
import {format} from 'date-fns';

type NavigationProp = NativeStackNavigationProp<ContractStackParamList>;

// Định dạng ngày tháng
const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'dd/MM/yyyy');
  } catch (error) {
    return dateString;
  }
};

// Lấy màu sắc cho status
const getStatusColor = (status: string): string => {
  switch(status) {
    case 'active': return '#0a6640';
    case 'expired': return '#BF7326';
    case 'terminated': return '#C23934';
    default: return '#0a6640';
  }
};

// Lấy tên hiển thị cho status
const getStatusLabel = (status: string): string => {
  switch(status) {
    case 'active': return 'Đang hiệu lực';
    case 'expired': return 'Đã hết hạn';
    case 'terminated': return 'Đã chấm dứt';
    default: return 'Đang hiệu lực';
  }
};

const ContractHistoryScreen = () => {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NavigationProp>();
  
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
  
  // Sắp xếp danh sách hợp đồng theo ngày hiệu lực
  const sortedContracts = [...contracts].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const navigateToDetails = (contractId: string) => {
    navigation.navigate('ContractDetails', {contractId});
  };
  
  const renderContractItem = ({item}: {item: Contract}) => (
    <TouchableOpacity 
      style={styles.contractItem}
      onPress={() => navigateToDetails(item.id)}>
      <View style={styles.contractHeader}>
        <View style={styles.contractTypeContainer}>
          <View style={[styles.statusDot, {backgroundColor: getStatusColor(item.status)}]} />
          <Text style={styles.contractType}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, {backgroundColor: getStatusColor(item.status)}]}>
          <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>
      
      <View style={styles.contractDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <MaterialIcons name="create" size={16} color="#0a6640" style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Ngày ký</Text>
              <Text style={styles.detailValue}>{formatDate(item.signDate)}</Text>
            </View>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="date-range" size={16} color="#0a6640" style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>Ngày hiệu lực</Text>
              <Text style={styles.detailValue}>{formatDate(item.startDate)}</Text>
            </View>
          </View>
        </View>
        
        {item.endDate && (
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialIcons name="event-busy" size={16} color="#0a6640" style={styles.detailIcon} />
              <View>
                <Text style={styles.detailLabel}>Ngày kết thúc</Text>
                <Text style={styles.detailValue}>{formatDate(item.endDate)}</Text>
              </View>
            </View>
            
            <View style={styles.detailItemEmpty}></View>
          </View>
        )}
      </View>
      
      <View style={styles.contractActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigateToDetails(item.id)}>
          <MaterialIcons name="visibility" size={14} color="#0a6640" />
          <Text style={styles.actionText}>Xem chi tiết</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => console.log('Download', item.id)}>
          <MaterialIcons name="file-download" size={14} color="#0a6640" />
          <Text style={styles.actionText}>Tải văn bản hợp đồng</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
      
      <View style={styles.container}>
        <Surface style={styles.header} elevation={3}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="history" size={24} color="#fff" />
            <Text style={styles.headerTitle}>
              Lịch sử hợp đồng ({sortedContracts.length})
            </Text>
          </View>
        </Surface>
        
        <FlatList
          data={sortedContracts}
          renderItem={renderContractItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
      </View>
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
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 160,
    zIndex: 0,
  },
  container: {
    flex: 1,
    zIndex: 1,
  },
  header: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: '#0a6640',
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  contractItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  contractHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contractTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  contractType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  contractDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  detailItemEmpty: {
    flex: 1,
  },
  detailIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  contractActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  actionText: {
    color: '#0a6640',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  divider: {
    backgroundColor: 'transparent',
    height: 8,
  },
});

export default ContractHistoryScreen;
