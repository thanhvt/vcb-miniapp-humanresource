import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Card, Button, Divider, useTheme, List, Chip, FAB } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PerformanceStackParamList } from '../../navigation/PerformanceNavigator';
import { pmsScores, monthlyPMSScores } from '../../utils/mock/performanceData';
import NavBar from '../../components/NavBar';

type Props = NativeStackNavigationProp<PerformanceStackParamList>;
type RouteProps = RouteProp<PerformanceStackParamList, 'PerformanceHistory'>;

const PerformanceHistoryScreen = () => {
  const navigation = useNavigation<Props>();
  const route = useRoute<RouteProps>();
  const theme = useTheme();
  
  // Initialize with the period type from route params, default to 'quarter'
  const [periodType, setPeriodType] = useState<'month' | 'quarter' | 'year'>(
    route.params?.periodType || 'quarter'
  );
  
  // Filter data based on period type
  const filteredData = periodType === 'month' ? monthlyPMSScores : pmsScores;
  
  const screenWidth = Dimensions.get('window').width - 32;
  
  // Prepare chart data
  const chartData = {
    labels: filteredData.slice(0, 6).map(score => {
      if (periodType === 'month') {
        const [month, year] = score.period.split('-');
        return `${month}/${year.slice(2)}`;
      } else {
        return score.period;
      }
    }).reverse(),
    datasets: [
      {
        data: filteredData.slice(0, 6).map(score => score.score).reverse(),
        color: () => theme.colors.primary,
        strokeWidth: 2,
      }
    ],
    legend: ['Điểm PMS']
  };
  
  const chartConfig = {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientTo: theme.colors.background,
    color: (opacity = 1) => theme.colors.primary,
    strokeWidth: 2,
    decimalPlaces: 1,
  };
  
  // Format period for display
  const formatPeriod = (period: string, periodType: 'month' | 'quarter' | 'year') => {
    if (periodType === 'quarter') {
      const [quarter, year] = period.split('-');
      return `${quarter}/${year}`;
    } else if (periodType === 'month') {
      const [month, year] = period.split('-');
      return `Tháng ${month}/${year}`;
    } else {
      return `Năm ${period}`;
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

  return (
    <View style={styles.container}>
      <NavBar title="Lịch sử đánh giá" showBackButton={true} />
      <ScrollView style={styles.scrollView}>
        <Card style={styles.periodTypeCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Chọn loại kỳ đánh giá</Text>
            <View style={styles.chipContainer}>
              <Chip 
                selected={periodType === 'month'} 
                onPress={() => setPeriodType('month')}
                style={styles.chip}
                selectedColor={theme.colors.primary}
              >
                Tháng
              </Chip>
              <Chip 
                selected={periodType === 'quarter'} 
                onPress={() => setPeriodType('quarter')}
                style={styles.chip}
                selectedColor={theme.colors.primary}
              >
                Quý
              </Chip>
              <Chip 
                selected={periodType === 'year'} 
                onPress={() => setPeriodType('year')}
                style={styles.chip}
                selectedColor={theme.colors.primary}
              >
                Năm
              </Chip>
            </View>
          </Card.Content>
        </Card>
        
        <Card style={styles.chartCard}>
          <Card.Title title={`Xu hướng PMS theo ${periodType === 'month' ? 'tháng' : periodType === 'quarter' ? 'quý' : 'năm'}`} />
          <Card.Content>
            <LineChart
              data={chartData}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              fromZero
              yAxisSuffix=""
              yAxisInterval={1}
              verticalLabelRotation={30}
            />
          </Card.Content>
        </Card>
        
        <Card style={styles.historyCard}>
          <Card.Title title="Lịch sử điểm PMS" />
          <Card.Content>
            <List.Section>
              {filteredData.map((score) => (
                <React.Fragment key={score.id}>
                  <List.Item
                    title={formatPeriod(score.period, periodType)}
                    description={`Xếp loại: ${score.rating}`}
                    left={props => <List.Icon {...props} icon="calendar" />}
                    right={props => (
                      <Text 
                        {...props} 
                        style={[
                          styles.scoreValue, 
                          { color: getRatingColor(score.score) }
                        ]}
                      >
                        {score.score.toFixed(1)}/{score.maxScore}
                      </Text>
                    )}
                    onPress={() => navigation.navigate('PMSDetails', { 
                      period: score.period, 
                      periodType: score.periodType 
                    })}
                  />
                  <Divider />
                </React.Fragment>
              ))}
            </List.Section>
          </Card.Content>
        </Card>
        
        <View style={{ height: 80 }} />
      </ScrollView>
      
      <FAB
        icon="arrow-left"
        label="Quay lại"
        style={styles.fab}
        onPress={() => navigation.goBack()}
      />
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
  periodTypeCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  chartCard: {
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  historyCard: {
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default PerformanceHistoryScreen;
