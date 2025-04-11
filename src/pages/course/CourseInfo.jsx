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
      )}
    </div>
  );
}

export default CourseInfo;