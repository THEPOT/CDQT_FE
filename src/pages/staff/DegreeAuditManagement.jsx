import React, { useState, useEffect } from 'react';
import { FiDownload, FiEdit2, FiSave, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  getProgramRequirementsAPI,
  updateProgramRequirementsAPI,
  getBatchProgressAPI,
  exportAuditReportAPI
} from '../../apis/degreeAuditAPI';

function DegreeAuditManagement() {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedTerm, setSelectedTerm] = useState('1');
  const [requirements, setRequirements] = useState({
    totalCredits: 130,
    categories: []
  });
  const [batchProgress, setBatchProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedProgram && selectedYear && selectedTerm) {
      fetchBatchProgress();
    }
  }, [selectedProgram, selectedYear, selectedTerm]);

  useEffect(() => {
    if (selectedProgram) {
      fetchProgramRequirements();
    }
  }, [selectedProgram]);

  const fetchProgramRequirements = async () => {
    try {
      setIsLoading(true);
      const response = await getProgramRequirementsAPI(selectedProgram);
      setRequirements(response.data);
    } catch (error) {
      console.error('Error fetching program requirements:', error);
      toast.error('Không thể tải yêu cầu chương trình');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBatchProgress = async () => {
    try {
      const response = await getBatchProgressAPI(selectedYear, selectedProgram, selectedTerm);
      setBatchProgress(response.data);
    } catch (error) {
      console.error('Error fetching batch progress:', error);
      toast.error('Không thể tải tiến độ theo khóa');
    }
  };

  const handleSaveRequirements = async () => {
    try {
      setIsLoading(true);
      await updateProgramRequirementsAPI(selectedProgram, requirements);
      toast.success('Cập nhật yêu cầu thành công');
      fetchProgramRequirements();
    } catch (error) {
      console.error('Error updating requirements:', error);
      toast.error('Không thể cập nhật yêu cầu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportAuditReportAPI({
        programCode: selectedProgram,
        year: selectedYear,
        term: selectedTerm
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `degree-audit-${selectedProgram}-${selectedYear}-${selectedTerm}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Xuất báo cáo thành công');
    } catch (error) {
      console.error('Error exporting report:', error);
      toast.error('Không thể xuất báo cáo');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Lộ trình Học tập</h1>
        <button 
          className="btn btn-primary"
          onClick={handleExport}
          disabled={!selectedProgram || !selectedYear || !selectedTerm}
        >
          <FiDownload className="mr-2" />
          Xuất báo cáo
        </button>
      </div>

      {/* Program Selection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Chọn chương trình đào tạo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select 
            className="select select-bordered w-full"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="">Chọn ngành học...</option>
            <option value="CS">Khoa học máy tính</option>
            <option value="SE">Kỹ thuật phần mềm</option>
            <option value="IS">Hệ thống thông tin</option>
          </select>

          <select 
            className="select select-bordered w-full"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Chọn năm...</option>
            {[2023, 2024, 2025].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select 
            className="select select-bordered w-full"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option value="">Chọn học kỳ...</option>
            <option value="1">Học kỳ 1</option>
            <option value="2">Học kỳ 2</option>
            <option value="3">Học kỳ 3</option>
          </select>
        </div>
      </div>

      {/* Requirements Editor */}
      {selectedProgram && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Yêu cầu chương trình</h2>
            <button 
              className="btn btn-primary"
              onClick={handleSaveRequirements}
              disabled={isLoading}
            >
              <FiSave className="mr-2" />
              Lưu thay đổi
            </button>
          </div>

          <div className="space-y-6">
            {/* Total Credits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tổng số tín chỉ yêu cầu
              </label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={requirements.totalCredits}
                onChange={(e) => setRequirements({
                  ...requirements,
                  totalCredits: parseInt(e.target.value)
                })}
              />
            </div>

            {/* Categories */}
            {requirements.categories.map((category, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">{category.name}</h3>
                  <button className="btn btn-ghost btn-sm">
                    <FiEdit2 className="mr-2" />
                    Chỉnh sửa
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số tín chỉ yêu cầu
                    </label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={category.credits}
                      onChange={(e) => {
                        const newCategories = [...requirements.categories];
                        newCategories[index].credits = parseInt(e.target.value);
                        setRequirements({
                          ...requirements,
                          categories: newCategories
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Course List */}
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Mã môn</th>
                      <th>Tên môn học</th>
                      <th>Tín chỉ</th>
                      <th>Bắt buộc</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.courses.map((course, courseIndex) => (
                      <tr key={courseIndex}>
                        <td>{course.code}</td>
                        <td>{course.name}</td>
                        <td>{course.credits}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={course.required}
                            onChange={(e) => {
                              const newCategories = [...requirements.categories];
                              newCategories[index].courses[courseIndex].required = e.target.checked;
                              setRequirements({
                                ...requirements,
                                categories: newCategories
                              });
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

                <button className="btn btn-ghost btn-sm mt-4">
                  <FiPlus className="mr-2" />
                  Thêm môn học
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Batch Progress */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Tiến độ theo khóa</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Khóa</th>
              <th>Tổng sinh viên</th>
              <th>Hoàn thành &gt; 75%</th>
              <th>Hoàn thành 50-75%</th>
              <th>Hoàn thành &lt; 50%</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {batchProgress.map((batch) => (
              <tr key={batch.batchYear}>
                <td>{batch.batchYear}</td>
                <td>{batch.totalStudents}</td>
                <td>{batch.above75Percent}</td>
                <td>{batch.between50And75Percent}</td>
                <td>{batch.below50Percent}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">Chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DegreeAuditManagement;