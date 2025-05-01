// Dữ liệu mẫu cho module thu nhập

export interface IncomeDetail {
  id: string;
  name: string;
  amount: number;
  type: 'earning' | 'deduction';
}

export interface Income {
  id: string;
  period: string;
  type: 'monthly' | 'yearly';
  grossAmount: number;
  netAmount: number;
  details: IncomeDetail[];
  documentUrl?: string;
}

export const monthlyIncomes: Income[] = [
  {
    id: 'income-2025-04',
    period: '04-2025',
    type: 'monthly',
    grossAmount: 30000000,
    netAmount: 25000000,
    details: [
      { id: 'i-2025-04-1', name: 'Lương cơ bản', amount: 20000000, type: 'earning' },
      { id: 'i-2025-04-2', name: 'Phụ cấp', amount: 5000000, type: 'earning' },
      { id: 'i-2025-04-3', name: 'Thưởng hiệu suất', amount: 3000000, type: 'earning' },
      { id: 'i-2025-04-4', name: 'Thưởng dự án', amount: 2000000, type: 'earning' },
      { id: 'i-2025-04-5', name: 'Thuế thu nhập cá nhân', amount: 3000000, type: 'deduction' },
      { id: 'i-2025-04-6', name: 'Bảo hiểm xã hội', amount: 2000000, type: 'deduction' },
    ],
    documentUrl: 'https://example.com/payslips/2025-04.pdf',
  },
  {
    id: 'income-2025-03',
    period: '03-2025',
    type: 'monthly',
    grossAmount: 29000000,
    netAmount: 24000000,
    details: [
      { id: 'i-2025-03-1', name: 'Lương cơ bản', amount: 20000000, type: 'earning' },
      { id: 'i-2025-03-2', name: 'Phụ cấp', amount: 5000000, type: 'earning' },
      { id: 'i-2025-03-3', name: 'Thưởng hiệu suất', amount: 2000000, type: 'earning' },
      { id: 'i-2025-03-4', name: 'Thưởng dự án', amount: 2000000, type: 'earning' },
      { id: 'i-2025-03-5', name: 'Thuế thu nhập cá nhân', amount: 3000000, type: 'deduction' },
      { id: 'i-2025-03-6', name: 'Bảo hiểm xã hội', amount: 2000000, type: 'deduction' },
    ],
    documentUrl: 'https://example.com/payslips/2025-03.pdf',
  },
  {
    id: 'income-2025-02',
    period: '02-2025',
    type: 'monthly',
    grossAmount: 28000000,
    netAmount: 23000000,
    details: [
      { id: 'i-2025-02-1', name: 'Lương cơ bản', amount: 20000000, type: 'earning' },
      { id: 'i-2025-02-2', name: 'Phụ cấp', amount: 5000000, type: 'earning' },
      { id: 'i-2025-02-3', name: 'Thưởng hiệu suất', amount: 1000000, type: 'earning' },
      { id: 'i-2025-02-4', name: 'Thưởng dự án', amount: 2000000, type: 'earning' },
      { id: 'i-2025-02-5', name: 'Thuế thu nhập cá nhân', amount: 3000000, type: 'deduction' },
      { id: 'i-2025-02-6', name: 'Bảo hiểm xã hội', amount: 2000000, type: 'deduction' },
    ],
    documentUrl: 'https://example.com/payslips/2025-02.pdf',
  },
];

export const yearlyIncomes: Income[] = [
  {
    id: 'income-2024',
    period: '2024',
    type: 'yearly',
    grossAmount: 350000000,
    netAmount: 290000000,
    details: [
      { id: 'i-2024-1', name: 'Tổng lương', amount: 240000000, type: 'earning' },
      { id: 'i-2024-2', name: 'Tổng phụ cấp', amount: 60000000, type: 'earning' },
      { id: 'i-2024-3', name: 'Tổng thưởng', amount: 50000000, type: 'earning' },
      { id: 'i-2024-4', name: 'Thuế thu nhập cá nhân', amount: 36000000, type: 'deduction' },
      { id: 'i-2024-5', name: 'Bảo hiểm xã hội', amount: 24000000, type: 'deduction' },
    ],
    documentUrl: 'https://example.com/income/2024.pdf',
  },
  {
    id: 'income-2023',
    period: '2023',
    type: 'yearly',
    grossAmount: 320000000,
    netAmount: 270000000,
    details: [
      { id: 'i-2023-1', name: 'Tổng lương', amount: 220000000, type: 'earning' },
      { id: 'i-2023-2', name: 'Tổng phụ cấp', amount: 55000000, type: 'earning' },
      { id: 'i-2023-3', name: 'Tổng thưởng', amount: 45000000, type: 'earning' },
      { id: 'i-2023-4', name: 'Thuế thu nhập cá nhân', amount: 30000000, type: 'deduction' },
      { id: 'i-2023-5', name: 'Bảo hiểm xã hội', amount: 20000000, type: 'deduction' },
    ],
    documentUrl: 'https://example.com/income/2023.pdf',
  },
];

// Dữ liệu cho biểu đồ
export const chartData = {
  last6Months: [
    { month: '11/2024', amount: 22000000 },
    { month: '12/2024', amount: 23000000 },
    { month: '01/2025', amount: 22500000 },
    { month: '02/2025', amount: 23000000 },
    { month: '03/2025', amount: 24000000 },
    { month: '04/2025', amount: 25000000 },
  ],
  lastYears: [
    { year: '2020', amount: 220000000 },
    { year: '2021', amount: 235000000 },
    { year: '2022', amount: 250000000 },
    { year: '2023', amount: 270000000 },
    { year: '2024', amount: 290000000 },
  ],
};
