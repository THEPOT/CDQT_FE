// src/components/TermManagement/RegistrationPeriodManagement.jsx
import React, { useState, useEffect } from 'react';
import { getSemestersAPI, getRegistrationPeriodsAPI, createRegistrationPeriodAPI } from '../../../apis/termAPI';
import RegistrationPeriodStatus from './RegistrationPeriodStatus';

function RegistrationPeriodManagement() {
  const [semesters, setSemesters] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [registrationPeriods, setRegistrationPeriods] = useState([]);
  const [formData, setFormData] = useState({
    semesterId: '',
    maxCredits: 25,
    startDate: '',
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('view'); // 'view' or 'create'

  const fetchSemesters = async () => {
    try {
      const response = await getSemestersAPI();
      setSemesters(response.data);
    } catch (err) {
      console.error('Error fetching semesters:', err);
      setError('Không thể tải danh sách kỳ học.');
    }
  };

  const fetchRegistrationPeriods = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRegistrationPeriodsAPI();
      const sortedPeriods = response.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      setRegistrationPeriods(sortedPeriods);
    } catch (err) {
      console.error('Error fetching registration periods:', err);
      setError('Không thể tải danh sách đợt đăng ký.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
    fetchRegistrationPeriods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);
    try {
      await createRegistrationPeriodAPI(formData);
      await fetchRegistrationPeriods();
      setFormData({ semesterId: '', maxCredits: 25, startDate: '', endDate: '' });
      
      // Show success message
      const successToast = document.getElementById('success-toast');
      if (successToast) {
        successToast.classList.remove('hidden');
        setTimeout(() => {
          successToast.classList.add('hidden');
        }, 3000);
      }
      
      // Switch to view tab after successful creation
      setActiveTab('view');
    } catch (err) {
      console.error('Error creating registration period:', err);
      setError(err.response?.data?.message || 'Lỗi khi tạo đợt đăng ký. Vui lòng thử lại.');
    } finally {
      setIsCreating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'OPEN': return 'Đang mở';
      case 'CLOSED': return 'Đã đóng';
      case 'UPCOMING': return 'Sắp tới';
      case 'MAINTENANCE': return 'Bảo trì';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'text-success';
      case 'CLOSED': return 'text-error';
      case 'UPCOMING': return 'text-warning';
      case 'MAINTENANCE': return 'text-info';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Toast message for success */}
      <div id="success-toast" className="toast toast-top toast-end hidden">
        <div className="alert alert-success">
          <div>
            <span>Tạo đợt đăng ký thành công!</span>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center mb-6">Quản lý Đợt Đăng Ký Học Phần</h1>
          
          {/* Tab Navigation */}
          <div className="tabs tabs-boxed mb-6">
            <a 
              className={`tab ${activeTab === 'view' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('view')}
            >
              Xem đợt đăng ký
            </a>
            <a 
              className={`tab ${activeTab === 'create' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('create')}
            >
              Tạo đợt đăng ký mới
            </a>
          </div>

          {error && (
            <div className="alert alert-error shadow-lg mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* View Registration Periods Tab */}
          {activeTab === 'view' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text font-medium">Chọn đợt đăng ký</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="">-- Chọn đợt --</option>
                    {isLoading ? (
                      <option disabled>Đang tải...</option>
                    ) : (
                      registrationPeriods.map((period) => (
                        <option key={period.id} value={period.id}>
                          {period.semesterName} ({formatDate(period.startDate)} - {formatDate(period.endDate)})
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <button 
                  className="btn btn-outline btn-info self-end"
                  onClick={fetchRegistrationPeriods}
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Làm mới
                </button>
              </div>

              {/* Registration periods list */}
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Kỳ học</th>
                      <th>Thời gian</th>
                      <th>Tín chỉ tối đa</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          <span className="loading loading-spinner loading-md"></span> Đang tải...
                        </td>
                      </tr>
                    ) : registrationPeriods.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">Không có đợt đăng ký nào</td>
                      </tr>
                    ) : (
                      registrationPeriods.map((period) => (
                        <tr key={period.id} className="hover cursor-pointer" onClick={() => setSelectedPeriod(period.id)}>
                          <td>{period.semesterName}</td>
                          <td>
                            <div>{formatDate(period.startDate)} {formatTime(period.startDate)}</div>
                            <div>đến {formatDate(period.endDate)} {formatTime(period.endDate)}</div>
                          </td>
                          <td>{period.maxCredits} TC</td>
                          <td>
                            <span className={`badge ${getStatusColor(period.status)}`}>
                              {getStatusText(period.status)}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Selected period details */}
              {selectedPeriod && (
                <div className="bg-base-200 p-4 rounded-lg mt-6">
                  <h3 className="font-bold text-lg mb-4">Chi tiết đợt đăng ký</h3>
                  <RegistrationPeriodStatus periodId={selectedPeriod} key={selectedPeriod} />
                </div>
              )}
            </div>
          )}

          {/* Create Registration Period Tab */}
          {activeTab === 'create' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Tạo Đợt Đăng ký Môn học Mới</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Kỳ học <span className="text-error">*</span></span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      value={formData.semesterId}
                      onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
                      required
                      disabled={isCreating}
                    >
                      <option value="">Chọn kỳ học</option>
                      {semesters.map((semester) => (
                        <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Số tín chỉ tối đa <span className="text-error">*</span></span>
                    </label>
                    <input
                      type="number"
                      placeholder="Ví dụ: 25"
                      className="input input-bordered w-full"
                      value={formData.maxCredits}
                      onChange={(e) => setFormData({ ...formData, maxCredits: parseInt(e.target.value) || '' })}
                      min="1"
                      required
                      disabled={isCreating}
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Ngày bắt đầu <span className="text-error">*</span></span>
                    </label>
                    <input
                      type="datetime-local"
                      className="input input-bordered w-full"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                      disabled={isCreating}
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium">Ngày kết thúc <span className="text-error">*</span></span>
                    </label>
                    <input
                      type="datetime-local"
                      className="input input-bordered w-full"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                      disabled={isCreating}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 gap-2">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setActiveTab('view')}
                    disabled={isCreating}
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        Đang tạo...
                      </>
                    ) : (
                      'Tạo đợt đăng ký'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationPeriodManagement;