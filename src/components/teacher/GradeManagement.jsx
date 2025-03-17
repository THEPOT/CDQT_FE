import React, { useState } from 'react';
import { RiUploadLine, RiDownloadLine, RiFilter2Line, RiSearch2Line } from 'react-icons/ri';

function GradeManagement() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    semester: '',
    course: '',
    gradeType: ''
  });

  const classes = [
    {
      id: 'CS101-01',
      code: 'CS101',
      name: 'Nhập môn lập trình',
      semester: 'HK1 2024-2025',
      students: [
        {
          id: '2023001',
          name: 'Nguyễn Văn A',
          attendance: 90,
          midterm: 8.5,
          final: 9.0,
          total: 8.8
        },
        {
          id: '2023002',
          name: 'Trần Thị B',
          attendance: 85,
          midterm: 7.5,
          final: 8.0,
          total: 7.8
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Điểm</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <RiUploadLine />
            <span>Nhập điểm</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <RiDownloadLine />
            <span>Xuất bảng điểm</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <RiSearch2Line className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sinh viên..."
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
            value={filters.gradeType}
            onChange={(e) => setFilters({...filters, gradeType: e.target.value})}
          >
            <option value="">Loại điểm</option>
            <option value="midterm">Giữa kỳ</option>
            <option value="final">Cuối kỳ</option>
          </select>
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MSSV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ và tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chuyên cần
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm GK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm CK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng kết
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes[0].students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.attendance}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      className="w-20 px-2 py-1 border rounded"
                      value={student.midterm}
                      onChange={() => {}}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      className="w-20 px-2 py-1 border rounded"
                      value={student.final}
                      onChange={() => {}}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {student.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      Lưu
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Thống kê điểm
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Điểm trung bình lớp</p>
              <p className="text-2xl font-bold text-blue-600">7.8</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tỷ lệ đạt</p>
              <p className="text-xl font-semibold text-green-600">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Phân bố điểm
          </h3>
          <div className="space-y-2">
            {['A/A+', 'B+/B', 'C+/C', 'D+/D', 'F'].map((grade) => (
              <div key={grade} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-12">{grade}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${Math.random() * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {Math.floor(Math.random() * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Ghi chú
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Cập nhật điểm giữa kỳ: 15/04/2024</p>
            <p>• Hạn nộp điểm cuối kỳ: 30/05/2024</p>
            <p>• Xem lại phúc khảo: 15/06/2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradeManagement;