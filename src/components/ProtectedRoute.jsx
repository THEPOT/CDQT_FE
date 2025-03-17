import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsValidToken(false);
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
    }
  }, []);

  const token = localStorage.getItem("access_token");
  
  if (!token || !isValidToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};