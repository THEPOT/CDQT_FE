import React from 'react';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

function StudentMidtermView() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Kết quả Đánh giá Giữa kỳ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample evaluation cards */}
        <EvaluationCard
          course={{
            code: 'CS101',
            name: 'Nhập môn lập trình',
            professor: 'Nguyễn Văn A',
            status: 'good',
            feedback: 'Hoàn thành tốt các bài tập và tham gia đầy đủ',
            recommendation: 'Tiếp tục phát huy'
          }}
        />
      </div>
    </div>
  );
}

function EvaluationCard({ course }) {
  const statusConfig = {
    good: {
      icon: <FiCheckCircle className="text-success text-xl" />,
      class: 'border-success',
      text: 'Tốt'
    },
    warning: {
      icon: <FiAlertCircle className="text-warning text-xl" />,
      class: 'border-warning',
      text: 'Cần chú ý'
    },
    risk: {
      icon: <FiAlertCircle className="text-error text-xl" />,
      class: 'border-error',
      text: 'Nguy cơ'
    }
  };

  const config = statusConfig[course.status];

  return (
    <div className={`card bg-base-100 shadow-lg border-l-4 ${config.class}`}>
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title">{course.name}</h2>
            <p className="text-sm text-gray-600">{course.code}</p>
          </div>
          {config.icon}
        </div>

        <div className="divider my-2"></div>

        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Giảng viên:</span> {course.professor}
          </p>
          <p className="text-sm">
            <span className="font-medium">Đánh giá:</span> {course.feedback}
          </p>
          <p className="text-sm">
            <span className="font-medium">Đề xuất:</span> {course.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentMidtermView; 