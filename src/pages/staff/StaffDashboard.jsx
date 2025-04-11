import React from 'react';
import { RiFileList3Line, RiUserLine, RiTimeLine } from 'react-icons/ri';

function StaffDashboard() {
  const staffData = {
    name: 'Jane Doe',
    department: 'Academic Affairs',
    pendingRequests: 12,
    processedRequests: 45,
    todayAppointments: 3
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>
      
      {/* Staff Info Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{staffData.name}</h2>
        <p className="text-gray-600">{staffData.department}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <RiFileList3Line className="text-yellow-500 text-2xl mb-2" />
          <h3 className="font-semibold">Pending Requests</h3>
          <p className="text-2xl">{staffData.pendingRequests}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <RiUserLine className="text-green-500 text-2xl mb-2" />
          <h3 className="font-semibold">Processed Requests</h3>
          <p className="text-2xl">{staffData.processedRequests}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <RiTimeLine className="text-blue-500 text-2xl mb-2" />
          <h3 className="font-semibold">Today's Appointments</h3>
          <p className="text-2xl">{staffData.todayAppointments}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-6 border-b">Recent Activity</h2>
        <div className="p-6">
          <p className="text-gray-600">Recent activity will be displayed here...</p>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;