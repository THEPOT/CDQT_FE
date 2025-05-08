import React, { useState, useEffect } from 'react';
import { FiStar, FiSend } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { getEvaluationStatus, submitEvaluation } from '../../apis/evaluationAPI';

function StudentEvaluation() {
  const [evaluationStatus, setEvaluationStatus] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [ratings, setRatings] = useState({
    teachingQualityRating: 0,
    courseContentRating: 0,
    assessmentFairnessRating: 0,
    overallSatisfactionRating: 0,
    feedback: ''
  });

  useEffect(() => {
    loadEvaluationStatus();
  }, []);

  const loadEvaluationStatus = async () => {
    try {
      const response = await getEvaluationStatus();
      setEvaluationStatus(response.data);
    } catch (error) {
      console.error('Failed to load evaluation status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitEvaluation({
        classSectionId: selectedCourse.classSectionId,
        ...ratings
      });
      // Show success message and refresh status
      loadEvaluationStatus();
    } catch (error) {
      console.error('Failed to submit evaluation:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Khảo sát Môn học</h1>

      {evaluationStatus?.courses.map(course => (
        <div key={course.classSectionId} className="card bg-base-100 shadow mb-4">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="card-title">{course.courseName}</h2>
                <p className="text-sm text-gray-600">
                  {course.courseCode} - {course.professorName}
                </p>
              </div>
              {course.hasCompleted ? (
                <div className="badge badge-success">Đã hoàn thành</div>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedCourse(course)}
                >
                  Đánh giá
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {selectedCourse && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Đánh giá môn {selectedCourse.courseName}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <RatingField
                label="Chất lượng giảng dạy"
                value={ratings.teachingQualityRating}
                onChange={(value) => setRatings({...ratings, teachingQualityRating: value})}
              />
              <RatingField
                label="Nội dung môn học"
                value={ratings.courseContentRating}
                onChange={(value) => setRatings({...ratings, courseContentRating: value})}
              />
              <RatingField
                label="Tính công bằng trong đánh giá"
                value={ratings.assessmentFairnessRating}
                onChange={(value) => setRatings({...ratings, assessmentFairnessRating: value})}
              />
              <RatingField
                label="Mức độ hài lòng tổng thể"
                value={ratings.overallSatisfactionRating}
                onChange={(value) => setRatings({...ratings, overallSatisfactionRating: value})}
              />

              <div className="form-control">
                <label className="label">Phản hồi</label>
                <textarea 
                  className="textarea textarea-bordered h-24"
                  value={ratings.feedback}
                  onChange={(e) => setRatings({...ratings, feedback: e.target.value})}
                  placeholder="Nhập phản hồi của bạn..."
                />
              </div>

              <div className="modal-action">
                <button type="button" className="btn" onClick={() => setSelectedCourse(null)}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  <FiSend className="mr-2" />
                  Gửi đánh giá
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function RatingField({ label, value, onChange }) {
  return (
    <div className="form-control">
      <label className="label">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            className={`btn btn-circle ${value === rating ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onChange(rating)}
          >
            <FiStar className={value >= rating ? 'fill-current' : ''} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default StudentEvaluation; 