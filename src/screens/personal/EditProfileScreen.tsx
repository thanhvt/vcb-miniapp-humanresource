import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, KeyboardAvoidingView, Platform, Animated} from 'react-native';
import {TextInput, Button, Text, useTheme, HelperText, Avatar, IconButton, ProgressBar, Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {containers} from '../../theme';

// Mock initial data - will be replaced with real API data later
const initialFormData = {
  fullName: 'Nguyễn Văn A',
  phone: '0912345678',
  address: '198 Trần Quang Khải, Hoàn Kiếm, Hà Nội',
  emergencyContact: 'Nguyễn Văn B (Vợ/Chồng) - 0987654321',
};

interface FormData {
  fullName: string;
  phone: string;
  address: string;
  emergencyContact: string;
}

interface FormErrors {
  [key: string]: string;
}

const EditProfileScreen = () => {
  const theme = useTheme();
  const [scaleAnim] = useState(new Animated.Value(0));
  const [progressAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ tên không được để trống';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống';
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Liên hệ khẩn cấp không được để trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, []);

  useEffect(() => {
    const progress = calculateProgress();
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [formData]);

  const calculateProgress = () => {
    const fields: Array<keyof FormData> = ['fullName', 'phone', 'address', 'emergencyContact'];
    const filledFields = fields.filter(field => formData[field].trim().length > 0);
    return filledFields.length / fields.length;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Mock API call - replace with real API integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success
      navigation.goBack();
    } catch (error) {
      // Handle error
      console.error('Error updating profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (text: string) => {
    setFormData(prev => ({...prev, [field]: text}));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={containers.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        {/* Header Section */}
        <Surface style={styles.header}>
          <View style={styles.avatarContainer}>
            <Surface style={styles.avatarSurface} elevation={4}>
              <Avatar.Icon
                size={80}
                icon="account"
                color="white"
                style={{ backgroundColor: theme.colors.primary }}
              />
            </Surface>
            <IconButton
              icon="camera"
              size={20}
              style={styles.editAvatarButton}
              onPress={() => {}}
            />
          </View>
          <Text variant="titleLarge" style={margin.mb1}>
            {formData.fullName}
          </Text>
          <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant}}>
            Chỉnh sửa thông tin cá nhân
          </Text>
        </Surface>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <Text variant="bodyMedium" style={styles.progressText}>
            Hoàn thành hồ sơ: {Math.round((progressAnim as any)._value * 100)}%
          </Text>
          <ProgressBar
            progress={progressAnim as unknown as number}
            color={theme.colors.primary}
          />
        </View>
        <Animated.View
          style={[
            styles.form,
            {
              transform: [{scale: scaleAnim}],
              opacity: scaleAnim,
            },
          ]}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Họ và tên"
              value={formData.fullName}
              onChangeText={handleChange('fullName')}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon={errors.fullName ? "alert-circle" : "account"} color={errors.fullName ? theme.colors.error : theme.colors.primary} />}
              error={!!errors.fullName}
            />
            <HelperText type="error" visible={!!errors.fullName}>
              {errors.fullName}
            </HelperText>
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Số điện thoại"
              value={formData.phone}
              onChangeText={handleChange('phone')}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon={errors.phone ? "alert-circle" : "phone"} color={errors.phone ? theme.colors.error : theme.colors.primary} />}
              keyboardType="phone-pad"
              error={!!errors.phone}
            />
            <HelperText type="error" visible={!!errors.phone}>
              {errors.phone}
            </HelperText>
          </View>

          {/* Address */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Địa chỉ"
              value={formData.address}
              onChangeText={handleChange('address')}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon={errors.address ? "alert-circle" : "map-marker"} color={errors.address ? theme.colors.error : theme.colors.primary} />}
              multiline
              numberOfLines={3}
              error={!!errors.address}
            />
            <HelperText type="error" visible={!!errors.address}>
              {errors.address}
            </HelperText>
          </View>

          {/* Emergency Contact */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Liên hệ khẩn cấp"
              value={formData.emergencyContact}
              onChangeText={handleChange('emergencyContact')}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon={errors.emergencyContact ? "alert-circle" : "account-alert"} color={errors.emergencyContact ? theme.colors.error : theme.colors.primary} />}
              placeholder="Tên (Quan hệ) - Số điện thoại"
              error={!!errors.emergencyContact}
            />
            <HelperText type="error" visible={!!errors.emergencyContact}>
              {errors.emergencyContact}
            </HelperText>
            <HelperText type="info" visible={true}>
              Ví dụ: Nguyễn Văn B (Vợ/Chồng) - 0987654321
            </HelperText>
          </View>
        </Animated.View>

        {/* Submit Button */}
        <View style={styles.submitButton}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            icon="check-circle"
            contentStyle={{ height: 48 }}
            labelStyle={{ fontSize: 16, fontWeight: '600' }}>
            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avatarSurface: {
    borderRadius: 40,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  editAvatarButton: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  progressText: {
    marginBottom: 8,
  },
  contentContainer: {
    flexGrow: 1,
  },
  form: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    elevation: 0,
    borderRadius: 8,
  },
  submitButton: {
    margin: 16,
    paddingVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
});

export default EditProfileScreen;
