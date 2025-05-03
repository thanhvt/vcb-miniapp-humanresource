/**
 * CustomBarChart.tsx
 * 
 * A custom BarChart component that doesn't rely on SVG or any native modules
 * to avoid the "Module not found" errors in the micro-frontend architecture
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

type BarDataPoint = {
  value: number;
  label?: string;
  frontColor?: string;
  topLabelComponent?: () => React.ReactNode;
};

type CustomBarChartProps = {
  data: BarDataPoint[];
  width?: number;
  height?: number;
  barWidth?: number;
  spacing?: number;
  initialSpacing?: number;
  endSpacing?: number;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  hideRules?: boolean;
  rulesColor?: string;
  rulesThickness?: number;
  showFractionalValues?: boolean;
  hideYAxisText?: boolean;
  yAxisTextStyle?: object;
  xAxisLabelTextStyle?: object;
  maxValue?: number;
  noOfSections?: number;
};

const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data,
  width = Dimensions.get('window').width - 40,
  height = 200,
  barWidth = 30,
  spacing = 20,
  initialSpacing = 10,
  endSpacing = 10,
  roundedTop = true,
  roundedBottom = false,
  hideRules = false,
  rulesColor = '#e0e0e0',
  rulesThickness = 1,
  showFractionalValues = false,
  hideYAxisText = false,
  yAxisTextStyle = {},
  xAxisLabelTextStyle = {},
  maxValue,
  noOfSections = 5,
}) => {
  // Calculate the maximum value if not provided
  const calculatedMaxValue = maxValue || Math.max(...data.map(item => item.value)) * 1.2;
  
  // Calculate chart dimensions
  const chartWidth = width - 40; // Allow space for y-axis labels
  const chartHeight = height - 40; // Allow space for x-axis labels
  
  // Generate y-axis labels
  const yLabels = Array.from({ length: noOfSections + 1 }, (_, i) => {
    const value = (calculatedMaxValue * i) / noOfSections;
    return showFractionalValues ? value.toFixed(1) : Math.round(value).toString();
  });
  
  return (
    <View style={styles.container}>
      {/* Y-axis labels */}
      {!hideYAxisText && (
        <View style={styles.yAxisLabels}>
          {yLabels.map((label, index) => (
            <Text 
              key={`y-${index}`} 
              style={[
                styles.axisLabel, 
                yAxisTextStyle,
                { bottom: (index / noOfSections) * chartHeight - 10 }
              ]}
            >
              {label}
            </Text>
          ))}
        </View>
      )}
      
      {/* Chart area */}
      <View style={[styles.chartArea, { width: chartWidth, height: chartHeight }]}>
        {/* Horizontal grid lines */}
        {!hideRules && Array.from({ length: noOfSections + 1 }).map((_, index) => (
          <View 
            key={`grid-${index}`} 
            style={[
              styles.gridLine, 
              { 
                bottom: (index / noOfSections) * chartHeight,
                backgroundColor: rulesColor,
                height: rulesThickness,
              }
            ]}
          />
        ))}
        
        {/* Bars */}
        <View style={styles.barsContainer}>
          {data.map((item, index) => {
            const barHeight = (item.value / calculatedMaxValue) * chartHeight;
            const barLeft = initialSpacing + index * (barWidth + spacing);
            
            return (
              <View key={`bar-${index}`} style={[styles.barColumn, { left: barLeft }]}>
                {/* Top label if provided */}
                {item.topLabelComponent && (
                  <View style={styles.topLabelContainer}>
                    {item.topLabelComponent()}
                  </View>
                )}
                
                {/* Bar */}
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: barHeight,
                      width: barWidth,
                      backgroundColor: item.frontColor || '#0a6640',
                      borderTopLeftRadius: roundedTop ? barWidth / 2 : 0,
                      borderTopRightRadius: roundedTop ? barWidth / 2 : 0,
                      borderBottomLeftRadius: roundedBottom ? barWidth / 2 : 0,
                      borderBottomRightRadius: roundedBottom ? barWidth / 2 : 0,
                    }
                  ]}
                />
                
                {/* X-axis label */}
                {item.label && (
                  <Text 
                    style={[
                      styles.xAxisLabel, 
                      xAxisLabelTextStyle,
                      { width: barWidth + spacing }
                    ]}
                  >
                    {item.label}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingBottom: 30,
  },
  yAxisLabels: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chartArea: {
    position: 'relative',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#e0e0e0',
  },
  barsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  barColumn: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#0a6640',
  },
  topLabelContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  axisLabel: {
    position: 'absolute',
    fontSize: 10,
    color: '#666',
  },
  xAxisLabel: {
    marginTop: 5,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});

export default CustomBarChart;
