import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

function ServiceRequestSubmission() {
  const [requestType, setRequestType] = useState('');
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gửi Yêu cầu Dịch vụ</h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="form-control mb-4">
            <label className="label">Loại yêu cầu</label>
            <select 
              className="select select-bordered"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option value="">Chọn loại yêu cầu...</option>
              <option value="transcript">Xin bảng điểm</option>
              <option value="certificate">Giấy xác nhận sinh viên</option>
              <option value="leave">Đơn xin nghỉ học</option>
              <option value="other">Yêu cầu khác</option>
            </select>
          </div>

          <div className="form-control mb-4">
            <label className="label">Chi tiết yêu cầu</label>
            <textarea 
              className="textarea textarea-bordered h-24"
              placeholder="Mô tả chi tiết yêu cầu của bạn..."
            ></textarea>
          </div>

          <div className="form-control mb-4">
            <label className="label">Tài liệu đính kèm</label>
            <input type="file" className="file-input file-input-bordered w-full" />
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              <FiSend className="mr-2" />
              Gửi yêu cầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceRequestSubmission; 