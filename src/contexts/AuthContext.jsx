// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react'
import { loginAPI } from '../apis/authAPI'

const AuthContext = createContext(null)


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (userData) => {
    try {
      const res = await loginAPI(userData);
      const { name, role, imgUrl, accessToken, refreshToken } = res.data;
      
      // Store user data
      const userToStore = {
        name,
        role,
        imgUrl,
        studentId: decodeJwt(accessToken).studentId // Extract studentId from JWT
      };
  
      // Store tokens and user data in localStorage
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
  
      // Update context state
      setUser(userToStore);
      setIsAuthenticated(true);
  
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to handle in UI
    }
  };
  function decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('JWT decode failed:', error);
      return {};
    }
  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}