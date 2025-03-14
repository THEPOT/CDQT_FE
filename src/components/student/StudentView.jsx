import React from 'react';
import { Tab } from '@headlessui/react';
import StudentInfo from './tabs/StudentInfo';
import ScholarshipInfo from './tabs/ScholarshipInfo';
import ProgramInfo from './tabs/ProgramInfo';
import TranscriptInfo from './tabs/TranscriptInfo';

function StudentView({ studentData }) {
  const tabs = [
    { name: 'Thông tin cá nhân', component: <StudentInfo data={studentData} /> },
    { name: 'Học bổng', component: <ScholarshipInfo data={studentData} /> },
    { name: 'Ngành học', component: <ProgramInfo data={studentData} /> },
    { name: 'Kết quả học tập', component: <TranscriptInfo data={studentData} /> }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Thông tin sinh viên</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected 
                  ? 'bg-white text-blue-700 shadow'
                  : 'text-gray-700 hover:bg-white/[0.12] hover:text-gray-900'
                }`
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-4">
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl bg-white p-4 shadow-lg"
            >
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default StudentView; 