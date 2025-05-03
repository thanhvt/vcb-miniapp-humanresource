import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Platform, Dimensions, StatusBar as RNStatusBar } from 'react-native';
import { SafeStatusBar as StatusBar } from '../../utils/SafeModules';
import { Text, Card, DataTable, Button, Divider, useTheme } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IncomeStackParamList } from '../../navigation/IncomeNavigator';
import { monthlyIncomes, Income, IncomeDetail } from '../../utils/mock/incomeData';
import NavBar from '../../components/NavBar';
import { SafeLinearGradient as LinearGradient } from '../../utils/SafeModules';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackNavigationProp<IncomeStackParamList>;
type RouteProps = RouteProp<IncomeStackParamList, 'MonthlyPayslip'>;

const MonthlyPayslipScreen = () => {
  const navigation = useNavigation<Props>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();
  
  const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = route.params || {};
  
  // Convert month and year to period format (MM-YYYY)
  const periodString = `${month.toString().padStart(2, '0')}-${year}`;
  
  // Find income data for the specified period
  const incomeData = monthlyIncomes.find(income => income.period === periodString) || monthlyIncomes[0];
  
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

  const [monthsVisible, setMonthsVisible] = useState(false);
  
  const handleMonthSelection = (selectedMonth: number, selectedYear: number) => {
    navigation.setParams({ month: selectedMonth, year: selectedYear });
    setMonthsVisible(false);
  };
  
  const renderPeriodSelector = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const months = [];
    
    // Generate last 12 months
    for (let i = 0; i < 12; i++) {
      let m = currentMonth - i;
      let y = currentYear;
      
      if (m <= 0) {
        m += 12;
        y -= 1;
      }
      
      months.push({ month: m, year: y });
    }
    
    return (
      <Card style={styles.periodSelectorCard}>
        <Card.Content style={styles.periodSelectorContent}>
          {months.map((item, index) => (
            <Button 
              key={index}
              mode={item.month === month && item.year === year ? 'contained' : 'outlined'}
              style={styles.monthButton}
              onPress={() => handleMonthSelection(item.month, item.year)}
            >
              {`${item.month}/${item.year}`}
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
      StatusBar.setTranslucent(false);
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNStatusBar backgroundColor="transparent" barStyle="dark-content" />
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
            <Text style={styles.payslipTitle}>PAYSLIP THÁNG {month}/{year}</Text>
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
            
            <Text style={styles.sectionTitle}>Chi tiết thu nhập</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Khoản mục</DataTable.Title>
                <DataTable.Title numeric>Số tiền</DataTable.Title>
              </DataTable.Header>

              {earnings.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{formatCurrency(item.amount)}</DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Row style={styles.totalRow}>
                <DataTable.Cell style={styles.totalCell}>
                  <Text style={styles.totalText}>Tổng thu nhập</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.totalCell}>
                  <Text style={styles.totalText}>{formatCurrency(totalEarnings)}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            
            <Divider style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Chi tiết khấu trừ</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Khoản mục</DataTable.Title>
                <DataTable.Title numeric>Số tiền</DataTable.Title>
              </DataTable.Header>

              {deductions.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{formatCurrency(item.amount)}</DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Row style={styles.totalRow}>
                <DataTable.Cell style={styles.totalCell}>
                  <Text style={styles.totalText}>Tổng khấu trừ</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.totalCell}>
                  <Text style={styles.totalText}>{formatCurrency(totalDeductions)}</Text>
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
              onPress={() => setMonthsVisible(!monthsVisible)}
              style={styles.button}
              buttonColor="#0a6640"
            >
              Chọn tháng khác
            </Button>
            {monthsVisible && renderPeriodSelector()}
            
            <Button
              mode="outlined"
              icon="file-download"
              onPress={() => {}}
              style={styles.button}
              textColor="#0a6640"
              rippleColor="rgba(10, 102, 64, 0.2)"
            >
              Tải Payslip
            </Button>
            
            <Button
              mode="outlined"
              icon="chart-bar"
              onPress={() => navigation.navigate('YearlyIncome')}
              style={styles.button}
              textColor="#0a6640"
              rippleColor="rgba(10, 102, 64, 0.2)"
            >
              Xem thu nhập năm
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
  payslipTitle: {
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
  periodSelectorCard: {
    marginVertical: 8,
  },
  periodSelectorContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  monthButton: {
    margin: 4,
  },
});

export default MonthlyPayslipScreen;
