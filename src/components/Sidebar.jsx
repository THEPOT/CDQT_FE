import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  RiDashboardLine,
  RiUserLine,
  RiBookOpenLine,
  RiCalendarCheckLine,
  RiFileList3Line,
  RiGraduationCapLine,
  RiCustomerService2Line,
  RiFileChartLine,
  RiGroupLine,
  RiSettings3Line,
  RiMailLine
} from 'react-icons/ri';

function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'teacher':
        return [
          { path: '/teacher-dashboard', icon: RiDashboardLine, label: 'Trang chủ' },
          { path: '/class-management', icon: RiGroupLine, label: 'Quản lý lớp học' },
          { path: '/grade-management', icon: RiFileList3Line, label: 'Quản lý điểm' },
          { path: '/course-info', icon: RiBookOpenLine, label: 'Thông tin môn học' }
        ];
      case 'staff':
        return [
          { path: '/staff-dashboard', icon: RiDashboardLine, label: 'Trang chủ' },
          { path: '/student-management', icon: RiUserLine, label: 'Quản lý sinh viên' },
          { path: '/request-management', icon: RiMailLine, label: 'Quản lý yêu cầu' },
          { path: '/course-management', icon: RiBookOpenLine, label: 'Quản lý môn học' }
        ];
      case 'admin':
        return [
          { path: '/', icon: RiDashboardLine, label: 'Trang chủ' },
          { path: '/student-management', icon: RiUserLine, label: 'Quản lý sinh viên' },
          { path: '/course-management', icon: RiBookOpenLine, label: 'Quản lý môn học' },
          { path: '/settings', icon: RiSettings3Line, label: 'Cài đặt hệ thống' }
        ];
      default: // Student
        return [
          { path: '/', icon: RiDashboardLine, label: 'Trang chủ' },
          { path: '/student-info', icon: RiUserLine, label: 'Thông tin sinh viên' },
          { path: '/course-registration', icon: RiCalendarCheckLine, label: 'Đăng ký môn học' },
          { path: '/course-info', icon: RiBookOpenLine, label: 'Thông tin môn học' },
          { path: '/transcript', icon: RiFileList3Line, label: 'Bảng điểm' },
          { path: '/degree-audit', icon: RiGraduationCapLine, label: 'Tiến độ học tập' },
          { path: '/services', icon: RiCustomerService2Line, label: 'Dịch vụ sinh viên' },
          { path: '/course-evaluation', icon: RiFileChartLine, label: 'Đánh giá môn học' }
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;