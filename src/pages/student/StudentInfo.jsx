import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { RiUserLine, RiBookOpenLine, RiMoneyDollarCircleLine, RiFileList3Line } from 'react-icons/ri';
import { getProfileAPI } from '../../apis/profileAPI';


function StudentInfo() {
  const [studentData, setStudentData] = useState({
    personal: {
      studentId: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      address: '',
      enrollmentDate: '',
      status: 'Đang học',
      imageUrl: ''
    },
    scholarship: {
      current: null,
      history: []
    },
    program: {
      name: '',
      code: '',
      totalCredits: 0,
      completedCredits: 0,
      courses: []
    },
    tuition: {
      currentTerm: null,
      history: []
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfileAPI();
        const profileData = response.data;
        
        setStudentData({
          personal: {
            studentId: profileData.mssv || '',
            fullName: profileData.fullName || '',
            email: profileData.email || '',
            phoneNumber: profileData.phoneNumber || '',
            dateOfBirth: profileData.dateOfBirth || '',
            address: profileData.address || '',
            enrollmentDate: profileData.enrollmentDate || '',
            status: profileData.status || 'Đang học',
            imageUrl: profileData.imageUrl || ''
          },
          scholarship: {
            current: profileData.currentScholarship || null,
            history: profileData.scholarshipHistory || []
          },
          program: {
            name: profileData.majorInfo?.majorCode || '',
            code: profileData.majorInfo?.majorId || '',
            totalCredits: profileData.majorInfo?.requiredCredits || 0,
            completedCredits: profileData.majorInfo?.completedCredits || 0,
            courses: profileData.majorInfo?.courses || []
          },
          tuition: {
            currentTerm: profileData.currentTuition || null,
            history: profileData.tuitionHistory || []
          }
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  const tabs = [
    {
      id: 'personal',
      name: 'Thông tin cá nhân',
      icon: RiUserLine,
      content: <PersonalInfo data={studentData.personal} />
    },
    {
      id: 'scholarship',
      name: 'Học bổng',
      icon: RiMoneyDollarCircleLine,
      content: <ScholarshipInfo data={studentData.scholarship} />
    },
    {
      id: 'program',
      name: 'Ngành học',
      icon: RiBookOpenLine,
      content: <ProgramInfo data={studentData.program} />
    },
    {
      id: 'tuition',
      name: 'Học phí',
      icon: RiFileList3Line,
      content: <TuitionInfo data={studentData.tuition} />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            {studentData.personal.imageUrl ? (
              <img 
                src={studentData.personal.imageUrl} 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <RiUserLine className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {studentData.personal.fullName || 'N/A'}
            </h1>
            <p className="text-gray-600">
              MSSV: {studentData.personal.studentId || 'N/A'} • {studentData.program.name || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <Tab.Group>
          <Tab.List className="flex p-2 space-x-2 border-b">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                className={({ selected }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selected
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`
                }
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="p-6">
            {tabs.map((tab) => (
              <Tab.Panel key={tab.id}>{tab.content}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

function PersonalInfo({ data }) {
  const fields = [
    { id: 'studentId', label: 'Mã số sinh viên', value: data.studentId },
    { id: 'fullName', label: 'Họ và tên', value: data.fullName },
    { id: 'email', label: 'Email', value: data.email },
    { id: 'phoneNumber', label: 'Số điện thoại', value: data.phoneNumber },
    { id: 'dateOfBirth', label: 'Ngày sinh', value: data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString('vi-VN') : 'N/A' },
    { id: 'address', label: 'Địa chỉ', value: data.address },
    { id: 'enrollmentDate', label: 'Ngày nhập học', value: data.enrollmentDate ? new Date(data.enrollmentDate).toLocaleDateString('vi-VN') : 'N/A' },
    { id: 'status', label: 'Trạng thái', value: data.status }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type="text"
            readOnly
            value={field.value || 'N/A'}
            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}

function ScholarshipInfo({ data }) {
  return (
    <div className="space-y-6">
      {/* Current Scholarship */}
      {data.current && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Học bổng hiện tại
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700">{data.current.name}</p>
            <p className="text-2xl font-bold text-blue-600">
              {data.current.amount.toLocaleString('vi-VN')} VNĐ
            </p>
            <p className="text-sm text-gray-500">
              Thời gian: {new Date(data.current.startDate).toLocaleDateString('vi-VN')} -{' '}
              {new Date(data.current.endDate).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
      )}

      {/* Scholarship History */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Lịch sử học bổng
        </h3>
        <div className="space-y-4">
          {data.history.map((scholarship, index) => (
            <div
              key={index}
              className="border rounded-lg p-4"
            >
              <h4 className="font-medium text-gray-900">{scholarship.name}</h4>
              <p className="text-lg font-semibold text-blue-600 mt-1">
                {scholarship.amount.toLocaleString('vi-VN')} VNĐ
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(scholarship.startDate).toLocaleDateString('vi-VN')} -{' '}
                {new Date(scholarship.endDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgramInfo({ data }) {
  return (
    <div className="space-y-6">
      {/* Program Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700">Ngành học</h3>
          <p className="text-lg font-semibold text-gray-900 mt-1">{data.name}</p>
          <p className="text-sm text-gray-500">Mã ngành: {data.code}</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700">Tín chỉ yêu cầu</h3>
          <p className="text-lg font-semibold text-gray-900 mt-1">{data.totalCredits}</p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{
                width: `${(data.completedCredits / data.totalCredits) * 100}%`
              }}
            />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700">Tín chỉ đã hoàn thành</h3>
          <p className="text-lg font-semibold text-gray-900 mt-1">{data.completedCredits}</p>
          <p className="text-sm text-gray-500">
            {Math.round((data.completedCredits / data.totalCredits) * 100)}% hoàn thành
          </p>
        </div>
      </div>

      {/* Course List */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Danh sách môn học
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã môn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên môn học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tín chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(data.courses || []).map((course, index) => (
                <tr key={course.courseCode ? `course-${course.courseCode}` : `course-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.courseCode || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.courseName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.credits || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {course.status === 'completed' ? 'Đã hoàn thành' : 'Đang học'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {course.grade || '-'}
                  </td>
                </tr>
              ))}
              {(!data.courses || data.courses.length === 0) && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Không có môn học nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TuitionInfo({ data }) {
  return (
    <div className="space-y-6">
      {/* Current Term */}
      {data.currentTerm && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Học phí kỳ hiện tại
          </h3>
          <div className="space-y-2">
            <p className="text-gray-700">{data.currentTerm.term}</p>
            <div className="flex justify-between items-baseline">
              <p className="text-2xl font-bold text-blue-600">
                {data.currentTerm.amount.toLocaleString('vi-VN')} VNĐ
              </p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  data.currentTerm.status === 'paid'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {data.currentTerm.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Hạn nộp: {new Date(data.currentTerm.dueDate).toLocaleDateString('vi-VN')}
            </p>
          </div>
        </div>
      )}

      {/* Payment History */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Lịch sử đóng học phí
        </h3>
        <div className="space-y-4">
          {(data.history || []).map((term, index) => (
            <div
              key={index}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{term.term}</h4>
                  <p className="text-lg font-semibold text-blue-600 mt-1">
                    {term.amount.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    term.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {term.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Hạn nộp: {new Date(term.dueDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
          ))}
          {(!data.history || data.history.length === 0) && (
            <div className="text-center text-gray-500">
              Không có lịch sử học phí
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentInfo;
