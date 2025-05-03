/**
 * CustomLineChart.tsx
 * 
 * A custom LineChart component that doesn't rely on SVG or any native modules
 * to avoid the "Module not found" errors in the micro-frontend architecture
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

type DataPoint = {
  value: number;
  label?: string;
  dataPointText?: string;
};

type CustomLineChartProps = {
  data: DataPoint[];
  width?: number;
  height?: number;
  color?: string;
  maxValue?: number;
  noOfSections?: number;
  yAxisLabelTexts?: string[];
  curved?: boolean;
  isAnimated?: boolean;
  animationDuration?: number;
};

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  data,
  width = Dimensions.get('window').width - 40,
  height = 200,
  color = '#0a6640',
  maxValue = 5,
  noOfSections = 5,
  yAxisLabelTexts,
}) => {
  // Calculate chart dimensions
  const chartWidth = width - 40; // Allow space for y-axis labels
  const chartHeight = height - 40; // Allow space for x-axis labels
  
  // Generate y-axis labels if not provided
  const yLabels = yAxisLabelTexts || 
    Array.from({ length: noOfSections + 1 }, (_, i) => (maxValue * i / noOfSections).toString());
  
  // Calculate positions for data points
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - (point.value / maxValue) * chartHeight;
    return { x, y, ...point };
  });
  
  return (
    <View style={styles.container}>
      {/* Y-axis labels */}
      <View style={styles.yAxisLabels}>
        {yLabels.map((label, index) => (
          <Text 
            key={`y-${index}`} 
            style={[styles.axisLabel, { bottom: (index / noOfSections) * chartHeight - 10 }]}
          >
            {label}
          </Text>
        ))}
      </View>
      
      {/* Chart area */}
      <View style={[styles.chartArea, { width: chartWidth, height: chartHeight }]}>
        {/* Horizontal grid lines */}
        {Array.from({ length: noOfSections + 1 }).map((_, index) => (
          <View 
            key={`grid-${index}`} 
            style={[
              styles.gridLine, 
              { bottom: (index / noOfSections) * chartHeight }
            ]}
          />
        ))}
        
        {/* Data points */}
        {points.map((point, index) => (
          <View 
            key={`point-${index}`} 
            style={[
              styles.dataPoint, 
              { 
                left: point.x, 
                bottom: point.y,
                backgroundColor: color,
              }
            ]}
          >
            {point.dataPointText && (
              <Text style={styles.dataPointText}>{point.dataPointText}</Text>
            )}
          </View>
        ))}
        
        {/* Connect points with lines */}
        {points.map((point, index) => {
          if (index === points.length - 1) return null;
          
          const nextPoint = points[index + 1];
          const lineLength = Math.sqrt(
            Math.pow(nextPoint.x - point.x, 2) + 
            Math.pow(nextPoint.y - point.y, 2)
          );
          
          const angle = Math.atan2(
            nextPoint.y - point.y,
            nextPoint.x - point.x
          ) * (180 / Math.PI);
          
          return (
            <View 
              key={`line-${index}`} 
              style={[
                styles.line, 
                { 
                  width: lineLength,
                  left: point.x,
                  bottom: point.y,
                  backgroundColor: color,
                  transform: [{ rotate: `${angle}deg` }],
                  transformOrigin: 'left bottom',
                }
              ]}
            />
          );
        })}
      </View>
      
      {/* X-axis labels */}
      <View style={styles.xAxisLabels}>
        {points.map((point, index) => (
          <Text 
            key={`x-${index}`} 
            style={[
              styles.axisLabel, 
              { 
                left: point.x - 15, 
                width: 30,
                textAlign: 'center',
              }
            ]}
          >
            {point.label || ''}
          </Text>
        ))}
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
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  dataPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: -4,
    marginBottom: -4,
  },
  line: {
    position: 'absolute',
    height: 2,
  },
  xAxisLabels: {
    position: 'absolute',
    left: 30,
    right: 0,
    bottom: 0,
    height: 30,
  },
  axisLabel: {
    position: 'absolute',
    fontSize: 10,
    color: '#666',
  },
  dataPointText: {
    position: 'absolute',
    top: -18,
    left: -10,
    width: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#333',
  },
});

export default CustomLineChart;
