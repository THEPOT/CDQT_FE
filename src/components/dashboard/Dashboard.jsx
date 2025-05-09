import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Welcome</h2>
          <p className="text-gray-600">Hello, {user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;