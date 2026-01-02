import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import NoDataFallback from './NoDataFallback';

const TrendLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <NoDataFallback message="No trend data available for the selected date range" />;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📉 Application Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#4f46e5' }}
            name="Applications"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;
