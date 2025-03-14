import StudentView from './components/student/StudentView';

// In your page component:
function StudentPage() {
  const studentData = {
    // Your student data here
  };

  return <StudentView studentData={studentData} />;
}