import React, {useState, useMemo} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Text, Avatar, useTheme, Searchbar, Chip, Portal, Modal, Button} from 'react-native-paper';
import {containers, layout, margin} from '../../theme';

const styles = StyleSheet.create({
  searchContainer: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  modal: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  section: {
    margin: 16,
  },
  card: {
    borderWidth: 1,
    elevation: 2,
  },
  connector: {
    width: 2,
    height: 20,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

// Mock data - will be replaced with real API data later
const managementData = {
  manager: {
    name: 'Nguyễn Văn B',
    position: 'Trưởng phòng',
    department: 'Phòng Công nghệ thông tin',
    email: 'nguyenvanb@vcb.com.vn',
  },
  self: {
    name: 'Nguyễn Văn A',
    position: 'Chuyên viên cao cấp',
    department: 'Phòng Công nghệ thông tin',
    email: 'nguyenvana@vcb.com.vn',
  },
  colleagues: [
    {
      name: 'Trần Văn C',
      position: 'Chuyên viên cao cấp',
      department: 'Phòng Công nghệ thông tin',
      email: 'tranvanc@vcb.com.vn',
    },
    {
      name: 'Lê Thị D',
      position: 'Chuyên viên',
      department: 'Phòng Công nghệ thông tin',
      email: 'lethid@vcb.com.vn',
    },
  ],
  subordinates: [
    {
      name: 'Phạm Văn E',
      position: 'Chuyên viên',
      department: 'Phòng Công nghệ thông tin',
      email: 'phamvane@vcb.com.vn',
    },
  ],
};

interface PersonCardProps {
  name: string;
  position: string;
  department: string;
  email: string;
  type?: 'manager' | 'self' | 'colleague' | 'subordinate';
}

const PersonCard = ({name, position, department, email, type = 'colleague'}: PersonCardProps) => {
  const theme = useTheme();
  
  const getBorderColor = () => {
    switch (type) {
      case 'manager':
        return theme.colors.primary;
      case 'self':
        return theme.colors.secondary;
      default:
        return theme.colors.surfaceVariant;
    }
  };

  return (
    <Card
      style={[
        styles.card,
        {
          borderColor: getBorderColor(),
          backgroundColor: theme.colors.surface,
        },
      ]}>
      <Card.Content style={[layout.row, layout.alignCenter]}>
        <Avatar.Text
          size={40}
          label={name.split(' ').map(n => n[0]).join('')}
          style={{backgroundColor: getBorderColor()}}
        />
        <View style={margin.mh3}>
          <Text variant="titleMedium">{name}</Text>
          <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant}}>
            {position}
          </Text>
          <Text variant="bodySmall" style={{color: theme.colors.onSurfaceVariant}}>
            {email}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

// Extract unique departments from data
const departments = Array.from(
  new Set(
    [
      managementData.manager,
      managementData.self,
      ...managementData.colleagues,
      ...managementData.subordinates,
    ].map(person => person.department),
  ),
);

const ManagementChartScreen = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);

  const toggleDepartment = (department: string) => {
    setSelectedDepartments(prev =>
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department],
    );
  };

  const filterPerson = (person: typeof managementData.self) => {
    const matchesSearch = searchQuery.toLowerCase();
    return (
      person.name.toLowerCase().includes(matchesSearch) ||
      person.position.toLowerCase().includes(matchesSearch) ||
      person.email.toLowerCase().includes(matchesSearch)
    ) && (selectedDepartments.length === 0 || selectedDepartments.includes(person.department));
  };

  const filteredData = useMemo(() => {
    return {
      manager: filterPerson(managementData.manager) ? managementData.manager : null,
      self: managementData.self,
      colleagues: managementData.colleagues.filter(filterPerson),
      subordinates: managementData.subordinates.filter(filterPerson),
    };
  }, [searchQuery, selectedDepartments]);

  return (
    <>
      <Portal>
        <Modal
          visible={showDepartmentModal}
          onDismiss={() => setShowDepartmentModal(false)}
          contentContainerStyle={[styles.modal, {backgroundColor: theme.colors.surface}]}>
          <Text variant="titleLarge" style={margin.mb3}>Chọn phòng ban</Text>
          <View style={[layout.row, layout.wrap, margin.mb3]}>
            {departments.map(department => (
              <Chip
                key={department}
                selected={selectedDepartments.includes(department)}
                onPress={() => toggleDepartment(department)}
                style={margin.m1}
                showSelectedCheck
                mode="outlined">
                {department}
              </Chip>
            ))}
          </View>
          <Button mode="contained" onPress={() => setShowDepartmentModal(false)}>
            Xác nhận
          </Button>
        </Modal>
      </Portal>

      <ScrollView style={containers.screen}>
        {/* Search and Filter */}
        <View style={[styles.searchContainer, {backgroundColor: theme.colors.surface}]}>
          <Searchbar
            placeholder="Tìm kiếm theo tên, chức vụ..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={margin.mb2}
          />
          <View style={[layout.row, layout.alignCenter]}>
            <Text variant="bodyMedium" style={{color: theme.colors.onSurfaceVariant}}>
              Bộ lọc:
            </Text>
            <TouchableOpacity
              onPress={() => setShowDepartmentModal(true)}
              style={[styles.filterButton, margin.mh2]}>
              <Text variant="bodyMedium" style={{color: theme.colors.primary}}>
                {selectedDepartments.length
                  ? `${selectedDepartments.length} phòng ban`
                  : 'Chọn phòng ban'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Manager Section */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[margin.mb2, {color: theme.colors.primary}]}>
            Quản lý trực tiếp
          </Text>
          {filteredData.manager && <PersonCard {...filteredData.manager} type="manager" />}
        </View>

        {/* Current Position */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[margin.mb2, {color: theme.colors.secondary}]}>
            Vị trí hiện tại
          </Text>
          <PersonCard {...filteredData.self} type="self" />
        </View>

        {/* Colleagues Section */}
        <View style={styles.section}>
          <Text variant="titleMedium" style={[margin.mb2, {color: theme.colors.onSurfaceVariant}]}>
            Đồng nghiệp cùng cấp ({filteredData.colleagues.length})
          </Text>
          {filteredData.colleagues.map((colleague, index) => (
            <View key={colleague.email} style={margin.mb2}>
              <PersonCard {...colleague} />
            </View>
          ))}
        </View>

        {/* Subordinates Section */}
        {filteredData.subordinates.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={[margin.mb2, {color: theme.colors.onSurfaceVariant}]}>
              Nhân viên ({filteredData.subordinates.length})
            </Text>
            {filteredData.subordinates.map((subordinate, index) => (
              <View key={subordinate.email} style={margin.mb2}>
                <PersonCard {...subordinate} type="subordinate" />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>);
};

export default ManagementChartScreen;
