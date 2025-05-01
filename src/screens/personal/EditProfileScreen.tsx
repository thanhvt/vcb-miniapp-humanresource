import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {TextInput, Button, Text, useTheme, HelperText} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {containers, layout, margin} from '../../theme';

// Mock initial data - will be replaced with real API data later
const initialFormData = {
  fullName: 'Nguyễn Văn A',
  phone: '0912345678',
  address: '198 Trần Quang Khải, Hoàn Kiếm, Hà Nội',
  emergencyContact: 'Nguyễn Văn B (Vợ/Chồng) - 0987654321',
};

interface FormErrors {
  [key: string]: string;
}

const EditProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [formData, setFormData] = useState(initialFormData);
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

  const handleChange = (field: string) => (text: string) => {
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
        style={containers.screen}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          {/* Full Name */}
          <View style={margin.mb3}>
            <TextInput
              label="Họ và tên"
              value={formData.fullName}
              onChangeText={handleChange('fullName')}
              mode="outlined"
              error={!!errors.fullName}
            />
            <HelperText type="error" visible={!!errors.fullName}>
              {errors.fullName}
            </HelperText>
          </View>

          {/* Phone */}
          <View style={margin.mb3}>
            <TextInput
              label="Số điện thoại"
              value={formData.phone}
              onChangeText={handleChange('phone')}
              mode="outlined"
              keyboardType="phone-pad"
              error={!!errors.phone}
            />
            <HelperText type="error" visible={!!errors.phone}>
              {errors.phone}
            </HelperText>
          </View>

          {/* Address */}
          <View style={margin.mb3}>
            <TextInput
              label="Địa chỉ"
              value={formData.address}
              onChangeText={handleChange('address')}
              mode="outlined"
              multiline
              numberOfLines={3}
              error={!!errors.address}
            />
            <HelperText type="error" visible={!!errors.address}>
              {errors.address}
            </HelperText>
          </View>

          {/* Emergency Contact */}
          <View style={margin.mb3}>
            <TextInput
              label="Liên hệ khẩn cấp"
              value={formData.emergencyContact}
              onChangeText={handleChange('emergencyContact')}
              mode="outlined"
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
        </View>

        {/* Submit Button */}
        <View style={[margin.mt3, margin.mh3]}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}>
            Cập nhật thông tin
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  form: {
    padding: 16,
  },
});

export default EditProfileScreen;
