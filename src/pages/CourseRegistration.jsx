import React, { useState } from 'react';
import { RiFilter2Line, RiSearchLine, RiCalendarLine, RiTimeLine, RiMapPin2Line, RiUser2Line } from 'react-icons/ri';

function CourseRegistration() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    credits: '',
    weekday: ''
  });

  const handleRegisterCourse = (course) => {
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== courseId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đăng ký Môn học</h1>
          <p className="text-gray-600">Học kỳ 1 - Năm học 2024-2025</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Số tín chỉ đã đăng ký</p>
          <p className="text-2xl font-bold text-blue-600">
            {selectedCourses.reduce((sum, course) => sum + course.credits, 0)}/24
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm môn học..."
                  className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => {/* Toggle filters */}}
              >
                <RiFilter2Line />
                <span>Bộ lọc</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <select
                className="select select-bordered w-full"
                value={filters.department}
                onChange={(e) => setFilters({...filters, department: e.target.value})}
              >
                <option value="">Tất cả khoa</option>
                <option value="CS">Khoa học máy tính</option>
                <option value="SE">Kỹ thuật phần mềm</option>
              </select>

              <select
                className="select select-bordered w-full"
                value={filters.credits}
                onChange={(e) => setFilters({...filters, credits: e.target.value})}
              >
                <option value="">Số tín chỉ</option>
                <option value="2">2 tín chỉ</option>
                <option value="3">3 tín chỉ</option>
                <option value="4">4 tín chỉ</option>
              </select>

              <select
                className="select select-bordered w-full"
                value={filters.weekday}
                onChange={(e) => setFilters({...filters, weekday: e.target.value})}
              >
                <option value="">Thứ trong tuần</option>
                <option value="2">Thứ 2</option>
                <option value="3">Thứ 3</option>
                <option value="4">Thứ 4</option>
                <option value="5">Thứ 5</option>
                <option value="6">Thứ 6</option>
                <option value="7">Thứ 7</option>
              </select>
            </div>
          </div>

          {/* Available Courses */}
          <div className="bg-white rounded-xl shadow-sm divide-y">
            {[
              {
                id: 'CS101',
                name: 'Nhập môn lập trình',
                code: 'CS101',
                credits: 3,
                schedule: 'Thứ 2 (7:30 - 9:30)',
                room: 'A101',
                instructor: 'Nguyễn Văn A',
                enrolled: 45,
                capacity: 50
              },
              {
                id: 'CS102',
                name: 'Cấu trúc dữ liệu và giải thuật',
                code: 'CS102',
                credits: 4,
                schedule: 'Thứ 3 (9:45 - 11:45)',
                room: 'B203',
                instructor: 'Trần Thị B',
                enrolled: 38,
                capacity: 45
              }
            ].map((course) => (
              <div key={course.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Mã môn: {course.code} • {course.credits} tín chỉ
                    </p>
                  </div>
                  <button
                    onClick={() => handleRegisterCourse(course)}
                    disabled={selectedCourses.some(c => c.id === course.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {selectedCourses.some(c => c.id === course.id)
                      ? 'Đã đăng ký'
                      : 'Đăng ký'
                    }
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <RiCalendarLine className="flex-shrink-0" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <RiMapPin2Line className="flex-shrink-0" />
                    <span>Phòng {course.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <RiUser2Line className="flex-shrink-0" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Sĩ số: {course.enrolled}/{course.capacity}</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{
                          width: `${(course.enrolled / course.capacity) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Courses */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Môn học đã đăng ký
            </h2>
            <div className="space-y-4">
              {selectedCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {course.credits} tín chỉ
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Hủy
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    <p className="flex items-center gap-2">
                      <RiCalendarLine />
                      {course.schedule}
                    </p>
                    <p className="flex items-center gap-2">
                      <RiMapPin2Line />
                      Phòng {course.room}
                    </p>
                  </div>
                </div>
              ))}
              {selectedCourses.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Chưa có môn học nào được chọn
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Học phí dự kiến
            </h2>
            <div className="space-y-2">
              {selectedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex justify-between text-sm"
                >
                  <span>{course.name}</span>
                  <span>{course.credits * 850000} VNĐ</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Tổng cộng</span>
                  <span>
                    {selectedCourses.reduce(
                      (sum, course) => sum + course.credits * 850000,
                      0
                    ).toLocaleString()}{' '}
                    VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-medium"
            disabled={selectedCourses.length === 0}
          >
            Xác nhận đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;