import React from 'react';
import { FiEdit2, FiSave, FiPlus } from 'react-icons/fi';

function DegreeAuditManagement() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý Lộ trình Học tập</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProgramRequirements />
        <div className="lg:col-span-2">
          <CourseSequence />
        </div>
      </div>
    </div>
  );
}

function ProgramRequirements() {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Yêu cầu Chương trình</h2>
          <button className="btn btn-primary btn-sm">
            <FiPlus className="mr-2" />
            Thêm mới
          </button>
        </div>

        <div className="form-control">
          <label className="label">Ngành học</label>
          <select className="select select-bordered">
            <option>Khoa học máy tính</option>
            <option>Kỹ thuật phần mềm</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">Số tín chỉ yêu cầu</label>
          <input type="number" className="input input-bordered" value="130" />
        </div>

        <div className="form-control">
          <label className="label">GPA tối thiểu</label>
          <input type="number" className="input input-bordered" value="2.0" />
        </div>
      </div>
    </div>
  );
}

function CourseSequence() {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title mb-4">Trình tự Môn học</h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Học kỳ</th>
                <th>Môn học</th>
                <th>Tín chỉ</th>
                <th>Bắt buộc</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nhập môn lập trình</td>
                <td>3</td>
                <td>
                  <input type="checkbox" className="checkbox" checked />
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">
                    <FiEdit2 />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DegreeAuditManagement; 