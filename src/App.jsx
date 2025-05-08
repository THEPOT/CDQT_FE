import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Login from './pages/Login.jsx';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import StudentInfo from './pages/student/StudentInfo';
import CourseRegistration from "./pages/course/CourseRegistration.jsx";
import CourseInfo from './pages/course/CourseInfo';
import Transcript from './pages/student/Transcript';
import DegreeAudit from './pages/student/DegreeAudit';
import Services from './pages/Services';
import CourseEvaluation from './components/evaluation/CourseEvaluation';
import StudentInformationManagement from './pages/admin/StudentInformationManagement';
import CourseManagement from './pages/admin/CourseManagement';
import Settings from './pages/Settings';
import ClassManagement from './components/teacher/ClassManagement';
import GradeManagement from './components/teacher/GradeManagement';
import RequestManagement from './components/staff/RequestManagement';
import TermManagement from './pages/staff/TermManagement/TermManagement';
import Dashboard from './pages/Dashboard';
import AdminEvaluationManagement from './components/evaluation/AdminEvaluationManagement';
import CourseManagementProfessor from './components/professor/CourseManagement';
import ProfessorManagement from './pages/admin/ProfessorManagement';

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
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="evaluations" element={<CourseEvaluation />} />
            <Route path="evaluation-management" element={<AdminEvaluationManagement />} />
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/student-management" element={<StudentInformationManagement />} />
            <Route path="/course-management" element={<CourseManagement />} />
            <Route path="/professor-management" element={<ProfessorManagement />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Student Routes */}
            <Route path="/student-info" element={<StudentInfo />} />
            <Route path="/course-registration" element={<CourseRegistration />} />
            <Route path="/course-info" element={<CourseInfo />} />
            <Route path="/transcript" element={<Transcript />} />
            <Route path="/degree-audit" element={<DegreeAudit />} />
            <Route path="/services" element={<Services />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/my-classes" element={<ClassManagement />} />
            <Route path="/grade-management" element={<GradeManagement />} />
            <Route path="/courses" element={<CourseManagementProfessor />} />
            
            {/* Staff Routes */}
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/request-management" element={<RequestManagement />} />
            <Route path="/term-management" element={<TermManagement />} />
            <Route path="/staff-course-management" element={<CourseManagement />} />
            {/* Fallback route */}
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;






