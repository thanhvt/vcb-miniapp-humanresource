// Dữ liệu mẫu cho module hợp đồng lao động

export interface Contract {
  id: string;
  type: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'expired' | 'terminated';
  documentUrl: string;
  signDate: string;
}

export const contracts: Contract[] = [
  {
    id: 'contract-001',
    type: 'Không thời hạn',
    startDate: '2022-01-01',
    status: 'active',
    documentUrl: 'https://example.com/contracts/contract-001.pdf',
    signDate: '2021-12-15',
  },
  {
    id: 'contract-002',
    type: 'Xác định thời hạn 3 năm',
    startDate: '2019-01-01',
    endDate: '2021-12-31',
    status: 'expired',
    documentUrl: 'https://example.com/contracts/contract-002.pdf',
    signDate: '2018-12-20',
  },
  {
    id: 'contract-003',
    type: 'Xác định thời hạn 1 năm',
    startDate: '2018-01-01',
    endDate: '2018-12-31',
    status: 'expired',
    documentUrl: 'https://example.com/contracts/contract-003.pdf',
    signDate: '2017-12-15',
  },
  {
    id: 'contract-004',
    type: 'Thử việc',
    startDate: '2017-10-01',
    endDate: '2017-12-31',
    status: 'expired',
    documentUrl: 'https://example.com/contracts/contract-004.pdf',
    signDate: '2017-09-25',
  }
];
