import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

interface StatusBadgeProps {
  label: string;
  status: 'active' | 'inactive' | 'completed' | 'in_progress' | 'not_started' | 'expired' | 'terminated' | string;
  size?: 'small' | 'medium' | 'large';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  status,
  size = 'medium',
}) => {
  const theme = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return '#4CAF50'; // Green
      case 'completed':
        return '#4CAF50'; // Green
      case 'in_progress':
        return '#2196F3'; // Blue
      case 'not_started':
        return '#9E9E9E'; // Gray
      case 'inactive':
        return '#9E9E9E'; // Gray
      case 'expired':
        return '#FF9800'; // Orange
      case 'terminated':
        return '#F44336'; // Red
      default:
        return theme.colors.primary;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 2,
          paddingHorizontal: 6,
          borderRadius: 4,
        };
      case 'large':
        return {
          paddingVertical: 6,
          paddingHorizontal: 16,
          borderRadius: 8,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 4,
          paddingHorizontal: 12,
          borderRadius: 6,
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 14;
      case 'medium':
      default:
        return 12;
    }
  };

  return (
    <View
      style={[
        styles.badge,
        getSizeStyle(),
        {backgroundColor: getStatusColor()},
      ]}>
      <Text
        style={[
          styles.text,
          {
            fontSize: getTextSize(),
          },
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
    fontWeight: '500',
  },
});

export default StatusBadge;
