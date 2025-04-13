// src/components/TermManagement/TermManagement.jsx
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FiCalendar, FiClock, FiUsers, FiBarChart2 } from 'react-icons/fi';
import SemesterManagement from './SemesterManagement';
import RegistrationPeriodManagement from './RegistrationPeriodManagement';
import CourseScheduleManagement from './CourseScheduleManagement';
import RegistrationStatistics from './RegistrationStatistics';

function TermManagement() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: 'Quản lý kỳ học', icon: FiCalendar },
    { name: 'Đợt đăng ký môn', icon: FiClock },
    { name: 'Môn học & Lịch học', icon: FiUsers },
    { name: 'Thống kê đăng ký', icon: FiBarChart2 },
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
                ${selected ? 'bg-white text-blue-700 shadow' : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'}`
              }
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel><SemesterManagement /></Tab.Panel>
          <Tab.Panel><RegistrationPeriodManagement /></Tab.Panel>
          <Tab.Panel><CourseScheduleManagement /></Tab.Panel>
          <Tab.Panel><RegistrationStatistics /></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default TermManagement;