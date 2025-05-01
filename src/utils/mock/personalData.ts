// Dữ liệu mẫu cho module thông tin cá nhân

export interface PersonalInfo {
  id: string;
  fullName: string;
  birthDate: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  employeeId: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Manager {
  id: string;
  name: string;
  position: string;
  department: string;
  level: number;
  subordinates?: Manager[];
}

export const personalInfo: PersonalInfo = {
  id: '001',
  fullName: 'Nguyễn Văn A',
  birthDate: '1985-05-15',
  department: 'Phòng Công nghệ thông tin',
  position: 'Trưởng phòng',
  phone: '0987654321',
  email: 'nguyenvana@vcb.com.vn',
  employeeId: 'VCB123456',
  joinDate: '2015-01-01',
  status: 'active',
  avatar: 'https://i.pravatar.cc/150?img=12',
};

export const managementChart: Manager = {
  id: '005',
  name: 'Trần Văn B',
  position: 'Giám đốc Khối',
  department: 'Khối Công nghệ thông tin',
  level: 1,
  subordinates: [
    {
      id: '004',
      name: 'Lê Thị C',
      position: 'Phó Giám đốc Khối',
      department: 'Khối Công nghệ thông tin',
      level: 2,
      subordinates: [
        {
          id: '003', 
          name: 'Phạm Văn D',
          position: 'Giám đốc Trung tâm',
          department: 'Trung tâm CNTT',
          level: 3,
          subordinates: [
            {
              id: '002',
              name: 'Hoàng Thị E',
              position: 'Phó Giám đốc Trung tâm',
              department: 'Trung tâm CNTT',
              level: 4,
              subordinates: [
                {
                  id: '001',
                  name: 'Nguyễn Văn A',
                  position: 'Trưởng phòng',
                  department: 'Phòng Công nghệ thông tin',
                  level: 5
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
