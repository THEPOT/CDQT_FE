import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';
import Sidebar from './Sidebar';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex mt-16">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}