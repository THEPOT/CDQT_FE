import React, { useState } from 'react';
import { FiFilter, FiDownload, FiSearch, FiCheckCircle, FiXCircle } from 'react-icons/fi';

function ServiceRequestManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    date: ''
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Yêu cầu Dịch vụ</h1>
        <button className="btn btn-primary">
          <FiDownload className="mr-2" />
          Xuất báo cáo
        </button>
      </div>

      <FilterSection filters={filters} setFilters={setFilters} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <RequestList filters={filters} searchTerm={searchTerm} />
      <Statistics />
    </div>
  );
}

function FilterSection({ filters, setFilters, searchTerm, setSearchTerm }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm yêu cầu..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="select select-bordered w-full"
          value={filters.type}
          onChange={(e) => setFilters({...filters, type: e.target.value})}
        >
          <option value="">Tất cả loại yêu cầu</option>
          <option value="transcript">Bảng điểm</option>
          <option value="certificate">Giấy xác nhận</option>
          <option value="leave">Đơn xin nghỉ học</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="processing">Đang xử lý</option>
          <option value="completed">Đã hoàn thành</option>
        </select>

        <input
          type="date"
          className="input input-bordered w-full"
          value={filters.date}
          onChange={(e) => setFilters({...filters, date: e.target.value})}
        />
      </div>
    </div>
  );
}

function RequestList({ filters, searchTerm }) {
  const requests = [
    {
      id: 1,
      studentId: '2023001',
      studentName: 'Nguyễn Văn A',
      type: 'transcript',
      status: 'pending',
      date: '2024-03-15',
      details: 'Xin cấp bảng điểm tiếng Anh'
    },
    // Add more sample data as needed
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filters.type || request.type === filters.type;
    const matchesStatus = !filters.status || request.status === filters.status;
    const matchesDate = !filters.date || request.date === filters.date;
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MSSV</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và tên</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại yêu cầu</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày gửi</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap">{request.studentId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{request.studentName}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {request.type === 'transcript' ? 'Bảng điểm' : 
                 request.type === 'certificate' ? 'Giấy xác nhận' : 'Đơn xin nghỉ học'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(request.date).toLocaleDateString('vi-VN')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'}`}>
                  {request.status === 'pending' ? 'Chờ xử lý' :
                   request.status === 'processing' ? 'Đang xử lý' : 'Hoàn thành'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button className="text-green-600 hover:text-green-900 mr-2">
                  <FiCheckCircle className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FiXCircle className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Statistics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Tổng số yêu cầu</h3>
        <p className="text-3xl font-bold text-blue-600">45</p>
        <p className="text-sm text-gray-500">Trong tháng này</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Đã xử lý</h3>
        <p className="text-3xl font-bold text-green-600">38</p>
        <p className="text-sm text-gray-500">84% hoàn thành</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Thời gian xử lý TB</h3>
        <p className="text-3xl font-bold text-purple-600">2.5</p>
        <p className="text-sm text-gray-500">Ngày/yêu cầu</p>
      </div>
    </div>
  );
}

export default ServiceRequestManagement;
