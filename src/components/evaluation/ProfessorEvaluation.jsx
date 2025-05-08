import React, { useState, useEffect } from 'react';
import { FiDownload, FiBarChart2 } from 'react-icons/fi';
import { getProfessorEvaluations } from '../../apis/evaluationAPI';

function ProfessorEvaluation() {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');

  useEffect(() => {
    if (selectedSemester) {
      loadEvaluations();
    }
  }, [selectedSemester]);

  const loadEvaluations = async () => {
    try {
      const response = await getProfessorEvaluations(selectedSemester);
      setEvaluations(response.data);
    } catch (error) {
      console.error('Failed to load evaluations:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kết quả Đánh giá</h1>
        <div className="flex gap-2">
          <select 
            className="select select-bordered"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Chọn học kỳ...</option>
            <option value="20241">Học kỳ 1 - 2024-2025</option>
          </select>
          <button className="btn btn-primary">
            <FiDownload className="mr-2" />
            Xuất Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evaluations.map(evaluation => (
          <div key={evaluation.courseId} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{evaluation.courseName}</h2>
              <p className="text-sm text-gray-600">{evaluation.courseCode}</p>

              <div className="stats shadow mt-4">
                <div className="stat">
                  <div className="stat-title">Chất lượng giảng dạy</div>
                  <div className="stat-value">{evaluation.averageTeachingQuality.toFixed(1)}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Nội dung môn học</div>
                  <div className="stat-value">{evaluation.averageCourseContent.toFixed(1)}</div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Phản hồi phổ biến</h3>
                <ul className="list-disc list-inside">
                  {evaluation.commonFeedback.map((feedback, index) => (
                    <li key={index} className="text-sm text-gray-600">{feedback}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfessorEvaluation; 