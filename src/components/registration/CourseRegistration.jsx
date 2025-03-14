import React, { useState } from 'react';
import { FiCalendar, FiDollarSign, FiAlertCircle } from 'react-icons/fi';

function CourseRegistration({ userRole }) {
  return (
    <div className="container mx-auto p-4">
      {userRole === 'student' ? (
        <StudentRegistrationView />
      ) : (
        <AdminRegistrationView />
      )}
    </div>
  );
}

function StudentRegistrationView() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Đăng ký Môn học</h1>
          <p className="text-gray-600">Học kỳ 1 - Năm học 2024-2025</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Số tín chỉ đã đăng ký</p>
          <p className="text-xl font-bold">{selectedCourses.reduce((sum, course) => sum + course.credits, 0)}/24</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AvailableCourses 
            selectedCourses={selectedCourses}
            onSelectCourse={(course) => setSelectedCourses([...selectedCourses, course])}
          />
        </div>
        
        <div className="space-y-4">
          <SelectedCourses 
            courses={selectedCourses}
            onRemoveCourse={(courseId) => 
              setSelectedCourses(selectedCourses.filter(c => c.id !== courseId))
            }
          />
          <TuitionSummary courses={selectedCourses} />
        </div>
      </div>
    </div>
  );
}

function AvailableCourses({ selectedCourses, onSelectCourse }) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Danh sách môn học có thể đăng ký</h2>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Mã môn</th>
                <th>Tên môn</th>
                <th>Tín chỉ</th>
                <th>Lịch học</th>
                <th>Sĩ số</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CS101</td>
                <td>Nhập môn lập trình</td>
                <td>3</td>
                <td>T2 (1-3)</td>
                <td>45/50</td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectCourse({
                      id: 'CS101',
                      name: 'Nhập môn lập trình',
                      credits: 3,
                      schedule: 'T2 (1-3)',
                      tuition: 1500000
                    })}
                  >
                    Đăng ký
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SelectedCourses({ courses, onRemoveCourse }) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Môn học đã đăng ký</h2>
        
        {courses.length > 0 ? (
          <div className="space-y-2">
            {courses.map(course => (
              <div key={course.id} className="flex justify-between items-center p-2 bg-base-200 rounded">
                <div>
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-gray-600">
                    <FiCalendar className="inline mr-1" />
                    {course.schedule}
                  </p>
                </div>
                <button 
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => onRemoveCourse(course.id)}
                >
                  Hủy
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            Chưa có môn học nào được chọn
          </p>
        )}
      </div>
    </div>
  );
}

function TuitionSummary({ courses }) {
  const totalTuition = courses.reduce((sum, course) => sum + course.tuition, 0);
  
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">
          <FiDollarSign className="inline" />
          Học phí dự kiến
        </h2>
        
        <div className="space-y-2">
          {courses.map(course => (
            <div key={course.id} className="flex justify-between text-sm">
              <span>{course.name}</span>
              <span>{course.tuition.toLocaleString('vi-VN')} VNĐ</span>
            </div>
          ))}
          
          <div className="divider"></div>
          
          <div className="flex justify-between font-bold">
            <span>Tổng cộng</span>
            <span>{totalTuition.toLocaleString('vi-VN')} VNĐ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminRegistrationView() {
  const [registrationStatus, setRegistrationStatus] = useState('closed');
  
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Đăng ký Môn học</h1>
          <p className="text-gray-600">Học kỳ 1 - Năm học 2024-2025</p>
        </div>
        
        <div className="flex gap-2">
          <select 
            className="select select-bordered"
            value={registrationStatus}
            onChange={(e) => setRegistrationStatus(e.target.value)}
          >
            <option value="closed">Đóng cổng đăng ký</option>
            <option value="open">Mở cổng đăng ký</option>
            <option value="maintenance">Bảo trì hệ thống</option>
          </select>
          
          <button className="btn btn-primary">
            Cập nhật
          </button>
        </div>
      </header>

      <RegistrationStats />
      <RegistrationManagement />
    </div>
  );
}

function RegistrationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Tổng số sinh viên đăng ký</div>
        <div className="stat-value">2,450</div>
        <div className="stat-desc">↗︎ 400 (24h qua)</div>
      </div>
      
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Môn học đã đầy</div>
        <div className="stat-value text-warning">12</div>
        <div className="stat-desc">Trong tổng số 45 môn</div>
      </div>
      
      <div className="stat bg-base-100 rounded-lg shadow">
        <div className="stat-title">Xung đột lịch</div>
        <div className="stat-value text-error">23</div>
        <div className="stat-desc">Cần xử lý</div>
      </div>
    </div>
  );
}

function RegistrationManagement() {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Quản lý Đăng ký</h2>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ tên</th>
                <th>Số môn đăng ký</th>
                <th>Tín chỉ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023001</td>
                <td>Nguyễn Văn A</td>
                <td>5</td>
                <td>15</td>
                <td>
                  <span className="badge badge-warning">
                    <FiAlertCircle className="inline mr-1" />
                    Xung đột lịch
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm">Chi tiết</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration; 