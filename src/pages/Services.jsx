import React, { useState } from 'react';
import { RiFileTextLine, RiSendPlane2Line, RiAttachmentLine } from 'react-icons/ri';

function Services() {
  const [selectedService, setSelectedService] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'transcript',
      status: 'pending',
      date: '2024-03-15',
      details: 'Xin cấp bảng điểm tiếng Anh'
    },
    {
      id: 2,
      type: 'certificate',
      status: 'approved',
      date: '2024-03-10',
      details: 'Xin giấy xác nhận sinh viên'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
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
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Chọn loại yêu cầu...</option>
                    <option value="transcript">Xin cấp bảng điểm</option>
                    <option value="certificate">Giấy xác nhận sinh viên</option>
                    <option value="leave">Đơn xin nghỉ học</option>
                    <option value="other">Yêu cầu khác</option>
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
                    className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <RiSendPlane2Line />
                    <span>Gửi yêu cầu</span>
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
                    <p className="text-sm font-medium text-gray-900">
                      {request.details}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ngày gửi: {new Date(request.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {request.status === 'approved' ? 'Đã duyệt' : 'Đang xử lý'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;