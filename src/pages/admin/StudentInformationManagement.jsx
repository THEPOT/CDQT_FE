import React, { useState, useEffect } from 'react';
import { getStudentAPI } from '../../apis/studentAPI';

function StudentInformationManagement() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    total: 0,
    totalPages: 0
  });
  const [filters, setFilters] = useState({
    majorName: '',
    enrollmentDate: ''
  });

  useEffect(() => {
    fetchStudents();
  }, [pagination.page, pagination.size]);

  const fetchStudents = async () => {
    try {
      const response = await getStudentAPI(pagination.page, pagination.size);
      const { items, total, totalPages } = response.data;
      setStudents(items);
      setFilteredStudents(items);
      setPagination(prev => ({
        ...prev,
        total,
        totalPages
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    const filtered = students.filter(student => {
      const matchesSearch = 
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.mssv.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (!filters.majorName || student.majorName === filters.majorName) &&
        (!filters.enrollmentDate || student.enrollmentDate === filters.enrollmentDate);
      
      return matchesSearch && matchesFilters;
    });
    
    setFilteredStudents(filtered);
  }, [searchTerm, filters, students]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      majorName: '',
      enrollmentDate: ''
    });
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý thông tin sinh viên</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên..."
            className="px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MSSV</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngành</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày nhập học</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.mssv}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.majorName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(student.enrollmentDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleViewStudent(student)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Hiển thị {filteredStudents.length} trên tổng số {pagination.total} sinh viên
        </div>
        <div className="flex gap-2">
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                pagination.page === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentInformationManagement;
