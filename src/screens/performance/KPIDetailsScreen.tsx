import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider, useTheme, ProgressBar, List } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PerformanceStackParamList } from '../../navigation/PerformanceNavigator';
import { pmsScores, monthlyPMSScores, PMSDetail } from '../../utils/mock/performanceData';
import NavBar from '../../components/NavBar';

type Props = NativeStackNavigationProp<PerformanceStackParamList>;
type RouteProps = RouteProp<PerformanceStackParamList, 'KPIDetails'>;

const KPIDetailsScreen = () => {
  const navigation = useNavigation<Props>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();
  
  const { kpiId } = route.params;
  
  // Find the KPI data based on ID
  let kpiData: PMSDetail | undefined;
  let periodType: 'month' | 'quarter' | 'year' = 'quarter';
  let period: string = '';
  
  // Search in quarterly data first
  for (const quarterData of pmsScores) {
    const kpi = quarterData.details.find(detail => detail.id === kpiId);
    if (kpi) {
      kpiData = kpi;
      periodType = 'quarter';
      period = quarterData.period;
      break;
    }
  }
  
  // If not found, search in monthly data
  if (!kpiData) {
    for (const monthData of monthlyPMSScores) {
      const kpi = monthData.details.find(detail => detail.id === kpiId);
      if (kpi) {
        kpiData = kpi;
        periodType = 'month';
        period = monthData.period;
        break;
      }
    }
  }
  
  if (!kpiData) {
    return (
      <View style={styles.container}>
        <NavBar title="Chi tiết KPI" showBackButton={true} />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Không tìm thấy dữ liệu KPI</Text>
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

  return (
    <View style={styles.container}>
      <NavBar title="Chi tiết KPI" showBackButton={true} />
      <ScrollView style={styles.scrollView}>
        <Card style={styles.kpiCard}>
          <Card.Content>
            <Text style={styles.period}>{formatPeriod(period, periodType)}</Text>
            <Text style={styles.kpiName}>{kpiData.kpiName}</Text>
            
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Trạng thái:</Text>
              <Text style={[styles.statusValue, { color: getStatusColor(kpiData.status) }]}>
                {getStatusLabel(kpiData.status)}
              </Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.scoreSection}>
              <Text style={styles.sectionTitle}>Điểm đánh giá</Text>
              
              <View style={styles.scoreContainer}>
                <View style={[
                  styles.scoreCircle, 
                  { borderColor: getRatingColor(kpiData.score) }
                ]}>
                  <Text style={[
                    styles.scoreValue, 
                    { color: getRatingColor(kpiData.score) }
                  ]}>
                    {kpiData.score.toFixed(1)}
                  </Text>
                  <Text style={styles.scoreMax}>/{kpiData.maxScore}</Text>
                </View>
                <View style={styles.scoreDetails}>
                  <Text style={styles.weightLabel}>Trọng số</Text>
                  <Text style={styles.weightValue}>{kpiData.weight}%</Text>
                  <Text style={styles.scoreLabel}>Điểm quy đổi</Text>
                  <Text style={[
                    styles.weightedScoreValue, 
                    { color: getRatingColor(kpiData.score) }
                  ]}>
                    {((kpiData.score / kpiData.maxScore) * kpiData.weight).toFixed(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.progressBarContainer}>
                <Text style={styles.progressLabel}>Mức độ hoàn thành</Text>
                <ProgressBar
                  progress={kpiData.score / kpiData.maxScore}
                  color={getRatingColor(kpiData.score)}
                  style={styles.progressBar}
                />
                <Text style={[
                  styles.progressPercentage, 
                  { color: getRatingColor(kpiData.score) }
                ]}>
                  {Math.round((kpiData.score / kpiData.maxScore) * 100)}%
                </Text>
              </View>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Thông tin KPI</Text>
              
              <List.Item
                title="Tên KPI"
                description={kpiData.kpiName}
                left={props => <List.Icon {...props} icon="flag" />}
              />
              <Divider />
              
              <List.Item
                title="Trọng số"
                description={`${kpiData.weight}%`}
                left={props => <List.Icon {...props} icon="percent" />}
              />
              <Divider />
              
              <List.Item
                title="Điểm số"
                description={`${kpiData.score}/${kpiData.maxScore}`}
                left={props => <List.Icon {...props} icon="star" />}
              />
              <Divider />
              
              <List.Item
                title="Trạng thái"
                description={getStatusLabel(kpiData.status)}
                left={props => <List.Icon {...props} icon="progress-check" />}
                descriptionStyle={{ color: getStatusColor(kpiData.status) }}
              />
              <Divider />
              
              <List.Item
                title="Kỳ đánh giá"
                description={formatPeriod(period, periodType)}
                left={props => <List.Icon {...props} icon="calendar" />}
              />
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Button
              mode="contained"
              icon="file-document"
              onPress={() => navigation.navigate('PMSDetails', { period, periodType })}
              style={styles.button}
            >
              Xem đánh giá PMS đầy đủ
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
  kpiCard: {
    marginBottom: 16,
  },
  period: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  kpiName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    marginRight: 8,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  scoreSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreMax: {
    fontSize: 14,
    fontWeight: 'normal',
    opacity: 0.7,
  },
  scoreDetails: {
    flex: 1,
  },
  weightLabel: {
    fontSize: 14,
    color: '#757575',
  },
  weightValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#757575',
  },
  weightedScoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginVertical: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  detailsSection: {
    marginBottom: 16,
  },
  actionsCard: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
});

export default KPIDetailsScreen;
