import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FiCalendar, FiClock, FiUsers, FiBarChart2 } from 'react-icons/fi';
import {
  createSemesterAPI,
  createRegistrationPeriodAPI,
  createCourseOfferingsAPI,
  getTermSummaryAPI,
  getRegistrationStatisticsAPI,
  getSemestersAPI
} from '../../apis/termAPI';

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
    status: 'Planning' // Planning, Active, Completed
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSemesterAPI(formData);
      // Handle success (e.g., show notification, reset form)
      console.log('Semester created:', response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error creating semester:', error);
    }
  };

  return (
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
            />
          </div>
          <div>
            <label className="label">Năm học</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Ngày bắt đầu</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Ngày kết thúc</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Tạo kỳ học
        </button>
      </form>
    </div>
  );
}

function RegistrationPeriodManagement() {
  const [semesters, setSemesters] = useState([]);

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
  
  const [formData, setFormData] = useState({
    semesterId: '',
    startDate: '',
    endDate: '',
    maxCredits: 25,
    minCredits: 12,
    phases: [
      {
        name: 'Đợt 1',
        startDate: '',
        endDate: '',
        eligibleYears: []
      }
    ]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRegistrationPeriodAPI(formData);
      console.log('Registration period created:', response.data);
    } catch (error) {
      console.error('Error creating registration period:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Tạo đợt đăng ký môn học</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <label className="label">Số tín chỉ tối đa</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={formData.maxCredits}
              onChange={(e) => setFormData({ ...formData, maxCredits: e.target.value })}
            />
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Đợt đăng ký</h3>
          {formData.phases.map((phase, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">Tên đợt</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={phase.name}
                  onChange={(e) => {
                    const newPhases = [...formData.phases];
                    newPhases[index].name = e.target.value;
                    setFormData({ ...formData, phases: newPhases });
                  }}
                />
              </div>
              <div>
                <label className="label">Khóa học được đăng ký</label>
                <select
                  multiple
                  className="select select-bordered w-full"
                  value={phase.eligibleYears}
                  onChange={(e) => {
                    const newPhases = [...formData.phases];
                    newPhases[index].eligibleYears = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, phases: newPhases });
                  }}
                >
                  <option value="2023">K2023</option>
                  <option value="2022">K2022</option>
                  <option value="2021">K2021</option>
                  <option value="2020">K2020</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Tạo đợt đăng ký
        </button>
      </form>
    </div>
  );
}

function CourseScheduleManagement() {
  const [formData, setFormData] = useState({
    semesterId: '',
    offerings: [
      {
        courseId: '',
        schedule: '',
        capacity: 40,
        instructor: ''
      }
    ]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCourseOfferingsAPI(formData);
      console.log('Course offerings created:', response.data);
    } catch (error) {
      console.error('Error creating course offerings:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý môn học và lịch học</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label">Kỳ học</label>
          <select 
            className="select select-bordered w-full"
            value={formData.semesterId}
            onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
          >
            <option value="">Chọn kỳ học</option>
            {/* TODO: Add semester options */}
          </select>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Danh sách môn học</h3>
          {formData.offerings.map((offering, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">Môn học</label>
                <select
                  className="select select-bordered w-full"
                  value={offering.courseId}
                  onChange={(e) => {
                    const newOfferings = [...formData.offerings];
                    newOfferings[index].courseId = e.target.value;
                    setFormData({ ...formData, offerings: newOfferings });
                  }}
                >
                  <option value="">Chọn môn học</option>
                  {/* TODO: Add course options */}
                </select>
              </div>
              <div>
                <label className="label">Giảng viên</label>
                <select
                  className="select select-bordered w-full"
                  value={offering.instructor}
                  onChange={(e) => {
                    const newOfferings = [...formData.offerings];
                    newOfferings[index].instructor = e.target.value;
                    setFormData({ ...formData, offerings: newOfferings });
                  }}
                >
                  <option value="">Chọn giảng viên</option>
                  {/* TODO: Add instructor options */}
                </select>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Lưu danh sách môn học
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
