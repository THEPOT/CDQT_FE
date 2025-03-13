// src/components/ProtectedRoute.jsx
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    const decodedData = jwtDecode(token);

    if (!decodedData) return;

  }, [token, navigate]);

  if (!token) return <Navigate to="/login" replace />;

  return children;
};
