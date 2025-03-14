import React, { useState } from 'react';
import { FiUpload, FiDownload, FiFilter, FiSearch } from 'react-icons/fi';

function TranscriptManagement() {
  const [selectedClass, setSelectedClass] = useState(null);
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Kết quả Học tập</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <FiUpload className="mr-2" />
            Nhập điểm
          </button>
          <button className="btn btn-primary">
            <FiDownload className="mr-2" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      <ClassSelector onSelect={setSelectedClass} />
      
      {selectedClass && (
        <GradeEditor classData={selectedClass} />
      )}

      <GradeStatistics />
    </div>
  );
}

function ClassSelector({ onSelect }) {
  return (
    <div className="card bg-base-100 shadow mb-6">
      <div className="card-body">
        <h2 className="card-title mb-4">Chọn lớp học</h2>
        
        <div className="flex flex-col md:flex-row gap-4">
          <select className="select select-bordered flex-1">
            <option value="">Chọn học kỳ...</option>
            <option value="20241">Học kỳ 1 - 2024-2025</option>
          </select>
          
          <select className="select select-bordered flex-1">
            <option value="">Chọn môn học...</option>
            <option value="CS101">CS101 - Nhập môn lập trình</option>
          </select>
          
          <select className="select select-bordered flex-1">
            <option value="">Chọn lớp...</option>
            <option value="01">Nhóm 01</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function GradeEditor({ classData }) {
  return (
    <div className="card bg-base-100 shadow mb-6">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Bảng điểm</h2>
          <button className="btn btn-primary">Lưu điểm</button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th>Điểm QT</th>
                <th>Điểm GK</th>
                <th>Điểm CK</th>
                <th>Tổng kết</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023001</td>
                <td>Nguyễn Văn A</td>
                <td><input type="number" className="input input-bordered input-sm w-20" /></td>
                <td><input type="number" className="input input-bordered input-sm w-20" /></td>
                <td><input type="number" className="input input-bordered input-sm w-20" /></td>
                <td>8.5</td>
                <td><input type="text" className="input input-bordered input-sm" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function GradeStatistics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="stat bg-base-100 shadow">
        <div className="stat-title">Điểm trung bình</div>
        <div className="stat-value">7.5</div>
        <div className="stat-desc">↗︎ 0.5 so với kỳ trước</div>
      </div>

      <div className="stat bg-base-100 shadow">
        <div className="stat-title">Tỷ lệ đạt</div>
        <div className="stat-value text-success">85%</div>
        <div className="stat-desc">40/45 sinh viên</div>
      </div>

      <div className="stat bg-base-100 shadow">
        <div className="stat-title">Sinh viên xuất sắc</div>
        <div className="stat-value text-primary">12</div>
        <div className="stat-desc">Điểm A/A+</div>
      </div>
    </div>
  );
}

export default TranscriptManagement; 