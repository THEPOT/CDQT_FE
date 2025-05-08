import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getStudentScheduleAPI } from '../../apis/studentAPI';

function MySchedule() {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = ['Tiết 1-2', 'Tiết 3-4', 'Tiết 5-6', 'Tiết 7-8', 'Tiết 9-10', 'Tiết 11-12'];

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

  const getTimeSlot = (startTime, endTime) => {
    // Convert time to period index (0-5)
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]);
    
    // Map hours to periods
    const periodMap = {
      7: 0,  // 7:00-8:30 -> Period 1-2
      8: 0,  // 8:30-10:00 -> Period 1-2
      10: 1, // 10:00-11:30 -> Period 3-4
      11: 1, // 11:30-13:00 -> Period 3-4
      13: 2, // 13:00-14:30 -> Period 5-6
      14: 2, // 14:30-16:00 -> Period 5-6
      16: 3, // 16:00-17:30 -> Period 7-8
      17: 3, // 17:30-19:00 -> Period 7-8
      19: 4, // 19:00-20:30 -> Period 9-10
      20: 4, // 20:30-22:00 -> Period 9-10
    };

    return periodMap[startHour] || 0;
  };

  const getScheduleCell = (weekday, period) => {
    const course = schedule.find(course => 
      course.schedule.some(schedule => 
        schedule.dayOfWeek === weekdays[weekday] && 
        getTimeSlot(schedule.startTime, schedule.endTime) === period
      )
    );

    if (!course) return null;

    return (
      <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
        <p className="font-medium text-blue-900">{course.courseName}</p>
        <p className="text-sm text-blue-700">{course.courseCode}</p>
        <p className="text-sm text-blue-600">Phòng: {course.classroom}</p>
        <p className="text-sm text-blue-600">GV: {course.professorName}</p>
        <p className="text-xs text-blue-500">
          {course.schedule.find(s => s.dayOfWeek === weekdays[weekday])?.startTime} - 
          {course.schedule.find(s => s.dayOfWeek === weekdays[weekday])?.endTime}
        </p>
      </div>
    );
  };

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