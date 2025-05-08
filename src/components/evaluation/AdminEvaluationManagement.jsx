import React, { useState, useEffect } from 'react';
import { FiSettings, FiCalendar, FiSend, FiDownload, FiEye } from 'react-icons/fi';
import { 
  getCurrentEvaluationPeriod, 
  updateEvaluationPeriod, 
  sendEvaluationResults, 
  exportEvaluationResults, 
  getEvaluationPeriods
} from '../../apis/evaluationAPI';
import { getSemestersAPI } from '../../apis/termAPI';

function AdminEvaluationManagement() {
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [periodData, setPeriodData] = useState({
    semesterId: '',
    startDate: '',
    endDate: '',
    isActive: false
  });
  const [allPeriods, setAllPeriods] = useState([]);
  const [loadingPeriods, setLoadingPeriods] = useState(false);
  const [selectedSemesterId, setSelectedSemesterId] = useState('');

  useEffect(() => {
    loadCurrentPeriod();
    loadSemesters();
  }, []);

  useEffect(() => {
    if (selectedSemesterId) {
      loadAllPeriods(selectedSemesterId);
    }
  }, [selectedSemesterId]);

  const loadSemesters = async () => {
    try {
      setIsLoading(true);
      const response = await getSemestersAPI();
      const items = Array.isArray(response.data.items) ? response.data.items : [];
      setSemesters(items);
      if (items.length > 0) {
        setSelectedSemesterId(items[0].id);
      }
    } catch (error) {
      console.error('Failed to load semesters:', error);
      setSemesters([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCurrentPeriod = async () => {
    try {
      const response = await getCurrentEvaluationPeriod();
      setCurrentPeriod(response.data);
      setPeriodData({
        semesterId: response.data.semesterId,
        startDate: response.data.startDate,
        endDate: response.data.endDate,
        isActive: response.data.isActive
      });
    } catch (error) {
      console.error('Failed to load evaluation period:', error);
    }
  };

  const handleUpdatePeriod = async (e) => {
    e.preventDefault();
    try {
      await updateEvaluationPeriod(periodData);
      setIsEditing(false);
      loadCurrentPeriod();
    } catch (error) {
      console.error('Failed to update evaluation period:', error);
    }
  };

  const handleSendResults = async () => {
    try {
      await sendEvaluationResults(currentPeriod.semesterId);
      // Show success message
    } catch (error) {
      console.error('Failed to send results:', error);
    }
  };

  const handleExportResults = async (type) => {
    try {
      await exportEvaluationResults(currentPeriod.semesterId, type);
    } catch (error) {
      console.error('Failed to export results:', error);
    }
  };

  const loadAllPeriods = async (semesterId) => {
    if (!semesterId) return;
    try {
      setLoadingPeriods(true);
      const response = await getEvaluationPeriods(semesterId, 1, 20);
      setAllPeriods(Array.isArray(response.data.items) ? response.data.items : []);
    } catch (error) {
      setAllPeriods([]);
      console.error('Failed to load all evaluation periods:', error);
    } finally {
      setLoadingPeriods(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter semester */}
      <div className="mb-4 flex items-center gap-2">
        <span className="font-medium">Chọn học kỳ:</span>
        <select
          className="select select-bordered"
          value={selectedSemesterId}
          onChange={e => setSelectedSemesterId(e.target.value)}
        >
          {semesters.map(semester => (
            <option key={semester.id} value={semester.id}>
              {semester.name} - {semester.academicYear}
            </option>
          ))}
        </select>
      </div>

      {/* Danh sách các kỳ đánh giá */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <h2 className="card-title mb-2">Danh sách các kỳ đánh giá</h2>
          {loadingPeriods ? (
            <div>Đang tải...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Kỳ</th>
                    <th>Bắt đầu</th>
                    <th>Kết thúc</th>
                    <th>Trạng thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allPeriods.map(period => (
                    <tr key={period.id}>
                      <td>{period.semesterName || period.semesterId}</td>
                      <td>{new Date(period.startDate).toLocaleString()}</td>
                      <td>{new Date(period.endDate).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${period.isActive ? 'badge-success' : 'badge-error'}`}>
                          {period.isActive ? 'Đang hoạt động' : 'Đã đóng'}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => setCurrentPeriod(period)}
                          title="Xem chi tiết"
                        >
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Hệ thống Đánh giá</h1>
        <div className="flex gap-2">
          <button 
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            <FiSettings className="mr-2" />
            Cài đặt
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleSendResults}
          >
            <FiSend className="mr-2" />
            Gửi kết quả
          </button>
        </div>
      </div>

      {/* Current Period Status */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <h2 className="card-title">
            <FiCalendar className="mr-2" />
            Kỳ đánh giá hiện tại
          </h2>
          
          {currentPeriod && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Học kỳ</p>
                <p className="font-medium">{currentPeriod.semesterName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Trạng thái</p>
                <div className={`badge ${currentPeriod.isCurrentlyOpen ? 'badge-success' : 'badge-error'}`}>
                  {currentPeriod.isCurrentlyOpen ? 'Đang mở' : 'Đã đóng'}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Thời gian bắt đầu</p>
                <p className="font-medium">
                  {new Date(currentPeriod.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Thời gian kết thúc</p>
                <p className="font-medium">
                  {new Date(currentPeriod.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Options */}
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <h2 className="card-title mb-4">Xuất kết quả đánh giá</h2>
          <div className="flex gap-4">
            <button 
              className="btn btn-outline"
              onClick={() => handleExportResults('courses')}
            >
              <FiDownload className="mr-2" />
              Xuất theo môn học
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleExportResults('professors')}
            >
              <FiDownload className="mr-2" />
              Xuất theo giảng viên
            </button>
          </div>
        </div>
      </div>

      {/* Edit Period Modal */}
      {isEditing && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Cài đặt kỳ đánh giá</h3>
            
            <form onSubmit={handleUpdatePeriod} className="space-y-4">
              <div className="form-control">
                <label className="label">Học kỳ</label>
                <select 
                  className="select select-bordered"
                  value={periodData.semesterId}
                  onChange={(e) => setPeriodData({...periodData, semesterId: e.target.value})}
                  required
                  disabled={isLoading}
                >
                  <option value="">Chọn học kỳ...</option>
                  {Array.isArray(semesters) && semesters.map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      {semester.name} - {semester.academicYear}
                    </option>
                  ))}
                </select>
                {isLoading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </div>

              <div className="form-control">
                <label className="label">Thời gian bắt đầu</label>
                <input 
                  type="datetime-local"
                  className="input input-bordered"
                  value={periodData.startDate}
                  onChange={(e) => setPeriodData({...periodData, startDate: e.target.value})}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">Thời gian kết thúc</label>
                <input 
                  type="datetime-local"
                  className="input input-bordered"
                  value={periodData.endDate}
                  onChange={(e) => setPeriodData({...periodData, endDate: e.target.value})}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span>Kích hoạt đánh giá</span>
                  <input 
                    type="checkbox"
                    className="toggle toggle-primary ml-2"
                    checked={periodData.isActive}
                    onChange={(e) => setPeriodData({...periodData, isActive: e.target.checked})}
                  />
                </label>
              </div>

              <div className="modal-action">
                <button 
                  type="button" 
                  className="btn"
                  onClick={() => setIsEditing(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminEvaluationManagement; 