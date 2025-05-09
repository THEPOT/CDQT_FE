import React, { useState, useEffect } from 'react';
import { FiDownload, FiSend, FiBarChart2 } from 'react-icons/fi';
import { 
  getCourseSummaryAPI, 
  getProfessorSummaryAPI,
  sendEvaluationResultsAPI,
  exportCourseSummaryAPI,
  exportProfessorSummaryAPI
} from '../../apis/evaluationAPI';
import { toast } from 'react-toastify';

function StaffEvaluation() {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [courseSummary, setCourseSummary] = useState(null);
  const [professorSummary, setProfessorSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedTerm) {
      fetchSummaries();
    }
  }, [selectedTerm]);

  const fetchSummaries = async () => {
    try {
      setIsLoading(true);
      const [courseRes, profRes] = await Promise.all([
        getCourseSummaryAPI(selectedTerm),
        getProfessorSummaryAPI(selectedTerm)
      ]);
      setCourseSummary(courseRes.data);
      setProfessorSummary(profRes.data);
    } catch (error) {
      console.error('Error fetching summaries:', error);
      toast.error('Không thể tải kết quả đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResults = async () => {
    try {
      await sendEvaluationResultsAPI(selectedTerm);
      toast.success('Đã gửi kết quả đánh giá cho giảng viên');
    } catch (error) {
      console.error('Error sending results:', error);
      toast.error('Không thể gửi kết quả đánh giá');
    }
  };

  const handleExport = async (type) => {
    try {
      const response = await (type === 'courses' ? 
        exportCourseSummaryAPI(selectedTerm) : 
        exportProfessorSummaryAPI(selectedTerm)
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `evaluations-${type}-${selectedTerm}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting evaluations:', error);
      toast.error('Không thể tải xuống báo cáo');
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
        <h1 className="text-2xl font-bold">Quản lý Đánh giá</h1>
        <div className="flex gap-2">
          <button 
            className="btn btn-outline"
            onClick={handleSendResults}
            disabled={!selectedTerm}
          >
            <FiSend className="mr-2" />
            Gửi kết quả
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => handleExport('courses')}
            disabled={!selectedTerm}
          >
            <FiDownload className="mr-2" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Chọn học kỳ</h2>
        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
        >
          <option value="">Chọn học kỳ...</option>
          <option value="20241">HK1 2024-2025</option>
          <option value="20232">HK2 2023-2024</option>
        </select>
      </div>

      {selectedTerm && courseSummary && professorSummary && (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Tổng số đánh giá</h3>
              <p className="text-3xl font-bold text-blue-600">
                {courseSummary.reduce((sum, course) => sum + course.totalResponses, 0)}
              </p>
              <p className="text-sm text-gray-500">Học kỳ hiện tại</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Tỷ lệ tham gia</h3>
              <p className="text-3xl font-bold text-green-600">85%</p>
              <p className="text-sm text-gray-500">Sinh viên đã đánh giá</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Điểm trung bình</h3>
              <p className="text-3xl font-bold text-purple-600">4.2</p>
              <p className="text-sm text-gray-500">Trên thang 5.0</p>
            </div>
          </div>

          {/* Course Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Kết quả theo môn học</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Mã môn</th>
                    <th>Tên môn học</th>
                    <th>Giảng viên</th>
                    <th>Số lượng đánh giá</th>
                    <th>Điểm trung bình</th>
                  </tr>
                </thead>
                <tbody>
                  {courseSummary.map((course) => (
                    <tr key={course.courseId}>
                      <td>{course.courseCode}</td>
                      <td>{course.courseName}</td>
                      <td>{course.professorName}</td>
                      <td>{course.totalResponses}</td>
                      <td>{course.averageOverallSatisfaction.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Professor Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Kết quả theo giảng viên</h2>
            <div className="space-y-4">
              {professorSummary.map((professor) => (
                <div key={professor.professorId} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{professor.professorName}</h3>
                      <p className="text-sm text-gray-500">
                        {professor.totalCoursesTaught} môn học • {professor.totalEvaluations} đánh giá
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">
                        {professor.averageOverallSatisfaction.toFixed(1)}/5.0
                      </p>
                      <p className="text-sm text-gray-500">Điểm trung bình</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StaffEvaluation;