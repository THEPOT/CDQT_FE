import React from 'react';
import { RiUserLine, RiBookOpenLine, RiFileList3Line, RiCalendarCheckLine } from 'react-icons/ri';

function StaffDashboard() {
  const staffData = {
    name: 'Phạm Thị D',
    department: 'Phòng Đào Tạo',
    stats: {
      totalStudents: 2450,
      totalCourses: 45,
      pendingRequests: 12,
      upcomingDeadlines: 3
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Xin chào, {staffData.name}!
        </h1>
        <p className="mt-1 text-gray-600">
          {staffData.department}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={RiUserLine}
          title="Tổng số sinh viên"
          value={staffData.stats.totalStudents}
          trend="Học kỳ hiện tại"
        />
        <StatCard
          icon={RiBookOpenLine}
          title="Môn học đang mở"
          value={staffData.stats.totalCourses}
          trend="Đang diễn ra"
        />
        <StatCard
          icon={RiFileList3Line}
          title="Yêu cầu chờ xử lý"
          value={staffData.stats.pendingRequests}
          trend="Cần xử lý"
          urgent
        />
        <StatCard
          icon={RiCalendarCheckLine}
          title="Deadline sắp tới"
          value={staffData.stats.upcomingDeadlines}
          trend="Trong tuần này"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Yêu cầu gần đây
          </h2>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: 'transcript',
                student: 'Nguyễn Văn A',
                studentId: '2023001',
                status: 'pending',
                time: '2 giờ trước'
              },
              {
                id: 2,
                type: 'leave',
                student: 'Trần Thị B',
                studentId: '2023002',
                status: 'processing',
                time: '1 ngày trước'
              }
            ].map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {request.student} ({request.studentId})
                  </h3>
                  <p className="text-sm text-gray-500">
                    {request.type === 'transcript' ? 'Yêu cầu bảng điểm' : 'Đơn xin nghỉ học'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{request.time}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    request.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {request.status === 'pending' ? 'Chờ xử lý' : 'Đang xử lý'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Deadline sắp tới
          </h2>
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: 'Hạn nộp điểm giữa kỳ',
                date: '2024-04-15',
                priority: 'high'
              },
              {
                id: 2,
                title: 'Đóng cổng đăng ký môn học',
                date: '2024-04-20',
                priority: 'medium'
              }
            ].map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{deadline.title}</h3>
                  <p className="text-sm text-gray-500">
                    Hạn chót: {new Date(deadline.date).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    deadline.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {deadline.priority === 'high' ? 'Quan trọng' : 'Thường'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Hoạt động gần đây
        </h2>
        <div className="space-y-4">
          {[
            {
              id: 1,
              action: 'Đã duyệt yêu cầu bảng điểm',
              student: 'Lê Văn C',
              time: '1 giờ trước'
            },
            {
              id: 2,
              action: 'Đã cập nhật thông tin sinh viên',
              student: 'Trần Thị D',
              time: '2 giờ trước'
            },
            {
              id: 3,
              action: 'Đã mở đăng ký môn học',
              course: 'CS101 - Nhập môn lập trình',
              time: '3 giờ trước'
            }
          ].map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 border rounded-lg"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <RiFileList3Line className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {activity.action}
                </p>
                {activity.student && (
                  <p className="text-sm text-gray-500">
                    Sinh viên: {activity.student}
                  </p>
                )}
                {activity.course && (
                  <p className="text-sm text-gray-500">
                    Môn học: {activity.course}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, trend, urgent }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${urgent ? 'bg-red-50' : 'bg-blue-50'}`}>
          <Icon className={`w-6 h-6 ${urgent ? 'text-red-600' : 'text-blue-600'}`} />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{trend}</p>
        </div>
      </div>
    </div>
  );
}

export default StaffDashboard;