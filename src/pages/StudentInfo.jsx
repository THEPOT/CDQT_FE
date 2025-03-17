import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { RiUserLine, RiBookOpenLine, RiMoneyDollarCircleLine, RiFileList3Line } from 'react-icons/ri';

function StudentInfo() {
  const studentData = {
    personal: {
      studentId: '2023001',
      fullName: 'Nguyễn Văn A',
      email: 'vana@example.com',
      phone: '0901234567',
      birthDate: '2000-01-01',
      address: 'Hồ Chí Minh',
      admissionDate: '2023-09-01',
      status: 'Đang học'
    },
    scholarship: {
      current: {
        name: 'Học bổng khuyến khích học tập',
        amount: 5000000,
        type: 'merit',
        startDate: '2024-01-01',
        endDate: '2024-06-30'
      },
      history: [
        {
          name: 'Học bổng tân sinh viên',
          amount: 3000000,
          type: 'admission',
          startDate: '2023-09-01',
          endDate: '2023-12-31'
        }
      ]
    },
    program: {
      name: 'Khoa học máy tính',
      code: 'CS',
      totalCredits: 130,
      completedCredits: 30,
      courses: [
        {
          code: 'CS101',
          name: 'Nhập môn lập trình',
          credits: 3,
          status: 'completed',
          grade: 'A'
        },
        {
          code: 'CS102',
          name: 'Cấu trúc dữ liệu',
          credits: 4,
          status: 'in_progress'
        }
      ]
    },
    tuition: {
      currentTerm: {
        term: 'HK2 2023-2024',
        amount: 15000000,
        paid: 15000000,
        status: 'paid',
        dueDate: '2024-02-15'
      },
      history: [
        {
          term: 'HK1 2023-2024',
          amount: 15000000,
          paid: 15000000,
          status: 'paid',
          dueDate: '2023-09-15'
        }
      ]
    }
  };

  const tabs = [
    {
      name: 'Thông tin cá nhân',
      icon: RiUserLine,
      content: <PersonalInfo data={studentData.personal} />
    },
    {
      name: 'Học bổng',
      icon: RiMoneyDollarCircleLine,
      content: <ScholarshipInfo data={studentData.scholarship} />
    },
    {
      name: 'Ngành học',
      icon: RiBookOpenLine,
      content: <ProgramInfo data={studentData.program} />
    },
    {
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
            <RiUserLine className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {studentData.personal.fullName}
            </h1>
            <p className="text-gray-600">
              MSSV: {studentData.personal.studentId} • {studentData.program.name}
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
                key={tab.name}
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
            {tabs.map((tab, idx) => (
              <Tab.Panel key={idx}>{tab.content}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

function PersonalInfo({ data }) {
  const fields = [
    { label: 'Mã số sinh viên', value: data.studentId },
    { label: 'Họ và tên', value: data.fullName },
    { label: 'Email', value: data.email },
    { label: 'Số điện thoại', value: data.phone },
    { label: 'Ngày sinh', value: new Date(data.birthDate).toLocaleDateString('vi-VN') },
    { label: 'Địa chỉ', value: data.address },
    { label: 'Ngày nhập học', value: new Date(data.admissionDate).toLocaleDateString('vi-VN') },
    { label: 'Trạng thái', value: data.status }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div key={field.label}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type="text"
            readOnly
            value={field.value}
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
              {data.courses.map((course) => (
                <tr key={course.code}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.credits}
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

      {/* Payment History */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Lịch sử đóng học phí
        </h3>
        <div className="space-y-4">
          {data.history.map((term, index) => (
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
        </div>
      </div>
    </div>
  );
}

export default StudentInfo;