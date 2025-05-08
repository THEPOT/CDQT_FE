import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiMail } from 'react-icons/fi';
import { getProfesserAPI } from '../../apis/professerAPI';

function ProfessorManagement() {
  const [professors, setProfessors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    title: '',
    specialization: '',
    status: 'active'
  });

  useEffect(() => {
    loadProfessors();
  }, []);

  const loadProfessors = async () => {
    try {
      setIsLoading(true);
      const response = await getProfesserAPI();
      setProfessors(response.data.items);
    } catch (error) {
      console.error('Failed to load professors:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const resetForm = () => {
    setSelectedProfessor(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      title: '',
      specialization: '',
      status: 'active'
    });
  };

  const filteredProfessors = professors.filter(professor =>
    professor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    professor.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Giảng viên</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
        >
          <FiPlus className="mr-2" />
          Thêm giảng viên
        </button>
      </div>

      {/* Search Bar */}
      <div className="form-control mb-6">
        <div className="input-group">
          <input
            type="text"
            placeholder="Tìm kiếm giảng viên..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-square">
            <FiSearch />
          </button>
        </div>
      </div>

      {/* Professors Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Điện thoại</th>
              <th>Khoa</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  <span className="loading loading-spinner loading-md"></span>
                </td>
              </tr>
            ) : filteredProfessors.length > 0 ? (
              filteredProfessors.map((professor) => (
                <tr key={professor.id}>
                  <td>{professor.fullName}</td>
                  <td>{professor.email}</td>
                  <td>{professor.phoneNumber}</td>
                  <td>{professor.departmentName}</td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleEdit(professor)}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleDelete(professor.id)}
                      >
                        <FiTrash2 />
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        <FiMail />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Không tìm thấy giảng viên nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {selectedProfessor ? 'Chỉnh sửa thông tin giảng viên' : 'Thêm giảng viên mới'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">Họ và tên</label>
                <input 
                  type="text"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">Email</label>
                <input 
                  type="email"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">Điện thoại</label>
                <input 
                  type="tel"
                  className="input input-bordered"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">Khoa</label>
                <select 
                  className="select select-bordered"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                >
                  <option value="">Chọn khoa...</option>
                  <option value="CNTT">Công nghệ thông tin</option>
                  <option value="KT">Kinh tế</option>
                  <option value="NN">Ngoại ngữ</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">Chức danh</label>
                <select 
                  className="select select-bordered"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                >
                  <option value="">Chọn chức danh...</option>
                  <option value="GS">Giáo sư</option>
                  <option value="PGS">Phó Giáo sư</option>
                  <option value="TS">Tiến sĩ</option>
                  <option value="ThS">Thạc sĩ</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">Chuyên ngành</label>
                <input 
                  type="text"
                  className="input input-bordered"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">Trạng thái</label>
                <select 
                  className="select select-bordered"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  required
                >
                  <option value="active">Đang giảng dạy</option>
                  <option value="inactive">Nghỉ phép</option>
                </select>
              </div>

              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  {selectedProfessor ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfessorManagement;
