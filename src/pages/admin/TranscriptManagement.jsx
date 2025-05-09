import React, { useState } from 'react';
import { FiDownload, FiFilter, FiSearch } from 'react-icons/fi';

function TranscriptManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    semester: '',
    program: '',
    gpa: ''
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Kết quả Học tập</h1>
        <button className="btn btn-primary">
          <FiDownload className="mr-2" />
          Xuất báo cáo
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sinh viên..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline">
            <FiFilter className="mr-2" />
            Bộ lọc
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            value={filters.program}
            onChange={(e) => setFilters({...filters, program: e.target.value})}
          >
            <option value="">Tất cả ngành</option>
            <option value="CS">Khoa học máy tính</option>
            <option value="SE">Kỹ thuật phần mềm</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.gpa}
            onChange={(e) => setFilters({...filters, gpa: e.target.value})}
          >
            <option value="">GPA</option>
            <option value="3.6">≥ 3.6</option>
            <option value="3.2">≥ 3.2</option>
            <option value="2.5">≥ 2.5</option>
            <option value="2.0">≥ 2.0</option>
            <option value="low">&lt; 2.0</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Tổng số sinh viên</h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-gray-500">Học kỳ hiện tại</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">GPA trung bình</h3>
          <p className="text-3xl font-bold text-green-600">3.2</p>
          <p className="text-sm text-gray-500">Toàn trường</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Sinh viên xuất sắc</h3>
          <p className="text-3xl font-bold text-purple-600">156</p>
          <p className="text-sm text-gray-500">GPA ≥ 3.6</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Sinh viên cảnh báo</h3>
          <p className="text-3xl font-bold text-red-600">45</p>
          <p className="text-sm text-gray-500">GPA &lt; 2.0</p>
        </div>
      </div>

      {/* Transcript Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MSSV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ và tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngành
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tín chỉ tích lũy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GPA
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                2023001
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Nguyễn Văn A
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Khoa học máy tính
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                90
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                3.65
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  Xem chi tiết
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TranscriptManagement;