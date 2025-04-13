import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import StudentInfo from './pages/student/StudentInfo';
import CourseRegistration from "./pages/course/CourseRegistration.jsx";
import CourseInfo from './pages/course/CourseInfo';
import Transcript from './pages/student/Transcript';
import DegreeAudit from './pages/student/DegreeAudit';
import Services from './pages/Services';
import CourseEvaluation from './pages/course/CourseEvaluation.jsx'; 
import StudentInformationManagement from './pages/admin/StudentInformationManagement';
import CourseManagement from './pages/admin/CourseManagement';
import Settings from './pages/Settings';
import ClassManagement from './components/teacher/ClassManagement';
import GradeManagement from './components/teacher/GradeManagement';
import RequestManagement from './components/staff/RequestManagement';
import TermManagement from './pages/staff/TermManagement/TermManagement.jsx';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/student-management" element={<StudentInformationManagement />} />
            <Route path="/course-management" element={<CourseManagement />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Student Routes */}
            <Route path="/student-info" element={<StudentInfo />} />
            <Route path="/course-registration" element={<CourseRegistration />} />
            <Route path="/course-info" element={<CourseInfo />} />
            <Route path="/transcript" element={<Transcript />} />
            <Route path="/degree-audit" element={<DegreeAudit />} />
            <Route path="/services" element={<Services />} />
            <Route path="/course-evaluation" element={<CourseEvaluation />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/class-management" element={<ClassManagement />} />
            <Route path="/grade-management" element={<GradeManagement />} />
            
            {/* Staff Routes */}
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/request-management" element={<RequestManagement />} />
            <Route path="/term-management" element={<TermManagement />} />
            {/* Fallback route */}
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;






