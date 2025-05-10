import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiCheck, FiAlertTriangle, FiDownload, FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  createMidtermEvaluationPeriodAPI,
  getCurrentMidtermPeriodAPI,
  submitMidtermEvaluationAPI,
  getStudentMidtermEvaluationsAPI,
  getProfessorMidtermEvaluationsAPI,
  getMidtermSummaryAPI,
  exportMidtermEvaluationsAPI
} from '../../apis/evaluationAPI';

function MidtermEvaluation() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Render different views based on user role
  const renderView = () => {
    switch (user?.role) {
      case 'Admin':
        return <AdminEvaluationView />;
      case 'Professor':
        return <ProfessorEvaluationView />;
      case 'Staff':
        return <StaffEvaluationView />;
      case 'Student':
        return <StudentEvaluationView />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return <div className="container mx-auto p-4">{renderView()}</div>;
}

function StudentEvaluationView() {
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      setIsLoading(true);
      const response = await getStudentMidtermEvaluationsAPI();
      setEvaluations(response.data);
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      toast.error('Không thể tải kết quả đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kết quả đánh giá giữa kỳ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{evaluation.courseName}</h3>
                <p className="text-gray-600 text-sm">{evaluation.courseCode}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                evaluation.status === 'Good' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {evaluation.status}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Giảng viên:</p>
                <p className="text-gray-600">{evaluation.professorName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Nhận xét:</p>
                <p className="text-gray-600">{evaluation.comments}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Đề xuất:</p>
                <p className="text-gray-600">{evaluation.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
        {evaluations.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            Chưa có kết quả đánh giá
          </div>
        )}
      </div>
    </div>
  );
}

function ProfessorEvaluationView() {
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [evaluations, setEvaluations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (selectedClass) {
      fetchStudents();
    }
  }, [selectedClass]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await getProfessorMidtermEvaluationsAPI(selectedClass);
      setStudents(response.data.studentEvaluations || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Không thể tải danh sách sinh viên');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      for (const [studentId, evaluation] of Object.entries(evaluations)) {
        await submitMidtermEvaluationAPI({
          studentId,
          classSectionId: selectedClass,
          ...evaluation
        });
      }
      toast.success('Lưu đánh giá thành công');
      fetchStudents();
    } catch (error) {
      console.error('Error submitting evaluations:', error);
      toast.error('Không thể lưu đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Đánh giá Giữa kỳ</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Chọn lớp học</h2>
        <select 
          className="select select-bordered w-full max-w-xs"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Chọn lớp...</option>
          <option value="CS101-01">CS101-01 - Nhập môn lập trình</option>
        </select>
      </div>

      {selectedClass && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Danh sách sinh viên</h2>
            <button 
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <FiSave className="mr-2" />
              {isLoading ? 'Đang lưu...' : 'Lưu đánh giá'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>MSSV</th>
                  <th>Họ và tên</th>
                  <th>Tình trạng</th>
                  <th>Đề xuất</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.studentId}>
                    <td>{student.mssv}</td>
                    <td>{student.fullName}</td>
                    <td>
                      <select 
                        className="select select-bordered select-sm w-full"
                        value={evaluations[student.studentId]?.status || ''}
                        onChange={(e) => {
                          setEvaluations({
                            ...evaluations,
                            [student.studentId]: {
                              ...evaluations[student.studentId],
                              status: e.target.value
                            }
                          });
                        }}
                        disabled={isLoading}
                      >
                        <option value="">Chọn tình trạng</option>
                        <option value="Good">Tốt</option>
                        <option value="At Risk">Cần chú ý</option>
                        <option value="Failing">Nguy cơ</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered input-sm w-full"
                        value={evaluations[student.studentId]?.recommendation || ''}
                        onChange={(e) => {
                          setEvaluations({
                            ...evaluations,
                            [student.studentId]: {
                              ...evaluations[student.studentId],
                              recommendation: e.target.value
                            }
                          });
                        }}
                        disabled={isLoading}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered input-sm w-full"
                        value={evaluations[student.studentId]?.comments || ''}
                        onChange={(e) => {
                          setEvaluations({
                            ...evaluations,
                            [student.studentId]: {
                              ...evaluations[student.studentId],
                              comments: e.target.value
                            }
                          });
                        }}
                        disabled={isLoading}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StaffEvaluationView() {
  const [summary, setSummary] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedSemester) {
      fetchSummary();
    }
  }, [selectedSemester]);

  const fetchSummary = async () => {
    try {
      setIsLoading(true);
      const response = await getMidtermSummaryAPI(selectedSemester);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
      toast.error('Không thể tải thống kê đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportMidtermEvaluationsAPI(selectedSemester);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `midterm-evaluations-${selectedSemester}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting evaluations:', error);
      toast.error('Không thể xuất báo cáo');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tổng hợp Đánh giá Giữa kỳ</h1>
        <button 
          className="btn btn-primary"
          onClick={handleExport}
          disabled={!selectedSemester || isLoading}
        >
          <FiDownload className="mr-2" />
          Xuất báo cáo
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Chọn học kỳ</h2>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          disabled={isLoading}
        >
          <option value="">Chọn học kỳ...</option>
          <option value="20241">HK1 2024-2025</option>
          <option value="20232">HK2 2023-2024</option>
        </select>
      </div>

      {summary && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Tổng số lớp</h3>
              <p className="text-3xl font-bold text-blue-600">{summary.length}</p>
              <p className="text-sm text-gray-500">Đã đánh giá: {summary.filter(c => c.evaluatedStudents > 0).length}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Sinh viên cần chú ý</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {summary.reduce((acc, course) => acc + (course.statusBreakdown['At Risk'] || 0), 0)}
              </p>
              <p className="text-sm text-gray-500">Cần theo dõi</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Sinh viên nguy cơ</h3>
              <p className="text-3xl font-bold text-red-600">
                {summary.reduce((acc, course) => acc + (course.statusBreakdown['Failing'] || 0), 0)}
              </p>
              <p className="text-sm text-gray-500">Cần can thiệp</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Trạng thái đánh giá theo lớp</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Mã lớp</th>
                    <th>Tên môn</th>
                    <th>Tổng SV</th>
                    <th>Đã đánh giá</th>
                    <th>Cần chú ý</th>
                    <th>Nguy cơ</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((course) => (
                    <tr key={course.courseId}>
                      <td>{course.courseCode}</td>
                      <td>{course.courseName}</td>
                      <td>{course.totalStudents}</td>
                      <td>{course.evaluatedStudents}</td>
                      <td>{course.statusBreakdown['At Risk'] || 0}</td>
                      <td>{course.statusBreakdown['Failing'] || 0}</td>
                      <td>
                        <button className="btn btn-ghost btn-xs">Xem chi tiết</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AdminEvaluationView() {
  const [period, setPeriod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCurrentPeriod();
  }, []);

  const fetchCurrentPeriod = async () => {
    try {
      setIsLoading(true);
      const response = await getCurrentMidtermPeriodAPI();
      setPeriod(response.data);
    } catch (error) {
      console.error('Error fetching current period:', error);
      toast.error('Không thể tải thông tin đợt đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePeriod = async (data) => {
    try {
      setIsLoading(true);
      await createMidtermEvaluationPeriodAPI(data);
      toast.success('Tạo đợt đánh giá thành công');
      fetchCurrentPeriod();
    } catch (error) {
      console.error('Error creating evaluation period:', error);
      toast.error('Không thể tạo đợt đánh giá');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý Đánh giá Giữa kỳ</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Thiết lập Đánh giá</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Thời gian bắt đầu</label>
            <input 
              type="datetime-local" 
              className="input input-bordered" 
              disabled={isLoading}
            />
          </div>
          
          <div className="form-control">
            <label className="label">Thời gian kết thúc</label>
            <input 
              type="datetime-local" 
              className="input input-bordered"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-control mt-4">
          <label className="label">Tiêu chí đánh giá</label>
          <textarea 
            className="textarea textarea-bordered h-24"
            placeholder="Nhập các tiêu chí đánh giá..."
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end mt-4">
          <button 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Đang lưu...' : 'Lưu thiết lập'}
          </button>
        </div>
      </div>

      {period && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Đợt đánh giá hiện tại</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Học kỳ</p>
              <p className="font-medium">{period.semesterName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Thời gian</p>
              <p className="font-medium">
                {new Date(period.startDate).toLocaleDateString('vi-VN')} - {new Date(period.endDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Trạng thái</p>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                period.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {period.isActive ? 'Đang mở' : 'Đã đóng'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MidtermEvaluation;