import React, { createContext, useContext, useState } from 'react'
import { loginAPI } from '../apis/authAPI';

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const login = async (userData) => {
    try {
      // In a real app, this would be an API call
      const { email, password } = userData;

      const userResponse = await loginAPI({ email, password });
      
      // Extract user information
      const { name, role, imgUrl, accessToken, refreshToken, ...additionalInfo } = userResponse.data;
   
      // Store user data with role-specific information
      const userToStore = {
        name,
        role,
        imgUrl,
        ...additionalInfo
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
      throw error;
    }
  };

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