import React, { useState, useEffect } from 'react';
import { RiSendPlane2Line, RiAttachmentLine, RiFileTextLine, RiCalendarLine } from 'react-icons/ri';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { createServiceRequestAPI, getServiceRequestsByStudentIdAPI } from '../apis/serviceAPI';

function Services() {
  const { user } = useAuth();
  const [requestType, setRequestType] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getServiceRequestsByStudentIdAPI();
      setRequests(response.data.items);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Không thể tải danh sách yêu cầu');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestType || !requestDetails.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin yêu cầu');
      return;
    }

    try {
      setIsLoading(true);
      await createServiceRequestAPI({
        studentId: user.id,
        serviceType: requestType,
        details: requestDetails
      });
      
      toast.success('Gửi yêu cầu thành công');
      setRequestType('');
      setRequestDetails('');
      setAttachments([]);
      fetchRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Có lỗi xảy ra khi gửi yêu cầu');
    } finally {
      setIsLoading(false);
    }
  };

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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || statusStyles.Pending}`}>
        {statusLabels[status] || 'Chờ xử lý'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dịch vụ Sinh viên</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Request Form */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Gửi yêu cầu mới
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Loại yêu cầu
                  </label>
                  <select
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    required
                    disabled={isLoading}
                  >
                    <option value="">Chọn loại yêu cầu...</option>
                    {serviceTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Chi tiết yêu cầu
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    value={requestDetails}
                    onChange={(e) => setRequestDetails(e.target.value)}
                    placeholder="Mô tả chi tiết yêu cầu của bạn..."
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tài liệu đính kèm
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <RiAttachmentLine className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Tải tệp lên</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={(e) => setAttachments(Array.from(e.target.files))}
                            disabled={isLoading}
                          />
                        </label>
                        <p className="pl-1">hoặc kéo thả vào đây</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC tối đa 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    <RiSendPlane2Line />
                    <span>{isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Request History */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Lịch sử yêu cầu
            </h2>

            <div className="space-y-4">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-start gap-4 p-4 border rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <RiFileTextLine className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {serviceTypes.find(t => t.value === request.serviceType)?.label}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {request.details}
                        </p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                    {request.staffComments && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-600">
                        <p className="font-medium">Phản hồi:</p>
                        <p>{request.staffComments}</p>
                      </div>
                    )}
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <RiCalendarLine className="mr-1" />
                      <time dateTime={request.requestDate}>
                        {new Date(request.requestDate).toLocaleDateString('vi-VN')}
                      </time>
                    </div>
                  </div>
                </div>
              ))}
              {requests.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  Chưa có yêu cầu nào
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;