import React, { useState } from 'react';
import { FiDownload, FiSearch } from 'react-icons/fi';

function TranscriptView() {
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kết quả Học tập</h1>
        <button className="btn btn-primary">
          <FiDownload className="mr-2" />
          Xuất báo cáo
        </button>
      </div>

      {/* Class Selection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Chọn lớp học</h2>
        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Chọn lớp...</option>
          <option value="CS101-01">CS101-01 - Nhập môn lập trình</option>
        </select>
      </div>

      {selectedClass && (
        <>
          {/* Class Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Điểm trung bình</h3>
              <p className="text-3xl font-bold text-blue-600">7.8</p>
              <p className="text-sm text-gray-500">Toàn lớp</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Tỷ lệ đạt</h3>
              <p className="text-3xl font-bold text-green-600">85%</p>
              <p className="text-sm text-gray-500">38/45 sinh viên</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Điểm A/A+</h3>
              <p className="text-3xl font-bold text-purple-600">12</p>
              <p className="text-sm text-gray-500">Sinh viên xuất sắc</p>
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Phân bố điểm</h2>
            <div className="space-y-2">
              {['A/A+', 'B+/B', 'C+/C', 'D+/D', 'F'].map((grade) => (
                <div key={grade} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-12">{grade}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Student List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sinh viên..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

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
                    Điểm QT
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điểm chữ
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
                    8.5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    8.0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    8.5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    8.4
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    A
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default TranscriptView;