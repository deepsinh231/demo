import React from 'react';
import { getCountColor, calculatePercentage, formatNumber } from '../utils/helpers';
import NoDataFallback from './NoDataFallback';

const ProgramTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <NoDataFallback message="No program data available" />;
  }

  const total = data.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Program Summary</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-gray-700">Program</th>
              <th className="py-3 px-4 font-semibold text-gray-700 text-right">Applications</th>
              <th className="py-3 px-4 font-semibold text-gray-700 text-right">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-800">{item.program}</td>
                <td className={`py-3 px-4 text-right font-semibold ${getCountColor(item.count)}`}>
                  {formatNumber(item.count)}
                </td>
                <td className="py-3 px-4 text-right text-gray-600">
                  {calculatePercentage(item.count, total)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramTable;
