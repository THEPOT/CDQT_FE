import React from 'react';
import { RiDownloadLine, RiCheckLine, RiTimeLine } from 'react-icons/ri';

function DegreeAudit() {
  const auditData = {
    student: {
      name: 'Nguyễn Văn A',
      id: '2023001',
      program: 'Khoa học máy tính',
      admissionYear: 2023,
      expectedGraduation: 2027,
      totalCredits: 90,
      requiredCredits: 130,
      gpa: 3.65
    },
    requirements: [
      {
        category: 'Kiến thức đại cương',
        completed: 30,
        required: 35,
        courses: [
          {
            code: 'MTH101',
            name: 'Giải tích 1',
            credits: 4,
            status: 'completed',
            grade: 'A'
          },
          {
            code: 'PHY101',
            name: 'Vật lý đại cương',
            credits: 3,
            status: 'in_progress'
          }
        ]
      },
      {
        category: 'Kiến thức cơ sở ngành',
        completed: 40,
        required: 45,
        courses: [
          {
            code: 'CS101',
            name: 'Nhập môn lập trình',
            credits: 3,
            status: 'completed',
            grade: 'A'
          },
          {
            code: 'CS102',
            name: 'Cấu trúc dữ liệu',
            credits: 4,
            status: 'completed',
            grade: 'B+'
          }
        ]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tiến độ học tập</h1>
          <p className="text-gray-600">
            {auditData.student.name} - MSSV: {auditData.student.id}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <RiDownloadLine />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          {auditData.requirements.map((requirement) => (
            <div
              key={requirement.category}
              className="bg-white rounded-xl shadow-sm"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    {requirement.category}
                  </h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Hoàn thành: {requirement.completed}/{requirement.required} tín chỉ
                    </p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{
                          width: `${(requirement.completed / requirement.required) * 100}%`
                        }}
                      />
                    </div>
                  </div>
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
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Điểm
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requirement.courses.map((course) => (
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          {course.status === 'completed' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <RiCheckLine className="mr-1" />
                              Đã hoàn thành
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <RiTimeLine className="mr-1" />
                              Đang học
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.grade || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Tổng quan
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Tiến độ tổng thể</p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{Math.round((auditData.student.totalCredits / auditData.student.requiredCredits) * 100)}%</span>
                    <span>{auditData.student.totalCredits}/{auditData.student.requiredCredits} tín chỉ</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-blue-600 rounded-full"
                      style={{
                        width: `${(auditData.student.totalCredits / auditData.student.requiredCredits) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">GPA Tích lũy</p>
                <p className="text-3xl font-bold text-blue-600">
                  {auditData.student.gpa}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Dự kiến tốt nghiệp</p>
                <p className="text-lg font-semibold text-gray-900">
                  {auditData.student.expectedGraduation}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Ghi chú
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Hoàn thành đủ số tín chỉ yêu cầu</p>
              <p>• Đạt chuẩn ngoại ngữ</p>
              <p>• Hoàn thành GDTC/GDQP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DegreeAudit;