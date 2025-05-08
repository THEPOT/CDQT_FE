import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getStudentScheduleAPI } from '../../apis/studentAPI';

function MySchedule() {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = ['Tiết 1-2', 'Tiết 3-4', 'Tiết 5-6', 'Tiết 7-8', 'Tiết 9-10', 'Tiết 11-12', 'Khác'];

  // Generate years array (current year and 2 years before/after)
  const years = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);
  
  // Generate weeks array (1-52)
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  useEffect(() => {
    fetchSchedule();
  }, [selectedYear, selectedWeek]);

  const fetchSchedule = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentScheduleAPI(selectedYear, selectedWeek);
      setSchedule(response.data.items || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      toast.error('Không thể tải lịch học. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper: Convert time string "HH:mm" to minutes since 00:00
  function timeToMinutes(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  // Helper: Get period index (0-5) for a given startTime
  function getTimeSlot(startTime) {
    // Periods: 7:00, 10:00, 13:00, 16:00, 19:00, 21:00
    const periodStartMinutes = [420, 600, 780, 960, 1140, 1260]; // 7:00, 10:00, ...
    const start = timeToMinutes(startTime);
    for (let i = 0; i < periodStartMinutes.length; i++) {
      // Each period is 90 minutes
      if (start >= periodStartMinutes[i] && start < periodStartMinutes[i] + 90) return i;
    }
    return null; // Not in any period
  }

  function getScheduleCell(weekday, period) {
    if (period < 6) {
      // Các tiết bình thường
      const courses = schedule.filter(course =>
        course.schedule.some(s =>
          s.dayOfWeek === weekdays[weekday] &&
          getTimeSlot(s.startTime) === period
        )
      );
      if (!courses.length) return null;
      return (
        <div className="flex flex-col gap-2">
          {courses.map(course => {
            const s = course.schedule.find(s =>
              s.dayOfWeek === weekdays[weekday] && getTimeSlot(s.startTime) === period
            );
            return (
              <div key={course.courseRegistrationId} className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-900">{course.courseName}</p>
                <p className="text-sm text-blue-700">{course.courseCode}</p>
                <p className="text-sm text-blue-600">Phòng: {course.classroom}</p>
                <p className="text-sm text-blue-600">GV: {course.professorName}</p>
                <p className="text-xs text-blue-500">
                  {s?.startTime} - {s?.endTime}
                </p>
              </div>
            );
          })}
        </div>
      );
    } else {
      // Dòng "Khác"
      const courses = schedule.filter(course =>
        course.schedule.some(s =>
          s.dayOfWeek === weekdays[weekday] &&
          getTimeSlot(s.startTime) === null
        )
      );
      if (!courses.length) return null;
      return (
        <div className="flex flex-col gap-2">
          {courses.map(course => {
            const s = course.schedule.find(s =>
              s.dayOfWeek === weekdays[weekday] && getTimeSlot(s.startTime) === null
            );
            return (
              <div key={course.courseRegistrationId} className="p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-medium text-yellow-900">{course.courseName}</p>
                <p className="text-sm text-yellow-700">{course.courseCode}</p>
                <p className="text-sm text-yellow-600">Phòng: {course.classroom}</p>
                <p className="text-sm text-yellow-600">GV: {course.professorName}</p>
                <p className="text-xs text-yellow-500">
                  {s?.startTime} - {s?.endTime}
                </p>
              </div>
            );
          })}
        </div>
      );
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lịch học của tôi</h1>
        
        <div className="flex gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Năm học</span>
            </label>
            <select 
              className="select select-bordered w-full max-w-xs"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tuần</span>
            </label>
            <select 
              className="select select-bordered w-full max-w-xs"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
            >
              {weeks.map(week => (
                <option key={week} value={week}>Tuần {week}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 p-2">Tiết</th>
              {weekdays.map((day, index) => (
                <th key={index} className="border border-gray-300 bg-gray-100 p-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map((period, periodIndex) => (
              <tr key={periodIndex}>
                <td className="border border-gray-300 bg-gray-50 p-2 font-medium">
                  {period}
                </td>
                {weekdays.map((_, weekdayIndex) => (
                  <td key={weekdayIndex} className="border border-gray-300 p-2">
                    {getScheduleCell(weekdayIndex, periodIndex)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MySchedule;