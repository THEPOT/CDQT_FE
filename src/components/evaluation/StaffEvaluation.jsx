import React, { useState, useEffect } from 'react';
import { FiDownload, FiSend, FiBarChart2 } from 'react-icons/fi';
import { 
  getCurrentEvaluationPeriod,
  getCourseEvaluationSummary,
  getProfessorEvaluationSummary,
  sendEvaluationResults,
  exportEvaluationResults
} from '../../apis/evaluationAPI';

function StaffEvaluation() {
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [courseSummary, setCourseSummary] = useState([]);
  const [professorSummary, setProfessorSummary] = useState([]);

  useEffect(() => {
    loadCurrentPeriod();
  }, []);

  useEffect(() => {
    if (selectedSemester) {
      loadSummaries();
    }
  }, [selectedSemester]);

  const loadCurrentPeriod = async () => {
    try {
      const response = await getCurrentEvaluationPeriod();
      setCurrentPeriod(response.data);
      setSelectedSemester(response.data.semesterId);
    } catch (error) {
      console.error('Failed to load evaluation period:', error);
    }
  };

  const loadSummaries = async () => {
    try {
      const [courseResponse, professorResponse] = await Promise.all([
        getCourseEvaluationSummary(selectedSemester),
        getProfessorEvaluationSummary(selectedSemester)
      ]);
      setCourseSummary(courseResponse.data);
      setProfessorSummary(professorResponse.data);
    } catch (error) {
      console.error('Failed to load summaries:', error);
    }
  };

  const handleSendResults = async () => {
    try {
      await sendEvaluationResults(selectedSemester);
      // Show success message
    } catch (error) {
      console.error('Failed to send results:', error);
    }
  };

  const handleExportResults = async (type) => {
    try {
      await exportEvaluationResults(selectedSemester, type);
    } catch (error) {
      console.error('Failed to export results:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Khảo sát</h1>
        <div className="flex gap-2">
          <button 
            className="btn btn-primary"
            onClick={handleSendResults}
          >
            <FiSend className="mr-2" />
            Gửi kết quả
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleExportResults('courses')}
          >
            <FiDownload className="mr-2" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Current Period Status */}
      {currentPeriod && (
        <div className="card bg-base-100 shadow mb-6">
          <div className="card-body">
            <h2 className="card-title">Kỳ khảo sát hiện tại</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Học kỳ</p>
                <p className="font-medium">{currentPeriod.semesterName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <div className={`badge ${currentPeriod.isCurrentlyOpen ? 'badge-success' : 'badge-error'}`}>
                  {currentPeriod.isCurrentlyOpen ? 'Đang mở' : 'Đã đóng'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Summary */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <h2 className="card-title mb-4">Tổng hợp theo môn học</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Mã môn</th>
                  <th>Tên môn</th>
                  <th>Giảng viên</th>
                  <th>Số lượng đánh giá</th>
                  <th>Điểm trung bình</th>
                </tr>
              </thead>
              <tbody>
                {courseSummary.map(course => (
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
      </div>

      {/* Professor Summary */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title mb-4">Tổng hợp theo giảng viên</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Giảng viên</th>
                  <th>Số môn</th>
                  <th>Tổng đánh giá</th>
                  <th>Điểm trung bình</th>
                </tr>
              </thead>
              <tbody>
                {professorSummary.map(professor => (
                  <tr key={professor.professorId}>
                    <td>{professor.professorName}</td>
                    <td>{professor.totalCoursesTaught}</td>
                    <td>{professor.totalEvaluations}</td>
                    <td>{professor.averageOverallSatisfaction.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffEvaluation; 