import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1/analytics',
  timeout: 10000,
});

const mockData = {
  totalApplicants: 1250,
  verifiedApplicants: 890,
  rejectedApplicants: 180,
  pendingApplicants: 180,
  applicationsByProgram: [
    { program: 'Computer Science', count: 320 },
    { program: 'Business Admin', count: 280 },
    { program: 'Engineering', count: 245 },
    { program: 'Medicine', count: 190 },
    { program: 'Law', count: 120 },
    { program: 'Arts', count: 95 },
  ],
  applicationTrends: [
    { date: '2025-12-01', applications: 45 },
    { date: '2025-12-05', applications: 78 },
    { date: '2025-12-10', applications: 120 },
    { date: '2025-12-15', applications: 95 },
    { date: '2025-12-20', applications: 180 },
    { date: '2025-12-25', applications: 210 },
    { date: '2025-12-28', applications: 165 },
    { date: '2026-01-01', applications: 357 },
  ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAdmissionAnalytics = async (fromDate, toDate) => {
  await delay(800);

  let filteredTrends = [...mockData.applicationTrends];

  if (fromDate && toDate) {
    filteredTrends = mockData.applicationTrends.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
    });
  }

  return {
    ...mockData,
    applicationTrends: filteredTrends,
  };
};

export const fetchRealAdmissionAnalytics = async (fromDate, toDate) => {
  const params = {};
  if (fromDate) params.fromDate = fromDate;
  if (toDate) params.toDate = toDate;

  const response = await api.get('/admissions', { params });
  return response.data;
};

export default {
  fetchAdmissionAnalytics,
  fetchRealAdmissionAnalytics,
};
