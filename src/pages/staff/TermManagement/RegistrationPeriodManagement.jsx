// src/components/TermManagement/RegistrationPeriodManagement.jsx
import React, { useState, useEffect } from 'react';
import { getSemestersAPI, getRegistrationPeriodsAPI, createRegistrationPeriodAPI } from '../../../apis/termAPI';
import RegistrationPeriodStatus from './RegistrationPeriodStatus';

function RegistrationPeriodManagement() {
  const [semesters, setSemesters] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [registrationPeriods, setRegistrationPeriods] = useState([]);
  const [formData, setFormData] = useState({
    semesterId: '',
    maxCredits: 25,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await getSemestersAPI();
        setSemesters(response.data);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };
    const fetchRegistrationPeriods = async () => {
      try {
        const response = await getRegistrationPeriodsAPI();
        setRegistrationPeriods(response.data);
      } catch (error) {
        console.error('Error fetching registration periods:', error);
      }
    };
    fetchSemesters();
    fetchRegistrationPeriods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRegistrationPeriodAPI(formData);
      const updatedPeriods = await getRegistrationPeriodsAPI();
      setRegistrationPeriods(updatedPeriods.data);
      setFormData({ semesterId: '', maxCredits: 25, startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error creating registration period:', error);
    }
  };

  const formatDate = (date) => date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const formatTime = (date) => date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false });
  const getStatusText = (status) => {
    switch (status) {
      case 'OPEN': return 'Mở cổng đăng ký';
      case 'CLOSED': return 'Đóng cổng đăng ký';
      case 'MAINTENANCE': return 'Bảo trì hệ thống';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="mb-4">
          <label className="label">Chọn đợt đăng ký</label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={selectedPeriod || ''}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="">Chọn đợt đăng ký</option>
            {registrationPeriods.map((period) => {
              const startDate = new Date(period.startDate);
              const endDate = new Date(period.endDate);
              return (
                <option key={period.id} value={period.id}>
                  {period.semesterName} ({formatDate(startDate)} {formatTime(startDate)} - {formatDate(endDate)} {formatTime(endDate)}) - {getStatusText(period.status)} - Tối đa {period.maxCredits} tín chỉ
                </option>
              );
            })}
          </select>
        </div>
        {selectedPeriod && <RegistrationPeriodStatus periodId={selectedPeriod} />}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Tạo đợt đăng ký môn học</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Kỳ học</label>
              <select
                className="select select-bordered w-full"
                value={formData.semesterId}
                onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
                required
              >
                <option value="">Chọn kỳ học</option>
                {semesters.map((semester) => (
                  <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Số tín chỉ tối đa</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.maxCredits}
                onChange={(e) => setFormData({ ...formData, maxCredits: parseInt(e.target.value) })}
                min="1"
                required
              />
            </div>
            <div>
              <label className="label">Ngày bắt đầu</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Ngày kết thúc</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">Tạo đợt đăng ký</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPeriodManagement;