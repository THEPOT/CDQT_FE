// src/components/TermManagement/RegistrationStatistics/ProgramStatistics.jsx
import React from 'react';

function ProgramStatistics({ programStats }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Thống kê theo chương trình đào tạo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programStats?.map((program) => (
          <div key={program.programCode} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-lg mb-3">{program.programName}</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Số sinh viên:</span>
                <span className="font-semibold">{program.totalStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Trung bình môn/SV:</span>
                <span className="font-semibold">{program.averageCoursesPerStudent}</span>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Phân bố theo năm:</h4>
                {program.yearLevelBreakdown.map((year) => (
                  <div key={year.yearLevel} className="flex justify-between items-center text-sm">
                    <span>Năm {year.yearLevel}:</span>
                    <span>{year.studentCount} SV</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgramStatistics;