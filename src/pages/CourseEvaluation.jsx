import React, { useState } from 'react';
import { RiStarFill, RiStarLine, RiSendPlane2Line } from 'react-icons/ri';

function CourseEvaluation() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [ratings, setRatings] = useState({
    content: 0,
    teaching: 0,
    materials: 0,
    facilities: 0
  });
  const [feedback, setFeedback] = useState('');

  const courses = [
    {
      id: 'CS101-01',
      code: 'CS101',
      name: 'Nhập môn lập trình',
      instructor: 'Nguyễn Văn A',
      status: 'not_evaluated'
    },
    {
      id: 'CS102-01',
      code: 'CS102',
      name: 'Cấu trúc dữ liệu',
      instructor: 'Trần Thị B',
      status: 'evaluated'
    }
  ];

  const handleRatingChange = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Đánh giá Môn học</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Evaluation Form */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Phiếu đánh giá
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Chọn môn học
                  </label>
                  <select
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Chọn môn học...</option>
                    {courses
                      .filter((course) => course.status === 'not_evaluated')
                      .map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.code} - {course.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Đánh giá chi tiết
                  </h3>

                  {[
                    { key: 'content', label: 'Nội dung môn học' },
                    { key: 'teaching', label: 'Phương pháp giảng dạy' },
                    { key: 'materials', label: 'Tài liệu học tập' },
                    { key: 'facilities', label: 'Cơ sở vật chất' }
                  ].map((item) => (
                    <div key={item.key}>
                      <label className="block text-sm text-gray-700">
                        {item.label}
                      </label>
                      <div className="mt-1 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="text-yellow-400 hover:text-yellow-500"
                            onClick={() => handleRatingChange(item.key, star)}
                          >
                            {star <= ratings[item.key] ? (
                              <RiStarFill className="w-6 h-6" />
                            ) : (
                              <RiStarLine className="w-6 h-6" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nhận xét và góp ý
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Nhập nhận xét của bạn..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <RiSendPlane2Line />
                    <span>Gửi đánh giá</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Evaluation History */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Lịch sử đánh giá
            </h2>

            <div className="space-y-4">
              {courses
                .filter((course) => course.status === 'evaluated')
                .map((course) => (
                  <div
                    key={course.id}
                    className="p-4 border rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900">
                      {course.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {course.code} • {course.instructor}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <RiStarFill
                          key={star}
                          className="w-4 h-4 text-yellow-400"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        Đã đánh giá
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseEvaluation;