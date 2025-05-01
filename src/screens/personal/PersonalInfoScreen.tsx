import React from 'react';
import {ScrollView, View} from 'react-native';
import {Card, Text, Divider, useTheme} from 'react-native-paper';
import {containers, layout, margin, padding} from '../../theme';

// Mock data - will be replaced with real API data later
const personalInfo = {
  basic: {
    fullName: 'Nguyễn Văn A',
    employeeId: 'NV001',
    birthDate: '01/01/1990',
    gender: 'Nam',
    idNumber: '123456789',
    idIssueDate: '01/01/2015',
    idIssuePlace: 'Hà Nội',
  },
  work: {
    position: 'Chuyên viên cao cấp',
    department: 'Phòng Công nghệ thông tin',
    branch: 'Hội sở chính',
    joinDate: '01/01/2020',
    status: 'Đang làm việc',
    employmentType: 'Toàn thời gian',
  },
  contact: {
    email: 'nguyenvana@vcb.com.vn',
    phone: '0912345678',
    address: '198 Trần Quang Khải, Hoàn Kiếm, Hà Nội',
    emergencyContact: 'Nguyễn Văn B (Vợ/Chồng) - 0987654321',
  },
  education: {
    degree: 'Thạc sĩ',
    major: 'Công nghệ thông tin',
    university: 'Đại học Bách khoa Hà Nội',
    graduationYear: '2015',
  },
};

const InfoSection = ({title, data}: {title: string; data: Record<string, string>}) => {
  const theme = useTheme();
  
  return (
    <Card style={[margin.m3, {backgroundColor: theme.colors.surface}]}>
      <Card.Content>
        <Text variant="titleMedium" style={margin.mb3}>
          {title}
        </Text>
        {Object.entries(data).map(([key, value], index, array) => (
          <React.Fragment key={key}>
            <View style={margin.mb2}>
              <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </Text>
              <Text variant="bodyLarge">{value}</Text>
            </View>
            {index < array.length - 1 && <Divider style={margin.mv2} />}
          </React.Fragment>
        ))}
      </Card.Content>
    </Card>
  );
};

const PersonalInfoScreen = () => {
  const sections = [
    {title: 'Thông tin cơ bản', data: personalInfo.basic},
    {title: 'Thông tin công việc', data: personalInfo.work},
    {title: 'Thông tin liên hệ', data: personalInfo.contact},
    {title: 'Thông tin học vấn', data: personalInfo.education},
  ];

  return (
    <ScrollView style={containers.screen}>
      {sections.map(section => (
        <InfoSection key={section.title} {...section} />
      ))}
    </ScrollView>
  );
};

export default PersonalInfoScreen;
