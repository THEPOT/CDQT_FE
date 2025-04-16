import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import CourseForm from '@/components/course/CourseForm';
import { createCourseAPI, getCourseStaffAPI, getDepartmentsAPI, updateCourseAPI } from '../../apis/courseAPI';

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formMode, setFormMode] = useState('add');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, departmentsRes] = await Promise.all([
        getCourseStaffAPI(),
        getDepartmentsAPI()
      ]);
      setCourses(coursesRes.data);
      setDepartments(departmentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = () => {
    setSelectedCourse(null);
    setFormMode('add');
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa môn học này?')) {
      try {
        await deleteCourseAPI(courseId);
        fetchData();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (formMode === 'add') {
        await createCourseAPI(formData);
      } else {
        await updateCourseAPI(selectedCourse.id, formData);
      }
      fetchData();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-blue-100 text-blue-600 rounded-full p-3 text-3xl shadow-sm"><FiPlus /></span>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800">Quản lý Môn học</h1>
        </div>
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-2 rounded-full shadow-lg font-semibold flex items-center gap-2 transition-all duration-200"
          onClick={handleAdd}
        >
          <FiPlus className="text-lg" /> Thêm môn học
        </button>
      </div>

      <div className="mb-6 flex justify-end">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Tìm kiếm môn học..."
            className="pl-12 pr-4 py-2 w-full border-2 border-gray-200 rounded-full focus:border-blue-400 focus:outline-none shadow-sm transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-4 top-2.5 text-gray-400 text-xl"><FiSearch /></span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full bg-white rounded-2xl">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-100">
            <tr>
              <th>Mã môn</th>
              <th>Tên môn học</th>
              <th>Số tín chỉ</th>
              <th>Khoa</th>
              <th>Môn tiên quyết</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map(course => (
              <tr
                key={course.id}
                className="border-b last:border-none hover:bg-blue-50 transition-colors group"
              >
                <td className="py-2 px-4 font-mono text-blue-700">{course.courseCode}</td>
                <td className="py-2 px-4">{course.courseName}</td>
                <td className="py-2 px-4 text-center">{course.credits}</td>
                <td className="py-2 px-4">{course.departmentName}</td>
                <td className="py-2 px-4 text-gray-500">
                  {course.prerequisites?.map(p => p.courseCode).join(', ')}
                </td>
                <td className="py-2 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-full p-2 bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-150 shadow-sm"
                      title="Sửa"
                      onClick={() => handleEdit(course)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="rounded-full p-2 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-150 shadow-sm"
                      title="Xóa"
                      onClick={() => handleDelete(course.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <CourseForm
          course={selectedCourse}
          departments={departments}
          allCourses={courses}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
          mode={formMode}
        />
      )}
    </div>
  );
}

export default CourseManagement;

