import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchAdmissionAnalytics } from '../api/analytics';
import { formatDate } from '../utils/helpers';

import StatusCard from './StatusCard';
import LoadingSpinner from './LoadingSpinner';
import DateFilter from './DateFilter';
import ProgramBarChart from './ProgramBarChart';
import TrendLineChart from './TrendLineChart';
import ProgramTable from './ProgramTable';
import RefreshButton from './RefreshButton';

const AdmissionDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchAdmissionAnalytics(fromDate, toDate);
            setData(result);
        } catch (err) {
            setError('Failed to fetch analytics data. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [fromDate, toDate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleRefresh = () => fetchData();

    const handleApplyFilter = () => fetchData();

    const handleClearFilter = () => {
        setFromDate('');
        setToDate('');
    };

    const programChartData = useMemo(() => {
        return data?.applicationsByProgram || [];
    }, [data]);

    const trendChartData = useMemo(() => {
        return data?.applicationTrends?.map((item) => ({
            ...item,
            date: formatDate(item.date),
        })) || [];
    }, [data]);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={handleRefresh}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900">
                            🎓 Admission Analytics
                        </h1>
                        <p className="text-gray-600 mt-1">University Admin Portal</p>
                    </div>
                    <RefreshButton onClick={handleRefresh} loading={loading} />
                </div>

                {loading && !data ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                            <StatusCard title="Total Applicants" count={data?.totalApplicants} icon="📊" bgColor="bg-white" />
                            <StatusCard title="Verified" count={data?.verifiedApplicants} icon="✅" bgColor="bg-green-50" />
                            <StatusCard title="Rejected" count={data?.rejectedApplicants} icon="❌" bgColor="bg-red-50" />
                            <StatusCard title="Pending" count={data?.pendingApplicants} icon="⏳" bgColor="bg-yellow-50" />
                        </div>

                        <DateFilter
                            fromDate={fromDate}
                            toDate={toDate}
                            onFromChange={setFromDate}
                            onToChange={setToDate}
                            onApply={handleApplyFilter}
                            onClear={handleClearFilter}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <ProgramBarChart data={programChartData} />
                            <TrendLineChart data={trendChartData} />
                        </div>

                        <ProgramTable data={programChartData} />
                    </>
                )}
            </div>
        </div>
    );
};

export default AdmissionDashboard;
