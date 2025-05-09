import React, { useEffect, useState } from 'react';
import { RiDownloadLine, RiPrinterLine } from 'react-icons/ri';
import { getTranscriptAPI, exportTranscriptAPI } from '../../apis/transcriptAPI';
import { toast } from 'react-toastify';

function Transcript() {
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [transcriptData, setTranscriptData] = useState({
    mssv: '',
    studentName: '',
    majorName: '',
    cumulativeGPA: 0,
    totalCredits: 0,
    totalCreditsPassed: 0,
    terms: []
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTranscript();
  }, []);

  const fetchTranscript = async () => {
    try {
      setIsLoading(true);
      const response = await getTranscriptAPI();
      setTranscriptData(response.data);
    } catch (error) {
      console.error('Error fetching transcript data:', error);
      toast.error('Không thể tải bảng điểm. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await exportTranscriptAPI(format);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transcript.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting transcript:', error);
      toast.error('Không thể tải xuống bảng điểm. Vui lòng thử lại sau!');
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
          <h1 className="text-2xl font-bold text-gray-900">Bảng điểm</h1>
          <p className="text-gray-600">
            {transcriptData.studentName} - MSSV: {transcriptData.mssv}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            onClick={() => handleExport('pdf')}
          >
            <RiDownloadLine />
            <span>Tải PDF</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            onClick={() => handleExport('excel')}
          >
            <RiDownloadLine />
            <span>Tải Excel</span>
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
            {transcriptData.terms?.map((term, index) => (
              <option key={index} value={term.termName}>
                {term.termName}
              </option>
            ))}
          </select>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">GPA Tích lũy</div>
            <div className="text-2xl font-bold text-blue-600">
              {transcriptData.cumulativeGPA?.toFixed(2)}
            </div>
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
            {transcriptData.terms?.map((term) => 
              term.courses
                .filter(() => selectedSemester === 'all' || selectedSemester === term.termName)
                .map((course) => (
                  <tr key={course.courseCode} className="border-b">
                    <td className="py-3">{course.courseCode}</td>
                    <td className="py-3">{course.courseName}</td>
                    <td className="text-center py-3">{course.credits}</td>
                    <td className="text-center py-3">{course.midtermGrade || '-'}</td>
                    <td className="text-center py-3">{course.finalGrade || '-'}</td>
                    <td className="text-center py-3">{course.gradeValue}</td>
                    <td className="text-center py-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        course.isPassed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {course.isPassed ? 'Đạt' : 'Không đạt'}
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