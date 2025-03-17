import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { RiNotification3Line, RiUserLine, RiLogoutBoxRLine } from 'react-icons/ri';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
      <div className="px-8 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://placehold.co/40x40"
                alt="Logo"
                className="h-8 w-8 rounded"
              />
              <span className="ml-3 text-xl font-semibold text-gray-800">
                CDQT
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
              <RiNotification3Line className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <RiUserLine className="w-5 h-5" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <RiLogoutBoxRLine className="w-5 h-5" />
              <span className="hidden md:block">Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;