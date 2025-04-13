// src/components/TermManagement/RegistrationStatistics/CourseStatistics.jsx
import React from 'react';

function CourseStatistics({ courseStats }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Thống kê theo môn học
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã môn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên môn học</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lớp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng SV đăng ký</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TB SV/Lớp</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courseStats?.map((course) => (
              <tr key={course.courseCode} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.courseCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.courseName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.totalSections}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.totalRegistrations}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.averageStudentsPerSection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseStatistics;