import React, { useEffect, useState } from 'react';
import { RiDownloadLine, RiPrinterLine } from 'react-icons/ri';
import { getTranscriptAPI } from '../../apis/transcriptAPI';

function Transcript() {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [transcriptData, setTranscriptData] = useState({
    mssv: '',
    studentName: '',
    majorName: '',
    cumulativeGPA: 0,
    totalCredits: 0,
    totalCreditsPassed: 0,
    semesters: []
  });

  useEffect(() => {
    fetchTranscript();
  }, []);

  const fetchTranscript = async () => {
    try {
      const response = await getTranscriptAPI();
      setTranscriptData(response.data);
    } catch (error) {
      console.error('Error fetching transcript data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bảng điểm</h1>
          <p className="text-gray-600">
            {transcriptData.studentName} - MSSV: {transcriptData.mssv}
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
            {transcriptData.semesters.map((semester, index) => (
              <option key={index} value={semester.semesterName}>
                {semester.semesterName}
              </option>
            ))}
          </select>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">GPA Tích lũy</div>
            <div className="text-2xl font-bold text-blue-600">{transcriptData.cumulativeGPA.toFixed(2)}</div>
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
            {transcriptData.semesters.map((semester) => 
              semester.courses.map((course) => (
                <tr key={course.courseCode} className="border-b">
                  <td className="py-3">{course.courseCode}</td>
                  <td className="py-3">{course.courseName}</td>
                  <td className="text-center py-3">{course.credits}</td>
                  <td className="text-center py-3">{course.midtermScore}</td>
                  <td className="text-center py-3">{course.finalScore}</td>
                  <td className="text-center py-3">{course.letterGrade}</td>
                  <td className="text-center py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      course.result === 'Đạt' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {course.result}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transcript;

