import React, { useEffect, useState } from 'react';
import { RiDownloadLine } from 'react-icons/ri';
import { getCourseStaffAPI } from '../../apis/courseAPI';

function CourseInfo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filters, setFilters] = useState({
    department: '',
    credits: '',
    type: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourseStaffAPI();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-800">Thông tin Môn học</h1>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
          <RiDownloadLine /> Tải xuống
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white rounded-xl">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Mã môn</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Tên môn học</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Số tín chỉ</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Khoa</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-700">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-b last:border-none hover:bg-blue-50 transition-colors group"
              >
                <td className="py-2 px-4 font-mono text-blue-700">{course.courseCode}</td>
                <td className="py-2 px-4">{course.courseName}</td>
                <td className="py-2 px-4 text-center">{course.credits}</td>
                <td className="py-2 px-4">{course.departmentName}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    className="rounded-full px-4 py-1 bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-150 shadow-sm text-sm font-semibold"
                    onClick={() => setSelectedCourse(course)}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCourse && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-xl border border-blue-100 max-w-2xl mx-auto animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-700">Chi tiết môn học</h2>
            <button className="p-2 hover:bg-red-100 text-red-500 rounded-full" onClick={() => setSelectedCourse(null)}>
              Đóng
            </button>
          </div>
          <div className="space-y-2">
            <div><span className="font-semibold">Mã môn:</span> {selectedCourse.courseCode}</div>
            <div><span className="font-semibold">Tên môn học:</span> {selectedCourse.courseName}</div>
            <div><span className="font-semibold">Số tín chỉ:</span> {selectedCourse.credits}</div>
            <div><span className="font-semibold">Khoa:</span> {selectedCourse.departmentName}</div>
            <div><span className="font-semibold">Mô tả:</span> {selectedCourse.description}</div>
            <div><span className="font-semibold">Chuẩn đầu ra:</span> {selectedCourse.learningOutcomes}</div>
            <div>
              <span className="font-semibold">Môn tiên quyết:</span> {selectedCourse.prerequisites && selectedCourse.prerequisites.length > 0 ? (
                selectedCourse.prerequisites.map((p) => p.courseCode + ' - ' + p.courseName).join(', ')
              ) : (
                <span className="italic text-gray-400">Không có</span>
              )}
            </div>
            <div>
              <span className="font-semibold">Môn song hành:</span> {selectedCourse.corequisites && selectedCourse.corequisites.length > 0 ? (
                selectedCourse.corequisites.map((c) => c.courseCode + ' - ' + c.courseName).join(', ')
              ) : (
                <span className="italic text-gray-400">Không có</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseInfo;