import React, { useState } from 'react';
import { RiSearchLine, RiFilter2Line, RiDownloadLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';

function RequestManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    date: ''
  });

  const requests = [
    {
      id: 1,
      type: 'transcript',
      student: {
        id: '2023001',
        name: 'Nguyễn Văn A'
      },
      date: '2024-03-15',
      status: 'pending',
      details: 'Xin cấp bảng điểm tiếng Anh'
    },
    {
      id: 2,
      type: 'leave',
      student: {
        id: '2023002',
        name: 'Trần Thị B'
      },
      date: '2024-03-14',
      status: 'processing',
      details: 'Đơn xin nghỉ học 1 tuần'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Yêu cầu</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <RiDownloadLine />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo MSSV hoặc tên sinh viên..."
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
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">Loại yêu cầu</option>
            <option value="transcript">Bảng điểm</option>
            <option value="leave">Đơn xin nghỉ học</option>
            <option value="certificate">Giấy xác nhận</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">Trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="rejected">Từ chối</option>
          </select>

          <input
            type="date"
            className="input input-bordered w-full"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
          />
        </div>
      </div>

      {/* Requests List */}
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
                  Loại yêu cầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chi tiết
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày gửi
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
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.student.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.type === 'transcript' ? 'Bảng điểm' : 'Đơn xin nghỉ học'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.details}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : request.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status === 'pending'
                        ? 'Chờ xử lý'
                        : request.status === 'processing'
                        ? 'Đang xử lý'
                        : request.status === 'completed'
                        ? 'Đã hoàn thành'
                        : 'Từ chối'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="text-green-600 hover:text-green-900">
                        <RiCheckLine className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <RiCloseLine className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Thống kê yêu cầu
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Tổng số yêu cầu</p>
              <p className="text-2xl font-bold text-blue-600">45</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Đã xử lý</p>
              <p className="text-xl font-semibold text-green-600">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Phân loại yêu cầu
          </h3>
          <div className="space-y-2">
            {[
              { type: 'Bảng điểm', count: 20 },
              { type: 'Đơn xin nghỉ học', count: 15 },
              { type: 'Giấy xác nhận', count: 10 }
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{item.type}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(item.count / 45) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Thời gian xử lý
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Trung bình</p>
              <p className="text-xl font-semibold text-blue-600">2.5 ngày</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nhanh nhất</p>
              <p className="text-lg text-gray-900">1 ngày</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Chậm nhất</p>
              <p className="text-lg text-gray-900">5 ngày</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestManagement;