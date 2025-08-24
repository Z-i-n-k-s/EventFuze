import React, { useState, useEffect } from 'react';

const Analytics = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [timeRange, setTimeRange] = useState('month');

  // Mock data for demonstration
  const analyticsData = {
    totalViews: 12458,
    totalMembers: 3421,
    activeEvents: 28,
    engagementRate: '68%',
    growthRate: '+12.4%',
    popularEvents: [
      { id: 1, name: 'Annual Music Festival', attendees: 2450, views: 5120 },
      { id: 2, name: 'Tech Conference', attendees: 1870, views: 4320 },
      { id: 3, name: 'Art Exhibition', attendees: 1560, views: 3850 },
      { id: 4, name: 'Sports Tournament', attendees: 1320, views: 3210 },
      { id: 5, name: 'Food Fair', attendees: 980, views: 2780 },
    ],
    topClubs: [
      { id: 1, name: 'Tech Club', members: 845, growth: '+15%' },
      { id: 2, name: 'Music Club', members: 720, growth: '+8%' },
      { id: 3, name: 'Arts Club', members: 632, growth: '+12%' },
      { id: 4, name: 'Sports Club', members: 580, growth: '+5%' },
      { id: 5, name: 'Science Club', members: 520, growth: '+18%' },
    ],
    viewsData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [1200, 1900, 1500, 2100, 2400, 3200],
    },
    attendanceData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [800, 1200, 950, 1400, 1800, 2450],
    },
  };

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Simple bar chart component
  const BarChart = ({ data, color }) => {
    const maxValue = Math.max(...data.data);
    
    return (
      <div className="flex items-end h-40 gap-1 pt-4 pb-2">
        {data.data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={`w-full rounded-t ${color}`}
              style={{ height: `${(value / maxValue) * 100}%` }}
            ></div>
            <span className="text-xs mt-1 dark:text-gray-400">{data.labels[index]}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200 p-4 md:p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Club Analytics Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Time Range Selector */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <button
              key={range}
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-${
                range === 'week' ? 'l' : range === 'year' ? 'r' : ''
              } border ${
                timeRange === range
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Total Views', value: analyticsData.totalViews, change: analyticsData.growthRate, icon: '👁️' },
          { title: 'Total Members', value: analyticsData.totalMembers, change: '+5.2%', icon: '👥' },
          { title: 'Active Events', value: analyticsData.activeEvents, change: '-2', icon: '📅' },
          { title: 'Engagement Rate', value: analyticsData.engagementRate, change: '+3.1%', icon: '💬' },
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value.toLocaleString()}</p>
                <p className={`text-xs mt-1 ${stat.change.includes('+') ? 'text-green-500' : stat.change.includes('-') ? 'text-red-500' : 'text-gray-500'}`}>
                  {stat.change}
                </p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Views Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Views Over Time</h2>
          <BarChart data={analyticsData.viewsData} color="bg-blue-500" />
        </div>

        {/* Attendance Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Attendance Over Time</h2>
          <BarChart data={analyticsData.attendanceData} color="bg-green-500" />
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Events */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Popular Events</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Event</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Attendees</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {analyticsData.popularEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="px-4 py-3 whitespace-nowrap">{event.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{event.attendees.toLocaleString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{event.views.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Clubs */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Top Clubs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Club</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Members</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {analyticsData.topClubs.map((club) => (
                  <tr key={club.id}>
                    <td className="px-4 py-3 whitespace-nowrap">{club.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{club.members.toLocaleString()}</td>
                    <td className={`px-4 py-3 whitespace-nowrap ${club.growth.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {club.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;