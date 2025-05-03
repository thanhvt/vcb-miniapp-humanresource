import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, DataTable, Button, Divider, useTheme } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IncomeStackParamList } from '../../navigation/IncomeNavigator';
import { monthlyIncomes, Income, IncomeDetail } from '../../utils/mock/incomeData';
import NavBar from '../../components/NavBar';

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
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ';
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

  return (
    <View style={styles.container}>
      {/* <NavBar title={`Payslip tháng ${month}/${year}`} /> */}
      <ScrollView style={styles.scrollView}>
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
            >
              Chọn tháng khác
            </Button>
            {monthsVisible && renderPeriodSelector()}
            
            <Button
              mode="outlined"
              icon="file-download"
              onPress={() => {}}
              style={styles.button}
            >
              Tải Payslip
            </Button>
            
            <Button
              mode="outlined"
              icon="chart-bar"
              onPress={() => navigation.navigate('YearlyIncome')}
              style={styles.button}
            >
              Xem thu nhập năm
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
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
    color: 'red',
  },
  netAmount: {
    color: 'green',
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
