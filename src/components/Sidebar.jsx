import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiDashboardLine, RiFileTextLine, RiUserLine, RiBookLine, RiCalendarLine, RiFileListLine, RiSurveyLine, RiSettings4Line, RiLogoutBoxLine, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

function Sidebar({ userRole = 'Student' }) { // Giả định userRole được truyền từ hệ thống
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  // Menu điều hướng theo vai trò
  const menuItems = {
    Admin: [
      { icon: RiDashboardLine, text: 'Tổng quan', path: '/' },
      { icon: RiUserLine, text: 'Quản lý sinh viên', path: '/student-management' },
      { icon: RiBookLine, text: 'Quản lý môn học', path: '/course-management' },
      { icon: RiCalendarLine, text: 'Quản lý đăng ký', path: '/registration-management' },
      { icon: RiSurveyLine, text: 'Quản lý đánh giá', path: '/evaluation-management' },
      { icon: RiFileListLine, text: 'Quản lý dịch vụ', path: '/service-management' },
    ],
    Student: [
      { icon: RiDashboardLine, text: 'Tổng quan', path: '/' },
      { icon: RiUserLine, text: 'Thông tin cá nhân', path: '/student-info' },
      { icon: RiBookLine, text: 'Đăng ký môn học', path: '/course-registration' },
      { icon: RiFileTextLine, text: 'Kết quả học tập', path: '/transcript' },
      { icon: RiFileListLine, text: 'Dịch vụ', path: '/services' },
    ],
    Lecturer: [
      { icon: RiDashboardLine, text: 'Tổng quan', path: '/' },
      { icon: RiFileTextLine, text: 'Danh sách lớp', path: '/class-list' },
      { icon: RiSurveyLine, text: 'Đánh giá giữa kỳ', path: '/midterm-evaluation' },
      { icon: RiBookLine, text: 'Kết quả khảo sát', path: '/course-evaluation-results' },
    ],
    Staff: [
      { icon: RiDashboardLine, text: 'Tổng quan', path: '/' },
      { icon: RiUserLine, text: 'Quản lý sinh viên', path: '/student-management' },
      { icon: RiBookLine, text: 'Quản lý môn học', path: '/course-management' },
      { icon: RiCalendarLine, text: 'Quản lý đăng ký', path: '/registration-management' },
      { icon: RiFileListLine, text: 'Quản lý dịch vụ', path: '/service-management' },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}
    >
      {/* Nút thu gọn/mở rộng */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 bg-white border border-gray-200 rounded-full p-1 text-gray-500 hover:text-gray-700"
      >
        {isCollapsed ? (
          <RiArrowRightLine className="w-4 h-4" />
        ) : (
          <RiArrowLeftLine className="w-4 h-4" />
        )}
      </button>

      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/476330707_122104752284750484_5215047765037178064_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGcMEnwVDGNYm6BMBSkqdiHc26spGUkh89zbqykZSSHz0vnM8QtB7XTzJe98t0fMX3FMxnmXouQ4lG1D7Y67UAm&_nc_ohc=KJmesXmESXMQ7kNvgF3vHtn&_nc_oc=AdgXn4CnGa15fpCoWR55QcmgSNRhXWDDpm6eNGnOOP8rIFjeMdrMmWBMwT2LPcjPVdE&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=A8g48XRSR3rS-ycViEn3qXZ&oh=00_AYCe0Y_bKPnXE3WT6KEmfhnz695niRsHt_YnLJFGBvBrSQ&oe=67BBDBE8"
            alt="PaneWay"
            className="h-8"
          />
          {!isCollapsed && <span className="ml-2 font-semibold text-xl text-text">PaneWay</span>}
        </div>
      </div>

      {/* Menu điều hướng */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems[userRole].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={isCollapsed ? item.text : ''}
              >
                <item.icon className="w-6 h-6" />
                {!isCollapsed && <span className="ml-3">{item.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Cài đặt và đăng xuất */}
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-2">
          <li>
            <Link
              to="/settings"
              className={`flex items-center p-2 rounded-lg ${
                location.pathname === '/settings'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={isCollapsed ? 'Cài đặt' : ''}
            >
              <RiSettings4Line className="w-6 h-6" />
              {!isCollapsed && <span className="ml-3">Cài đặt</span>}
            </Link>
          </li>
          <li>
            <button
              className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full"
              title={isCollapsed ? 'Đăng xuất' : ''}
              onClick={handleLogout}
            >
              <RiLogoutBoxLine className="w-6 h-6" />
              {!isCollapsed && <span className="ml-3">Đăng xuất</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;