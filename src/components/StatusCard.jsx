import React from 'react';
import { getCountColor, formatNumber } from '../utils/helpers';

const StatusCard = ({ title, count, icon, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-lg p-6 transition-transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className={`text-3xl font-bold mt-2 ${getCountColor(count)}`}>
            {formatNumber(count)}
          </p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </div>
  );
};

export default StatusCard;
