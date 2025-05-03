import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Text, Card, DataTable, Button, Divider, useTheme } from 'react-native-paper';
import { PieChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IncomeStackParamList } from '../../navigation/IncomeNavigator';
import { yearlyIncomes, Income } from '../../utils/mock/incomeData';
import NavBar from '../../components/NavBar';
import { SafeLinearGradient as LinearGradient } from '../../utils/SafeModules';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackNavigationProp<IncomeStackParamList>;
type RouteProps = RouteProp<IncomeStackParamList, 'YearlyIncome'>;

const YearlyIncomeScreen = () => {
  const navigation = useNavigation<Props>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();
  
  const { year = new Date().getFullYear() } = route.params || {};
  
  // Find income data for the specified year
  const incomeData = yearlyIncomes.find(income => income.period === year.toString()) || yearlyIncomes[0];
  
  // Format currency to VND
  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Group income details by type
  const earnings = incomeData.details.filter(item => item.type === 'earning');
  const deductions = incomeData.details.filter(item => item.type === 'deduction');
  
  // Calculate totals
  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);

  const [yearSelectorVisible, setYearSelectorVisible] = useState(false);

  // Get available years from the data
  const availableYears = yearlyIncomes.map(income => parseInt(income.period));
  
  const screenWidth = Dimensions.get('window').width - 32;

  // Prepare data for pie chart
  const earningData = earnings.map((item, index) => ({
    value: item.amount,
    text: `${Math.round((item.amount / totalEarnings) * 100)}%`,
    color: getRandomColor(index),
    label: item.name,
    textColor: 'black',
  }));

  // Random color generator for chart
  function getRandomColor(index: number) {
    const colors = [
      '#0a6640', '#85c625', '#16d8c1', '#4BC0C0', '#A28AFF', 
      '#FF6B6B', '#00C49F', '#9775FA', '#F78FB3', '#18DCFF'
    ];
    return colors[index % colors.length];
  }

  const handleYearSelection = (selectedYear: number) => {
    navigation.setParams({ year: selectedYear });
    setYearSelectorVisible(false);
  };

  const renderYearSelector = () => {
    return (
      <Card style={styles.yearSelectorCard}>
        <Card.Content style={styles.yearSelectorContent}>
          {availableYears.map((availableYear, index) => (
            <Button 
              key={index}
              mode={availableYear === year ? 'contained' : 'outlined'}
              style={styles.yearButton}
              onPress={() => handleYearSelection(availableYear)}
            >
              {availableYear.toString()}
            </Button>
          ))}
        </Card.Content>
      </Card>
    );
  };

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.mainContainer}>
        <LinearGradient 
          colors={[
            '#85c625', 
            '#0a6640', 
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
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.yearlyTitle}>TỔNG THU NHẬP NĂM {year}</Text>
            <Divider style={styles.divider} />
            
            <View style={styles.summaryContainer}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Tổng thu nhập</Text>
                <Text style={styles.summaryAmount}>{formatCurrency(incomeData.grossAmount)}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Khấu trừ</Text>
                <Text style={[styles.summaryAmount, styles.deductionAmount]}>
                  -{formatCurrency(totalDeductions)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Thực nhận</Text>
                <Text style={[styles.summaryAmount, styles.netAmount]}>
                  {formatCurrency(incomeData.netAmount)}
                </Text>
              </View>
            </View>

            <Divider style={styles.divider} />
            
            {/* Pie Chart for Income Distribution */}
            <Text style={styles.sectionTitle}>Phân bổ thu nhập</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={earningData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                focusOnPress
                textSize={12}
                textBackgroundRadius={26}
                centerLabelComponent={() => {
                  return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 14, color: 'gray'}}>Tổng thu nhập</Text>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{formatCurrency(totalEarnings)}</Text>
                    </View>
                  );
                }}
              />
            </View>
            
            <Divider style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Chi tiết thu nhập</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Khoản mục</DataTable.Title>
                <DataTable.Title numeric>Số tiền</DataTable.Title>
                <DataTable.Title numeric>Tỷ lệ</DataTable.Title>
              </DataTable.Header>

              {earnings.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{formatCurrency(item.amount)}</DataTable.Cell>
                  <DataTable.Cell numeric>{`${Math.round((item.amount / totalEarnings) * 100)}%`}</DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Row style={styles.totalRow}>
                <DataTable.Cell style={styles.totalCell}>
                  <Text style={styles.totalText}>Tổng thu nhập</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.totalCell}>
                  <Text style={styles.totalText}>{formatCurrency(totalEarnings)}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.totalCell}>
                  <Text style={styles.totalText}>100%</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            
            <Divider style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Chi tiết khấu trừ</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Khoản mục</DataTable.Title>
                <DataTable.Title numeric>Số tiền</DataTable.Title>
                <DataTable.Title numeric>Tỷ lệ</DataTable.Title>
              </DataTable.Header>

              {deductions.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{formatCurrency(item.amount)}</DataTable.Cell>
                  <DataTable.Cell numeric>{`${Math.round((item.amount / totalDeductions) * 100)}%`}</DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Row style={styles.totalRow}>
                <DataTable.Cell style={styles.totalCell}>
                  <Text style={styles.totalText}>Tổng khấu trừ</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.totalCell}>
                  <Text style={styles.totalText}>{formatCurrency(totalDeductions)}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.totalCell}>
                  <Text style={styles.totalText}>100%</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>
        
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Button
              mode="contained"
              icon="calendar"
              onPress={() => setYearSelectorVisible(!yearSelectorVisible)}
              style={styles.button}
              buttonColor="#0a6640"
            >
              Chọn năm khác
            </Button>
            {yearSelectorVisible && renderYearSelector()}
            
            <Button
              mode="outlined"
              icon="file-download"
              onPress={() => {}}
              style={styles.button}
              textColor="#0a6640"
              rippleColor="rgba(10, 102, 64, 0.2)"
            >
              Tải báo cáo
            </Button>
            
            <Button
              mode="outlined"
              icon="chart-bar"
              onPress={() => navigation.navigate('MonthlyPayslip')}
              style={styles.button}
              textColor="#0a6640"
              rippleColor="rgba(10, 102, 64, 0.2)"
            >
              Xem Payslip tháng
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 20,
  },
  card: {
    marginBottom: 16,
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
  yearlyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deductionAmount: {
    color: '#d32f2f',
  },
  netAmount: {
    color: '#0a6640',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  totalRow: {
    backgroundColor: '#f0f0f0',
  },
  totalCell: {
    flex: 1,
  },
  totalText: {
    fontWeight: 'bold',
  },
  actionsCard: {
    marginBottom: 16,
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
  button: {
    marginVertical: 8,
  },
  yearSelectorCard: {
    marginVertical: 8,
  },
  yearSelectorContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  yearButton: {
    margin: 4,
    minWidth: 80,
  },
});

export default YearlyIncomeScreen;
