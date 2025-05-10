import React, { useState } from 'react';
import { RiFilter2Line, RiSearch2Line } from 'react-icons/ri';

function ProfessorServiceView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: ''
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Yêu cầu Dịch vụ</h1>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <RiSearch2Line className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm yêu cầu..."
              className="pl-10 w-full border border-gray-300 rounded-lg py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline">
            <RiFilter2Line className="mr-2" />
            Bộ lọc
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="select select-bordered w-full"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">Tất cả loại yêu cầu</option>
            <option value="leave">Xin phép nghỉ học</option>
            <option value="withdraw">Hủy môn học</option>
            <option value="academic_advising">Tư vấn học thuật</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
      </div>

      {/* Service Requests */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sinh viên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại yêu cầu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Môn học
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày gửi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Sample row */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Nguyễn Văn A (2023001)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Xin phép nghỉ học
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Nhập môn lập trình
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                15/03/2024
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Chờ xử lý
                </span>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfessorServiceView;