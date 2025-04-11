import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginAPI } from '../apis/authAPI';

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const getHomePageByRole = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return '/admin-dashboard';
      case 'student':
        return '/';
      case 'professor':
        return '/teacher-dashboard';
      case 'staff':
        return '/staff-dashboard';
      default:
        return '/';
    }
  };
  
  const login = async (userData) => {
    try {
      const { email, password } = userData;
      const userResponse = await loginAPI({ email, password });
      
      // Extract user information
      const { name, role, imgUrl, accessToken, refreshToken, ...additionalInfo } = userResponse.data;
   
      // Store user data with role-specific information
      const userToStore = {
        name,
        role,
        imgUrl,
        email,
        ...additionalInfo
      };

      // Store tokens and user data in localStorage
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
  
      // Update context state
      setUser(userToStore);
      setIsAuthenticated(true);

      // Redirect based on role
      const homePage = getHomePageByRole(role);
      window.location.href = homePage;
  
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
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

