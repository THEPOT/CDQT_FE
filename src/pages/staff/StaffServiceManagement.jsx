import React, { useState, useEffect } from 'react';
import { RiFilter2Line, RiSearch2Line, RiArrowRightLine } from 'react-icons/ri';
import { getServiceRequestsAPI, updateServiceRequestStatusAPI } from '../../apis/serviceAPI';
import { toast } from 'react-toastify';

function StaffServiceManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    priority: ''
  });

  useEffect(() => {
    fetchRequests();
  }, [filters.status]);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const response = await getServiceRequestsAPI(filters.status);
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Không thể tải danh sách yêu cầu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus, comments = '') => {
    try {
      await updateServiceRequestStatusAPI(requestId, {
        status: newStatus,
        comments
      });
      toast.success('Cập nhật trạng thái thành công');
      fetchRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
      toast.error('Không thể cập nhật trạng thái yêu cầu');
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

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.mssv.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filters.type || request.serviceType === filters.type;
    
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Approved: 'bg-green-100 text-green-800',
      Denied: 'bg-red-100 text-red-800'
    };
    
    const statusLabels = {
      Pending: 'Chờ xử lý',
      Approved: 'Đã duyệt',
      Denied: 'Từ chối'
    };

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý Yêu cầu Dịch vụ</h1>

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
            <option value="Approved">Đã duyệt</option>
            <option value="Denied">Từ chối</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="">Tất cả độ ưu tiên</option>
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Chờ tiếp nhận</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {requests.filter(r => r.status === 'Pending').length}
          </p>
          <p className="text-sm text-gray-500">Yêu cầu mới</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Đang xử lý</h3>
          <p className="text-3xl font-bold text-blue-600">
            {requests.filter(r => r.status === 'Processing').length}
          </p>
          <p className="text-sm text-gray-500">Yêu cầu</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Hoàn thành hôm nay</h3>
          <p className="text-3xl font-bold text-green-600">
            {requests.filter(r => {
              const today = new Date().toDateString();
              return r.status === 'Approved' && new Date(r.requestDate).toDateString() === today;
            }).length}
          </p>
          <p className="text-sm text-gray-500">Yêu cầu</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Thời gian xử lý TB</h3>
          <p className="text-3xl font-bold text-purple-600">1.5</p>
          <p className="text-sm text-gray-500">Ngày/yêu cầu</p>
        </div>
      </div>

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
            ) : filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Không có yêu cầu nào
                </td>
              </tr>
            ) : (
              filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.studentName} ({request.mssv})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {serviceTypes.find(t => t.value === request.serviceType)?.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.requestDate).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {request.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'Approved')}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Duyệt
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'Denied')}
                          className="text-red-600 hover:text-red-900 mr-3"
                        >
                          Từ chối
                        </button>
                      </>
                    )}
                    <button className="text-gray-600 hover:text-gray-900">
                      Chi tiết
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

export default StaffServiceManagement;