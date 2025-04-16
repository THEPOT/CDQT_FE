import React, { useState, useEffect } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';

function CourseForm({ course, departments, allCourses, onSubmit, onClose, mode }) {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    credits: 0,
    description: '',
    learningOutcomes: '',
    departmentId: '',
    prerequisiteCourseIds: [],
    corequisiteCourseIds: []
  });

  useEffect(() => {
    if (course && mode === 'edit') {
      setFormData({
        courseName: course.courseName,
        credits: course.credits,
        description: course.description,
        learningOutcomes: course.learningOutcomes,
        departmentId: course.departmentId,
        prerequisiteCourseIds: course.prerequisites?.map(p => p.id) || [],
        corequisiteCourseIds: course.corequisites?.map(c => c.id) || []
      });
    }
  }, [course, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl border border-blue-100 max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 rounded-full p-3 text-2xl shadow"><FiPlus /></span>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
              {mode === 'add' ? 'Thêm môn học mới' : 'Chỉnh sửa môn học'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-100 text-red-500 rounded-full transition-all duration-150" title="Đóng">
            <FiX size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {mode === 'add' && (
            <div>
              <label className="block text-base font-semibold mb-2 text-gray-700">Mã môn học</label>
              <input
                type="text"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none shadow-sm text-base transition-all duration-150"
                value={formData.courseCode}
                onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                required
                placeholder="Nhập mã môn học"
              />
            </div>
          )}

          <div>
            <label className="block text-base font-semibold mb-2 text-gray-700">Tên môn học</label>
            <input
              type="text"
              className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none shadow-sm text-base transition-all duration-150"
              value={formData.courseName}
              onChange={(e) => setFormData({...formData, courseName: e.target.value})}
              required
              placeholder="Nhập tên môn học"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold mb-2 text-gray-700">Số tín chỉ</label>
              <input
                type="number"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-2 focus:border-blue-400 focus:outline-none shadow-sm text-base transition-all duration-150"
                value={formData.credits}
                onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                required
                min="0"
                placeholder="Nhập số tín chỉ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Khoa</label>
              <select
                className="select select-bordered w-full"
                value={formData.departmentId}
                onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                required
              >
                <option value="">Chọn khoa</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả môn học</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Chuẩn đầu ra</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="3"
              value={formData.learningOutcomes}
              onChange={(e) => setFormData({...formData, learningOutcomes: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Môn học tiên quyết</label>
            <select
              className="select select-bordered w-full"
              multiple
              value={formData.prerequisiteCourseIds}
              onChange={(e) => setFormData({
                ...formData,
                prerequisiteCourseIds: Array.from(e.target.selectedOptions, option => option.value)
              })}
            >
              {allCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Môn học song hành</label>
            <select
              className="select select-bordered w-full"
              multiple
              value={formData.corequisiteCourseIds}
              onChange={(e) => setFormData({
                ...formData,
                corequisiteCourseIds: Array.from(e.target.selectedOptions, option => option.value)
              })}
            >
              {allCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.courseCode} - {course.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === 'add' ? 'Thêm môn học' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;