import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Button, Divider, useTheme, List } from 'react-native-paper';
import CustomLineChart from '../../components/CustomLineChart';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PerformanceStackParamList } from '../../navigation/PerformanceNavigator';
import { pmsScores, monthlyPMSScores, getRatingLabel } from '../../utils/mock/performanceData';
import NavBar from '../../components/NavBar';

type Props = NativeStackNavigationProp<PerformanceStackParamList>;

const PerformanceDashboardScreen = () => {
  const navigation = useNavigation<Props>();
  const theme = useTheme();
  const [viewType, setViewType] = useState<'quarter' | 'month'>('quarter');
  
  // Get current data
  const currentQuarterScore = pmsScores[0]; // Most recent quarter
  const currentMonthScore = monthlyPMSScores[0]; // Most recent month
  
  const screenWidth = Dimensions.get('window').width - 32;
  
  // Prepare chart data for quarters
  const quarterlyData = pmsScores.slice(0, 4).map(score => ({
    value: score.score,
    label: score.period,
    dataPointText: score.score.toString(),
  })).reverse();
  
  // Prepare chart data for months
  const monthlyData = monthlyPMSScores.slice(0, 6).map(score => {
    const [month, year] = score.period.split('-');
    return {
      value: score.score,
      label: `${month}/${year.slice(2)}`,
      dataPointText: score.score.toString(),
    };
  }).reverse();
  
  // Chart color from theme
  const chartColor = theme.colors.primary;
  
  // Get rating color based on score
  const getRatingColor = (score: number) => {
    if (score >= 4.5) return '#2E7D32'; // Xuất sắc - dark green
    if (score >= 4.0) return '#388E3C'; // Rất tốt - green
    if (score >= 3.5) return '#689F38'; // Tốt - light green
    if (score >= 3.0) return '#FFA000'; // Khá - amber
    if (score >= 2.0) return '#F57C00'; // Trung bình - orange
    return '#D32F2F'; // Cần cải thiện - red
  };
  
  // Format period for display
  const formatPeriod = (period: string, periodType: 'month' | 'quarter') => {
    if (periodType === 'quarter') {
      const [quarter, year] = period.split('-');
      return `${quarter}/${year}`;
    } else {
      const [month, year] = period.split('-');
      return `Tháng ${month}/${year}`;
    }
  };
  
  // Get top 3 KPIs (highest scoring)
  const currentScore = viewType === 'quarter' ? currentQuarterScore : currentMonthScore;
  const topKPIs = [...currentScore.details]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <View style={styles.container}>
      {/* <NavBar title="Hiệu suất" showBackButton={false} /> */}
      <ScrollView style={styles.scrollView}>
        <Card style={styles.summaryCard}>
          <Card.Title title="Tổng quan hiệu suất" />
          <Card.Content>
            <View style={styles.toggleContainer}>
              <Button
                mode={viewType === 'quarter' ? 'contained' : 'outlined'}
                onPress={() => setViewType('quarter')}
                style={styles.toggleButton}>
                Quý
              </Button>
              <Button
                mode={viewType === 'month' ? 'contained' : 'outlined'}
                onPress={() => setViewType('month')}
                style={styles.toggleButton}>
                Tháng
              </Button>
            </View>
            
            {viewType === 'quarter' ? (
              <View>
                <Text style={styles.period}>
                  {formatPeriod(currentQuarterScore.period, 'quarter')}
                </Text>
                <View style={styles.scoreContainer}>
                  <View style={[
                    styles.scoreCircle, 
                    { borderColor: getRatingColor(currentQuarterScore.score) }
                  ]}>
                    <Text style={[
                      styles.scoreValue, 
                      { color: getRatingColor(currentQuarterScore.score) }
                    ]}>
                      {currentQuarterScore.score.toFixed(1)}
                    </Text>
                    <Text style={styles.scoreMax}>/{currentQuarterScore.maxScore}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingLabel}>Xếp loại</Text>
                    <Text style={[
                      styles.ratingValue, 
                      { color: getRatingColor(currentQuarterScore.score) }
                    ]}>
                      {currentQuarterScore.rating}
                    </Text>
                  </View>
                </View>
                
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate('PMSDetails', { 
                    period: currentQuarterScore.period, 
                    periodType: 'quarter' 
                  })}
                  style={styles.viewDetailsButton}
                >
                  Xem chi tiết
                </Button>
              </View>
            ) : (
              <View>
                <Text style={styles.period}>
                  {formatPeriod(currentMonthScore.period, 'month')}
                </Text>
                <View style={styles.scoreContainer}>
                  <View style={[
                    styles.scoreCircle, 
                    { borderColor: getRatingColor(currentMonthScore.score) }
                  ]}>
                    <Text style={[
                      styles.scoreValue, 
                      { color: getRatingColor(currentMonthScore.score) }
                    ]}>
                      {currentMonthScore.score.toFixed(1)}
                    </Text>
                    <Text style={styles.scoreMax}>/{currentMonthScore.maxScore}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingLabel}>Xếp loại</Text>
                    <Text style={[
                      styles.ratingValue, 
                      { color: getRatingColor(currentMonthScore.score) }
                    ]}>
                      {currentMonthScore.rating}
                    </Text>
                  </View>
                </View>
                
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate('PMSDetails', { 
                    period: currentMonthScore.period, 
                    periodType: 'month' 
                  })}
                  style={styles.viewDetailsButton}
                >
                  Xem chi tiết
                </Button>
              </View>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.chartCard}>
          <Card.Title 
            title={viewType === 'quarter' ? "Xu hướng PMS theo quý" : "Xu hướng PMS theo tháng"} 
          />
          <Card.Content>
              <CustomLineChart
                data={viewType === 'quarter' ? quarterlyData : monthlyData}
                width={screenWidth}
                height={220}
                color={chartColor}
                maxValue={5}
                noOfSections={5}
                yAxisLabelTexts={['0', '1', '2', '3', '4', '5']}
              />
            <Button 
              mode="text" 
              onPress={() => navigation.navigate('PerformanceHistory', { 
                periodType: viewType
              })}
              style={styles.historyButton}
            >
              Xem lịch sử đánh giá
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.kpiCard}>
          <Card.Title title="KPI nổi bật" />
          <Card.Content>
            <List.Section>
              {topKPIs.map((kpi, index) => (
                <List.Item
                  key={kpi.id}
                  title={kpi.kpiName}
                  description={`Điểm: ${kpi.score}/${kpi.maxScore} | Trọng số: ${kpi.weight}%`}
                  left={props => <List.Icon {...props} icon={index === 0 ? 'trophy' : 'star'} />}
                  right={props => (
                    <Text 
                      {...props} 
                      style={[
                        styles.kpiScore, 
                        { color: getRatingColor(kpi.score) }
                      ]}
                    >
                      {kpi.score.toFixed(1)}
                    </Text>
                  )}
                  onPress={() => navigation.navigate('KPIDetails', { kpiId: kpi.id })}
                />
              ))}
            </List.Section>
            
            <Button 
              mode="outlined"
              onPress={() => navigation.navigate('PMSDetails', { 
                period: currentScore.period, 
                periodType: viewType 
              })}
              style={styles.allKpiButton}
            >
              Xem tất cả KPI
            </Button>
          </Card.Content>
        </Card>
        
        <Card style={styles.actionsCard}>
          <Card.Title title="Đánh giá theo kỳ" />
          <Card.Content>
            <Button
              mode="contained"
              icon="calendar-month"
              style={styles.button}
              onPress={() => navigation.navigate('PerformanceHistory', { periodType: 'month' })}>
              Điểm PMS theo tháng
            </Button>
            <Divider style={styles.divider} />
            <Button
              mode="outlined"
              icon="calendar-range"
              style={styles.button}
              onPress={() => navigation.navigate('PerformanceHistory', { periodType: 'quarter' })}>
              Điểm PMS theo quý
            </Button>
            <Divider style={styles.divider} />
            <Button
              mode="outlined"
              icon="calendar-today"
              style={styles.button}
              onPress={() => navigation.navigate('PerformanceHistory', { periodType: 'year' })}>
              Điểm PMS theo năm
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
    marginBottom: 64,
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
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
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
  chartCard: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  kpiCard: {
    marginBottom: 16,
  },
  kpiScore: {
    fontSize: 16,
    fontWeight: 'bold',
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
    marginTop: 8,
  },
  historyButton: {
    alignSelf: 'center',
  },
  allKpiButton: {
    marginTop: 8,
  },
});

export default PerformanceDashboardScreen;
