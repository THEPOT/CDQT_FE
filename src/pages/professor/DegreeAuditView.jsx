import React from 'react';
import { FiDownload } from 'react-icons/fi';

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
          Xuất báo cáo
        </button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Tín chỉ yêu cầu</h3>
          <p className="text-3xl font-bold text-blue-600">130</p>
          <p className="text-sm text-gray-500">Tổng số tín chỉ cần hoàn thành</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Tín chỉ đã hoàn thành</h3>
          <p className="text-3xl font-bold text-green-600">90</p>
          <p className="text-sm text-gray-500">69% hoàn thành</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Tín chỉ còn lại</h3>
          <p className="text-3xl font-bold text-yellow-600">40</p>
          <p className="text-sm text-gray-500">Cần hoàn thành</p>
        </div>
      </div>

      {/* Course Requirements */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Yêu cầu môn học</h2>
        <div className="space-y-6">
          {['Kiến thức đại cương', 'Kiến thức cơ sở ngành'].map((category, index) => (
            <div key={index}>
              <h3 className="font-medium text-gray-900 mb-2">{category}</h3>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Mã môn</th>
                    <th>Tên môn học</th>
                    <th>Tín chỉ</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CS101</td>
                    <td>Nhập môn lập trình</td>
                    <td>3</td>
                    <td>
                      <span className="badge badge-success">Đã hoàn thành</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DegreeAuditView;