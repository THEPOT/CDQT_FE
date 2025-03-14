export function exportStudentList(filters, data) {
  // Create CSV content
  const headers = [
    'MSSV',
    'Họ và tên',
    'Khóa',
    'Ngành',
    'Loại học bổng',
    'Mức học bổng'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map(student => [
      student.studentId,
      student.fullName,
      student.batch,
      student.program,
      student.scholarshipType,
      student.scholarshipAmount
    ].join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `student-list-${new Date().toISOString()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 