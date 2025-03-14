import React, { useState, useEffect } from 'react';
import { RiSearchLine, RiNotification3Line, RiMailLine, RiUserLine, RiLockPasswordLine, RiLoginCircleLine, RiLogoutBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Navbar({ userRole = 'Student' }) { // Giả định userRole được truyền từ hệ thống
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState(null);

  // Thông báo mẫu, có thể thay bằng dữ liệu thực từ API
  const notifications = [
    { id: 1, title: 'Đăng ký môn học', subtitle: 'Kỳ 1 2025 đã mở', count: 1 },
    { id: 2, title: 'Học phí', subtitle: 'Hạn đóng học phí: 20/03/2025', count: 1 },
  ];

  // Tin nhắn mẫu, có thể thay bằng dữ liệu thực từ API
  const messages = [
    { id: 1, title: 'PĐT', subtitle: 'Thông báo lịch học', count: 1 },
    { id: 2, title: 'CTSV', subtitle: 'Kết quả xét học bổng', count: 1 },
  ];

  // Tùy chọn hồ sơ
  const profileOptions = [
    { id: 1, title: 'Quản lý tài khoản', icon: RiUserLine },
    { id: 2, title: 'Đổi mật khẩu', icon: RiLockPasswordLine },
    { id: 3, title: 'Hoạt động đăng nhập', icon: RiLoginCircleLine },
    { id: 4, title: 'Đăng xuất', icon: RiLogoutBoxLine },
  ];

  // Menu điều hướng theo vai trò
  const navItems = {
    Admin: [
      { path: '/student-management', label: 'Quản lý sinh viên' },
      { path: '/course-management', label: 'Quản lý môn học' },
      { path: '/registration-management', label: 'Quản lý đăng ký' },
      { path: '/evaluation-management', label: 'Quản lý đánh giá' },
    ],
    Student: [
      { path: '/student-info', label: 'Thông tin cá nhân' },
      { path: '/course-registration', label: 'Đăng ký môn học' },
      { path: '/transcript', label: 'Kết quả học tập' },
      { path: '/services', label: 'Dịch vụ' },
    ],
    Lecturer: [
      { path: '/class-list', label: 'Danh sách lớp' },
      { path: '/midterm-evaluation', label: 'Đánh giá giữa kỳ' },
      { path: '/course-evaluation-results', label: 'Kết quả khảo sát' },
    ],
    Staff: [
      { path: '/student-management', label: 'Quản lý sinh viên' },
      { path: '/course-management', label: 'Quản lý môn học' },
      { path: '/registration-management', label: 'Quản lý đăng ký' },
      { path: '/service-management', label: 'Quản lý dịch vụ' },
    ],
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUserData(JSON.parse(userFromStorage));
    }
  }, []);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Thanh tìm kiếm */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên, môn học..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Menu điều hướng và biểu tượng */}
      <div className="flex items-center space-x-6">
        {/* Menu điều hướng */}
        <nav className="flex space-x-4">
          {navItems[userRole].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-text hover:text-primary font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Thông báo */}
        <div className="relative">
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowProfile(false);
            }}
          >
            <RiNotification3Line className="w-6 h-6" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
              <h3 className="px-4 py-2 text-lg font-semibold text-text">Thông báo</h3>
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  className="w-full px-4 py-3 hover:bg-gray-50 flex items-center"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <RiNotification3Line className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-text">{notification.title}</div>
                    <div className="text-sm text-gray-500">{notification.subtitle}</div>
                  </div>
                  {notification.count > 0 && (
                    <span className="ml-2 bg-blue-100 text-primary px-2 py-1 rounded-full text-xs">
                      {notification.count}
                    </span>
                  )}
                </button>
              ))}
              <button className="w-full px-4 py-2 text-primary hover:bg-gray-50 text-sm">
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>

        {/* Tin nhắn */}
        <div className="relative">
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowProfile(false);
            }}
          >
            <RiMailLine className="w-6 h-6" />
            {messages.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
          {showMessages && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
              <h3 className="px-4 py-2 text-lg font-semibold text-text">Hộp thư</h3>
              {messages.map((message) => (
                <button
                  key={message.id}
                  className="w-full px-4 py-3 hover:bg-gray-50 flex items-center"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <RiMailLine className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-text">{message.title}</div>
                    <div className="text-sm text-gray-500">{message.subtitle}</div>
                  </div>
                  {message.count > 0 && (
                    <span className="ml-2 bg-blue-100 text-primary px-2 py-1 rounded-full text-xs">
                      {message.count}
                    </span>
                  )}
                </button>
              ))}
              <button className="w-full px-4 py-2 text-primary hover:bg-gray-50 text-sm">
                Xem tất cả tin nhắn
              </button>
            </div>
          )}
        </div>

        {/* Hồ sơ người dùng */}
        <div className="relative">
          <button
            className="flex items-center space-x-3 hover:bg-gray-100 rounded-lg p-2"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
              setShowMessages(false);
            }}
          >
            <img
              src=""
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex flex-col text-left">
              <span className="font-medium text-text">
                {userData?.name || 'Guest'}
              </span>
              {userData?.role && (
                <span className="text-sm text-gray-500">
                  ({userData.role})
                </span>
              )}
            </div>
          </button>
          {showProfile && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
              {profileOptions.map((option, index) => (
                <React.Fragment key={option.id}>
                  <button className="w-full px-4 py-2 hover:bg-gray-50 flex items-center whitespace-nowrap">
                    <option.icon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
                    <span className="truncate text-text">{option.title}</span>
                  </button>
                  {index < profileOptions.length - 1 && <hr className="my-1 border-gray-200" />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;