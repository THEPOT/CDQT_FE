import React from 'react';
import { useAuth } from '../contexts/AuthContext';
// Correct naming
import { RiBookmarkLine, RiCalendarCheckLine, RiFileList3Line, RiNotification3Line } from 'react-icons/ri';
function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Xin chào, {user?.name}!
        </h1>
        <p className="mt-1 text-gray-600">
          Chào mừng bạn đến với Hệ thống Quản lý Đào tạo
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={RiBookmarkLine}
          title="Môn học hiện tại"
          value="5 môn"
          trend="+1 từ kỳ trước"
          trendUp={true}
        />
        <StatCard
          icon={RiCalendarCheckLine}
          title="Tín chỉ đã đăng ký"
          value="15/24"
          trend="Còn 9 tín chỉ"
          trendUp={true}
        />
        <StatCard
          icon={RiFileList3Line}
          title="GPA Tích lũy"
          value="3.65"
          trend="+0.2 từ kỳ trước"
          trendUp={true}
        />
        <StatCard
          icon={RiNotification3Line}
          title="Thông báo mới"
          value="3"
          trend="Trong tuần này"
          trendUp={false}
        />
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Lịch học hôm nay
          </h2>
          <div className="space-y-4">
            {[
              {
                subject: 'Nhập môn lập trình',
                time: '7:30 - 9:30',
                room: 'A101',
                status: 'ongoing'
              },
              {
                subject: 'Cấu trúc dữ liệu',
                time: '9:45 - 11:45',
                room: 'B203',
                status: 'upcoming'
              }
            ].map((class_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{class_.subject}</h3>
                  <p className="text-sm text-gray-500">
                    {class_.time} • Phòng {class_.room}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    class_.status === 'ongoing'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {class_.status === 'ongoing' ? 'Đang diễn ra' : 'Sắp diễn ra'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Thông báo gần đây
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Đăng ký học phần HK2 2023-2024',
                time: '2 giờ trước',
                type: 'important'
              },
              {
                title: 'Thông báo về việc nghỉ Tết Nguyên đán 2024',
                time: '1 ngày trước',
                type: 'info'
              }
            ].map((notification, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div
                  className={`w-2 h-2 mt-2 rounded-full ${
                    notification.type === 'important'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, trend, trendUp }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className={`text-sm ${trendUp ? 'text-green-600' : 'text-gray-500'}`}>
            {trend}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;