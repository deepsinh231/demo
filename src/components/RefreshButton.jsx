import React from 'react';

const RefreshButton = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="mt-4 md:mt-0 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg 
        hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
    >
      <svg
        className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {loading ? 'Refreshing...' : 'Refresh Data'}
    </button>
  );
};

export default RefreshButton;
