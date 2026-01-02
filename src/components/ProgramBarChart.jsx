import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import NoDataFallback from './NoDataFallback';

const ProgramBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <NoDataFallback message="No program data available" />;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Applications by Program</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="program"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} name="Applications" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgramBarChart;
