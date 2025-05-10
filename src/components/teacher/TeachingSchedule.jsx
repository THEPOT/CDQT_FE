import React, { useState, useEffect } from 'react';
import { getProfessorScheduleAPI } from '../../apis/professerAPI';

function TeachingSchedule() {
  const [view, setView] = useState('list');
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [localSchedule, setLocalSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [
    { label: 'Tiết 1-2', start: '07:00', end: '08:30' },
    { label: 'Tiết 3-4', start: '09:00', end: '10:30' },
    { label: 'Tiết 5-6', start: '13:00', end: '14:30' },
    { label: 'Tiết 7-8', start: '15:00', end: '16:30' },
    { label: 'Tiết 9-10', start: '18:00', end: '19:30' },
    { label: 'Tiết 11-12', start: '19:45', end: '21:15' }
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  // Use useEffect to fetch schedule when component mounts or when year/week changes
  useEffect(() => {
    fetchSchedule();
  }, [selectedYear, selectedWeek]);

  const fetchSchedule = async () => {
    setIsLoading(true);
    try {
      console.log(`Fetching schedule for year: ${selectedYear}, week: ${selectedWeek}`);
      const response = await getProfessorScheduleAPI(selectedYear, selectedWeek);
      
      // Check response structure and handle accordingly
      if (response && response.data) {
        const scheduleData = response.data.items || response.data || [];
        setLocalSchedule(scheduleData);
        console.log('Schedule data fetched successfully:', scheduleData);
      } else {
        console.error('Invalid response format:', response);
        setLocalSchedule([]);
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setLocalSchedule([]);
    } finally {
      setIsLoading(false);
    }
  };

  function timeToMinutes(time) {
    if (!time) return 0;
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  function findPeriodForTime(time) {
    if (!time) return -1;
    
    // Convert time to 24-hour format if needed
    let adjustedTime = time;
    const [hours, mins] = time.split(':').map(Number);
    
    // If hours is between 1-6, assume it's afternoon (13:00-18:00)
    if (hours >= 1 && hours <= 6) {
      adjustedTime = `${hours+12}:${mins.toString().padStart(2, '0')}`;
    }
    
    const totalMinutes = timeToMinutes(adjustedTime);
    
    // First try exact matches with our predefined periods
    for (let i = 0; i < periods.length; i++) {
      const periodStart = timeToMinutes(periods[i].start);
      const periodEnd = timeToMinutes(periods[i].end);
      
      if (totalMinutes >= periodStart && totalMinutes <= periodEnd) {
        return i;
      }
    }
    
    let closestPeriod = 0;
    let minDifference = Infinity;
    
    for (let i = 0; i < periods.length; i++) {
      const periodMidpoint = (timeToMinutes(periods[i].start) + timeToMinutes(periods[i].end)) / 2;
      const difference = Math.abs(totalMinutes - periodMidpoint);
      
      if (difference < minDifference) {
        minDifference = difference;
        closestPeriod = i;
      }
    }
    
    return closestPeriod;
  }

  // Grid cell rendering
  function getScheduleCell(weekday, periodIndex) {
    const safeSchedule = Array.isArray(localSchedule) ? localSchedule : [];
    const dayName = weekdays[weekday];
    // Lọc tất cả các session đúng thứ và tiết
    const sessionsInCell = [];
    safeSchedule.forEach(course => {
      (course.sessions || []).forEach(session => {
        if (
          session.dayOfWeek === dayName &&
          findPeriodForTime(session.startTime) === periodIndex
        ) {
          sessionsInCell.push({ course, session });
        }
      });
    });
    if (!sessionsInCell.length) return null;
    return (
      <div className="flex flex-col gap-2">
        {sessionsInCell.map(({ course, session }, idx) => (
          <div key={idx} className="p-2 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-medium text-blue-900">{course.courseName}</p>
            <p className="text-sm text-blue-700">{course.courseCode}</p>
            <p className="text-xs text-blue-600">{session.date}</p>
            <p className="text-xs text-blue-500">{session.startTime} - {session.endTime}</p>
            <p className="text-xs text-gray-500">{session.status}</p>
          </div>
        ))}
      </div>
    );
  }

  // Grid view
  function renderGridView() {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100"></th>
              {weekdays.map(day => (
                <th key={day} className="border p-2 bg-gray-100">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period, periodIndex) => (
              <tr key={period.label}>
                <td className="border p-2 bg-gray-50 font-medium">
                  {period.label}<br/>
                  <span className="text-xs text-gray-500">{period.start}-{period.end}</span>
                </td>
                {weekdays.map((_, dayIndex) => (
                  <td key={dayIndex} className="border p-2 min-w-48 h-32 align-top">
                    {getScheduleCell(dayIndex, periodIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // List view
  function renderListView() {
    const safeSchedule = Array.isArray(localSchedule) ? localSchedule : [];
    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Mã lớp</th>
              <th className="p-2">Tên môn học</th>
              <th className="p-2">Tín chỉ</th>
              <th className="p-2">Học kỳ</th>
              <th className="p-2">Lịch học</th>
              <th className="p-2">Các buổi dạy</th>
            </tr>
          </thead>
          <tbody>
            {safeSchedule.map((course, idx) => (
              <tr key={course.classSectionId || idx} className="border-b">
                <td className="p-2">{course.courseCode}</td>
                <td className="p-2">{course.courseName}</td>
                <td className="p-2">{course.credits}</td>
                <td className="p-2">{course.semesterName}</td>
                <td className="p-2">
                  {Array.isArray(course.schedule) && course.schedule.length > 0
                    ? course.schedule.map((s, i) => (
                        <div key={i} className="mb-1">
                          {s.dayOfWeek}: {s.startTime}-{s.endTime}
                        </div>
                      ))
                    : '-'}
                </td>
                <td className="p-2">
                  {Array.isArray(course.sessions) && course.sessions.length > 0
                    ? course.sessions.map((s, i) => (
                        <div key={i} className="mb-1">
                          {s.date} ({s.dayOfWeek}) {s.startTime}-{s.endTime} <span className="text-xs text-gray-500">{s.status}</span>
                        </div>
                      ))
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Lịch giảng dạy</h1>
        <div className="flex gap-2 border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Danh sách
          </button>
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Lịch biểu
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mb-4">
        <div className="form-control w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Năm học
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedYear}
            onChange={(e) => {
              const newYear = Number(e.target.value);
              setSelectedYear(newYear);
            }}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="form-control w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tuần
          </label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedWeek}
            onChange={(e) => {
              const newWeek = Number(e.target.value);
              setSelectedWeek(newWeek);
            }}
          >
            {weeks.map(week => (
              <option key={week} value={week}>Tuần {week}</option>
            ))}
          </select>
        </div>
        <div className="self-end">
          <button
            onClick={fetchSchedule}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Cập nhật
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <>
          {view === 'list' ? renderListView() : renderGridView()}
          {Array.isArray(localSchedule) && localSchedule.length === 0 && (
            <div className="text-center py-4 text-gray-500">Không có lịch giảng dạy trong tuần đã chọn</div>
          )}
        </>
      )}
    </div>
  );
}

export default TeachingSchedule;