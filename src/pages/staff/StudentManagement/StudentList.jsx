import React, { useState, useEffect } from 'react';
import { FiDownload, FiFilter } from 'react-icons/fi';
import { getStudentAPI } from '../../../apis/studentAPI';
import { toast } from 'react-toastify';
import { exportStudentList } from '../../../utils/exportUtils';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    batch: '',
    program: '',
    scholarshipType: '',
    scholarshipAmount: ''
  });

  useEffect(() => {
    fetchStudents();
  }, [page, size, search]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await getStudentAPI(page, size, search);
      setStudents(response.data.items);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Không thể tải danh sách sinh viên');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    try {
      exportStudentList(filters, students);
      toast.success('Xuất danh sách thành công');
    } catch (error) {
      console.error('Error exporting student list:', error);
      toast.error('Không thể xuất danh sách');
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesBatch = !filters.batch || student.batch === filters.batch;
    const matchesProgram = !filters.program || student.program === filters.program;
    const matchesScholarshipType = !filters.scholarshipType || student.scholarshipType === filters.scholarshipType;
    const matchesScholarshipAmount = !filters.scholarshipAmount || student.scholarshipAmount === filters.scholarshipAmount;
    
    return matchesBatch && matchesProgram && matchesScholarshipType && matchesScholarshipAmount;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Sinh viên</h1>
        <button className="btn btn-primary" onClick={handleExport}>
          <FiDownload className="mr-2" />
          Xuất danh sách
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiFilter />
          <h2 className="text-lg font-semibold">Bộ lọc</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="select select-bordered w-full"
            value={filters.batch}
            onChange={(e) => setFilters({...filters, batch: e.target.value})}
          >
            <option value="">Tất cả khóa</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.program}
            onChange={(e) => setFilters({...filters, program: e.target.value})}
          >
            <option value="">Tất cả ngành</option>
            <option value="CS">Khoa học máy tính</option>
            <option value="SE">Kỹ thuật phần mềm</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.scholarshipType}
            onChange={(e) => setFilters({...filters, scholarshipType: e.target.value})}
          >
            <option value="">Tất cả loại học bổng</option>
            <option value="merit">Học bổng thành tích</option>
            <option value="need">Học bổng khó khăn</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={filters.scholarshipAmount}
            onChange={(e) => setFilters({...filters, scholarshipAmount: e.target.value})}
          >
            <option value="">Tất cả mức học bổng</option>
            <option value="50">50% học phí</option>
            <option value="100">100% học phí</option>
          </select>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Tìm kiếm sinh viên..."
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th>Khóa</th>
                <th>Ngành</th>
                <th>Học bổng</th>
                <th>Học phí</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.mssv}</td>
                  <td>{student.fullName}</td>
                  <td>{student.batch}</td>
                  <td>{student.majorName}</td>
                  <td>
                    {student.scholarship && (
                      <div className="text-sm">
                        <p>{student.scholarship.type}</p>
                        <p className="text-gray-500">{student.scholarship.amount}</p>
                      </div>
                    )}
                  </td>
                  <td>
                    {student.tuition && (
                      <div className="text-sm">
                        <p>{student.tuition.amount.toLocaleString('vi-VN')} VNĐ</p>
                        <span className={`badge ${
                          student.tuition.status === 'paid' ? 'badge-success' : 'badge-error'
                        }`}>
                          {student.tuition.status === 'paid' ? 'Đã nộp' : 'Chưa nộp'}
                        </span>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="btn btn-ghost btn-xs"
                        onClick={() => handleEdit(student.id)}
                      >
                        Sửa
                      </button>
                      <button 
                        className="btn btn-ghost btn-xs text-red-500"
                        onClick={() => handleDelete(student.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t">
          <div className="text-sm text-gray-500">
            Hiển thị {filteredStudents.length} sinh viên
          </div>
          <div className="flex gap-2">
            <button 
              className="btn btn-sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Trước
            </button>
            <button 
              className="btn btn-sm"
              onClick={() => setPage(page + 1)}
              disabled={filteredStudents.length < size}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;