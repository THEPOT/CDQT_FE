import React, { useState, useEffect } from 'react';
import { FiSearch, FiDownload, FiFileText, FiBook } from 'react-icons/fi';
import {  getCourseProfessorAPI } from '../../apis/courseAPI';


function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, [selectedSemester]);

  const loadCourses = async () => {
    try {
      setIsLoading(true);
      const response = await getCourseProfessorAPI();
      setCourses(response.data.items);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = async (courseId) => {
    try {
      await downloadSyllabusTemplate(courseId);
    } catch (error) {
      console.error('Failed to download template:', error);
    }
  };

  const filteredCourses = courses.filter(course => 
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Môn học</h1>
      </div>

      {/* Search Bar */}
      <div className="form-control mb-6">
        <div className="input-group">
          <input
            type="text"
            placeholder="Tìm kiếm môn học..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-square">
            <FiSearch />
          </button>
        </div>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title">
                      <FiBook className="mr-2" />
                      {course.courseName}
                    </h2>
                    <p className="text-sm text-gray-600">{course.courseCode}</p>
                  </div>
                  <div className="badge badge-primary">{course.credits} tín chỉ</div>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => handleDownloadTemplate(course.id)}
                  >
                    <FiFileText className="mr-2" />
                    Tải đề cương
                  </button>
                  <button className="btn btn-primary btn-sm">
                    <FiDownload className="mr-2" />
                    Tài liệu
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Không tìm thấy môn học nào</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseManagement; 