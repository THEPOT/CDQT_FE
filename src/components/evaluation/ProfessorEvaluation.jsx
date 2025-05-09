import React, { useState, useEffect } from 'react';
import { FiBarChart2, FiDownload } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getProfessorSummaryAPI, exportProfessorSummaryAPI } from '../../apis/evaluationAPI';
import { toast } from 'react-toastify';

function ProfessorEvaluation() {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [evaluations, setEvaluations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedTerm) {
      fetchEvaluations();
    }
  }, [selectedTerm]);

  const fetchEvaluations = async () => {
    try {
      setIsLoading(true);
      const response = await getProfessorSummaryAPI(selectedTerm);
      setEvaluations(response.data);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      toast.error('Không thể tải kết quả đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportProfessorSummaryAPI(selectedTerm);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `evaluations-${selectedTerm}.xlsx`);
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
        <h1 className="text-2xl font-bold">Kết quả Đánh giá</h1>
        <button 
          className="btn btn-primary"
          onClick={handleExport}
          disabled={!selectedTerm}
        >
          <FiDownload className="mr-2" />
          Xuất báo cáo
        </button>
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

      {selectedTerm && evaluations && (
        <>
          {/* Overall Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Đánh giá trung bình</h3>
              <p className="text-3xl font-bold text-blue-600">
                {evaluations.averageOverallSatisfaction.toFixed(1)}/5.0
              </p>
              <p className="text-sm text-gray-500">Tất cả tiêu chí</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Số lượng đánh giá</h3>
              <p className="text-3xl font-bold text-green-600">
                {evaluations.totalEvaluations}
              </p>
              <p className="text-sm text-gray-500">Từ sinh viên</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Số môn giảng dạy</h3>
              <p className="text-3xl font-bold text-purple-600">
                {evaluations.totalCoursesTaught}
              </p>
              <p className="text-sm text-gray-500">Trong học kỳ</p>
            </div>
          </div>

          {/* Detailed Ratings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Chi tiết đánh giá</h2>
            <BarChart width={800} height={300} data={[
              {
                name: 'Chất lượng giảng dạy',
                value: evaluations.averageTeachingQuality
              },
              {
                name: 'Đánh giá công bằng',
                value: evaluations.averageAssessmentFairness
              },
              {
                name: 'Hài lòng tổng thể',
                value: evaluations.averageOverallSatisfaction
              }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </div>

          {/* Course-wise Evaluations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Đánh giá theo môn học</h2>
            <div className="space-y-4">
              {evaluations.courseEvaluations.map((course, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{course.courseName}</h3>
                      <p className="text-sm text-gray-500">{course.courseCode}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">
                        {course.averageOverallSatisfaction.toFixed(1)}/5.0
                      </p>
                      <p className="text-sm text-gray-500">
                        {course.totalResponses} đánh giá
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Nhận xét phổ biến:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.commonFeedback.map((feedback, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {feedback}
                        </span>
                      ))}
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

export default ProfessorEvaluation;