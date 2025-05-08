import React, { useState } from 'react';
import { FiExternalLink, FiFileText } from 'react-icons/fi';

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const slots = [
  { label: 'Slot 1', time: '7:00-9:15' },
  { label: 'Slot 2', time: '9:30-11:45' },
  { label: 'Slot 3', time: '12:30-14:45' },
  { label: 'Slot 4', time: '' },
  { label: 'Slot 5', time: '' },
  { label: 'Slot 6', time: '' },
  { label: 'Slot 7', time: '' },
  { label: 'Slot 8', time: '' },
];

// Sample data, replace with API data if needed
const timetable = [
  // slot, day, class info
  {
    slot: 0, day: 0,
    course: 'PRN232',
    room: '602',
    building: 'NVH',
    materials: true,
    location: 'Học tại nhà văn hóa Sinh viên, khu Đại học quốc gia',
    meetUrl: '',
    status: 'Not yet',
    time: '7:00-9:15'
  },
  {
    slot: 1, day: 0,
    course: 'MLN122',
    room: '606',
    building: 'NVH',
    materials: true,
    location: 'Học tại nhà văn hóa Sinh viên, khu Đại học quốc gia',
    meetUrl: '',
    status: 'Not yet',
    time: '9:30-11:45'
  },
  {
    slot: 2, day: 2,
    course: 'EXE201',
    room: '011',
    building: 'NVH',
    materials: true,
    location: 'Học tại nhà văn hóa Sinh viên, khu Đại học quốc gia',
    meetUrl: '',
    status: 'Not yet',
    time: '12:30-14:45',
    online: true
  },
  // Repeat for THU
  {
    slot: 0, day: 3,
    course: 'PRN232',
    room: '602',
    building: 'NVH',
    materials: true,
    location: 'Học tại nhà văn hóa Sinh viên, khu Đại học quốc gia',
    meetUrl: '',
    status: 'Not yet',
    time: '7:00-9:15'
  },
  {
    slot: 1, day: 3,
    course: 'MLN122',
    room: '606',
    building: 'NVH',
    materials: true,
    location: 'Học tại nhà văn hóa Sinh viên, khu Đại học quốc gia',
    meetUrl: '',
    status: 'Not yet',
    time: '9:30-11:45'
  },
];

function getClassBySlotDay(slot, day) {
  return timetable.find(item => item.slot === slot && item.day === day);
}

function ClassManagement() {
  const [year, setYear] = useState(2025);
  const [week, setWeek] = useState('21/07 To 27/07');

  return (
    <div className="p-4">
      {/* Header: Year, Week select */}
      <div className="flex items-center gap-4 mb-2">
        <label className="font-bold text-xs text-gray-700 mr-1">YEAR</label>
        <select
          className="select select-xs select-bordered"
          value={year}
          onChange={e => setYear(e.target.value)}
        >
          <option value={2025}>2025</option>
          <option value={2024}>2024</option>
        </select>
        <label className="font-bold text-xs text-gray-700 ml-4 mr-1">WEEK</label>
        <select
          className="select select-xs select-bordered"
          value={week}
          onChange={e => setWeek(e.target.value)}
        >
          <option value="21/07 To 27/07">21/07 To 27/07</option>
        </select>
      </div>

      {/* Calendar Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-xs">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="w-20"></th>
              {weekDays.map((d, i) => (
                <th key={i} className="px-2 py-2 text-center font-bold border-l border-blue-600">{d}</th>
              ))}
            </tr>
            <tr className="bg-blue-100 text-blue-900">
              <th></th>
              {weekDays.map((d, i) => (
                <th key={i} className="px-2 py-1 text-center border-l border-blue-200">
                  {['21/07','22/07','23/07','24/07','25/07','26/07','27/07'][i]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, slotIdx) => (
              <tr key={slotIdx} className="border-b">
                <td className="bg-blue-50 font-bold px-2 py-3 border-r border-blue-100">
                  {slot.label}
                </td>
                {weekDays.map((_, dayIdx) => {
                  const classItem = getClassBySlotDay(slotIdx, dayIdx);
                  return (
                    <td key={dayIdx} className="align-top px-2 py-2 min-w-[180px] border-l border-gray-100">
                      {classItem ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-800">{classItem.course}</span>
                            {classItem.materials && (
                              <a
                                href="#"
                                className="text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded hover:underline ml-1"
                              >
                                <FiFileText className="inline mr-1" />
                                View Materials
                              </a>
                            )}
                          </div>
                          <div className="text-xs text-gray-700">
                            at <span className="font-semibold">{classItem.building}</span>
                          </div>
                          <div className="text-xs text-blue-700">
                            {classItem.room} | {classItem.location}
                          </div>
                          <div>
                            <a
                              href={classItem.meetUrl || '#'}
                              className="inline-block text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded mt-1 mr-1"
                            >
                              Meet URL
                            </a>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                              (Not yet)
                            </span>
                            <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded">
                              ({classItem.time})
                            </span>
                          </div>
                          {classItem.online && (
                            <div className="flex items-center gap-1 mt-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                              <span className="text-xs text-green-700 font-semibold">Online</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassManagement;