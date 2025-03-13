import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import StudentInfo from './pages/StudentInfo';
import CourseRegistration from './pages/CourseRegistration';
import Transcript from './pages/Transcript';
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
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              </Layout>
            }
          />
          <Route
            path="/student-info"
            element={
              <Layout>
             
                  <StudentInfo />
           
              </Layout>
            }
          />
          <Route
            path="/course-registration"
            element={
              <Layout>
     
                  <CourseRegistration />

              </Layout>
            }
          />
          <Route
            path="/transcript"
            element={
              <Layout>

                  <Transcript />

              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
