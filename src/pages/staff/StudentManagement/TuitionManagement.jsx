import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiEdit2, FiSave, FiCalendar } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  getTuitionRatesAPI,
  updateTuitionRatesAPI,
  getProgramRatesAPI,
  updateProgramRatesAPI,
  getTuitionStatisticsAPI,
  createTuitionPeriodAPI,
  updatePeriodStatusAPI,
  getTermSummaryAPI
} from '../../../apis/tuitionAPI';

function TuitionManagement() {
  const [rates, setRates] = useState([]);
  const [programRates, setProgramRates] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [termSummary, setTermSummary] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newPeriod, setNewPeriod] = useState({
    semesterId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTerm) {
      fetchTermSummary();
    }
  }, [selectedTerm]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [ratesRes, programRatesRes, statsRes] = await Promise.all([
        getTuitionRatesAPI(),
        getProgramRatesAPI(),
        getTuitionStatisticsAPI()
      ]);

      setRates(ratesRes.data);
      setProgramRates(programRatesRes.data);
      setStatistics(statsRes.data);
    } catch (error) {
      console.error('Error fetching tuition data:', error);
      toast.error('Không thể tải thông tin học phí');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTermSummary = async () => {
    try {
      const response = await getTermSummaryAPI(selectedTerm);
      setTermSummary(response.data);
    } catch (error) {
      console.error('Error fetching term summary:', error);
      toast.error('Không thể tải thông tin học kỳ');
    }
  };

  const handleUpdateRates = async () => {
    try {
      setIsLoading(true);
      await updateTuitionRatesAPI(rates);
      toast.success('Cập nhật mức học phí thành công');
      fetchData();
    } catch (error) {
      console.error('Error updating rates:', error);
      toast.error('Không thể cập nhật mức học phí');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProgramRates = async () => {
    try {
      setIsLoading(true);
      await updateProgramRatesAPI(programRates);
      toast.success('Cập nhật học phí theo chương trình thành công');
      fetchData();
    } catch (error) {
      console.error('Error updating program rates:', error);
      toast.error('Không thể cập nhật học phí theo chương trình');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePeriod = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createTuitionPeriodAPI(newPeriod);
      toast.success('Tạo kỳ học phí mới thành công');
      fetchData();
      setNewPeriod({ semesterId: '', startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error creating tuition period:', error);
      toast.error('Không thể tạo kỳ học phí mới');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý Học phí</h1>
      </div>

      {/* Basic Rates */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Mức học phí cơ bản</h2>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleUpdateRates}
            disabled={isLoading}
          >
            <FiSave className="mr-2" />
            Lưu thay đổi
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tên mức học phí</th>
                <th>Số tiền (VNĐ)</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate, index) => (
                <tr key={index}>
                  <td>{rate.rateName}</td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered input-sm w-full max-w-xs"
                      value={rate.amount}
                      onChange={(e) => {
                        const newRates = [...rates];
                        newRates[index].amount = parseInt(e.target.value);
                        setRates(newRates);
                      }}
                    />
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">
                      <FiEdit2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Program Rates */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Học phí theo chương trình</h2>
          <button 
            className="btn btn-primary btn-sm"
            onClick={handleUpdateProgramRates}
            disabled={isLoading}
          >
            <FiSave className="mr-2" />
            Lưu thay đổi
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Chương trình</th>
                <th>Học phí (VNĐ)</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {programRates.map((program, index) => (
                <tr key={program.programId}>
                  <td>{program.programName}</td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered input-sm w-full max-w-xs"
                      value={program.amount}
                      onChange={(e) => {
                        const newRates = [...programRates];
                        newRates[index].amount = parseInt(e.target.value);
                        setProgramRates(newRates);
                      }}
                    />
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">
                      <FiEdit2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New Period */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Tạo kỳ học phí mới</h2>
        <form onSubmit={handleCreatePeriod} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Học kỳ</label>
            <select 
              className="select select-bordered w-full"
              value={newPeriod.semesterId}
              onChange={(e) => setNewPeriod({...newPeriod, semesterId: e.target.value})}
              required
            >
              <option value="">Chọn học kỳ</option>
              <option value="20241">HK1 2024-2025</option>
              <option value="20232">HK2 2023-2024</option>
            </select>
          </div>
          <div>
            <label className="label">Ngày bắt đầu</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={newPeriod.startDate}
              onChange={(e) => setNewPeriod({...newPeriod, startDate: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="label">Ngày kết thúc</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={newPeriod.endDate}
              onChange={(e) => setNewPeriod({...newPeriod, endDate: e.target.value})}
              required
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              Tạo kỳ học phí
            </button>
          </div>
        </form>
      </div>

      {/* Statistics */}
      {statistics && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Thống kê học phí</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat bg-blue-50 rounded-lg p-4">
              <div className="stat-title">Tổng sinh viên</div>
              <div className="stat-value">{statistics.totalStudents}</div>
            </div>
            <div className="stat bg-green-50 rounded-lg p-4">
              <div className="stat-title">Đã đóng học phí</div>
              <div className="stat-value text-success">{statistics.paidStudents}</div>
              <div className="stat-desc">
                {((statistics.paidAmount / statistics.totalAmount) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="stat bg-red-50 rounded-lg p-4">
              <div className="stat-title">Chưa đóng học phí</div>
              <div className="stat-value text-error">{statistics.unpaidStudents}</div>
              <div className="stat-desc">
                {((statistics.unpaidAmount / statistics.totalAmount) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Program Statistics */}
          <div className="mt-6">
            <h3 className="font-medium mb-4">Thống kê theo chương trình</h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Chương trình</th>
                    <th>Số sinh viên</th>
                    <th>Tổng học phí</th>
                    <th>Đã đóng</th>
                    <th>Chưa đóng</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.programStatistics.map((program) => (
                    <tr key={program.programName}>
                      <td>{program.programName}</td>
                      <td>{program.studentCount}</td>
                      <td>{program.totalAmount.toLocaleString('vi-VN')} VNĐ</td>
                      <td>{program.paidAmount.toLocaleString('vi-VN')} VNĐ</td>
                      <td>{program.unpaidAmount.toLocaleString('vi-VN')} VNĐ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TuitionManagement;