import React from 'react';
import { RiBookOpenLine, RiUserLine, RiFileList3Line, RiCalendarCheckLine } from 'react-icons/ri';

function TeacherDashboard() {
  const teacherData = {
    name: 'Trần Thị B',
    department: 'Khoa Công nghệ Thông tin',
    courses: [
      {
        id: 'CS101-01',
        code: 'CS101',
        name: 'Nhập môn lập trình',
        students: 45,
        schedule: 'Thứ 2 (7:30 - 9:30)',
        room: 'A101',
        progress: '6/15 tuần'
      },
      {
        id: 'CS102-01',
        code: 'CS102',
        name: 'Cấu trúc dữ liệu và giải thuật',
        students: 38,
        schedule: 'Thứ 3 (9:45 - 11:45)',
        room: 'B203',
        progress: '5/15 tuần'
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Xin chào, {teacherData.name}!
        </h1>
        <p className="mt-1 text-gray-600">
          {teacherData.department}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={RiBookOpenLine}
          title="Lớp học phụ trách"
          value={`${teacherData.courses.length} lớp`}
          trend="Học kỳ hiện tại"
        />
        <StatCard
          icon={RiUserLine}
          title="Tổng số sinh viên"
          value={teacherData.courses.reduce((sum, course) => sum + course.students, 0)}
          trend="Đang theo học"
        />
        <StatCard
          icon={RiFileList3Line}
          title="Bài tập cần chấm"
          value="15"
          trend="Cập nhật hôm nay"
        />
        <StatCard
          icon={RiCalendarCheckLine}
          title="Tiến độ giảng dạy"
          value="40%"
          trend="Theo kế hoạch"
        />
      </div>

      {/* Teaching Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Lịch dạy hôm nay
          </h2>
          <div className="space-y-4">
            {teacherData.courses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500">
                    {course.schedule} • Phòng {course.room}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {course.students} SV
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tiến độ giảng dạy
          </h2>
          <div className="space-y-4">
            {teacherData.courses.map((course) => (
              <div
                key={course.id}
                className="p-4 border rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.code}</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    {course.progress}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: '40%' }}
                  />
                </div>
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
              type: 'assignment',
              course: 'Nhập môn lập trình',
              action: 'Đã giao bài tập #5',
              time: '2 giờ trước'
            },
            {
              type: 'grade',
              course: 'Cấu trúc dữ liệu',
              action: 'Đã chấm điểm giữa kỳ',
              time: '1 ngày trước'
            }
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border rounded-lg"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'assignment'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {activity.type === 'assignment' ? (
                  <RiFileList3Line className="w-6 h-6" />
                ) : (
                  <RiCalendarCheckLine className="w-6 h-6" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {activity.course}
                </p>
                <p className="text-sm text-gray-500">
                  {activity.action}
                </p>
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

function StatCard({ icon: Icon, title, value, trend }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
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

export default TeacherDashboard;