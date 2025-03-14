import React from 'react';

function ProgramInfo({ data }) {
  return (
    <div className="space-y-6">
      <div className="bg-base-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Thông tin ngành học</h3>
        <p className="text-gray-700">{data.program?.name}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Danh sách môn học yêu cầu</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Mã môn</th>
                <th>Tên môn học</th>
                <th>Số tín chỉ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.program?.courses.map((course) => (
                <tr key={course.code}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.credits}</td>
                  <td>
                    <span className={`badge ${course.completed ? 'badge-success' : 'badge-warning'}`}>
                      {course.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProgramInfo; 