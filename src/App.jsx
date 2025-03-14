import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentInfo from "./pages/StudentInfo";
import CourseRegistration from "./pages/CourseRegistration";
import Transcript from "./pages/Transcript";
import StudentInformationManagement from "./pages/StudentInformationManagement"; // Add import
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import GuestRoute from "./components/GuestRoute";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Route công khai */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          {/* Route được bảo vệ */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-info"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentInfo />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-management"
            element={
              <ProtectedRoute>
                <Layout>
                  <StudentInformationManagement />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/course-registration"
            element={
              <ProtectedRoute>
                <Layout>
                  <CourseRegistration />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/transcript"
            element={
              <ProtectedRoute>
                <Layout>
                  <Transcript />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;