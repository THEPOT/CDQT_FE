import React, { useState } from 'react';
import { RiDownloadLine, RiPrinterLine } from 'react-icons/ri';

function Transcript() {
  const [selectedSemester, setSelectedSemester] = useState('all');

  const transcriptData = {
    student: {
      name: 'Nguyễn Văn A',
      id: '2023001',
      program: 'Khoa học máy tính',
      gpa: 3.65
    },
    semesters: [
      {
        id: '20231',
        name: 'Học kỳ 1 - 2023-2024',
        courses: [
          {
            code: 'CS101',
            name: 'Nhập môn lập trình',
            credits: 3,
            midterm: 8.5,
            final: 9.0,
            grade: 'A',
            status: 'passed'
          },
          {
            code: 'CS102',
            name: 'Cấu trúc dữ liệu',
            credits: 4,
            midterm: 7.5,
            final: 8.0,
            grade: 'B+',
            status: 'passed'
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bảng điểm</h1>
          <p className="text-gray-600">
            {transcriptData.student.name} - MSSV: {transcriptData.student.id}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            <RiPrinterLine />
            <span>In bảng điểm</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <RiDownloadLine />
            <span>Tải PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <select
                  className="select select-bordered"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="all">Tất cả học kỳ</option>
                  <option value="20231">Học kỳ 1 - 2023-2024</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã môn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên môn học
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tín chỉ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Điểm GK
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Điểm CK
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Điểm chữ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kết quả
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transcriptData.semesters[0].courses.map((course) => (
                    <tr key={course.code}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {course.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.midterm}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.final}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {course.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          Đạt
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Tổng quan
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">GPA Tích lũy</p>
                <p className="text-3xl font-bold text-blue-600">
                  {transcriptData.student.gpa}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tín chỉ tích lũy</p>
                <p className="text-xl font-semibold text-gray-900">
                  {transcriptData.semesters[0].courses.reduce(
                    (sum, course) => sum + course.credits,
                    0
                  )}
                  /130
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Phân bố điểm
            </h2>
            <div className="space-y-2">
              {['A/A+', 'B+/B', 'C+/C', 'D+/D', 'F'].map((grade) => (
                <div key={grade} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-12">{grade}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{
                        width: `${Math.random() * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transcript;