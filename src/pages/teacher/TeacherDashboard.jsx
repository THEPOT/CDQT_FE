import React from 'react';
import { RiBookOpenLine, RiUserLine, RiFileList3Line } from 'react-icons/ri';

function TeacherDashboard() {
  const teacherData = {
    name: 'Dr. Smith',
    department: 'Computer Science',
    courses: [
      {
        id: 'CS101',
        name: 'Introduction to Programming',
        students: 45,
        schedule: 'Monday (7:30 - 9:30)',
        room: 'A101',
        progress: '6/15 weeks'
      },
      {
        id: 'CS102',
        name: 'Data Structures',
        students: 38,
        schedule: 'Tuesday (9:45 - 11:45)',
        room: 'B203',
        progress: '5/15 weeks'
      }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      
      {/* Teacher Info Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{teacherData.name}</h2>
        <p className="text-gray-600">{teacherData.department}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <RiBookOpenLine className="text-blue-500 text-2xl mb-2" />
          <h3 className="font-semibold">Active Courses</h3>
          <p className="text-2xl">{teacherData.courses.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <RiUserLine className="text-green-500 text-2xl mb-2" />
          <h3 className="font-semibold">Total Students</h3>
          <p className="text-2xl">
            {teacherData.courses.reduce((acc, course) => acc + course.students, 0)}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <RiFileList3Line className="text-purple-500 text-2xl mb-2" />
          <h3 className="font-semibold">Upcoming Classes</h3>
          <p className="text-2xl">3</p>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-6 border-b">Current Courses</h2>
        <div className="divide-y">
          {teacherData.courses.map(course => (
            <div key={course.id} className="p-6">
              <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Course ID:</span>
                  <p>{course.id}</p>
                </div>
                <div>
                  <span className="text-gray-600">Students:</span>
                  <p>{course.students}</p>
                </div>
                <div>
                  <span className="text-gray-600">Schedule:</span>
                  <p>{course.schedule}</p>
                </div>
                <div>
                  <span className="text-gray-600">Room:</span>
                  <p>{course.room}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-gray-600">Progress:</span>
                <p>{course.progress}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;