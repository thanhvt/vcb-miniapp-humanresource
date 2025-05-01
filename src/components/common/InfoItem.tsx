import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextInput, IconButton, useTheme} from 'react-native-paper';

interface InfoItemProps {
  label: string;
  value: string;
  icon?: string;
  editable?: boolean;
  onSave?: (value: string) => void;
  type?: 'text' | 'date' | 'email' | 'phone';
}

const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  icon,
  editable = false,
  onSave,
  type = 'text',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const theme = useTheme();

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(inputValue);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon && <IconButton icon={icon} size={20} />}
        <Text variant="bodyMedium" style={styles.label}>
          {label}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              mode="flat"
              value={inputValue}
              onChangeText={setInputValue}
              style={styles.input}
              dense
              keyboardType={
                type === 'phone'
                  ? 'phone-pad'
                  : type === 'email'
                  ? 'email-address'
                  : 'default'
              }
            />
            <IconButton icon="check" size={20} onPress={handleSave} />
          </View>
        ) : (
          <View style={styles.displayContainer}>
            <Text style={styles.value}>{value}</Text>
            {editable && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <IconButton
                  icon="pencil"
                  size={16}
                  iconColor={theme.colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingVertical: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#666',
    fontSize: 14,
  },
  valueContainer: {
    marginTop: 4,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 40,
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
});

export default InfoItem;
