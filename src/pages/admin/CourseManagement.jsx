import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import CourseForm from '@/components/course/CourseForm';
import { getCourseAPI, getDepartmentsAPI } from '../../apis/courseAPI';

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
        getCourseAPI(),
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Môn học</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          <FiPlus className="mr-2" /> Thêm môn học
        </button>
      </div>

      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            placeholder="Tìm kiếm môn học..."
            className="input input-bordered w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-square">
            <FiSearch />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
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
              <tr key={course.id}>
                <td>{course.courseCode}</td>
                <td>{course.courseName}</td>
                <td>{course.credits}</td>
                <td>{course.departmentName}</td>
                <td>
                  {course.prerequisites?.map(p => p.courseCode).join(', ')}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleEdit(course)}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="btn btn-sm btn-ghost text-error"
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

