import React, { useEffect, useState } from 'react';
import { getSemestersAPI, createCourseOfferingsAPI } from '../../../apis/termAPI';
import { getCourseStaffAPI } from '../../../apis/courseAPI';
import { getProfesserAPI } from '../../../apis/professerAPI';

function CourseScheduleManagement() {
  const [formData, setFormData] = useState({
    semesterId: '',
    offerings: [{ courseId: '', capacity: 40, instructorId: '', schedules: [{ dayOfWeek: 'Monday', startTime: '', endTime: '' }] }],
  });
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [semestersRes, coursesRes, instructorsRes] = await Promise.all([
        getSemestersAPI(),
        getCourseStaffAPI(),
        getProfesserAPI(),
      ]);
      setSemesters(semestersRes.data);
      setCourses(coursesRes.data);
      setInstructors(instructorsRes.data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const handleAddOffering = () => {
    setFormData({
      ...formData,
      offerings: [...formData.offerings, { courseId: '', capacity: 40, instructorId: '', schedules: [{ dayOfWeek: 'Monday', startTime: '', endTime: '' }] }],
    });
  };

  const handleAddSchedule = (offeringIndex) => {
    const newOfferings = [...formData.offerings];
    newOfferings[offeringIndex].schedules.push({ dayOfWeek: 'Monday', startTime: '', endTime: '' });
    setFormData({ ...formData, offerings: newOfferings });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Định dạng thời gian: thêm ":00" vào startTime và endTime
      const formattedOfferings = formData.offerings.map(offering => ({
        ...offering,
        schedules: offering.schedules.map(schedule => ({
          ...schedule,
          startTime: schedule.startTime ? `${schedule.startTime}:00` : '',
          endTime: schedule.endTime ? `${schedule.endTime}:00` : ''
        }))
      }));

      // Bọc dữ liệu trong trường 'request' như API yêu cầu
      const requestData = {
        request: {
          semesterId: formData.semesterId,
          offerings: formattedOfferings
        }
      };

      // Gửi dữ liệu đến API
      await createCourseOfferingsAPI(requestData);
      console.log('Course offerings created');
    } catch (error) {
      console.error('Error creating course offerings:', error);
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Thiết lập môn học và thời khóa biểu</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="label">Kỳ học</label>
          <select
            className="select select-bordered w-full"
            value={formData.semesterId}
            onChange={(e) => setFormData({ ...formData, semesterId: e.target.value })}
          >
            <option value="">Chọn kỳ học</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
            ))}
          </select>
        </div>
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Danh sách môn học</h3>
            <button type="button" className="btn btn-primary btn-sm" onClick={handleAddOffering}>Thêm môn học</button>
          </div>
          {formData.offerings.map((offering, offeringIndex) => (
            <div key={offeringIndex} className="border-b pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="label">Môn học</label>
                  <select
                    className="select select-bordered w-full"
                    value={offering.courseId}
                    onChange={(e) => {
                      const newOfferings = [...formData.offerings];
                      newOfferings[offeringIndex].courseId = e.target.value;
                      setFormData({ ...formData, offerings: newOfferings });
                    }}
                  >
                    <option value="">Chọn môn học</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>{course.courseName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Giảng viên</label>
                  <select
                    className="select select-bordered w-full"
                    value={offering.instructorId}
                    onChange={(e) => {
                      const newOfferings = [...formData.offerings];
                      newOfferings[offeringIndex].instructorId = e.target.value;
                      setFormData({ ...formData, offerings: newOfferings });
                    }}
                  >
                    <option value="">Chọn giảng viên</option>
                    {instructors.map((instructor) => (
                      <option key={instructor.id} value={instructor.id}>{instructor.fullName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Sĩ số tối đa</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={offering.capacity}
                    onChange={(e) => {
                      const newOfferings = [...formData.offerings];
                      newOfferings[offeringIndex].capacity = parseInt(e.target.value);
                      setFormData({ ...formData, offerings: newOfferings });
                    }}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Lịch học</h4>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleAddSchedule(offeringIndex)}>Thêm lịch học</button>
                </div>
                {offering.schedules.map((schedule, scheduleIndex) => (
                  <div key={scheduleIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="label">Thứ</label>
                      <select
                        className="select select-bordered w-full"
                        value={schedule.dayOfWeek}
                        onChange={(e) => {
                          const newOfferings = [...formData.offerings];
                          newOfferings[offeringIndex].schedules[scheduleIndex].dayOfWeek = e.target.value;
                          setFormData({ ...formData, offerings: newOfferings });
                        }}
                      >
                        {daysOfWeek.map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Giờ bắt đầu</label>
                      <input
                        type="time"
                        className="input input-bordered w-full"
                        value={schedule.startTime}
                        onChange={(e) => {
                          const newOfferings = [...formData.offerings];
                          newOfferings[offeringIndex].schedules[scheduleIndex].startTime = e.target.value;
                          setFormData({ ...formData, offerings: newOfferings });
                        }}
                      />
                    </div>
                    <div>
                      <label className="label">Giờ kết thúc</label>
                      <input
                        type="time"
                        className="input input-bordered w-full"
                        value={schedule.endTime}
                        onChange={(e) => {
                          const newOfferings = [...formData.offerings];
                          newOfferings[offeringIndex].schedules[scheduleIndex].endTime = e.target.value;
                          setFormData({ ...formData, offerings: newOfferings });
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Lưu thời khóa biểu</button>
      </form>
    </div>
  );
}

export default CourseScheduleManagement;