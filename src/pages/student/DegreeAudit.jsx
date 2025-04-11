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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DegreeAudit;