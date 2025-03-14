import React, { useState, useEffect } from 'react';
import { RiFilter2Line, RiSearch2Line, RiEdit2Line, RiDeleteBin6Line, RiAddLine, RiDownload2Line, RiExternalLinkLine } from 'react-icons/ri';

function StudentInformationManagement() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    batch: '',
    program: '',
    scholarship: '',
    tuitionStatus: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Normally would come from auth context
  const [isStaffPDT, setIsStaffPDT] = useState(false); // Normally would come from auth context

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockStudents = [
        {
          id: 1,
          studentId: '2023001',
          fullName: 'Nguyễn Văn A',
          program: 'Kỹ thuật phần mềm',
          batch: '2023',
          email: 'vana@example.com',
          phone: '0901234567',
          admissionDate: '01/09/2023',
          status: 'Đang học',
          tuitionStatus: 'Đã thanh toán',
          scholarship: 'Học bổng khuyến khích học tập',
          scholarshipAmount: '5,000,000 VND',
          gpa: 3.65
        },
        {
          id: 2,
          studentId: '2023002',
          fullName: 'Trần Thị B',
          program: 'Khoa học máy tính',
          batch: '2023',
          email: 'thib@example.com',
          phone: '0901234568',
          admissionDate: '01/09/2023',
          status: 'Đang học',
          tuitionStatus: 'Chưa thanh toán',
          scholarship: 'Không',
          scholarshipAmount: '0 VND',
          gpa: 3.25
        },
        {
          id: 3,
          studentId: '2022001',
          fullName: 'Lê Văn C',
          program: 'Hệ thống thông tin',
          batch: '2022',
          email: 'vanc@example.com',
          phone: '0901234569',
          admissionDate: '01/09/2022',
          status: 'Đang học',
          tuitionStatus: 'Đã thanh toán',
          scholarship: 'Học bổng toàn phần',
          scholarshipAmount: '15,000,000 VND',
          gpa: 3.85
        }
      ];
      
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setLoading(false);
    }, 1000);
  }, []);

  // Search students
  useEffect(() => {
    const filtered = students.filter(student => {
      const matchesSearch = searchTerm === '' ||
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = 
        (filters.batch === '' || student.batch === filters.batch) &&
        (filters.program === '' || student.program === filters.program) &&
        (filters.scholarship === '' || 
         (filters.scholarship === 'Có' && student.scholarship !== 'Không') ||
         (filters.scholarship === 'Không' && student.scholarship === 'Không')) &&
        (filters.tuitionStatus === '' || student.tuitionStatus === filters.tuitionStatus);
      
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
      batch: '',
      program: '',
      scholarship: '',
      tuitionStatus: ''
    });
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleExportToExcel = () => {
    alert('Xuất file Excel đang được xử lý...');
    // In a real app, this would generate and download an Excel file
  };

  const batchOptions = ['2023', '2022', '2021', '2020'];
  const programOptions = ['Kỹ thuật phần mềm', 'Khoa học máy tính', 'Hệ thống thông tin', 'An toàn thông tin'];
  
  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Thông tin Sinh viên</h1>
        <p className="text-gray-500 mt-1">Xem và quản lý thông tin chi tiết của sinh viên</p>
      </div>

      {/* Toolbar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-64 lg:w-96">
            <RiSearch2Line className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc MSSV..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RiFilter2Line className="mr-2" /> Bộ lọc
            </button>
            {isAdmin && (
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <RiAddLine className="mr-2" /> Thêm sinh viên
              </button>
            )}
            <button 
              onClick={handleExportToExcel}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RiDownload2Line className="mr-2" /> Xuất Excel
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Khóa</label>
                <select
                  name="batch"
                  value={filters.batch}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả</option>
                  {batchOptions.map(batch => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngành học</label>
                <select
                  name="program"
                  value={filters.program}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả</option>
                  {programOptions.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Học bổng</label>
                <select
                  name="scholarship"
                  value={filters.scholarship}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả</option>
                  <option value="Có">Có học bổng</option>
                  <option value="Không">Không có học bổng</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Học phí</label>
                <select
                  name="tuitionStatus"
                  value={filters.tuitionStatus}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả</option>
                  <option value="Đã thanh toán">Đã thanh toán</option>
                  <option value="Chưa thanh toán">Chưa thanh toán</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 mr-2"
              >
                Xóa bộ lọc
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Áp dụng
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Students table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  MSSV
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ và tên
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngành học
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khóa
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học phí
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học bổng
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GPA
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    Không tìm thấy sinh viên nào
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.program}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.batch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.tuitionStatus === 'Đã thanh toán'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {student.tuitionStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.scholarship === 'Không' ? 'Không' : (
                        <span className="text-blue-600">{student.scholarship}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.gpa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewStudent(student)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <RiExternalLinkLine className="inline-block w-5 h-5" />
                      </button>
                      {(isAdmin || isStaffPDT) && (
                        <>
                          <button
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <RiEdit2Line className="inline-block w-5 h-5" />
                          </button>
                          {isAdmin && (
                            <button
                              className="text-red-600 hover:text-red-900"
                            >
                              <RiDeleteBin6Line className="inline-block w-5 h-5" />
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Trước
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Sau
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">{filteredStudents.length}</span> trong số <span className="font-medium">{students.length}</span> sinh viên
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Trước</span>
                  <span aria-hidden="true">&laquo;</span>
                </button>
                <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sau</span>
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Thông tin sinh viên: {selectedStudent.fullName}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Đóng</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {['Thông tin cá nhân', 'Học bổng', 'Ngành học', 'Kết quả học tập', 'Học phí'].map((tab) => (
                    <button
                      key={tab}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        tab === 'Thông tin cá nhân'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Student Personal Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">MSSV</label>
                    <input
                      type="text"
                      value={selectedStudent.studentId}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                    <input
                      type="text"
                      value={selectedStudent.fullName}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={selectedStudent.email}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input
                      type="text"
                      value={selectedStudent.phone}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Ngày nhập học</label>
                    <input
                      type="text"
                      value={selectedStudent.admissionDate}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <input
                      type="text"
                      value={selectedStudent.status}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                    />
                  </div>
                </div>
                
                {(isAdmin || isStaffPDT) && (
                  <div className="pt-5 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleCloseModal}
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentInformationManagement;