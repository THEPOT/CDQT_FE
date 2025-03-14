import React, { useState } from 'react';
import { FiSearch, FiDownload, FiChevronDown } from 'react-icons/fi';

function CourseFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filters, setFilters] = useState({
    department: '',
    credits: '',
    semester: ''
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tìm kiếm Môn học</h1>
      
      <SearchSection 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      
      <CourseList 
        searchQuery={searchQuery}
        filters={filters}
        onSelectCourse={setSelectedCourse}
      />

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}

function SearchSection({ searchQuery, setSearchQuery, filters, setFilters }) {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="input-group w-full">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã môn hoặc tên môn..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-square">
              <FiSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="select select-bordered w-full"
          value={filters.department}
          onChange={(e) => setFilters({...filters, department: e.target.value})}
        >
          <option value="">Tất cả khoa</option>
          <option value="CS">Khoa học máy tính</option>
          <option value="SE">Kỹ thuật phần mềm</option>
          <option value="IS">Hệ thống thông tin</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={filters.credits}
          onChange={(e) => setFilters({...filters, credits: e.target.value})}
        >
          <option value="">Số tín chỉ</option>
          <option value="2">2 tín chỉ</option>
          <option value="3">3 tín chỉ</option>
          <option value="4">4 tín chỉ</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={filters.semester}
          onChange={(e) => setFilters({...filters, semester: e.target.value})}
        >
          <option value="">Học kỳ</option>
          <option value="1">Học kỳ 1</option>
          <option value="2">Học kỳ 2</option>
          <option value="3">Học kỳ 3</option>
        </select>
      </div>
    </div>
  );
}

function CourseList({ searchQuery, filters, onSelectCourse }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Sample course cards - replace with actual data */}
      <CourseCard
        course={{
          code: 'CS101',
          name: 'Nhập môn lập trình',
          credits: 3,
          department: 'Khoa học máy tính',
          description: 'Môn học cơ bản về lập trình...'
        }}
        onSelect={onSelectCourse}
      />
    </div>
  );
}

function CourseCard({ course, onSelect }) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title text-lg">{course.name}</h2>
            <p className="text-sm text-gray-500">Mã môn: {course.code}</p>
          </div>
          <span className="badge badge-primary">{course.credits} tín chỉ</span>
        </div>
        
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {course.description}
        </p>
        
        <div className="card-actions justify-end mt-4">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onSelect(course)}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseDetailModal({ course, onClose }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg mb-4">
          {course.name}
          <span className="text-sm text-gray-500 ml-2">({course.code})</span>
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Thông tin chung</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Khoa</p>
                <p>{course.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số tín chỉ</p>
                <p>{course.credits}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Mô tả môn học</h4>
            <p className="text-gray-700">{course.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Điều kiện tiên quyết</h4>
            {course.prerequisites?.length > 0 ? (
              <ul className="list-disc list-inside">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Không có điều kiện tiên quyết</p>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-2">Tiêu chuẩn đầu ra</h4>
            {course.learningOutcomes?.length > 0 ? (
              <ul className="list-decimal list-inside">
                {course.learningOutcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Chưa cập nhật</p>
            )}
          </div>
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Đóng
          </button>
          <button className="btn btn-primary">
            <FiDownload className="mr-2" />
            Tải đề cương
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseFinder; 