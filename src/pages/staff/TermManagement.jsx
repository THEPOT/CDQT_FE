import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FiCalendar, FiClock, FiUsers, FiBarChart2 } from 'react-icons/fi';
import {
  createSemesterAPI,
  createRegistrationPeriodAPI,
  createCourseOfferingsAPI,
  getTermSummaryAPI,
  getRegistrationStatisticsAPI,
  getSemestersAPI,
  updateRegistrationStatusAPI,
  getRegistrationPeriodsAPI
} from '../../apis/termAPI';
import { getCourseStaffAPI } from '../../apis/courseAPI';

function TermManagement() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { name: 'Quản lý kỳ học', icon: FiCalendar },
    { name: 'Đợt đăng ký môn', icon: FiClock },
    { name: 'Môn học & Lịch học', icon: FiUsers },
    { name: 'Thống kê đăng ký', icon: FiBarChart2 }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý kỳ học và đăng ký môn</h1>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mb-6">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex items-center justify-center gap-2
                ${selected 
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'}`
              }
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <SemesterManagement />
          </Tab.Panel>
          <Tab.Panel>
            <RegistrationPeriodManagement />
          </Tab.Panel>
          <Tab.Panel>
            <CourseScheduleManagement />
          </Tab.Panel>
          <Tab.Panel>
            <RegistrationStatistics />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function SemesterManagement() {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    academicYear: '',
    status: 'Planning'
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
      const response = await createSemesterAPI(formData);
      console.log('Semester created:', response.data);
      // Refresh the semester list
      fetchSemesters();
      // Reset form
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
        academicYear: '',
        status: 'Planning'
      });
    } catch (error) {
      console.error('Error creating semester:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Semester List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Danh sách kỳ học</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên kỳ học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Năm học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày bắt đầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày kết thúc
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : semesters.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Chưa có kỳ học nào được tạo
                  </td>
                </tr>
              ) : (
                semesters.map((semester) => (
                  <tr key={semester.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {semester.semesterName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {semester.academicYear}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(semester.startDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(semester.endDate).toLocaleDateString('vi-VN')}
                    </td>
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

      {/* Create Semester Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Tạo kỳ học mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Tên kỳ học</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Năm học</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Ngày bắt đầu</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Ngày kết thúc</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Tạo kỳ học
          </button>
        </form>
      </div>
    </div>
  );
}

function RegistrationPeriodStatus({ periodId }) {
  const [status, setStatus] = useState('CLOSED');
  const [isLoading, setIsLoading] = useState(false);

  const statusOptions = [
    { value: 'CLOSED', label: 'Đóng cổng đăng ký', color: 'bg-red-100 text-red-800' },
    { value: 'OPEN', label: 'Mở cổng đăng ký', color: 'bg-green-100 text-green-800' },
    { value: 'MAINTENANCE', label: 'Bảo trì hệ thống', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleStatusChange = async (newStatus) => {
    try {
      setIsLoading(true);
      await updateRegistrationStatusAPI(periodId, newStatus);
      setStatus(newStatus);
      // You can add a toast notification here
    } catch (error) {
      console.error('Error updating registration status:', error);
      // You can add an error toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-medium mb-4">Trạng thái cổng đăng ký</h3>
      
      <div className="flex flex-col gap-3">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            disabled={isLoading || status === option.value}
            className={`
              flex items-center justify-between p-4 rounded-lg border
              ${status === option.value ? option.color : 'hover:bg-gray-50'}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                status === option.value ? 'bg-current' : 'bg-gray-300'
              }`} />
              {option.label}
            </span>
            
            {status === option.value && (
              <span className="text-sm font-medium">Trạng thái hiện tại</span>
            )}
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="mt-4 text-center text-gray-500">
          Đang cập nhật trạng thái...
        </div>
      )}
    </div>
  );
}

function RegistrationPeriodManagement() {
  const [semesters, setSemesters] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [registrationPeriods, setRegistrationPeriods] = useState([]);
  const [formData, setFormData] = useState({
    semesterId: '',
    maxCredits: 25,
    startDate: '',
    endDate: ''
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
    fetchSemesters();
  }, []);

  useEffect(() => {
    const fetchRegistrationPeriods = async () => {
      try {
        const response = await getRegistrationPeriodsAPI();
        setRegistrationPeriods(response.data);
      } catch (error) {
        console.error('Error fetching registration periods:', error);
      }
    };
    fetchRegistrationPeriods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRegistrationPeriodAPI(formData);
      console.log('Registration period created:', response.data);
      // Refresh the registration periods list
      const updatedPeriods = await getRegistrationPeriodsAPI();
      setRegistrationPeriods(updatedPeriods.data);
      // Reset form
      setFormData({
        semesterId: '',
        maxCredits: 25,
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error('Error creating registration period:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Management Section */}
      <div className="mb-8">
        <div className="mb-4">
          <label className="label">Chọn đợt đăng ký</label>
          <select 
            className="select select-bordered w-full max-w-xs"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="">Chọn đợt đăng ký</option>
            {registrationPeriods.map((period) => {
              // Chuyển đổi chuỗi ISO thành đối tượng Date
              const startDate = new Date(period.startDate);
              const endDate = new Date(period.endDate);
              
              const formatDate = (date) => {
                return date.toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
              };

              const formatTime = (date) => {
                return date.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                });
              };

              return (
                <option key={period.id} value={period.id}>
                  {period.semesterName} ({formatDate(startDate)} {formatTime(startDate)} - {formatDate(endDate)} {formatTime(endDate)})
                </option>
              );
            })}
          </select>
        </div>

        {selectedPeriod && <RegistrationPeriodStatus periodId={selectedPeriod} />}
      </div>

      {/* Registration Period Creation Form */}
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
                  <option key={semester.id} value={semester.id}>
                    {semester.semesterName}
                  </option>
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
            <button type="submit" className="btn btn-primary">
              Tạo đợt đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CourseScheduleManagement() {
  const [formData, setFormData] = useState({
    semesterId: '',
    offerings: [
      {
        courseId: '',
        capacity: 40,
        instructorId: '',
        schedules: [
          {
            dayOfWeek: 'Monday',
            startTime: '',
            endTime: ''
          }
        ]
      }
    ]
  });

  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      // Fetch required data from APIs
      const [semestersRes, coursesRes, instructorsRes] = await Promise.all([
        getSemestersAPI(),
        getCourseStaffAPI(),
       // getInstructorsAPI() // You'll need to create this API
      ]);

      setSemesters(semestersRes.data);
      setCourses(coursesRes.data);
      setInstructors(instructorsRes.data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleAddOffering = () => {
    setFormData({
      ...formData,
      offerings: [
        ...formData.offerings,
        {
          courseId: '',
          capacity: 40,
          instructorId: '',
          schedules: [
            {
              dayOfWeek: 'Monday',
              startTime: '',
              endTime: ''
            }
          ]
        }
      ]
    });
  };

  const handleAddSchedule = (offeringIndex) => {
    const newOfferings = [...formData.offerings];
    newOfferings[offeringIndex].schedules.push({
      dayOfWeek: 'Monday',
      startTime: '',
      endTime: ''
    });
    setFormData({ ...formData, offerings: newOfferings });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCourseOfferingsAPI(formData);
      console.log('Course offerings created:', response.data);
      // Add success notification here
    } catch (error) {
      console.error('Error creating course offerings:', error);
      // Add error notification here
    }
  };

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Thiết lập môn học và thời khóa biểu</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label">Kỳ học</label>
          <select 
            className="select select-bordered w-full"
            value={formData.semesterId}
            onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
          >
            <option value="">Chọn kỳ học</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.semesterName}
              </option>
            ))}
          </select>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Danh sách môn học</h3>
            <button 
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleAddOffering}
            >
              Thêm môn học
            </button>
          </div>

          {formData.offerings.map((offering, offeringIndex) => (
            <div key={offeringIndex} className="border-b pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="label">Môn học</label>
                  <select
                    className="select select-bordered w-full"
                    value={offering.courseId}
                    onChange={(e) => {
                      const newOfferings = [...formData.offerings];
                      newOfferings[offeringIndex].courseId = e.target.value;
                      setFormData({ ...formData, offerings: newOfferings });
                    }}
                  >
                    <option value="">Chọn môn học</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Giảng viên</label>
                  <select
                    className="select select-bordered w-full"
                    value={offering.instructorId}
                    onChange={(e) => {
                      const newOfferings = [...formData.offerings];
                      newOfferings[offeringIndex].instructorId = e.target.value;
                      setFormData({ ...formData, offerings: newOfferings });
                    }}
                  >
                    <option value="">Chọn giảng viên</option>
                    {instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Sĩ số tối đa</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={offering.capacity}
                    onChange={(e) => {
                      const newOfferings = [...formData.offerings];
                      newOfferings[offeringIndex].capacity = parseInt(e.target.value);
                      setFormData({ ...formData, offerings: newOfferings });
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Lịch học</h4>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleAddSchedule(offeringIndex)}
                  >
                    Thêm lịch học
                  </button>
                </div>

                {offering.schedules.map((schedule, scheduleIndex) => (
                  <div key={scheduleIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="label">Thứ</label>
                      <select
                        className="select select-bordered w-full"
                        value={schedule.dayOfWeek}
                        onChange={(e) => {
                          const newOfferings = [...formData.offerings];
                          newOfferings[offeringIndex].schedules[scheduleIndex].dayOfWeek = e.target.value;
                          setFormData({ ...formData, offerings: newOfferings });
                        }}
                      >
                        {daysOfWeek.map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="label">Giờ bắt đầu</label>
                      <input
                        type="time"
                        className="input input-bordered w-full"
                        value={schedule.startTime}
                        onChange={(e) => {
                          const newOfferings = [...formData.offerings];
                          newOfferings[offeringIndex].schedules[scheduleIndex].startTime = e.target.value;
                          setFormData({ ...formData, offerings: newOfferings });
                        }}
                      />
                    </div>

                    <div>
                      <label className="label">Giờ kết thúc</label>
                      <input
                        type="time"
                        className="input input-bordered w-full"
                        value={schedule.endTime}
                        onChange={(e) => {
                          const newOfferings = [...formData.offerings];
                          newOfferings[offeringIndex].schedules[scheduleIndex].endTime = e.target.value;
                          setFormData({ ...formData, offerings: newOfferings });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Lưu thời khóa biểu
        </button>
      </form>
    </div>
  );
}

function RegistrationStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('');

  useEffect(() => {
    if (selectedTerm) {
      fetchStatistics();
    }
  }, [selectedTerm]);

  const fetchStatistics = async () => {
    try {
      const summary = await getTermSummaryAPI(selectedTerm);
      const details = await getRegistrationStatisticsAPI(selectedTerm);
      setStatistics({ summary: summary.data, details: details.data });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Thống kê tổng quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-700">Tổng số sinh viên đăng ký</h3>
            <p className="text-3xl font-bold text-blue-900">2,450</p>
          </div>
          <div className="stat-card bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-700">Số môn học đã mở</h3>
            <p className="text-3xl font-bold text-green-900">45</p>
          </div>
          <div className="stat-card bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-700">Tỷ lệ đăng ký thành công</h3>
            <p className="text-3xl font-bold text-purple-900">95%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Thống kê theo chương trình đào tạo</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Chương trình</th>
                <th>Số sinh viên</th>
                <th>Số môn đăng ký</th>
                <th>Tỷ lệ thành công</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Công nghệ thông tin</td>
                <td>450</td>
                <td>12</td>
                <td>98%</td>
              </tr>
              <tr>
                <td>Kỹ thuật phần mềm</td>
                <td>380</td>
                <td>10</td>
                <td>95%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TermManagement;






