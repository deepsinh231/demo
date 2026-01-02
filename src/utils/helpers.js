export const getCountColor = (value) => {
  if (value > 1000) return 'text-red-600';
  if (value > 500) return 'text-orange-500';
  return 'text-gray-800';
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const calculatePercentage = (value, total) => {
  if (!total) return '0.0';
  return ((value / total) * 100).toFixed(1);
};

export const formatNumber = (num) => {
  return num?.toLocaleString() || '0';
};
