import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from './components/DashboardLayout';
import Tasks from './pages/Tasks';
import Employees from './pages/Employees';
import Reports from './pages/Reports';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  const [stats, setStats] = useState({
    totalUsers: 150,
    activeProjects: 12,
    revenue: 50000,
    systemHealth: 98
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const taskData = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [15, 25, 60],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: [
          'rgba(251, 191, 36, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#9CA3AF' },
      },
    },
  };

  const recentTasks = [
    { id: 1, title: 'Website Redesign', status: 'in-progress', priority: 'high' },
    { id: 2, title: 'Database Migration', status: 'completed', priority: 'medium' },
    { id: 3, title: 'API Integration', status: 'pending', priority: 'high' },
    { id: 4, title: 'Security Audit', status: 'in-progress', priority: 'low' },
    { id: 5, title: 'Mobile App Launch', status: 'pending', priority: 'high' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-600';
      case 'in-progress': return 'bg-blue-600';
      case 'pending': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back! Here's your overview.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Total Users</p>
                    <p className="text-4xl font-bold text-white mt-2">{loading ? '...' : stats.totalUsers}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm font-medium">Active Projects</p>
                    <p className="text-4xl font-bold text-white mt-2">{loading ? '...' : stats.activeProjects}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm font-medium">Revenue</p>
                    <p className="text-4xl font-bold text-white mt-2">{loading ? '...' : `$${stats.revenue}K`}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-200 text-sm font-medium">System Health</p>
                    <p className="text-4xl font-bold text-white mt-2">{loading ? '...' : `${stats.systemHealth}%`}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Revenue Overview</h3>
                <div className="h-64">
                  <Bar data={revenueData} options={chartOptions} />
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Task Status Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                  <Doughnut data={taskData} options={doughnutOptions} />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Recent Tasks</h3>
              <div className="space-y-3">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                      <span className="text-white font-medium">{task.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                      <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        } />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;

