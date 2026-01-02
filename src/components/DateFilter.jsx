import React from 'react';

const DateFilter = ({ fromDate, toDate, onFromChange, onToChange, onApply, onClear }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onApply();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Filter by Date Range</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => onFromChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-600 mb-1">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => onToChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            type="submit"
            className="flex-1 sm:flex-none px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={onClear}
            className="flex-1 sm:flex-none px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default DateFilter;
