import { useAuth } from '../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiBook, FiUsers, FiFileText, FiSettings,
  FiClipboard, FiBarChart2, FiCalendar, FiMail, FiCheckSquare,
  FiInfo, FiAward, FiClock
} from 'react-icons/fi';

function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'Admin':
        return [
          { path: '/admin-dashboard', icon: <FiHome />, label: 'Trang chủ' },
          { path: '/course-management', icon: <FiBook />, label: 'Quản lý môn học' },
          { path: '/professor-management', icon: <FiUsers />, label: 'Quản lý giảng viên' },
          { path: '/student-management', icon: <FiUsers />, label: 'Quản lý sinh viên' },
          { path: '/evaluations', icon: <FiBarChart2 />, label: 'Quản lý đánh giá' },
          { path: '/settings', icon: <FiSettings />, label: 'Cài đặt hệ thống' },
          { path: '/midterm-evaluation', icon: <FiCheckSquare />, label: 'Đánh giá giữa kỳ' },
          { path: '/admin-services', icon: <FiMail />, label: 'Quản lý dịch vụ' },
          { path: '/degree-audit-management', icon: <FiAward />, label: 'Quản lý lộ trình' },
          { path: '/transcript-management', icon: <FiFileText />, label: 'Quản lý bảng điểm' }
        ];
      case 'Student':
        return [
          { path: '/student-info', icon: <FiInfo />, label: 'Thông tin cá nhân' },
          { path: '/course-registration', icon: <FiBook />, label: 'Đăng ký môn học' },
          { path: '/my-schedule', icon: <FiClock />, label: 'Lịch học của tôi' },
          { path: '/transcript', icon: <FiClipboard />, label: 'Bảng điểm' },
          { path: '/degree-audit', icon: <FiAward />, label: 'Lộ trình học tập' },
          { path: '/evaluations', icon: <FiBarChart2 />, label: 'Khảo sát môn học' },
          { path: '/services', icon: <FiMail />, label: 'Yêu cầu dịch vụ' },
          { path: '/midterm-evaluation', icon: <FiCheckSquare />, label: 'Xem kết quả đánh giá giữa kỳ' }
        ];
      case 'Professor':
        return [
          { path: '/teacher-dashboard', icon: <FiHome />, label: 'Trang chủ' },
          { path: '/courses', icon: <FiBook />, label: 'Môn học' },
          { path: '/my-classes', icon: <FiUsers />, label: 'Lớp học của tôi' },
          { path: '/grade-management', icon: <FiClipboard />, label: 'Quản lý điểm' },
          { path: '/midterm-evaluation', icon: <FiCheckSquare />, label: 'Đánh giá giữa kỳ' },
          { path: '/course-evaluation', icon: <FiBarChart2 />, label: 'Kết quả khảo sát' },
          { path: '/professor-services', icon: <FiMail />, label: 'Dịch vụ' }
        ];
      case 'Staff':
        return [
          { path: '/staff-dashboard', icon: <FiHome />, label: 'Trang chủ' },
          { path: '/term-management', icon: <FiCalendar />, label: 'Quản lý học kỳ' },
          { path: '/staff-course-management', icon: <FiBook />, label: 'Quản lý môn học' },
          { path: '/evaluation-management', icon: <FiBarChart2 />, label: 'Quản lý khảo sát' },
          { path: '/staff-services', icon: <FiMail />, label: 'Quản lý yêu cầu' },
          { path: '/midterm-evaluation', icon: <FiCheckSquare />, label: 'Mở cổng đánh giá giữa kỳ' },
          { path: '/degree-audit-management', icon: <FiAward />, label: 'Quản lý lộ trình' },
          { path: '/transcript-management', icon: <FiFileText />, label: 'Quản lý bảng điểm' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <aside className="bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 w-64 min-h-screen shadow-lg flex flex-col">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="bg-white rounded-full p-2 shadow-md">
            <FiBarChart2 className="text-blue-700 text-3xl" />
          </div>
          <span className="text-white text-2xl font-bold tracking-wide">CDQT System</span>
        </div>
        <div className="border-b border-blue-600 mx-4 mb-2"></div>
        
        {/* Menu */}
        <ul className="flex-1 px-2 space-y-1">
          {getMenuItems().map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={idx}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
                    ${isActive 
                      ? 'bg-white text-blue-700 shadow font-bold'
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                    }
                  `}
                >
                  <span className={`text-xl ${isActive ? 'text-blue-700' : 'text-blue-200'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* Footer */}
        <div className="px-6 py-4 text-xs text-blue-300 border-t border-blue-600">
          &copy; {new Date().getFullYear()} CDQT. All rights reserved.
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;