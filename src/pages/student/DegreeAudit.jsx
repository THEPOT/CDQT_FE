import React, { useState, useEffect } from 'react';
import { FiDownload, FiCheckCircle, FiClock } from 'react-icons/fi';
import { getStudentProgressAPI } from '../../apis/degreeAuditAPI';
import { toast } from 'react-toastify';

function DegreeAudit() {
  const [isLoading, setIsLoading] = useState(false);
  const [auditData, setAuditData] = useState({
    student: {
      name: '',
      id: '',
      program: '',
      admissionYear: null,
      expectedGraduation: null,
      totalCredits: 0,
      requiredCredits: 0,
      gpa: 0
    },
    categories: []
  });

  useEffect(() => {
    fetchAuditData();
  }, []);

  const fetchAuditData = async () => {
    try {
      setIsLoading(true);
      const response = await getStudentProgressAPI();
      const data = response.data;

      setAuditData({
        student: {
          name: data.studentName,
          id: data.studentId,
          program: data.programName,
          admissionYear: data.admissionYear,
          expectedGraduation: data.expectedGraduationYear,
          totalCredits: data.completedCredits,
          requiredCredits: data.requiredCredits,
          gpa: data.cumulativeGpa
        },
        categories: data.categories.map(cat => ({
          name: cat.categoryName,
          completed: cat.completedCredits,
          required: cat.requiredCredits,
          courses: cat.courses.map(course => ({
            code: course.courseCode,
            name: course.courseName,
            credits: course.credits,
            status: course.status,
            grade: course.grade
          }))
        }))
      });
    } catch (error) {
      console.error('Error fetching audit data:', error);
      toast.error('Không thể tải dữ liệu tiến độ học tập');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
          <FiDownload />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          {auditData.categories.map((category, catIdx) => (
            <div
              key={category.name || catIdx}
              className="bg-white rounded-xl shadow-sm"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    {category.name}
                  </h2>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Hoàn thành: {category.completed}/{category.required} tín chỉ
                    </p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{
                          width: `${(category.completed / category.required) * 100}%`
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
                    {category.courses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center text-gray-400 py-4">
                          Không có môn học nào trong nhóm này
                        </td>
                      </tr>
                    ) : (
                      category.courses.map((course, courseIdx) => (
                        <tr key={`${category.name || catIdx}-${course.code || courseIdx}`}>
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
                                <FiCheckCircle className="mr-1" />
                                Đã hoàn thành
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <FiClock className="mr-1" />
                                Đang học
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.grade || '-'}
                          </td>
                        </tr>
                      ))
                    )}
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
                  {typeof auditData.student.gpa === 'number' && !isNaN(auditData.student.gpa)
                    ? auditData.student.gpa.toFixed(2)
                    : '-'}
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
        </div>
      </div>
    </div>
  );
}

export default DegreeAudit;