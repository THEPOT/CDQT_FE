import React, { useState, useEffect } from 'react';

function StudentInformationManagement() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filters, setFilters] = useState({
    batch: '',
    program: '',
    scholarship: '',
    tuitionStatus: ''
  });

  // Mock data - In a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockStudents = [
        {
          id: 1,
          studentId: '2023001',
          fullName: 'Nguyễn Văn A',
          program: 'Kỹ thuật phần mềm',
          batch: '2023',
          email: 'vana@example.com',
          phone: '0901234567',
          admissionDate: '01/09/2023',
          status: 'Đang học',
          tuitionStatus: 'Đã thanh toán',
          scholarship: 'Học bổng khuyến khích học tập',
          scholarshipAmount: '5,000,000 VND',
          gpa: 3.65
        },
        {
          id: 2,
          studentId: '2023002',
          fullName: 'Trần Thị B',
          program: 'Khoa học máy tính',
          batch: '2023',
          email: 'thib@example.com',
          phone: '0901234568',
          admissionDate: '01/09/2023',
          status: 'Đang học',
          tuitionStatus: 'Chưa thanh toán',
          scholarship: 'Không',
          scholarshipAmount: '0 VND',
          gpa: 3.25
        }
      ];
      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = students.filter(student => {
      const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.studentId.includes(searchTerm) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = (!filters.batch || student.batch === filters.batch) &&
                            (!filters.program || student.program === filters.program) &&
                            (!filters.scholarship || student.scholarship === filters.scholarship) &&
                            (!filters.tuitionStatus || student.tuitionStatus === filters.tuitionStatus);
      
      return matchesSearch && matchesFilters;
    });
    
    setFilteredStudents(filtered);
  }, [searchTerm, filters, students]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      batch: '',
      program: '',
      scholarship: '',
      tuitionStatus: ''
    });
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleExportToExcel = () => {
    alert('Xuất file Excel đang được xử lý...');
    // In a real app, this would generate and download an Excel file
  };

  return (
    <div>
      {/* Add your JSX for the student management interface here */}
      <h1>Student Information Management</h1>
      {/* Add the rest of your component's JSX */}
    </div>
  );
}

export default StudentInformationManagement;