import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, DataTable, Button, Divider } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IncomeStackParamList } from '../../navigation/IncomeNavigator';
import { monthlyIncomes, yearlyIncomes } from '../../utils/mock/incomeData';
import NavBar from '../../components/NavBar';

type RouteProps = RouteProp<IncomeStackParamList, 'IncomeDetails'>;
type NavigationProps = NativeStackNavigationProp<IncomeStackParamList>;

const IncomeDetailsScreen = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProps>();
  
  const { periodId, periodType } = route.params;
  
  // Get the income data based on period type and ID
  const incomeData = periodType === 'month' 
    ? monthlyIncomes.find(income => income.id === periodId)
    : yearlyIncomes.find(income => income.id === periodId);
  
  if (!incomeData) {
    return (
      <View style={styles.container}>
        <NavBar title="Chi tiết thu nhập" />
        <View style={styles.errorContainer}>
          <Text>Không tìm thấy thông tin thu nhập cho kỳ này</Text>
          <Button 
            mode="contained" 
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            Quay lại
          </Button>
        </View>
      </View>
    );
  }
  
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
  
  // Format the period display
  let periodDisplay = '';
  if (periodType === 'month') {
    const [month, year] = incomeData.period.split('-');
    periodDisplay = `Tháng ${month}/${year}`;
  } else {
    periodDisplay = `Năm ${incomeData.period}`;
  }
  
  return (
    <View style={styles.container}>
      {/* <NavBar title={`Chi tiết thu nhập ${periodDisplay}`} /> */}
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.title}>{periodType === 'month' ? 'PAYSLIP' : 'BÁO CÁO THU NHẬP'} {periodDisplay.toUpperCase()}</Text>
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
            {incomeData.documentUrl && (
              <Button
                mode="contained"
                icon="file-download"
                onPress={() => {}}
                style={styles.button}
              >
                Tải {periodType === 'month' ? 'Payslip' : 'Báo cáo'}
              </Button>
            )}
            
            <Button
              mode="outlined"
              icon="arrow-left"
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              Quay lại
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
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
});

export default IncomeDetailsScreen;
