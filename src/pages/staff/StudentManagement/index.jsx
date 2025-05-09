import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FiUsers, FiDollarSign, FiAward } from 'react-icons/fi';
import StudentList from './StudentList';
import ScholarshipManagement from './ScholarshipManagement';
import TuitionManagement from './TuitionManagement';

function StudentManagement() {
  const tabs = [
    { name: 'Danh sách sinh viên', icon: FiUsers, component: <StudentList /> },
    { name: 'Quản lý học bổng', icon: FiAward, component: <ScholarshipManagement /> },
    { name: 'Quản lý học phí', icon: FiDollarSign, component: <TuitionManagement /> }
  ];

  return (
    <div className="container mx-auto p-4">
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mb-6">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 flex items-center justify-center gap-2 ${
                  selected ? 'bg-white text-blue-700 shadow' : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
                }`
              }
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx}>{tab.component}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default StudentManagement;