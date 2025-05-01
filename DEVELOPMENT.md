# VCB Human Resource Mini App - Tài liệu phát triển

## Mục lục
1. [Tổng quan](#tổng-quan)
2. [Cấu trúc dự án](#cấu-trúc-dự-án)
3. [Các tính năng chính](#các-tính-năng-chính)
4. [Kế hoạch triển khai](#kế-hoạch-triển-khai)
5. [Tiến độ thực hiện](#tiến-độ-thực-hiện)

## Tổng quan

Ứng dụng mini quản lý nhân sự cho VCB, tập trung vào các tính năng:
- Quản lý thông tin cá nhân
- Quản lý hợp đồng lao động
- Quản lý thông tin thu nhập
- Quản lý điểm PMS

## Cấu trúc dự án

```
src/
  ├── components/          # Các components tái sử dụng
  ├── navigation/          # Các navigators
  ├── screens/             # Các màn hình
  │   ├── personal/        # Màn hình thông tin cá nhân
  │   ├── contract/        # Màn hình hợp đồng lao động
  │   ├── income/         # Màn hình thu nhập
  │   └── performance/    # Màn hình hiệu suất
  ├── services/           # API services
  ├── utils/             # Utilities, helpers
  ├── hooks/             # Custom hooks
  ├── context/           # React Context
  ├── assets/           # Ảnh, icon, fonts
  └── App.tsx           # App component
```

## Các tính năng chính

### 1. Quản lý thông tin cá nhân
- [ ] Xem và cập nhật thông tin cá nhân
  - Họ tên
  - Ngày sinh
  - Đơn vị
  - Chức vụ
  - Số điện thoại
  - Email nội bộ
- [ ] Xem sơ đồ cấp quản lý trực tiếp

### 2. Quản lý hợp đồng lao động
- [ ] Xem danh sách hợp đồng
- [ ] Xem chi tiết hợp đồng
- [ ] Tải xuống văn bản hợp đồng điện tử

### 3. Quản lý thông tin thu nhập
- [ ] Xem Payslip theo tháng
- [ ] Xem tổng thu nhập theo năm
- [ ] Tải xuống báo cáo

### 4. Quản lý điểm PMS
- [ ] Xem điểm PMS theo tháng
- [ ] Xem điểm PMS theo quý
- [ ] Xem điểm PMS theo năm
- [ ] Biểu đồ so sánh và phân tích

## Kế hoạch triển khai

### Giai đoạn 1: Thiết lập dự án
- [ ] Cập nhật cấu trúc điều hướng
  - [ ] Xóa các màn hình không cần thiết (Home, Search)
  - [ ] Tạo mới các navigators cho từng tính năng
- [x] Cài đặt các thư viện cần thiết
  - [x] React Navigation
  - [x] React Native Paper
  - [x] React Native Vector Icons
  - [x] React Native Charts
  - [x] React Native File System

### Giai đoạn 2: Phát triển components cơ bản
- [ ] Tạo các components tái sử dụng
  - [ ] InfoItem
  - [ ] PeriodSelector
  - [ ] StatusBadge
  - [ ] DataTable
  - [ ] DocumentItem
- [ ] Thiết lập theme và styles chung

### Giai đoạn 3: Phát triển các màn hình
- [ ] Màn hình thông tin cá nhân
  - [ ] Dashboard
  - [ ] Chi tiết thông tin
  - [ ] Sơ đồ quản lý
  - [ ] Form cập nhật
- [ ] Màn hình hợp đồng
  - [ ] Dashboard
  - [ ] Danh sách hợp đồng
  - [ ] Chi tiết hợp đồng
- [ ] Màn hình thu nhập
  - [ ] Dashboard
  - [ ] Payslip tháng
  - [ ] Thu nhập năm
- [ ] Màn hình hiệu suất
  - [ ] Dashboard
  - [ ] Chi tiết PMS
  - [ ] Lịch sử đánh giá

### Giai đoạn 4: Tích hợp API và dữ liệu
- [ ] Thiết lập API services
- [ ] Tạo mock data cho phát triển
- [ ] Tích hợp với API thật
- [ ] Xử lý lỗi và loading states

### Giai đoạn 5: Testing và tối ưu
- [ ] Unit testing cho components
- [ ] Integration testing
- [ ] Performance optimization
- [ ] Bug fixing

## Tiến độ thực hiện

### Đã hoàn thành
- [x] Phân tích yêu cầu
- [x] Thiết kế cấu trúc ứng dụng
- [x] Tạo tài liệu phát triển
- [x] Cài đặt các thư viện cần thiết
  - [x] React Navigation
  - [x] React Native Paper
  - [x] React Native Vector Icons
  - [x] React Native FS
  - [x] React Native Safe Area Context
  - [x] React Native Gesture Handler
  - [x] React Native Reanimated
- [x] Cập nhật cấu trúc điều hướng
  - [x] Tạo mới các navigators cho từng tính năng
  - [x] Cập nhật TabsNavigator.tsx để sử dụng các navigator mới
- [x] Tạo cấu trúc thư mục dự án
- [x] Tạo dữ liệu mẫu (mock data) cho các tính năng
  - [x] Dữ liệu thông tin cá nhân 
  - [x] Dữ liệu hợp đồng lao động
  - [x] Dữ liệu thu nhập
  - [x] Dữ liệu điểm PMS

### Đang thực hiện
- [x] Giai đoạn 2: Phát triển components cơ bản
- [ ] Giai đoạn 3: Phát triển các màn hình

### Tiếp theo
- Tạo các components tái sử dụng
  - [x] InfoItem
  - [x] PeriodSelector
  - [x] StatusBadge
  - [x] DataTable
  - [x] DocumentItem
- [ ] Thiết lập theme và styles chung
- [ ] Màn hình thông tin cá nhân
  - [ ] Dashboard
  - [ ] Chi tiết thông tin
  - [ ] Sơ đồ quản lý
  - [ ] Form cập nhật
- [ ] Màn hình hợp đồng
  - [ ] Dashboard
  - [ ] Danh sách hợp đồng
  - [ ] Chi tiết hợp đồng
- [ ] Màn hình thu nhập
  - [ ] Dashboard
  - [ ] Payslip tháng
  - [ ] Thu nhập năm
- [ ] Màn hình hiệu suất
  - [ ] Dashboard
  - [ ] Chi tiết PMS
  - [ ] Lịch sử đánh giá

## Dependencies cần cài đặt

```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs

# UI Components
npm install react-native-paper react-native-vector-icons

# Charts
npm install react-native-chart-kit

# Utils
npm install date-fns

# File System
npm install react-native-fs

# Safe Area
npm install react-native-safe-area-context

# Gesture Handler
npm install react-native-gesture-handler

# Reanimated
npm install react-native-reanimated
```

## Mock Data Structure

```typescript
// Cấu trúc dữ liệu mock cho các tính năng

// Thông tin cá nhân
interface PersonalInfo {
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

// Cấp quản lý
interface Manager {
  id: string;
  name: string;
  position: string;
  department: string;
  level: number;
  subordinates?: Manager[];
}

// Hợp đồng
interface Contract {
  id: string;
  type: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'expired' | 'terminated';
  documentUrl: string;
  signDate: string;
}

// Thu nhập
interface Income {
  id: string;
  period: string;
  type: 'monthly' | 'yearly';
  grossAmount: number;
  netAmount: number;
  details: IncomeDetail[];
  documentUrl?: string;
}

interface IncomeDetail {
  id: string;
  name: string;
  amount: number;
  type: 'earning' | 'deduction';
}

// PMS
interface PMSScore {
  id: string;
  period: string;
  periodType: 'month' | 'quarter' | 'year';
  score: number;
  maxScore: number;
  rating: string;
  details: PMSDetail[];
}

interface PMSDetail {
  id: string;
  kpiName: string;
  weight: number;
  score: number;
  maxScore: number;
  status: 'completed' | 'in_progress' | 'not_started';
}
```
