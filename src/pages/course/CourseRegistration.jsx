import { useState, useEffect } from 'react';
import { getCourseAPI, registerCourseAPI } from '../../apis/courseAPI';
import { toast } from 'react-toastify';

function CourseRegistration() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    credits: '',
    weekday: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourseAPI();
      setCourses(response.data.items);
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast.error('Không thể tải danh sách môn học. Vui lòng thử lại sau!');
    }
  };

  const handleSelectCourse = (course) => {
    if (selectedCourses.some(c => c.courseOfferingId === course.courseOfferingId)) {
      setSelectedCourses(selectedCourses.filter(c => c.courseOfferingId !== course.courseOfferingId));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRegisterCourses = async () => {
    setIsLoading(true);
    try {
      // Đăng ký từng môn học
      for (const course of selectedCourses) {
        console.log('Registering course:', course.courseOfferingId);
        await registerCourseAPI({ CourseOfferingId: course.courseOfferingId });
      }
      toast.success('Đăng ký môn học thành công!');
      setSelectedCourses([]); // Clear selection after successful registration
    } catch (error) {
      console.error('Error registering courses:', error);
      toast.error('Đăng ký môn học thất bại. Vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Danh sách môn học có thể đăng ký */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Danh sách môn học</h2>
            
            {/* Search and Filters */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Tìm kiếm môn học..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Course List */}
            <div className="divide-y">
              {courses.map((course) => {
                const isSelected = selectedCourses.some(c => c.courseOfferingId === course.courseOfferingId);
                
                return (
                  <div key={course.id} className="py-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectCourse(course)}
                            className="checkbox checkbox-primary"
                          />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {course.courseName}
                            </h3>
                            <div className="mt-1 text-sm text-gray-500">
                              <p>Mã môn: {course.courseCode}</p>
                              <p>Lớp: {course.className} • Giảng viên: {course.instructor}</p>
                              <p>Thời gian: {course.schedule} • Phòng: {course.room}</p>
                              <p>Số tín chỉ: {course.credits} • Sĩ số: {course.capacity - course.availableSlots}/{course.capacity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Môn học đã chọn */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Môn học đã chọn ({selectedCourses.length})
            </h2>
            <div className="space-y-4">
              {selectedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{course.courseName}</h3>
                    <p className="text-sm text-gray-500">Mã môn: {course.courseCode}</p>
                    <p className="text-sm text-gray-500">{course.schedule}</p>
                  </div>
                  <button
                    onClick={() => handleSelectCourse(course)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Bỏ chọn
                  </button>
                </div>
              ))}
              {selectedCourses.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  Chưa có môn học nào được chọn
                </p>
              )}
            </div>

            {/* Tổng kết và nút đăng ký */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between text-sm">
                <span>Tổng số môn:</span>
                <span>{selectedCourses.length}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>Tổng số tín chỉ:</span>
                <span>{selectedCourses.reduce((sum, course) => sum + course.credits, 0)}</span>
              </div>
              
              <button
                onClick={handleRegisterCourses}
                disabled={isLoading || selectedCourses.length === 0}
                className="btn btn-primary w-full mt-4"
              >
                {isLoading ? 'Đang xử lý...' : 'Xác nhận đăng ký'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;

