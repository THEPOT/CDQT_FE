import React, { useState } from 'react';
import { FiDownload, FiFilter } from 'react-icons/fi';

function StudentListView() {
  const [filters, setFilters] = useState({
    batch: '',
    program: '',
    scholarshipType: '',
    scholarshipAmount: '',
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách Sinh viên</h1>
        <button 
          className="btn btn-primary mt-2 md:mt-0"
          onClick={() => handleExport()}
        >
          <FiDownload className="mr-2" />
          Xuất danh sách
        </button>
      </div>

      <FilterSection filters={filters} setFilters={setFilters} />
      <StudentTable filters={filters} />
    </div>
  );
}

function FilterSection({ filters, setFilters }) {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FiFilter />
        <h2 className="text-lg font-semibold">Bộ lọc</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Khóa</span>
          </label>
          <select 
            className="select select-bordered"
            value={filters.batch}
            onChange={(e) => setFilters({...filters, batch: e.target.value})}
          >
            <option value="">Tất cả</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Ngành học</span>
          </label>
          <select 
            className="select select-bordered"
            value={filters.program}
            onChange={(e) => setFilters({...filters, program: e.target.value})}
          >
            <option value="">Tất cả</option>
            <option value="CS">Khoa học máy tính</option>
            <option value="SE">Kỹ thuật phần mềm</option>
            <option value="IS">Hệ thống thông tin</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Loại học bổng</span>
          </label>
          <select 
            className="select select-bordered"
            value={filters.scholarshipType}
            onChange={(e) => setFilters({...filters, scholarshipType: e.target.value})}
          >
            <option value="">Tất cả</option>
            <option value="merit">Học bổng thành tích</option>
            <option value="need">Học bổng khó khăn</option>
            <option value="full">Học bổng toàn phần</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Mức học bổng</span>
          </label>
          <select 
            className="select select-bordered"
            value={filters.scholarshipAmount}
            onChange={(e) => setFilters({...filters, scholarshipAmount: e.target.value})}
          >
            <option value="">Tất cả</option>
            <option value="50">50% học phí</option>
            <option value="70">70% học phí</option>
            <option value="100">100% học phí</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function StudentTable({ filters }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ và tên</th>
            <th>Khóa</th>
            <th>Ngành</th>
            <th>Học bổng</th>
            <th>Mức học bổng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data - replace with actual data */}
          <tr>
            <td>2023001</td>
            <td>Nguyễn Văn A</td>
            <td>2023</td>
            <td>Khoa học máy tính</td>
            <td>Học bổng thành tích</td>
            <td>50%</td>
            <td>
              <button className="btn btn-sm btn-ghost">
                Chi tiết
              </button>
            </td>
          </tr>
          {/* Add more rows */}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Hiển thị 1-10 trong số 100 sinh viên
        </div>
        <div className="join">
          <button className="join-item btn">«</button>
          <button className="join-item btn btn-active">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </div>
  );
}

export default StudentListView; 