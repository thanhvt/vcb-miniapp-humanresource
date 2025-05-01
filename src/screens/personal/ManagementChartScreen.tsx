import React, {useState, useMemo} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {Card, Text, Avatar, useTheme, Searchbar, Chip, Portal, Modal, Button, IconButton} from 'react-native-paper';
import {containers, layout, margin} from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useCallback} from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    elevation: 4,
    marginHorizontal: 8,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  connector: {
    width: 2,
    height: 24,
    alignSelf: 'center',
    marginVertical: 4,
  },
  roleIcon: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
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
  const [scaleAnim] = useState(new Animated.Value(0));
  
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

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, []);

  const getRoleIcon = () => {
    switch (type) {
      case 'manager':
        return 'account-tie';
      case 'self':
        return 'account-star';
      case 'subordinate':
        return 'account';
      default:
        return 'account-group';
    }
  };

  return (
    <Animated.View style={{
      transform: [{scale: scaleAnim}],
      opacity: scaleAnim,
    }}>
    <Card
      style={[
        styles.card,
        {
          borderColor: getBorderColor(),
          backgroundColor: theme.colors.surface,
        },
      ]}>
      <Card.Content style={styles.cardContent}>
        <IconButton
          icon={getRoleIcon()}
          size={24}
          style={styles.roleIcon}
          iconColor={getBorderColor()}
        />
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
    </Animated.View>
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

      <ScrollView style={styles.container}>
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
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-tie" size={24} color={theme.colors.primary} />
            <Text variant="titleMedium" style={[margin.mh2, {color: theme.colors.primary}]}>
              Quản lý trực tiếp
            </Text>
          </View>
          {filteredData.manager && <PersonCard {...filteredData.manager} type="manager" />}
        </View>

        {/* Current Position */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-star" size={24} color={theme.colors.secondary} />
            <Text variant="titleMedium" style={[margin.mh2, {color: theme.colors.secondary}]}>
              Vị trí hiện tại
            </Text>
          </View>
          <PersonCard {...filteredData.self} type="self" />
        </View>

        {/* Colleagues Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-group" size={24} color={theme.colors.onSurfaceVariant} />
            <Text variant="titleMedium" style={[margin.mh2, {color: theme.colors.onSurfaceVariant}]}>
              Đồng nghiệp cùng cấp ({filteredData.colleagues.length})
            </Text>
          </View>
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
