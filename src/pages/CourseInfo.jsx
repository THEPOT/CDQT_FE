import React, { useState } from 'react';
import { RiSearchLine, RiFilter2Line, RiDownloadLine } from 'react-icons/ri';

function CourseInfo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filters, setFilters] = useState({
    department: '',
    credits: '',
    type: ''
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Thông tin Môn học</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
          <RiDownloadLine />
          <span>Tải danh sách môn học</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã môn hoặc tên môn..."
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
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">Loại môn học</option>
            <option value="required">Bắt buộc</option>
            <option value="elective">Tự chọn</option>
          </select>
        </div>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            id: 'CS101',
            code: 'CS101',
            name: 'Nhập môn lập trình',
            credits: 3,
            department: 'Khoa học máy tính',
            description: 'Giới thiệu về lập trình cơ bản, cấu trúc điều khiển, hàm, mảng...',
            prerequisites: [],
            type: 'required'
          },
          {
            id: 'CS102',
            code: 'CS102',
            name: 'Cấu trúc dữ liệu và giải thuật',
            credits: 4,
            department: 'Khoa học máy tính',
            description: 'Các cấu trúc dữ liệu cơ bản và nâng cao, phân tích thuật toán...',
            prerequisites: ['CS101'],
            type: 'required'
          }
        ].map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedCourse(course)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Mã môn: {course.code}
                </p>
              </div>
              <span className="px-2 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded">
                {course.credits} tín chỉ
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {course.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                {course.department}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded ${
                course.type === 'required'
                  ? 'text-red-600 bg-red-50'
                  : 'text-green-600 bg-green-50'
              }`}>
                {course.type === 'required' ? 'Bắt buộc' : 'Tự chọn'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedCourse.name}
                  </h2>
                  <p className="text-gray-500">
                    Mã môn: {selectedCourse.code}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Đóng</span>
                  ×
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Thông tin chung
                  </h3>
                  <dl className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Số tín chỉ
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedCourse.credits}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Khoa
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedCourse.department}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Loại môn học
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedCourse.type === 'required' ? 'Bắt buộc' : 'Tự chọn'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Mô tả môn học
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedCourse.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Môn học tiên quyết
                  </h3>
                  {selectedCourse.prerequisites.length > 0 ? (
                    <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                      {selectedCourse.prerequisites.map((prereq) => (
                        <li key={prereq}>{prereq}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-gray-600">
                      Không có môn học tiên quyết
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Đóng
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Tải đề cương
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseInfo;