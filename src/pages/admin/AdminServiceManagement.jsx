import React, { useState, useEffect } from 'react';
import { RiFilter2Line, RiSearch2Line, RiSettings4Line, RiDownloadLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import {
  getServiceRequestsAPI,
  updateServiceRequestStatusAPI,
  getServiceStatisticsAPI,
  exportServiceReportAPI
} from '../../apis/serviceAPI';

function AdminServiceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    priority: ''
  });
  const [requests, setRequests] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, [page, size, filters]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [requestsRes, statsRes] = await Promise.all([
        getServiceRequestsAPI({ page, size, ...filters, search: searchTerm }),
        getServiceStatisticsAPI()
      ]);
      setRequests(requestsRes.data.items);
      setStatistics(statsRes.data);
    } catch (error) {
      console.error('Error fetching service data:', error);
      toast.error('Không thể tải dữ liệu yêu cầu dịch vụ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await updateServiceRequestStatusAPI(requestId, newStatus);
      toast.success('Cập nhật trạng thái thành công');
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Không thể cập nhật trạng thái');
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportServiceReportAPI(filters);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `service-requests-${new Date().toISOString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Xuất báo cáo thành công');
    } catch (error) {
      console.error('Error exporting report:', error);
      toast.error('Không thể xuất báo cáo');
    }
  };

  const serviceTypes = [
    { value: 'Certificate', label: 'Giấy xác nhận sinh viên' },
    { value: 'Transcript', label: 'Cấp bảng điểm' },
    { value: 'LeaveOfAbsence', label: 'Xin phép nghỉ học' },
    { value: 'CreditOverload', label: 'Đăng ký học vượt' },
    { value: 'ProgramChange', label: 'Đăng ký đổi ngành học' },
    { value: 'AddDrop', label: 'Điều chỉnh đăng ký môn' },
    { value: 'Withdraw', label: 'Đăng ký hủy môn' },
    { value: 'Graduation', label: 'Đăng ký xét tốt nghiệp' },
    { value: 'AcademicAdvising', label: 'Đặt lịch tư vấn học thuật' },
    { value: 'ClassroomBorrow', label: 'Mượn phòng học' },
    { value: 'TemporaryWithdraw', label: 'Đăng ký bảo lưu' },
    { value: 'PermanentWithdraw', label: 'Đăng ký thôi học' },
    { value: 'Other', label: 'Yêu cầu khác' }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Yêu cầu Dịch vụ</h1>
        <div className="flex gap-2">
          <button 
            className="btn btn-outline"
            onClick={() => setIsLoading(true)}
          >
            <RiSettings4Line className="mr-2" />
            Cài đặt
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleExport}
            disabled={isLoading}
          >
            <RiDownloadLine className="mr-2" />
            Xuất báo cáo
          </button>
        </div>
      </div>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="select select-bordered w-full"
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="">Tất cả loại yêu cầu</option>
            {serviceTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Pending">Chờ xử lý</option>
            <option value="Processing">Đang xử lý</option>
            <option value="Completed">Đã hoàn thành</option>
            <option value="Rejected">Từ chối</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="">Tất cả độ ưu tiên</option>
            <option value="High">Cao</option>
            <option value="Medium">Trung bình</option>
            <option value="Low">Thấp</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Tổng số yêu cầu</h3>
            <p className="text-3xl font-bold text-blue-600">{statistics.totalRequests}</p>
            <p className="text-sm text-gray-500">Tháng này</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Đang chờ xử lý</h3>
            <p className="text-3xl font-bold text-yellow-600">{statistics.pendingRequests}</p>
            <p className="text-sm text-gray-500">Cần được xử lý</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Đã hoàn thành</h3>
            <p className="text-3xl font-bold text-green-600">{statistics.completedRequests}</p>
            <p className="text-sm text-gray-500">Tháng này</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Thời gian xử lý TB</h3>
            <p className="text-3xl font-bold text-purple-600">{statistics.averageProcessingTime}</p>
            <p className="text-sm text-gray-500">Ngày/yêu cầu</p>
          </div>
        </div>
      )}

      {/* Service Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã yêu cầu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sinh viên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại yêu cầu
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
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Không có yêu cầu nào
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.studentName} ({request.studentId})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {serviceTypes.find(t => t.value === request.type)?.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.requestDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status === 'Pending' ? 'Chờ xử lý' :
                       request.status === 'Processing' ? 'Đang xử lý' :
                       request.status === 'Completed' ? 'Hoàn thành' : 'Từ chối'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => handleStatusUpdate(request.id, 'Completed')}
                    >
                      Duyệt
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleStatusUpdate(request.id, 'Rejected')}
                    >
                      Từ chối
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminServiceManagement;