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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === 'add' ? 'Thêm môn học mới' : 'Chỉnh sửa môn học'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'add' && (
            <div>
              <label className="block text-sm font-medium mb-1">Mã môn học</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.courseCode}
                onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Tên môn học</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.courseName}
              onChange={(e) => setFormData({...formData, courseName: e.target.value})}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Số tín chỉ</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.credits}
                onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                required
                min="0"
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
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
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