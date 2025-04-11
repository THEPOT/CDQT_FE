import React from 'react';
import { RiUserLine, RiBookOpenLine, RiSettings4Line } from 'react-icons/ri';

function AdminDashboard() {
  const adminStats = {
    totalStudents: 1250,
    totalCourses: 85,
    activeUsers: 1500,
    pendingRequests: 15
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <RiUserLine className="text-blue-500 text-2xl mb-2" />
          <h3 className="font-semibold">Total Students</h3>
          <p className="text-2xl">{adminStats.totalStudents}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <RiBookOpenLine className="text-green-500 text-2xl mb-2" />
          <h3 className="font-semibold">Total Courses</h3>
          <p className="text-2xl">{adminStats.totalCourses}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <RiSettings4Line className="text-purple-500 text-2xl mb-2" />
          <h3 className="font-semibold">Active Users</h3>
          <p className="text-2xl">{adminStats.activeUsers}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold p-6 border-b">Quick Actions</h2>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="btn btn-primary">Manage Students</button>
          <button className="btn btn-primary">Manage Courses</button>
          <button className="btn btn-primary">User Management</button>
          <button className="btn btn-primary">System Settings</button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-6 border-b">Recent Activity</h2>
        <div className="p-6">
          <p className="text-gray-600">Recent system activity will be displayed here...</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
