import React from 'react';
import { FiDownload, FiCheckCircle, FiClock } from 'react-icons/fi';

function DegreeAuditView() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Lộ trình Học tập</h1>
          <p className="text-gray-600">Ngành: Khoa học máy tính</p>
        </div>
        <button className="btn btn-primary">
          <FiDownload className="mr-2" />
          Xuất PDF
        </button>
      </div>

      <ProgressSummary />
      <CourseProgress />
    </div>
  );
}

function ProgressSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="stat bg-base-100 shadow">
        <div className="stat-title">Tín chỉ đã hoàn thành</div>
        <div className="stat-value">90/130</div>
        <div className="stat-desc">69% hoàn thành</div>
      </div>

      <div className="stat bg-base-100 shadow">
        <div className="stat-title">GPA Tích lũy</div>
        <div className="stat-value">3.5</div>
        <div className="stat-desc">Xuất sắc</div>
      </div>

      <div className="stat bg-base-100 shadow">
        <div className="stat-title">Dự kiến tốt nghiệp</div>
        <div className="stat-value">2025</div>
        <div className="stat-desc">Học kỳ 1</div>
      </div>
    </div>
  );
}

function CourseProgress() {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title mb-4">Tiến độ theo môn học</h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Mã môn</th>
                <th>Tên môn</th>
                <th>Tín chỉ</th>
                <th>Trạng thái</th>
                <th>Kỳ học</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CS101</td>
                <td>Nhập môn lập trình</td>
                <td>3</td>
                <td>
                  <div className="flex items-center">
                    <FiCheckCircle className="text-success mr-2" />
                    Đã hoàn thành
                  </div>
                </td>
                <td>2023/1</td>
              </tr>
              <tr>
                <td>CS102</td>
                <td>Cấu trúc dữ liệu</td>
                <td>3</td>
                <td>
                  <div className="flex items-center">
                    <FiClock className="text-warning mr-2" />
                    Chưa học
                  </div>
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DegreeAuditView; 