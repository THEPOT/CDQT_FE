import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  getMajorsAPI,
  createMajorAPI,
  updateMajorAPI,
  deleteMajorAPI
} from '../../apis/majorAPI';

function MajorManagement() {
  const [majors, setMajors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    majorName: '',
    requiredCredits: 130
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchMajors();
  }, []);

  const fetchMajors = async () => {
    try {
      setIsLoading(true);
      const response = await getMajorsAPI();
      setMajors(response.data);
    } catch (error) {
      console.error('Error fetching majors:', error);
      toast.error('Không thể tải danh sách ngành học');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (editingId) {
        await updateMajorAPI(editingId, formData);
        toast.success('Cập nhật ngành học thành công');
      } else {
        await createMajorAPI(formData);
        toast.success('Thêm ngành học thành công');
      }
      setShowModal(false);
      resetForm();
      fetchMajors();
    } catch (error) {
      console.error('Error saving major:', error);
      toast.error('Không thể lưu ngành học');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (major) => {
    setEditingId(major.id);
    setFormData({
      majorName: major.majorName,
      requiredCredits: major.requiredCredits
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ngành học này?')) {
      try {
        await deleteMajorAPI(id);
        toast.success('Xóa ngành học thành công');
        fetchMajors();
      } catch (error) {
        console.error('Error deleting major:', error);
        toast.error('Không thể xóa ngành học');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      majorName: '',
      requiredCredits: 130
    });
    setEditingId(null);
  };

  const filteredMajors = majors.filter(major =>
    major.majorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Ngành học</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FiPlus className="mr-2" />
          Thêm ngành học
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm ngành học..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Majors Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Tên ngành</th>
              <th>Số tín chỉ yêu cầu</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </td>
              </tr>
            ) : filteredMajors.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  Không tìm thấy ngành học nào
                </td>
              </tr>
            ) : (
              filteredMajors.map((major) => (
                <tr key={major.id}>
                  <td>{major.majorName}</td>
                  <td>{major.requiredCredits}</td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleEdit(major)}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn btn-ghost btn-xs text-red-500"
                        onClick={() => handleDelete(major.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Chỉnh sửa ngành học' : 'Thêm ngành học mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">Tên ngành</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.majorName}
                  onChange={(e) => setFormData({...formData, majorName: e.target.value})}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Số tín chỉ yêu cầu</label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={formData.requiredCredits}
                  onChange={(e) => setFormData({...formData, requiredCredits: parseInt(e.target.value)})}
                  required
                  min="1"
                />
              </div>
              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang lưu...' : 'Lưu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MajorManagement;