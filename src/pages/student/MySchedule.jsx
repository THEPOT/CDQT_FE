import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getStudentScheduleAPI } from '../../apis/studentAPI';

function MySchedule() {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [view, setView] = useState('list'); // 'list' or 'grid'

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [
    { label: 'Tiết 1-2', start: '07:00', end: '08:30' },
    { label: 'Tiết 3-4', start: '09:00', end: '10:30' },
    { label: 'Tiết 5-6', start: '13:00', end: '14:30' },
    { label: 'Tiết 7-8', start: '15:00', end: '16:30' },
    { label: 'Tiết 9-10', start: '18:00', end: '19:30' },
    { label: 'Tiết 11-12', start: '19:45', end: '21:15' }
  ];

  // Generate years array (current year and 2 years before/after)
  const years = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);
  
  // Generate weeks array (1-52)
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1);

  useEffect(() => {
    console.log(`Effect triggered - Year: ${selectedYear}, Week: ${selectedWeek}`);
    // Sử dụng timeout để tránh quá nhiều request khi người dùng thay đổi giá trị nhanh
    const timeoutId = setTimeout(() => {
      fetchSchedule();
    }, 300);
    
    // Cleanup function để tránh race condition
    return () => clearTimeout(timeoutId);
  }, [selectedYear, selectedWeek]);

  const fetchSchedule = async () => {
    setIsLoading(true);
    try {
      const response = await getStudentScheduleAPI(selectedYear, selectedWeek);
      console.log("API Response:", response.data);
      setSchedule(response.data.items || response.data || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      toast.error('Không thể tải lịch học. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper: Convert time string "HH:mm" to minutes since 00:00
  function timeToMinutes(time) {
    if (!time) return 0;
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }

  // Improved: Find the appropriate period for a given time or create custom period
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

  function getWeekdayIndex(dayName) {
    return weekdays.indexOf(dayName);
  }

  function getScheduleCell(weekday, periodIndex) {
    const dayName = weekdays[weekday];
    
    const coursesInCell = schedule.filter(course => 
      course.schedule && course.schedule.some(slot => {
        if (slot.dayOfWeek !== dayName) return false;
        
        const period = findPeriodForTime(slot.startTime);
        return period === periodIndex;
      })
    );

    if (!coursesInCell.length) return null;

    return (
      <div className="flex flex-col gap-2">
        {coursesInCell.map(course => (
          <div key={course.courseRegistrationId} className="p-2 bg-blue-50 rounded-lg border border-blue-200">
            <p className="font-medium text-blue-900">{course.courseName}</p>
            <p className="text-sm text-blue-700">{course.courseCode}</p>
            <p className="text-sm text-blue-600">Phòng: {course.classroom}</p>
            <p className="text-sm text-blue-600">GV: {course.professorName}</p>
            {course.schedule.map((slot, idx) => {
              if (slot.dayOfWeek === dayName && findPeriodForTime(slot.startTime) === periodIndex) {
                return (
                  <p key={idx} className="text-xs text-blue-500">
                    {slot.startTime} - {slot.endTime}
                  </p>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    );
  }

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

  function renderListView() {
    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Mã môn</th>
              <th className="p-2">Tên môn học</th>
              <th className="p-2">Tín chỉ</th>
              <th className="p-2">Giảng viên</th>
              <th className="p-2">Phòng học</th>
              <th className="p-2">Lịch học</th>
              <th className="p-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((course, idx) => (
              <tr key={course.courseRegistrationId || idx} className="border-b">
                <td className="p-2">{course.courseCode}</td>
                <td className="p-2">{course.courseName}</td>
                <td className="p-2">{course.credits}</td>
                <td className="p-2">{course.professorName || '-'}</td>
                <td className="p-2">{course.classroom || '-'}</td>
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
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    course.status === 'Registered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {course.status || '-'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Lịch học của tôi</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="form-control w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Năm học
            </label>
            <select 
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              value={selectedYear}
              onChange={(e) => {
                const newYear = Number(e.target.value);
                console.log(`Year changed: ${selectedYear} -> ${newYear}`);
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
                console.log(`Week changed: ${selectedWeek} -> ${newWeek}`);
                setSelectedWeek(newWeek);
              }}
            >
              {weeks.map(week => (
                <option key={week} value={week}>Tuần {week}</option>
              ))}
            </select>
          </div>
          
          <div className="form-control w-full md:w-auto flex items-end">
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
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-lg text-gray-600">Đang tải lịch học...</p>
        </div>
      ) : schedule.length > 0 ? (
        view === 'list' ? renderListView() : renderGridView()
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Không có lịch học cho tuần {selectedWeek}, năm {selectedYear}</p>
          <button 
            onClick={fetchSchedule}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Tải lại dữ liệu
          </button>
        </div>
      )}
    </div>
  );
}

export default MySchedule;