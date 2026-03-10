import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Reports = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'New Tasks',
        data: [15, 12, 18, 20, 25, 28],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Engineering', 'Design', 'Marketing', 'Management', 'HR'],
    datasets: [
      {
        data: [35, 20, 15, 18, 12],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Productivity',
        data: [65, 72, 78, 85],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Efficiency',
        data: [55, 60, 68, 75],
        borderColor: 'rgba(251, 191, 36, 1)',
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#9CA3AF' },
      },
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
      y: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#9CA3AF' },
      },
    },
  };

  const summaryCards = [
    { title: 'Total Revenue', value: '$125,000', change: '+12%', color: 'from-green-600 to-green-700' },
    { title: 'Total Expenses', value: '$45,000', change: '-5%', color: 'from-red-600 to-red-700' },
    { title: 'Net Profit', value: '$80,000', change: '+18%', color: 'from-blue-600 to-blue-700' },
    { title: 'Growth Rate', value: '24%', change: '+3%', color: 'from-purple-600 to-purple-700' },
  ];

  if (loading) {
    return <div className="p-6 text-white">Loading reports...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">Reports & Analytics</h2>
        <p className="text-gray-400 mt-1">Track performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryCards.map((card, index) => (
          <div key={index} className={`bg-gradient-to-br ${card.color} rounded-xl p-4 shadow-lg`}>
            <p className="text-white text-sm font-medium opacity-90">{card.title}</p>
            <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
            <p className="text-white text-sm mt-2 opacity-80">{card.change} from last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Task Completion Trend</h3>
          <div className="h-64">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Department Distribution</h3>
          <div className="h-64">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
        <div className="h-64">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Reports;

