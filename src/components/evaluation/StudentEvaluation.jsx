import React, { useState, useEffect } from 'react';
import { RiStarLine, RiStarFill, RiSendPlane2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import {
  getEvaluationQuestionsAPI,
  submitCourseEvaluationAPI,
  getStudentEvaluationStatusAPI
} from '../../apis/evaluationAPI';

function StudentEvaluation() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [evaluationStatus, setEvaluationStatus] = useState(null);
  const [ratings, setRatings] = useState({
    teachingQualityRating: 0,
    courseContentRating: 0,
    assessmentFairnessRating: 0,
    overallSatisfactionRating: 0
  });
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
    fetchEvaluationStatus();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await getEvaluationQuestionsAPI();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Không thể tải câu hỏi khảo sát');
    }
  };

  const fetchEvaluationStatus = async () => {
    try {
      const currentSemesterId = '2024-1'; // Replace with actual semester ID
      const response = await getStudentEvaluationStatusAPI(currentSemesterId);
      setEvaluationStatus(response.data);
    } catch (error) {
      console.error('Error fetching evaluation status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      toast.warning('Vui lòng chọn môn học');
      return;
    }

    try {
      setIsLoading(true);
      await submitCourseEvaluationAPI({
        classSectionId: selectedCourse,
        ...ratings,
        feedback
      });
      
      toast.success('Gửi đánh giá thành công');
      setSelectedCourse(null);
      setRatings({
        teachingQualityRating: 0,
        courseContentRating: 0,
        assessmentFairnessRating: 0,
        overallSatisfactionRating: 0
      });
      setFeedback('');
      fetchEvaluationStatus();
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      toast.error('Không thể gửi đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Khảo sát Môn học</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Chọn môn học</h2>
        <select 
          className="select select-bordered w-full"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Chọn môn học...</option>
          {evaluationStatus?.courses?.map(course => (
            <option 
              key={course.classSectionId} 
              value={course.classSectionId}
              disabled={course.hasCompleted}
            >
              {course.courseCode} - {course.courseName} ({course.hasCompleted ? 'Đã đánh giá' : 'Chưa đánh giá'})
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Đánh giá môn học</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((question) => (
              <div key={question.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {question.questionTextLocalized}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-yellow-400 hover:text-yellow-500"
                      onClick={() => setRatings(prev => ({
                        ...prev,
                        [question.category.toLowerCase() + 'Rating']: star
                      }))}
                      disabled={isLoading}
                    >
                      {star <= ratings[question.category.toLowerCase() + 'Rating'] ? 
                        <RiStarFill size={24} /> : 
                        <RiStarLine size={24} />
                      }
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nhận xét và góp ý
              </label>
              <textarea
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Nhập nhận xét của bạn..."
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                <RiSendPlane2Line className="mr-2" />
                {isLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default StudentEvaluation;