/**
 * SafePieChart.tsx
 * 
 * A custom PieChart component that doesn't rely on SVG components directly
 * to avoid the "Unimplement component RNSVGSvgView" error in micro-frontend architecture
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type PieChartItem = {
  value: number;
  name: string;
  color: string;
};

type SafePieChartProps = {
  data: PieChartItem[];
  radius?: number;
  centerLabelComponent?: () => React.ReactNode;
};

const SafePieChart: React.FC<SafePieChartProps> = ({
  data,
  radius = 100,
  centerLabelComponent,
}) => {
  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <View style={styles.container}>
      <View style={[styles.pieContainer, { width: radius * 2, height: radius * 2 }]}>
        {/* Render pie segments as simple colored views */}
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          return (
            <View 
              key={index}
              style={[
                styles.segment,
                { 
                  backgroundColor: item.color,
                  width: radius * 0.8,
                  height: radius * 0.4,
                  transform: [
                    { translateY: index % 2 === 0 ? -radius * 0.2 : radius * 0.2 },
                    { translateX: index % 3 === 0 ? -radius * 0.1 : radius * 0.1 }
                  ]
                }
              ]}
            />
          );
        })}
        
        {/* Center label */}
        <View style={styles.centerLabel}>
          {centerLabelComponent ? centerLabelComponent() : null}
        </View>
      </View>
      
      {/* Legend */}
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}: {((item.value / total) * 100).toFixed(1)}%</Text>
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
  },
  segment: {
    position: 'absolute',
    borderRadius: 10,
  },
  centerLabel: {
    position: 'absolute',
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

export default SafePieChart;
