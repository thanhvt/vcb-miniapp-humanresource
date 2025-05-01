// Dữ liệu mẫu cho module hiệu suất (PMS)

export interface PMSDetail {
  id: string;
  kpiName: string;
  weight: number;
  score: number;
  maxScore: number;
  status: 'completed' | 'in_progress' | 'not_started';
}

export interface PMSScore {
  id: string;
  period: string;
  periodType: 'month' | 'quarter' | 'year';
  score: number;
  maxScore: number;
  rating: string;
  details: PMSDetail[];
}

// Xếp loại dựa trên điểm số
export const getRatingLabel = (score: number): string => {
  if (score >= 4.5) return 'Xuất sắc';
  if (score >= 4.0) return 'Rất tốt';
  if (score >= 3.5) return 'Tốt';
  if (score >= 3.0) return 'Khá';
  if (score >= 2.0) return 'Trung bình';
  return 'Cần cải thiện';
};

export const pmsScores: PMSScore[] = [
  // Quý hiện tại
  {
    id: 'pms-q1-2025',
    period: 'Q1-2025',
    periodType: 'quarter',
    score: 4.5,
    maxScore: 5,
    rating: 'Xuất sắc',
    details: [
      {
        id: 'pms-q1-2025-1',
        kpiName: 'Hoàn thành dự án ABC',
        weight: 30,
        score: 4.8,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q1-2025-2',
        kpiName: 'Tối ưu hóa quy trình XYZ',
        weight: 25,
        score: 4.5,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q1-2025-3',
        kpiName: 'Phát triển kỹ năng lãnh đạo',
        weight: 20,
        score: 4.2,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q1-2025-4',
        kpiName: 'Đào tạo nhân viên mới',
        weight: 15,
        score: 4.6,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q1-2025-5',
        kpiName: 'Nâng cao chất lượng code',
        weight: 10,
        score: 4.3,
        maxScore: 5,
        status: 'completed',
      },
    ],
  },
  // Quý trước
  {
    id: 'pms-q4-2024',
    period: 'Q4-2024',
    periodType: 'quarter',
    score: 4.3,
    maxScore: 5,
    rating: 'Rất tốt',
    details: [
      {
        id: 'pms-q4-2024-1',
        kpiName: 'Hoàn thành dự án DEF',
        weight: 30,
        score: 4.5,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q4-2024-2',
        kpiName: 'Tối ưu hóa quy trình UVW',
        weight: 25,
        score: 4.2,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q4-2024-3',
        kpiName: 'Phát triển kỹ năng lãnh đạo',
        weight: 20,
        score: 4.0,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q4-2024-4',
        kpiName: 'Đào tạo nhân viên mới',
        weight: 15,
        score: 4.5,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q4-2024-5',
        kpiName: 'Nâng cao chất lượng code',
        weight: 10,
        score: 4.0,
        maxScore: 5,
        status: 'completed',
      },
    ],
  },
  // Q3-2024
  {
    id: 'pms-q3-2024',
    period: 'Q3-2024',
    periodType: 'quarter',
    score: 4.2,
    maxScore: 5,
    rating: 'Rất tốt',
    details: [
      {
        id: 'pms-q3-2024-1',
        kpiName: 'Hoàn thành dự án GHI',
        weight: 30,
        score: 4.3,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q3-2024-2',
        kpiName: 'Tối ưu hóa quy trình MNO',
        weight: 25,
        score: 4.0,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q3-2024-3',
        kpiName: 'Phát triển kỹ năng lãnh đạo',
        weight: 20,
        score: 4.2,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q3-2024-4',
        kpiName: 'Đào tạo nhân viên mới',
        weight: 15,
        score: 4.3,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-q3-2024-5',
        kpiName: 'Nâng cao chất lượng code',
        weight: 10,
        score: 4.5,
        maxScore: 5,
        status: 'completed',
      },
    ],
  },
];

export const monthlyPMSScores: PMSScore[] = [
  // Tháng hiện tại
  {
    id: 'pms-2025-04',
    period: '04-2025',
    periodType: 'month',
    score: 4.6,
    maxScore: 5,
    rating: 'Xuất sắc',
    details: [
      {
        id: 'pms-2025-04-1',
        kpiName: 'Hoàn thành module A',
        weight: 40,
        score: 4.8,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2025-04-2',
        kpiName: 'Tối ưu hiệu suất',
        weight: 30,
        score: 4.5,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2025-04-3',
        kpiName: 'Hỗ trợ đồng nghiệp',
        weight: 20,
        score: 4.3,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2025-04-4',
        kpiName: 'Tài liệu kỹ thuật',
        weight: 10,
        score: 4.7,
        maxScore: 5,
        status: 'completed',
      },
    ],
  },
  // Tháng trước
  {
    id: 'pms-2025-03',
    period: '03-2025',
    periodType: 'month',
    score: 4.4,
    maxScore: 5,
    rating: 'Rất tốt',
    details: [
      {
        id: 'pms-2025-03-1',
        kpiName: 'Hoàn thành module B',
        weight: 40,
        score: 4.5,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2025-03-2',
        kpiName: 'Tối ưu hiệu suất',
        weight: 30,
        score: 4.3,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2025-03-3',
        kpiName: 'Hỗ trợ đồng nghiệp',
        weight: 20,
        score: 4.2,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2025-03-4',
        kpiName: 'Tài liệu kỹ thuật',
        weight: 10,
        score: 4.5,
        maxScore: 5,
        status: 'completed',
      },
    ],
  },
];

export const yearlyPMSScores: PMSScore[] = [
  // Năm hiện tại
  {
    id: 'pms-2024',
    period: '2024',
    periodType: 'year',
    score: 4.3,
    maxScore: 5,
    rating: 'Rất tốt',
    details: [
      {
        id: 'pms-2024-1',
        kpiName: 'Phát triển sản phẩm X',
        weight: 25,
        score: 4.5,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2024-2',
        kpiName: 'Tối ưu hóa quy trình Y',
        weight: 20,
        score: 4.2,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2024-3',
        kpiName: 'Nâng cao kỹ năng quản lý',
        weight: 20,
        score: 4.0,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2024-4',
        kpiName: 'Đào tạo nhân viên',
        weight: 15,
        score: 4.3,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2024-5',
        kpiName: 'Quản lý dự án Z',
        weight: 20,
        score: 4.4,
        maxScore: 5,
        status: 'completed',
      },
    ],
  },
  // Năm trước
  {
    id: 'pms-2023',
    period: '2023',
    periodType: 'year',
    score: 4.1,
    maxScore: 5,
    rating: 'Rất tốt',
    details: [
      {
        id: 'pms-2023-1',
        kpiName: 'Phát triển sản phẩm P',
        weight: 25,
        score: 4.2,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2023-2',
        kpiName: 'Tối ưu hóa quy trình Q',
        weight: 20,
        score: 4.0,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2023-3',
        kpiName: 'Nâng cao kỹ năng quản lý',
        weight: 20,
        score: 4.0,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2023-4',
        kpiName: 'Đào tạo nhân viên',
        weight: 15,
        score: 4.1,
        maxScore: 5,
        status: 'completed',
      },
      {
        id: 'pms-2023-5',
        kpiName: 'Quản lý dự án R',
        weight: 20,
        score: 4.2,
        maxScore: 5,
        status: 'completed',
      },
    ],
  },
];
