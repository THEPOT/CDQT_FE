import React, { useState } from 'react';
import { FiDownload, FiMail, FiFilter } from 'react-icons/fi';

function ClassListView() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="container mx-auto p-4">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Danh sách Lớp</h1>
          <p className="text-gray-600">Học kỳ 1 - Năm học 2024-2025</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="btn btn-outline btn-sm">
            <FiMail className="mr-2" />
            Gửi email
          </button>
          <button className="btn btn-primary btn-sm">
            <FiDownload className="mr-2" />
            Xuất danh sách
          </button>
        </div>
      </header>

      <ClassSelector onSelect={setSelectedClass} />
      
      {selectedClass && (
        <>
          <ClassInfo classData={selectedClass} />
          <StudentList 
            classId={selectedClass.id} 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </>
      )}
    </div>
  );
}

function ClassSelector({ onSelect }) {
  const classes = [
    {
      id: 'CS101-01',
      code: 'CS101',
      name: 'Nhập môn lập trình',
      section: '01',
      schedule: 'Thứ 2 (1-3)',
      room: 'A101',
      enrolled: 45
    }
    // Add more classes as needed
  ];

  return (
    <div className="card bg-base-100 shadow mb-6">
      <div className="card-body">
        <h2 className="card-title">Chọn lớp học</h2>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Mã lớp</th>
                <th>Tên môn học</th>
                <th>Lịch học</th>
                <th>Phòng</th>
                <th>Sĩ số</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {classes.map(classItem => (
                <tr key={classItem.id}>
                  <td>{classItem.code}-{classItem.section}</td>
                  <td>{classItem.name}</td>
                  <td>{classItem.schedule}</td>
                  <td>{classItem.room}</td>
                  <td>{classItem.enrolled}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => onSelect(classItem)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ClassInfo({ classData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Tổng số sinh viên</div>
        <div className="stat-value">{classData.enrolled}</div>
        <div className="stat-desc">Sức chứa: 50</div>
      </div>
      
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Tỷ lệ tham gia</div>
        <div className="stat-value">92%</div>
        <div className="stat-desc">↗︎ 5% so với tuần trước</div>
      </div>
      
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Điểm trung bình</div>
        <div className="stat-value">7.5</div>
        <div className="stat-desc">Cập nhật mới nhất</div>
      </div>
    </div>
  );
}

function StudentList({ classId, filterStatus, setFilterStatus }) {
  const students = [
    {
      id: '2023001',
      name: 'Nguyễn Văn A',
      email: 'vana@example.com',
      attendance: '90%',
      midtermStatus: 'good',
      note: ''
    }
    // Add more students as needed
  ];

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="card-title">Danh sách sinh viên</h2>
          
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <FiFilter className="text-gray-500" />
            <select 
              className="select select-bordered select-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="good">Tốt</option>
              <option value="warning">Cần chú ý</option>
              <option value="risk">Nguy cơ</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Tỷ lệ tham gia</th>
                <th>Tình trạng giữa kỳ</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <div className="badge badge-success">{student.attendance}</div>
                  </td>
                  <td>
                    <StatusBadge status={student.midtermStatus} />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Thêm ghi chú..."
                      className="input input-bordered input-sm w-full"
                      value={student.note}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const statusConfig = {
    good: { class: 'badge-success', text: 'Tốt' },
    warning: { class: 'badge-warning', text: 'Cần chú ý' },
    risk: { class: 'badge-error', text: 'Nguy cơ' }
  };

  const config = statusConfig[status] || statusConfig.good;

  return (
    <div className={`badge ${config.class}`}>
      {config.text}
    </div>
  );
}

export default ClassListView; 