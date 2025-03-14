import React, { useState } from 'react';
import { FiCalendar, FiClock, FiSave, FiPlus } from 'react-icons/fi';

function TermScheduleSetup() {
  const [termInfo, setTermInfo] = useState({
    termId: '',
    academicYear: '',
    startDate: '',
    endDate: '',
    registrationPeriod: {
      start: '',
      end: ''
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Thiết lập Kỳ học và Thời khóa biểu</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TermSetup termInfo={termInfo} setTermInfo={setTermInfo} />
        <CourseScheduling termInfo={termInfo} />
      </div>
    </div>
  );
}

function TermSetup({ termInfo, setTermInfo }) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Thông tin Kỳ học</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Mã kỳ học</label>
            <input
              type="text"
              className="input input-bordered"
              value={termInfo.termId}
              onChange={(e) => setTermInfo({...termInfo, termId: e.target.value})}
              placeholder="VD: 20241"
            />
          </div>

          <div className="form-control">
            <label className="label">Năm học</label>
            <input
              type="text"
              className="input input-bordered"
              value={termInfo.academicYear}
              onChange={(e) => setTermInfo({...termInfo, academicYear: e.target.value})}
              placeholder="VD: 2024-2025"
            />
          </div>

          <div className="form-control">
            <label className="label">Ngày bắt đầu</label>
            <input
              type="date"
              className="input input-bordered"
              value={termInfo.startDate}
              onChange={(e) => setTermInfo({...termInfo, startDate: e.target.value})}
            />
          </div>

          <div className="form-control">
            <label className="label">Ngày kết thúc</label>
            <input
              type="date"
              className="input input-bordered"
              value={termInfo.endDate}
              onChange={(e) => setTermInfo({...termInfo, endDate: e.target.value})}
            />
          </div>
        </div>

        <div className="divider">Thời gian đăng ký môn học</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Bắt đầu đăng ký</label>
            <input
              type="datetime-local"
              className="input input-bordered"
              value={termInfo.registrationPeriod.start}
              onChange={(e) => setTermInfo({
                ...termInfo,
                registrationPeriod: {...termInfo.registrationPeriod, start: e.target.value}
              })}
            />
          </div>

          <div className="form-control">
            <label className="label">Kết thúc đăng ký</label>
            <input
              type="datetime-local"
              className="input input-bordered"
              value={termInfo.registrationPeriod.end}
              onChange={(e) => setTermInfo({
                ...termInfo,
                registrationPeriod: {...termInfo.registrationPeriod, end: e.target.value}
              })}
            />
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary">
            <FiSave className="mr-2" />
            Lưu thông tin
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseScheduling({ termInfo }) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Thời khóa biểu</h2>
          <button className="btn btn-primary btn-sm">
            <FiPlus className="mr-2" />
            Thêm lớp học
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Mã lớp</th>
                <th>Tên môn</th>
                <th>Giảng viên</th>
                <th>Lịch học</th>
                <th>Phòng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CS101-01</td>
                <td>Nhập môn lập trình</td>
                <td>Nguyễn Văn A</td>
                <td>T2 (1-3)</td>
                <td>A101</td>
                <td>
                  <button className="btn btn-ghost btn-xs">Sửa</button>
                  <button className="btn btn-ghost btn-xs text-error">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TermScheduleSetup; 