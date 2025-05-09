import React, { useState, useEffect } from 'react';
import { FiDownload, FiUpload, FiFilter, FiSearch } from 'react-icons/fi';
import { getStudentTranscriptsAPI, submitGradeAPI, getStudentsByGpaAPI, getFailedCoursesAPI } from '../../apis/transcriptAPI';
import { toast } from 'react-toastify';

function TranscriptManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    semester: '',
    program: '',
    course: ''
  });
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await getStudentTranscriptsAPI();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Không thể tải danh sách sinh viên');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitGrade = async (data) => {
    try {
      await submitGradeAPI(data);
      toast.success('Cập nhật điểm thành công');
      fetchStudents();
    } catch (error) {
      console.error('Error submitting grade:', error);
      toast.error('Không thể cập nhật điểm');
    }
  };

  const handleFilterByGPA = async () => {
    try {
      const response = await getStudentsByGpaAPI(2.0, 4.0);
      setStudents(response.data);
    } catch (error) {
      console.error('Error filtering by GPA:', error);
      toast.error('Không thể lọc sinh viên theo GPA');
    }
  };

  const handleGetFailedCourses = async (studentId) => {
    try {
      const response = await getFailedCoursesAPI(studentId);
      // Handle displaying failed courses
      console.log(response.data);
    } catch (error) {
      console.error('Error getting failed courses:', error);
      toast.error('Không thể lấy danh sách môn không đạt');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Kết quả Học tập</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <FiUpload className="mr-2" />
            Nhập điểm
          </button>
          <button className="btn btn-primary">
            <FiDownload className="mr-2" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sinh viên..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-outline" onClick={handleFilterByGPA}>
            <FiFilter className="mr-2" />
            Lọc theo GPA
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="select select-bordered w-full"
            value={filters.semester}
            onChange={(e) => setFilters({...filters, semester: e.target.value})}
          >
            <option value="">Tất cả học kỳ</option>
            <option value="20241">HK1 2024-2025</option>
            <option value="20232">HK2 2023-2024</option>
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
            value={filters.course}
            onChange={(e) => setFilters({...filters, course: e.target.value})}
          >
            <option value="">Tất cả môn học</option>
            <option value="CS101">CS101 - Nhập môn lập trình</option>
            <option value="CS102">CS102 - Cấu trúc dữ liệu</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MSSV
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ và tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Môn học
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm QT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm GK
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Điểm CK
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng kết
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.mssv}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.courseName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    className="input input-bordered input-sm w-20"
                    value={student.qualityPoints || ''}
                    onChange={(e) => handleSubmitGrade({
                      courseRegistrationId: student.courseRegistrationId,
                      qualityPoints: parseFloat(e.target.value)
                    })}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    className="input input-bordered input-sm w-20"
                    value={student.midtermGrade || ''}
                    onChange={(e) => handleSubmitGrade({
                      courseRegistrationId: student.courseRegistrationId,
                      midtermGrade: parseFloat(e.target.value)
                    })}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    className="input input-bordered input-sm w-20"
                    value={student.finalGrade || ''}
                    onChange={(e) => handleSubmitGrade({
                      courseRegistrationId: student.courseRegistrationId,
                      finalGrade: parseFloat(e.target.value)
                    })}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.gradeValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleGetFailedCourses(student.id)}
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TranscriptManagement;