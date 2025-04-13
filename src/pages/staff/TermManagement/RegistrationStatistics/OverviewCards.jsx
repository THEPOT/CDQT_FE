// src/components/TermManagement/RegistrationStatistics/OverviewCards.jsx
import React from 'react';

function OverviewCards({ analytics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-full">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tổng số sinh viên</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.totalStudents}</p>
            <p className="text-sm text-blue-600">Đã đăng ký</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-full">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tổng số môn học</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.totalCourses}</p>
            <p className="text-sm text-green-600">Đang mở</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-full">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Trung bình môn/SV</p>
            <p className="text-2xl font-bold text-gray-900">{analytics.averageCoursesPerStudent}</p>
            <p className="text-sm text-purple-600">Môn học</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-full">
            <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tổng lượt đăng ký</p>
            <p className="text-2xl font-bold text-gray-900">
              {Object.values(analytics.dailyRegistrationCounts || {}).reduce((a, b) => a + b, 0)}
            </p>
            <p className="text-sm text-amber-600">Lượt</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewCards;