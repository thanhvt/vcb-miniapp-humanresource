import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Menu, SegmentedButtons, useTheme} from 'react-native-paper';

interface PeriodOption {
  label: string;
  value: string;
}

interface PeriodSelectorProps {
  type: 'month' | 'quarter' | 'year';
  initialPeriod?: string;
  onPeriodChange: (period: string, type: 'month' | 'quarter' | 'year') => void;
  periodOptions?: PeriodOption[];
  allowTypeChange?: boolean;
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  type: initialType,
  initialPeriod,
  onPeriodChange,
  periodOptions = [],
  allowTypeChange = false,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(
    initialPeriod || (periodOptions.length > 0 ? periodOptions[0].value : ''),
  );
  const [type, setType] = useState<'month' | 'quarter' | 'year'>(initialType);
  const theme = useTheme();

  const getSelectedLabel = () => {
    const option = periodOptions.find(opt => opt.value === selectedPeriod);
    return option ? option.label : 'Chọn kỳ';
  };

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    setMenuVisible(false);
    onPeriodChange(period, type);
  };

  const handleTypeChange = (newType: string) => {
    const periodType = newType as 'month' | 'quarter' | 'year';
    setType(periodType);
    onPeriodChange(selectedPeriod, periodType);
  };

  return (
    <View style={styles.container}>
      {allowTypeChange && (
        <SegmentedButtons
          value={type}
          onValueChange={handleTypeChange}
          buttons={[
            {
              value: 'month',
              label: 'Tháng',
            },
            {
              value: 'quarter',
              label: 'Quý',
            },
            {
              value: 'year',
              label: 'Năm',
            },
          ]}
          style={styles.segmentedButtons}
        />
      )}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            icon="calendar"
            style={styles.periodButton}
            contentStyle={styles.periodButtonContent}>
            {getSelectedLabel()}
          </Button>
        }>
        {periodOptions.map(option => (
          <Menu.Item
            key={option.value}
            onPress={() => handlePeriodSelect(option.value)}
            title={option.label}
            titleStyle={
              option.value === selectedPeriod
                ? {color: theme.colors.primary, fontWeight: 'bold'}
                : undefined
            }
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  periodButton: {
    borderRadius: 4,
  },
  periodButtonContent: {
    flexDirection: 'row-reverse',
  },
});

export default PeriodSelector;
