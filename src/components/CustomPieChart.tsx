/**
 * CustomPieChart.tsx
 * 
 * A custom PieChart component that doesn't rely on SVG or any native modules
 * to avoid the "Module not found" errors in the micro-frontend architecture
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PieChartItem = {
  value: number;
  name?: string;
  color: string;
  text?: string;
};

type CustomPieChartProps = {
  data: PieChartItem[];
  donut?: boolean;
  radius?: number;
  innerRadius?: number;
  showGradient?: boolean;
  focusOnPress?: boolean;
  textSize?: number;
  centerLabelComponent?: () => React.ReactNode;
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  radius = 100,
  innerRadius = 60,
  centerLabelComponent,
}) => {
  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate percentages and angles
  const segments = data.map(item => ({
    ...item,
    percentage: (item.value / total) * 100,
    angle: (item.value / total) * 360,
  }));
  
  return (
    <View style={styles.container}>
      <View style={[styles.pieContainer, { width: radius * 2, height: radius * 2 }]}>
        {/* Render colored segments */}
        {segments.map((segment, index) => {
          // For simplicity, we'll render segments as simple colored blocks
          // in a circular arrangement
          const size = Math.max(30, segment.percentage);
          const offsetAngle = index * (360 / segments.length);
          const radians = (offsetAngle * Math.PI) / 180;
          const x = Math.cos(radians) * (radius / 2);
          const y = Math.sin(radians) * (radius / 2);
          
          return (
            <View 
              key={index}
              style={[
                styles.segment,
                { 
                  backgroundColor: segment.color,
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  transform: [
                    { translateX: x },
                    { translateY: y },
                  ],
                }
              ]}
            />
          );
        })}
        
        {/* Center hole for donut chart */}
        <View style={[styles.centerHole, { width: innerRadius * 2, height: innerRadius * 2 }]}>
          {centerLabelComponent ? centerLabelComponent() : null}
        </View>
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        {segments.map((segment, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: segment.color }]} />
            <Text style={styles.legendText}>
              {segment.name || `Item ${index + 1}`}: {segment.percentage.toFixed(1)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  pieContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 100,
    backgroundColor: '#f5f5f5',
  },
  segment: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'white',
  },
  centerHole: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  legend: {
    width: '100%',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
  },
});

export default CustomPieChart;
