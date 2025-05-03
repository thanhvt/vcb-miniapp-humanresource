import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Platform } from 'react-native';
import { Text, Card, Button, Divider, useTheme } from 'react-native-paper';
import CustomBarChart from '../../components/CustomBarChart';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IncomeStackParamList } from '../../navigation/IncomeNavigator';
import { chartData, monthlyIncomes, yearlyIncomes } from '../../utils/mock/incomeData';
import NavBar from '../../components/NavBar';
import { SafeLinearGradient as LinearGradient } from '../../utils/SafeModules';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackNavigationProp<IncomeStackParamList>;

const IncomeDashboardScreen = () => {
  const navigation = useNavigation<Props>();
  const theme = useTheme();
  const [viewType, setViewType] = useState<'month' | 'year'>('month');
  
  // Format currency to VND
  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const screenWidth = Dimensions.get('window').width - 32;

  // Prepare data for monthly bar chart
  const monthlyChartData = chartData.last6Months.map(item => ({
    value: item.amount/1000000,
    label: item.month,
    frontColor: '#0a6640',
    topLabelComponent: () => (
      <Text style={{ fontSize: 10, color: '#0a6640', marginBottom: 4 }}>
        {Math.round(item.amount/1000000)}
      </Text>
    )
  }));

  // Prepare data for yearly bar chart
  const yearlyChartData = chartData.lastYears.map(item => ({
    value: item.amount/1000000,
    label: item.year,
    frontColor: '#0a6640',
    topLabelComponent: () => (
      <Text style={{ fontSize: 10, color: '#0a6640', marginBottom: 4 }}>
        {Math.round(item.amount/1000000)}
      </Text>
    )
  }));

  // Bar chart configuration
  const barChartStyles = {
    spacing: 30,
    barWidth: 22,
    roundedTop: true,
    roundedBottom: false,
    hideRules: false,
    rulesColor: 'rgba(10, 102, 64, 0.15)',
    rulesThickness: 1,
    yAxisTextStyle: { color: '#666', fontSize: 10 },
    xAxisLabelTextStyle: { color: '#666', textAlign: 'center', fontSize: 10, fontWeight: 'bold' },
    showFractionalValues: false,
    hideYAxisText: false,
    initialSpacing: 10,
    endSpacing: 10,
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentMonthIncome = monthlyIncomes[0];
  const currentYearIncome = yearlyIncomes[0];

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
            <View style={styles.chartWrapper}>
              <View style={styles.chartContainer}>
                <CustomBarChart
                  data={viewType === 'month' ? monthlyChartData : yearlyChartData}
                  width={screenWidth}
                  height={220}
                  spacing={barChartStyles.spacing}
                  barWidth={barChartStyles.barWidth}
                  roundedTop={barChartStyles.roundedTop}
                  roundedBottom={barChartStyles.roundedBottom}
                  hideRules={barChartStyles.hideRules}
                  rulesColor={barChartStyles.rulesColor}
                  rulesThickness={barChartStyles.rulesThickness}
                  yAxisTextStyle={barChartStyles.yAxisTextStyle}
                  xAxisLabelTextStyle={barChartStyles.xAxisLabelTextStyle}
                  showFractionalValues={barChartStyles.showFractionalValues}
                  hideYAxisText={barChartStyles.hideYAxisText}
                  initialSpacing={barChartStyles.initialSpacing}
                  endSpacing={barChartStyles.endSpacing}
                  maxValue={viewType === 'month' ? 30 : 400}
                  noOfSections={5}
                />
                <Text style={styles.chartNote}>Đơn vị: triệu đồng</Text>
              </View> 
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.actionsCard}>
          <Card.Title title="Báo cáo thu nhập" />
          <Card.Content>
            <Button
              mode="contained"
              icon="file-document"
              style={styles.button}
              buttonColor="#0a6640"
              onPress={() => navigation.navigate('MonthlyPayslip')}>
              Payslip tháng này
            </Button>
            <Divider style={styles.divider} />
            <Button
              mode="outlined"
              icon="calendar"
              style={styles.button}
              textColor="#0a6640"
              rippleColor="rgba(10, 102, 64, 0.2)"
              onPress={() => navigation.navigate('MonthlyPayslip')}>
              Xem payslip tháng khác
            </Button>
            <Divider style={styles.divider} />
            <Button
              mode="outlined"
              icon="chart-line"
              style={styles.button}
              textColor="#0a6640"
              rippleColor="rgba(10, 102, 64, 0.2)"
              onPress={() => navigation.navigate('YearlyIncome')}>
              Tổng thu nhập năm
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
  summaryCard: {
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
  chartCard: {
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
    color: '#0a6640',
  },
  chartNote: {
    fontSize: 12,
    textAlign: 'right',
    fontStyle: 'italic',
    marginTop: 4,
    color: '#666',
  },
  chartWrapper: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    padding: 10,
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
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
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
    color: '#0a6640',
    fontWeight: 'bold',
  },
});

export default IncomeDashboardScreen;
