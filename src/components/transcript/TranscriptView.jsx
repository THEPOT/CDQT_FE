import React, { useState } from 'react';
import { FiDownload, FiPrinter } from 'react-icons/fi';

function TranscriptView({ userRole }) {
  const [selectedSemester, setSelectedSemester] = useState('all');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bảng điểm</h1>
          {userRole === 'student' && (
            <p className="text-gray-600">Nguyễn Văn A - MSSV: 2023001</p>
          )}
        </div>

        <div className="flex gap-2">
          <button className="btn btn-outline">
            <FiPrinter className="mr-2" />
            In bảng điểm
          </button>
          <button className="btn btn-primary">
            <FiDownload className="mr-2" />
            Tải PDF
          </button>
        </div>
      </div>

      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <select 
              className="select select-bordered"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="all">Tất cả học kỳ</option>
              <option value="20241">Học kỳ 1 - 2024-2025</option>
              <option value="20232">Học kỳ 2 - 2023-2024</option>
            </select>

            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">GPA</div>
                <div className="stat-value">3.65</div>
                <div className="stat-desc">Tích lũy</div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Mã môn</th>
                  <th>Tên môn học</th>
                  <th>Tín chỉ</th>
                  <th>Điểm QT</th>
                  <th>Điểm GK</th>
                  <th>Điểm CK</th>
                  <th>Điểm chữ</th>
                  <th>Kết quả</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CS101</td>
                  <td>Nhập môn lập trình</td>
                  <td>3</td>
                  <td>8.5</td>
                  <td>8.0</td>
                  <td>8.5</td>
                  <td>A</td>
                  <td>
                    <div className="badge badge-success">Đạt</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <GradeDistribution />
    </div>
  );
}

function GradeDistribution() {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Phân bố điểm</h2>
        
        <div className="grid grid-cols-5 gap-4 mt-4">
          {['A/A+', 'B+/B', 'C+/C', 'D+/D', 'F'].map((grade) => (
            <div key={grade} className="stat bg-base-200 rounded-lg">
              <div className="stat-title">{grade}</div>
              <div className="stat-value text-primary">
                {Math.floor(Math.random() * 30)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TranscriptView; 