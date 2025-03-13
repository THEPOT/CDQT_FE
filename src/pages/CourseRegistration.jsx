import React, { useState } from 'react';

function CourseRegistration() {
  const [availableCourses] = useState(['Toán', 'Lý', 'Hóa']);
  const [registeredCourses, setRegisteredCourses] = useState([]);

  const registerCourse = (course) => {
    setRegisteredCourses([...registeredCourses, course]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-white p-4">
        <h1 className="text-xl font-bold">Đăng ký môn học - Kỳ 1 2023</h1>
      </header>
      <div className="flex p-4 space-x-4">
        <div className="flex-1 bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Môn học có sẵn</h3>
          {availableCourses.map((course) => (
            <div key={course} className="flex justify-between items-center mb-2">
              <span>{course}</span>
              <button
                className="bg-accent text-white px-4 py-1 rounded-lg hover:bg-red-700"
                onClick={() => registerCourse(course)}
              >
                Đăng ký
              </button>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white p-4 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Môn đã đăng ký</h3>
          {registeredCourses.map((course) => (
            <div key={course} className="mb-2">{course}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;