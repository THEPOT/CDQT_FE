import React, { useState, useEffect } from 'react';
import { RiFilter2Line, RiSearchLine, RiCalendarLine, RiTimeLine, RiMapPin2Line, RiUser2Line } from 'react-icons/ri';
import { getCourseAPI } from '../../apis/courseAPI';

function CourseRegistration() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    department: '',
    credits: '',
    weekday: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourseAPI();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const handleRegisterCourse = (course) => {
    setSelectedCourses([...selectedCourses, course]);
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter(c => c.courseCode !== courseId));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm môn học..."
                  className="pl-10 w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={() => {/* Toggle filters */}}
              >
                <RiFilter2Line />
                Bộ lọc
              </button>
            </div>
          </div>

          {/* Available Courses */}
          <div className="bg-white rounded-xl shadow-sm divide-y">
            {courses.map((course) => (
              <div key={course.courseCode} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Mã môn: {course.courseCode} • Lớp: {course.className}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRegisterCourse(course)}
                    disabled={selectedCourses.some(c => c.courseCode === course.courseCode)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {selectedCourses.some(c => c.courseCode === course.courseCode)
                      ? 'Đã đăng ký'
                      : 'Đăng ký'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Courses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Môn học đã chọn
          </h2>
          <div className="space-y-4">
            {selectedCourses.map((course) => (
              <div
                key={course.courseCode}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{course.courseName}</h3>
                  <p className="text-sm text-gray-500">Mã môn: {course.courseCode}</p>
                </div>
                <button
                  onClick={() => handleRemoveCourse(course.courseCode)}
                  className="text-red-600 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
            ))}
            {selectedCourses.length === 0 && (
              <p className="text-center text-gray-500">
                Chưa có môn học nào được chọn
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;