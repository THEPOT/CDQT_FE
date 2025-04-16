import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsValidToken(false);
        setIsLoading(false);
        return;
      }

      try {
        jwtDecode(token);
        setIsValidToken(true);
      } catch (error) {
        console.error("Token validation error:", error);
        setIsValidToken(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  const token = localStorage.getItem("access_token");
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!token || !isValidToken) {
    return <Navigate to="/login" replace />;
  }

  // Get current path
  const currentPath = window.location.pathname;

  // Check if user has access to current path
  const hasAccess = () => {
    if (!user || !user.role) return false;

    const roleRoutes = {
      admin: ['/admin-dashboard', '/student-management', '/course-management', '/settings'],
      student: ['/', '/student-info', '/course-registration', '/course-info', '/transcript', '/degree-audit', '/services', '/course-evaluation'],
      professor: ['/teacher-dashboard', '/class-management', '/grade-management'],
      staff: ['/staff-dashboard', '/request-management', '/term-management']
    };

    // Allow access to home page for all authenticated users
    if (currentPath === '/') return true;

    // Check if current path is allowed for user's role
    return roleRoutes[user.role.toLowerCase()]?.includes(currentPath);
  };

  if (!hasAccess()) {
    // Redirect to role-specific dashboard if trying to access unauthorized route
    const dashboardRoutes = {
      admin: '/admin-dashboard',
      student: '/',
      professor: '/teacher-dashboard',
      staff: '/staff-dashboard'
    };

    // If user role is not available yet or invalid, redirect to home
    if (!user?.role || !dashboardRoutes[user.role.toLowerCase()]) {
      return <Navigate to="/" replace />;
    }

    return <Navigate to={dashboardRoutes[user.role.toLowerCase()]} replace />;
  }

  return children;
};
