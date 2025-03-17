import React, { useState } from 'react';
import { RiSearchLine, RiFilter2Line, RiDownloadLine, RiUploadLine } from 'react-icons/ri';

function ClassManagement() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    semester: '',
    course: '',
    status: ''
  });

  const classes = [
    {
      id: 'CS101-01',
      code: 'CS101',
      name: 'Nhập môn lập trình',
      semester: 'HK1 2024-2025',
      students: 45,
      schedule: 'Thứ 2 (7:30 - 9:30)',
      room: 'A101',
      status: 'in_progress'
    },
    {
      id: 'CS102-01',
      code: 'CS102',
      name: 'Cấu trúc dữ liệu',
      semester: 'HK1 2024-2025',
      students: 38,
      schedule: 'Thứ 3 (9:45 - 11:45)',
      room: 'B203',
      status: 'in_progress'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Lớp học</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <RiUploadLine />
            <span>Nhập điểm</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <RiDownloadLine />
            <span>Xuất danh sách</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm lớp học..."
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
            value={filters.semester}
            onChange={(e) => setFilters({...filters, semester: e.target.value})}
          >
            <option value="">Tất cả học kỳ</option>
            <option value="20241">HK1 2024-2025</option>
            <option value="20232">HK2 2023-2024</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.course}
            onChange={(e) => setFilters({...filters, course: e.target.value})}
          >
            <option value="">Tất cả môn học</option>
            <option value="CS101">CS101 - Nhập môn lập trình</option>
            <option value="CS102">CS102 - Cấu trúc dữ liệu</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">Trạng thái</option>
            <option value="in_progress">Đang diễn ra</option>
            <option value="completed">Đã kết thúc</option>
          </select>
        </div>
      </div>

      {/* Class List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã lớp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên môn học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học kỳ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lịch học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sĩ số
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.map((classItem) => (
                <tr key={classItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {classItem.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.schedule}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {classItem.students}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Đang diễn ra
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedClass(classItem)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Detail Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedClass.name}
                  </h2>
                  <p className="text-gray-500">
                    Mã lớp: {selectedClass.code}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedClass(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Đóng</span>
                  ×
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Thông tin chung
                  </h3>
                  <dl className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Học kỳ
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedClass.semester}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Lịch học
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedClass.schedule}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Phòng học
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedClass.room}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Sĩ số
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {selectedClass.students} sinh viên
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Tiến độ giảng dạy
                  </h3>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>6/15 tuần</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: '40%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setSelectedClass(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Đóng
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Xem danh sách lớp
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

export default ClassManagement;