import React, { useState } from 'react';
import { FiDownload, FiEdit2, FiSave } from 'react-icons/fi';

function DegreeAuditManagement() {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [requirements, setRequirements] = useState({
    totalCredits: 130,
    categories: [
      {
        name: 'Kiến thức đại cương',
        credits: 35,
        courses: []
      },
      {
        name: 'Kiến thức cơ sở ngành',
        credits: 45,
        courses: []
      }
    ]
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Lộ trình Học tập</h1>
        <button className="btn btn-primary">
          <FiDownload className="mr-2" />
          Xuất báo cáo
        </button>
      </div>

      {/* Program Selection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Chọn chương trình đào tạo</h2>
        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
        >
          <option value="">Chọn ngành học...</option>
          <option value="CS">Khoa học máy tính</option>
          <option value="SE">Kỹ thuật phần mềm</option>
          <option value="IS">Hệ thống thông tin</option>
        </select>
      </div>

      {/* Requirements Editor */}
      {selectedProgram && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Yêu cầu chương trình</h2>
            <button className="btn btn-primary">
              <FiSave className="mr-2" />
              Lưu thay đổi
            </button>
          </div>

          <div className="space-y-6">
            {/* Total Credits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tổng số tín chỉ yêu cầu
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={requirements.totalCredits}
                onChange={(e) => setRequirements({
                  ...requirements,
                  totalCredits: parseInt(e.target.value)
                })}
              />
            </div>

            {/* Categories */}
            {requirements.categories.map((category, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{category.name}</h3>
                  <button className="btn btn-ghost btn-sm">
                    <FiEdit2 className="mr-2" />
                    Chỉnh sửa
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số tín chỉ yêu cầu
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={category.credits}
                      onChange={(e) => {
                        const newCategories = [...requirements.categories];
                        newCategories[index].credits = parseInt(e.target.value);
                        setRequirements({
                          ...requirements,
                          categories: newCategories
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Course List */}
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Mã môn</th>
                      <th>Tên môn học</th>
                      <th>Tín chỉ</th>
                      <th>Bắt buộc</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CS101</td>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DegreeAuditManagement;