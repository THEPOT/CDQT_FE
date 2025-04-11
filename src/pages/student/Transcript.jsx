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

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <select 
            className="px-4 py-2 border rounded-lg"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="all">Tất cả học kỳ</option>
            <option value="20231">Học kỳ 1 - 2023-2024</option>
            <option value="20232">Học kỳ 2 - 2023-2024</option>
          </select>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">GPA Tích lũy</div>
            <div className="text-2xl font-bold text-blue-600">{transcriptData.student.gpa}</div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Mã môn</th>
              <th className="text-left py-3">Tên môn học</th>
              <th className="text-center py-3">Tín chỉ</th>
              <th className="text-center py-3">Điểm GK</th>
              <th className="text-center py-3">Điểm CK</th>
              <th className="text-center py-3">Điểm chữ</th>
              <th className="text-center py-3">Kết quả</th>
            </tr>
          </thead>
          <tbody>
            {transcriptData.semesters[0].courses.map((course) => (
              <tr key={course.code} className="border-b">
                <td className="py-3">{course.code}</td>
                <td className="py-3">{course.name}</td>
                <td className="text-center py-3">{course.credits}</td>
                <td className="text-center py-3">{course.midterm}</td>
                <td className="text-center py-3">{course.final}</td>
                <td className="text-center py-3">{course.grade}</td>
                <td className="text-center py-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    course.status === 'passed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {course.status === 'passed' ? 'Đạt' : 'Không đạt'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transcript;
