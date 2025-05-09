import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  getScholarshipsAPI,
  createScholarshipAPI,
  updateScholarshipAPI,
  deleteScholarshipAPI,
  reviewScholarshipsAPI
} from '../../../apis/scholarshipAPI';

function ScholarshipManagement() {
  const [scholarships, setScholarships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    criteria: '',
    duration: '',
    status: 'active'
  });

  useEffect(() => {
    fetchScholarships();
  }, [page, size]);

  const fetchScholarships = async () => {
    try {
      setIsLoading(true);
      const response = await getScholarshipsAPI(page, size);
      setScholarships(response.data.items);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      toast.error('Không thể tải danh sách học bổng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (formData.id) {
        await updateScholarshipAPI(formData.id, formData);
        toast.success('Cập nhật học bổng thành công');
      } else {
        await createScholarshipAPI(formData);
        toast.success('Thêm học bổng thành công');
      }
      setShowForm(false);
      fetchScholarships();
    } catch (error) {
      console.error('Error saving scholarship:', error);
      toast.error('Không thể lưu học bổng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học bổng này?')) {
      try {
        await deleteScholarshipAPI(id);
        toast.success('Xóa học bổng thành công');
        fetchScholarships();
      } catch (error) {
        console.error('Error deleting scholarship:', error);
        toast.error('Không thể xóa học bổng');
      }
    }
  };

  const handleReview = async () => {
    if (!selectedTerm) {
      toast.warning('Vui lòng chọn học kỳ');
      return;
    }
    try {
      setIsLoading(true);
      await reviewScholarshipsAPI(selectedTerm);
      toast.success('Tái xét học bổng thành công');
      fetchScholarships();
    } catch (error) {
      console.error('Error reviewing scholarships:', error);
      toast.error('Không thể tái xét học bổng');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Học bổng</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <FiPlus className="mr-2" />
          Thêm học bổng
        </button>
      </div>

      {/* Scholarship List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Loại học bổng</th>
              <th>Mức học bổng</th>
              <th>Tiêu chí</th>
              <th>Thời hạn</th>
              <th>Số người nhận</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </td>
              </tr>
            ) : (
              scholarships.map((scholarship) => (
                <tr key={scholarship.id}>
                  <td>{scholarship.type}</td>
                  <td>{scholarship.amount}</td>
                  <td>{scholarship.criteria}</td>
                  <td>{scholarship.duration}</td>
                  <td>{scholarship.recipients}</td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-ghost btn-xs"
                        onClick={() => {
                          setFormData(scholarship);
                          setShowForm(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn btn-ghost btn-xs text-red-500"
                        onClick={() => handleDelete(scholarship.id)}
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

      {/* Scholarship Review */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Tái xét học bổng</h2>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">Học kỳ</label>
            <select 
              className="select select-bordered w-full max-w-xs"
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
            >
              <option value="">Chọn học kỳ...</option>
              <option value="20241">HK1 2024-2025</option>
              <option value="20232">HK2 2023-2024</option>
            </select>
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleReview}
            disabled={isLoading}
          >
            Bắt đầu tái xét
          </button>
        </div>
      </div>

      {/* Scholarship Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {formData.id ? 'Chỉnh sửa học bổng' : 'Thêm học bổng mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">Loại học bổng</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Mức học bổng</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Tiêu chí</label>
                <textarea
                  className="textarea textarea-bordered"
                  value={formData.criteria}
                  onChange={(e) => setFormData({...formData, criteria: e.target.value})}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Thời hạn</label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  required
                />
              </div>
              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn btn-ghost"
                  onClick={() => setShowForm(false)}
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

export default ScholarshipManagement;