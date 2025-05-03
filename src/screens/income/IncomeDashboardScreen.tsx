import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Divider, useTheme } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IncomeStackParamList } from '../../navigation/IncomeNavigator';
import { chartData, monthlyIncomes, yearlyIncomes } from '../../utils/mock/incomeData';
import NavBar from '../../components/NavBar';

type Props = NativeStackNavigationProp<IncomeStackParamList>;

const IncomeDashboardScreen = () => {
  const navigation = useNavigation<Props>();
  const theme = useTheme();
  const [viewType, setViewType] = useState<'month' | 'year'>('month');
  
  // Format currency to VND
  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ';
  };

  const screenWidth = Dimensions.get('window').width - 32;

  const monthlyChartData = {
    labels: chartData.last6Months.map(item => item.month),
    datasets: [
      {
        data: chartData.last6Months.map(item => item.amount/1000000),
      },
    ],
  };

  const yearlyChartData = {
    labels: chartData.lastYears.map(item => item.year),
    datasets: [
      {
        data: chartData.lastYears.map(item => item.amount/1000000),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientTo: theme.colors.background,
    color: () => theme.colors.primary,
    barPercentage: 0.7,
    decimalPlaces: 0,
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentMonthIncome = monthlyIncomes[0];
  const currentYearIncome = yearlyIncomes[0];

  return (
    <View style={styles.container}>
      {/* <NavBar title="Thu nhập" showBackButton={false} /> */}
      <ScrollView style={styles.scrollView}>
        <Card style={styles.summaryCard}>
          <Card.Title title="Tổng quan thu nhập" />
          <Card.Content>
            <View style={styles.toggleContainer}>
              <Button
                mode={viewType === 'month' ? 'contained' : 'outlined'}
                onPress={() => setViewType('month')}
                style={styles.toggleButton}>
                Tháng
              </Button>
              <Button
                mode={viewType === 'year' ? 'contained' : 'outlined'}
                onPress={() => setViewType('year')}
                style={styles.toggleButton}>
                Năm
              </Button>
            </View>
            
            {viewType === 'month' ? (
              <View>
                <Text style={styles.period}>Tháng {currentMonth}/{currentYear}</Text>
                <View style={styles.amountContainer}>
                  <View style={styles.amountItem}>
                    <Text style={styles.label}>Tổng thu nhập</Text>
                    <Text style={styles.amount}>{formatCurrency(currentMonthIncome.grossAmount)}</Text>
                  </View>
                  <View style={styles.amountItem}>
                    <Text style={styles.label}>Thực nhận</Text>
                    <Text style={[styles.amount, styles.netAmount]}>{formatCurrency(currentMonthIncome.netAmount)}</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.viewDetailsButton}
                  onPress={() => navigation.navigate('MonthlyPayslip', { month: currentMonth, year: currentYear })}
                >
                  <Text style={styles.viewDetailsText}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={styles.period}>Năm {currentYear}</Text>
                <View style={styles.amountContainer}>
                  <View style={styles.amountItem}>
                    <Text style={styles.label}>Tổng thu nhập</Text>
                    <Text style={styles.amount}>{formatCurrency(currentYearIncome.grossAmount)}</Text>
                  </View>
                  <View style={styles.amountItem}>
                    <Text style={styles.label}>Thực nhận</Text>
                    <Text style={[styles.amount, styles.netAmount]}>{formatCurrency(currentYearIncome.netAmount)}</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.viewDetailsButton}
                  onPress={() => navigation.navigate('YearlyIncome', { year: currentYear })}
                >
                  <Text style={styles.viewDetailsText}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Title title={viewType === 'month' ? "Thu nhập 6 tháng gần đây" : "Thu nhập 5 năm gần đây"} />
          <Card.Content>
            <BarChart
              data={viewType === 'month' ? monthlyChartData : yearlyChartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              yAxisSuffix=" tr"
              fromZero={true}
              showBarTops={true}
              verticalLabelRotation={30}
            />
            <Text style={styles.chartNote}>Đơn vị: triệu đồng</Text>
          </Card.Content>
        </Card>

        <Card style={styles.actionsCard}>
          <Card.Title title="Báo cáo thu nhập" />
          <Card.Content>
            <Button
              mode="contained"
              icon="file-document"
              style={styles.button}
              onPress={() => navigation.navigate('MonthlyPayslip')}>
              Payslip tháng này
            </Button>
            <Divider style={styles.divider} />
            <Button
              mode="outlined"
              icon="calendar"
              style={styles.button}
              onPress={() => navigation.navigate('MonthlyPayslip')}>
              Xem payslip tháng khác
            </Button>
            <Divider style={styles.divider} />
            <Button
              mode="outlined"
              icon="chart-line"
              style={styles.button}
              onPress={() => navigation.navigate('YearlyIncome')}>
              Tổng thu nhập năm
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
  summaryCard: {
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
  },
  toggleButton: {
    flex: 1,
    margin: 4,
  },
  period: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  netAmount: {
    color: 'green',
  },
  chartCard: {
    marginBottom: 16,
  },
  chartNote: {
    fontSize: 12,
    textAlign: 'right',
    fontStyle: 'italic',
    marginTop: 4,
  },
  actionsCard: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  viewDetailsButton: {
    padding: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default IncomeDashboardScreen;
