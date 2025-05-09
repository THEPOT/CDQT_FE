import React, { useState, useEffect } from 'react';
import { FiSettings, FiCalendar, FiSend, FiDownload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  getEvaluationQuestionsAPI,
  createEvaluationQuestionAPI,
  updateEvaluationQuestionAPI,
  deleteEvaluationQuestionAPI,
  createEvaluationPeriodAPI,
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
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [currentPeriodRes, semestersRes, questionsRes] = await Promise.all([
        getCurrentEvaluationPeriod(),
        getSemestersAPI(),
        getEvaluationQuestionsAPI()
      ]);
      
      setCurrentPeriod(currentPeriodRes.data);
      setSemesters(semestersRes.data.items);
      setQuestions(questionsRes.data);
      
      if (currentPeriodRes.data) {
        setPeriodData({
          semesterId: currentPeriodRes.data.semesterId,
          startDate: currentPeriodRes.data.startDate,
          endDate: currentPeriodRes.data.endDate,
          isActive: currentPeriodRes.data.isActive
        });
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Không thể tải dữ liệu. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePeriod = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateEvaluationPeriod(periodData);
      await loadInitialData();
      setIsEditing(false);
      toast.success('Cập nhật thành công!');
    } catch (error) {
      console.error('Error updating period:', error);
      toast.error('Không thể cập nhật. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResults = async () => {
    if (!currentPeriod?.semesterId) {
      toast.warning('Vui lòng chọn kỳ học!');
      return;
    }

    try {
      setIsLoading(true);
      await sendEvaluationResults(currentPeriod.semesterId);
      toast.success('Đã gửi kết quả đánh giá cho giảng viên!');
    } catch (error) {
      console.error('Error sending results:', error);
      toast.error('Không thể gửi kết quả. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async (type) => {
    if (!currentPeriod?.semesterId) {
      toast.warning('Vui lòng chọn kỳ học!');
      return;
    }

    try {
      setIsLoading(true);
      const response = await exportEvaluationResults(currentPeriod.semesterId, type);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `evaluations-${type}-${currentPeriod.semesterId}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Tải xuống báo cáo thành công!');
    } catch (error) {
      console.error('Error exporting results:', error);
      toast.error('Không thể tải xuống báo cáo. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Đánh giá</h1>
        <div className="flex gap-2">
          <button 
            className="btn btn-outline"
            onClick={() => setIsEditing(true)}
            disabled={isLoading}
          >
            <FiSettings className="mr-2" />
            Cài đặt
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSendResults}
            disabled={isLoading || !currentPeriod?.semesterId}
          >
            <FiSend className="mr-2" />
            Gửi kết quả
          </button>
        </div>
      </div>

      {/* Current Period Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <FiCalendar className="mr-2" />
          Đợt đánh giá hiện tại
        </h2>
        
        {currentPeriod ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Học kỳ</p>
              <p className="font-medium">{currentPeriod.semesterName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Trạng thái</p>
              <div className={`badge ${currentPeriod.isActive ? 'badge-success' : 'badge-error'}`}>
                {currentPeriod.isActive ? 'Đang mở' : 'Đã đóng'}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Thời gian bắt đầu</p>
              <p className="font-medium">
                {new Date(currentPeriod.startDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Thời gian kết thúc</p>
              <p className="font-medium">
                {new Date(currentPeriod.endDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            Chưa có đợt đánh giá nào được thiết lập
          </p>
        )}
      </div>

      {/* Edit Period Modal */}
      {isEditing && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Cài đặt đợt đánh giá</h3>
            
            <form onSubmit={handleUpdatePeriod} className="space-y-4">
              <div className="form-control">
                <label className="label">Học kỳ</label>
                <select 
                  className="select select-bordered"
                  value={periodData.semesterId}
                  onChange={(e) => setPeriodData({...periodData, semesterId: e.target.value})}
                  required
                >
                  <option value="">Chọn học kỳ...</option>
                  {semesters.map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      {semester.semesterName}
                    </option>
                  ))}
                </select>
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
                    className="toggle toggle-primary"
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
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Xuất báo cáo đánh giá</h2>
        <div className="flex gap-4">
          <button 
            className="btn btn-outline"
            onClick={() => handleExport('courses')}
            disabled={isLoading || !currentPeriod?.semesterId}
          >
            <FiDownload className="mr-2" />
            Xuất theo môn học
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => handleExport('professors')}
            disabled={isLoading || !currentPeriod?.semesterId}
          >
            <FiDownload className="mr-2" />
            Xuất theo giảng viên
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminEvaluationManagement;