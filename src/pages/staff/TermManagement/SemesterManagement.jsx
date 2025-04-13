// src/components/TermManagement/SemesterManagement.jsx
import React, { useState, useEffect } from 'react';
import { getSemestersAPI, createSemesterAPI } from '../../../apis/termAPI';

function SemesterManagement() {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    academicYear: '',
    status: 'Planning',
  });
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const response = await getSemestersAPI();
      setSemesters(response.data);
    } catch (error) {
      console.error('Error fetching semesters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSemesterAPI(formData);
      fetchSemesters();
      setFormData({ name: '', startDate: '', endDate: '', academicYear: '', status: 'Planning' });
    } catch (error) {
      console.error('Error creating semester:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Danh sách kỳ học</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên kỳ học</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Năm học</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày bắt đầu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày kết thúc</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">Đang tải dữ liệu...</td></tr>
              ) : semesters.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-4 text-center text-gray-500">Chưa có kỳ học nào được tạo</td></tr>
              ) : (
                semesters.map((semester) => (
                  <tr key={semester.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{semester.semesterName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{semester.academicYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(semester.startDate).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(semester.endDate).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(semester.status)}`}>
                        {semester.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Tạo kỳ học mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Tên kỳ học</label>
              <input type="text" className="input input-bordered w-full" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <label className="label">Năm học</label>
              <input type="text" className="input input-bordered w-full" value={formData.academicYear} onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })} required />
            </div>
            <div>
              <label className="label">Ngày bắt đầu</label>
              <input type="date" className="input input-bordered w-full" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
            </div>
            <div>
              <label className="label">Ngày kết thúc</label>
              <input type="date" className="input input-bordered w-full" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Tạo kỳ học</button>
        </form>
      </div>
    </div>
  );
}

export default SemesterManagement;