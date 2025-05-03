import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, DataTable, Button, Divider, useTheme, ProgressBar, List } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PerformanceStackParamList } from '../../navigation/PerformanceNavigator';
import { pmsScores, monthlyPMSScores, PMSScore } from '../../utils/mock/performanceData';
import NavBar from '../../components/NavBar';

type Props = NativeStackNavigationProp<PerformanceStackParamList>;
type RouteProps = RouteProp<PerformanceStackParamList, 'PMSDetails'>;

const PMSDetailsScreen = () => {
  const navigation = useNavigation<Props>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();
  
  const { period, periodType } = route.params;
  
  // Find the PMS data based on period and type
  const pmsData = periodType === 'month'
    ? monthlyPMSScores.find(score => score.period === period)
    : pmsScores.find(score => score.period === period);
  
  if (!pmsData) {
    return (
      <View style={styles.container}>
        <NavBar title="Chi tiết điểm PMS" showBackButton={true} />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Không tìm thấy dữ liệu PMS cho kỳ này</Text>
          <Button mode="contained" onPress={() => navigation.goBack()}>
            Quay lại
          </Button>
        </View>
      </View>
    );
  }
  
  // Format period for display
  const formatPeriod = (p: string, pt: 'month' | 'quarter' | 'year') => {
    if (pt === 'quarter') {
      const [quarter, year] = p.split('-');
      return `${quarter}/${year}`;
    } else if (pt === 'month') {
      const [month, year] = p.split('-');
      return `Tháng ${month}/${year}`;
    } else {
      return `Năm ${p}`;
    }
  };
  
  // Get rating color based on score
  const getRatingColor = (score: number) => {
    if (score >= 4.5) return '#2E7D32'; // Xuất sắc - dark green
    if (score >= 4.0) return '#388E3C'; // Rất tốt - green
    if (score >= 3.5) return '#689F38'; // Tốt - light green
    if (score >= 3.0) return '#FFA000'; // Khá - amber
    if (score >= 2.0) return '#F57C00'; // Trung bình - orange
    return '#D32F2F'; // Cần cải thiện - red
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#2E7D32';
      case 'in_progress': return '#FFA000';
      case 'not_started': return '#D32F2F';
      default: return '#757575';
    }
  };
  
  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Đã hoàn thành';
      case 'in_progress': return 'Đang thực hiện';
      case 'not_started': return 'Chưa bắt đầu';
      default: return 'N/A';
    }
  };
  
  // Sort KPIs by weight (highest first)
  const sortedKPIs = [...pmsData.details].sort((a, b) => b.weight - a.weight);
  
  return (
    <View style={styles.container}>
      <NavBar title={`Chi tiết PMS ${formatPeriod(period, periodType)}`} showBackButton={true} />
      <ScrollView style={styles.scrollView}>
        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text style={styles.title}>ĐIỂM PMS {formatPeriod(period, periodType).toUpperCase()}</Text>
            <Divider style={styles.divider} />
            
            <View style={styles.scoreContainer}>
              <View style={[
                styles.scoreCircle, 
                { borderColor: getRatingColor(pmsData.score) }
              ]}>
                <Text style={[
                  styles.scoreValue, 
                  { color: getRatingColor(pmsData.score) }
                ]}>
                  {pmsData.score.toFixed(1)}
                </Text>
                <Text style={styles.scoreMax}>/{pmsData.maxScore}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Xếp loại</Text>
                <Text style={[
                  styles.ratingValue, 
                  { color: getRatingColor(pmsData.score) }
                ]}>
                  {pmsData.rating}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.kpiCard}>
          <Card.Title title="Chi tiết các KPI" />
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>KPI</DataTable.Title>
                <DataTable.Title numeric>Trọng số</DataTable.Title>
                <DataTable.Title numeric>Điểm</DataTable.Title>
              </DataTable.Header>
              
              {sortedKPIs.map((kpi) => (
                <DataTable.Row 
                  key={kpi.id}
                  onPress={() => navigation.navigate('KPIDetails', { kpiId: kpi.id })}
                >
                  <DataTable.Cell>{kpi.kpiName}</DataTable.Cell>
                  <DataTable.Cell numeric>{kpi.weight}%</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Text style={{ color: getRatingColor(kpi.score) }}>
                      {kpi.score.toFixed(1)}
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Card.Content>
        </Card>
        
        <Card style={styles.detailsCard}>
          <Card.Title title="Chi tiết từng KPI" />
          <Card.Content>
            {sortedKPIs.map((kpi) => (
              <View key={kpi.id} style={styles.kpiDetailItem}>
                <View style={styles.kpiHeader}>
                  <Text style={styles.kpiName}>{kpi.kpiName}</Text>
                  <Text style={[styles.kpiStatus, { color: getStatusColor(kpi.status) }]}>
                    {getStatusLabel(kpi.status)}
                  </Text>
                </View>
                
                <View style={styles.kpiScoreRow}>
                  <Text style={styles.kpiWeight}>Trọng số: {kpi.weight}%</Text>
                  <Text style={[styles.kpiScore, { color: getRatingColor(kpi.score) }]}>
                    {kpi.score.toFixed(1)}/{kpi.maxScore}
                  </Text>
                </View>
                
                <View style={styles.progressBarContainer}>
                  <ProgressBar
                    progress={kpi.score / kpi.maxScore}
                    color={getRatingColor(kpi.score)}
                    style={styles.progressBar}
                  />
                </View>
                
                <Button
                  mode="outlined"
                  compact
                  onPress={() => navigation.navigate('KPIDetails', { kpiId: kpi.id })}
                  style={styles.viewButton}
                >
                  Xem chi tiết
                </Button>
                
                <Divider style={styles.kpiDivider} />
              </View>
            ))}
          </Card.Content>
        </Card>
        
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Button
              mode="contained"
              icon="history"
              onPress={() => navigation.navigate('PerformanceHistory', { periodType })}
              style={styles.button}
            >
              Xem lịch sử đánh giá
            </Button>
            
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
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 16,
    marginBottom: 16,
  },
  summaryCard: {
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
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreMax: {
    fontSize: 16,
    fontWeight: 'normal',
    opacity: 0.7,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  ratingValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  kpiCard: {
    marginBottom: 16,
  },
  detailsCard: {
    marginBottom: 16,
  },
  kpiDetailItem: {
    marginBottom: 16,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  kpiStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  kpiScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  kpiWeight: {
    fontSize: 14,
  },
  kpiScore: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginVertical: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  viewButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  kpiDivider: {
    marginTop: 16,
  },
  actionsCard: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
});

export default PMSDetailsScreen;
