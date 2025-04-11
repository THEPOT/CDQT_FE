import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

function CourseFormModal({ course, onClose, mode }) {
  const [formData, setFormData] = useState(
    course || {
      code: '',
      name: '',
      credits: 0,
      prerequisites: []
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {mode === 'add' ? 'Thêm môn học mới' : 'Chỉnh sửa môn học'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Mã môn</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tên môn học</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Số tín chỉ</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CourseManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa môn học này?')) {
      // Handle delete logic here
      console.log('Deleting course:', courseId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Môn học</h1>
        <button 
          className="btn btn-primary mt-2 md:mt-0"
          onClick={() => setShowAddModal(true)}
        >
          <FiPlus className="mr-2" />
          Thêm môn học mới
        </button>
      </div>

      <CourseSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CourseTable 
        searchQuery={searchQuery}
        onEdit={(course) => setSelectedCourse(course)}
        onDelete={(courseId) => handleDeleteCourse(courseId)}
      />

      {showAddModal && (
        <CourseFormModal
          onClose={() => setShowAddModal(false)}
          mode="add"
        />
      )}

      {selectedCourse && (
        <CourseFormModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          mode="edit"
        />
      )}
    </div>
  );
}

function CourseSearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="form-control mb-4">
      <div className="input-group">
        <input
          type="text"
          placeholder="Tìm kiếm theo mã môn hoặc tên môn..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-square">
          <FiSearch />
        </button>
      </div>
    </div>
  );
}

function CourseTable({ searchQuery, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Mã môn</th>
            <th>Tên môn học</th>
            <th>Số tín chỉ</th>
            <th>Điều kiện tiên quyết</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CS101</td>
            <td>Nhập môn lập trình</td>
            <td>3</td>
            <td>Không</td>
            <td>
              <div className="flex gap-2">
                <button 
                  className="btn btn-sm btn-ghost"
                  onClick={() => onEdit({
                    code: 'CS101',
                    name: 'Nhập môn lập trình',
                    credits: 3,
                    prerequisites: []
                  })}
                >
                  <FiEdit2 />
                </button>
                <button 
                  className="btn btn-sm btn-ghost text-error"
                  onClick={() => onDelete('CS101')}
                >
                  <FiTrash2 />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CourseManagement;
