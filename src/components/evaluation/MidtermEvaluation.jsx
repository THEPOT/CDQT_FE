import React, { useState } from 'react';
import { FiCheck, FiAlertTriangle, FiDownload } from 'react-icons/fi';

function MidtermEvaluation({ userRole }) {
  return (
    <div className="container mx-auto p-4">
      {userRole === 'admin' && <AdminEvaluationView />}
      {userRole === 'professor' && <ProfessorEvaluationView />}
      {userRole === 'staff' && <StaffEvaluationView />}
      {userRole === 'student' && <StudentEvaluationView />}
    </div>
  );
}

function StudentEvaluationView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kết quả đánh giá giữa kỳ</h1>
    </div>
  );
}

function AdminEvaluationView() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý Đánh giá Giữa kỳ</h1>
      
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Thiết lập Đánh giá</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">Thời gian bắt đầu</label>
              <input type="datetime-local" className="input input-bordered" />
            </div>
            
            <div className="form-control">
              <label className="label">Thời gian kết thúc</label>
              <input type="datetime-local" className="input input-bordered" />
            </div>
          </div>

          <div className="form-control">
            <label className="label">Tiêu chí đánh giá</label>
            <textarea 
              className="textarea textarea-bordered h-24"
              placeholder="Nhập các tiêu chí đánh giá..."
            />
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Lưu thiết lập</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfessorEvaluationView() {
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Đánh giá Giữa kỳ</h1>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Chọn lớp học</h2>
          
          <select 
            className="select select-bordered w-full"
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Chọn lớp...</option>
            <option value="CS101-01">CS101-01 - Nhập môn lập trình</option>
          </select>
        </div>
      </div>

      {selectedClass && (
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">Danh sách sinh viên</h2>
              <button className="btn btn-primary btn-sm">
                <FiSave className="mr-2" />
                Lưu đánh giá
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>MSSV</th>
                    <th>Họ và tên</th>
                    <th>Tình trạng</th>
                    <th>Đề xuất</th>
                    <th>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2023001</td>
                    <td>Nguyễn Văn A</td>
                    <td>
                      <select className="select select-bordered select-sm">
                        <option value="good">Tốt</option>
                        <option value="warning">Cần chú ý</option>
                        <option value="risk">Nguy cơ</option>
                      </select>
                    </td>
                    <td>
                      <input type="text" className="input input-bordered input-sm" />
                    </td>
                    <td>
                      <input type="text" className="input input-bordered input-sm" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StaffEvaluationView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tổng hợp Đánh giá Giữa kỳ</h1>
        <button className="btn btn-primary">
          <FiDownload className="mr-2" />
          Xuất báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Tổng số lớp</div>
          <div className="stat-value">45</div>
          <div className="stat-desc">Đã đánh giá: 30</div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Sinh viên cần chú ý</div>
          <div className="stat-value text-warning">124</div>
          <div className="stat-desc">15% tổng số</div>
        </div>

        <div className="stat bg-base-100 shadow">
          <div className="stat-title">Sinh viên nguy cơ</div>
          <div className="stat-value text-error">45</div>
          <div className="stat-desc">5% tổng số</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Trạng thái đánh giá theo lớp</h2>
          
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Mã lớp</th>
                  <th>Tên môn</th>
                  <th>Giảng viên</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CS101-01</td>
                  <td>Nhập môn lập trình</td>
                  <td>Nguyễn Văn A</td>
                  <td>
                    <div className="badge badge-success">Đã hoàn thành</div>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">Xem chi tiết</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MidtermEvaluation; 