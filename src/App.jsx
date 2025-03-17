import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import StudentInfo from './pages/StudentInfo';
import CourseRegistration from './pages/CourseRegistration';
import CourseInfo from './pages/CourseInfo';
import Transcript from './pages/Transcript';
import DegreeAudit from './pages/DegreeAudit';
import Services from './pages/Services';
import CourseEvaluation from './pages/CourseEvaluation';
import StudentInformationManagement from './pages/StudentInformationManagement';
import TeacherDashboard from './pages/TeacherDashboard';
import ClassManagement from './components/teacher/ClassManagement';
import GradeManagement from './components/teacher/GradeManagement';
import StaffDashboard from './pages/StaffDashboard';
import RequestManagement from './components/staff/RequestManagement';

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
            <Route path="/" element={<Home />} />
            
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
            
            {/* Admin Routes */}
            <Route path="/student-management" element={<StudentInformationManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;