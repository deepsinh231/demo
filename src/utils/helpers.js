// Get color class based on count value
export const getCountColor = (value) => {
  if (value > 1000) return 'text-red-600';
  if (value > 500) return 'text-orange-500';
  return 'text-gray-800';
};

// Format date for display
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (!total) return '0.0';
  return ((value / total) * 100).toFixed(1);
};

// Format number with commas
export const formatNumber = (num) => {
  return num?.toLocaleString() || '0';
};
