import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Mock user database
  const mockUsers = {
    'student@example.com': {
      password: 'password123',
      data: {
        name: 'Nguyễn Văn A',
        role: 'student',
        imgUrl: 'https://i.pinimg.com/564x/eb/57/6f/eb576ff023487bcb1fa3ad61ee7b23ee.jpg',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refreshToken: 'mock_student_refresh_token',
        studentId: '12345'
      }
    },
    'teacher@example.com': {
      password: 'password123',
      data: {
        name: 'Trần Thị B',
        role: 'teacher',
        imgUrl: 'https://i.pinimg.com/564x/5d/61/47/5d614719d17cf0ef637e3bc1fce8d2f3.jpg',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwibmFtZSI6IlRyYW4gVGhpIEIiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refreshToken: 'mock_teacher_refresh_token',
        teacherId: 'T789'
      }
    },
    'admin@example.com': {
      password: 'password123',
      data: {
        name: 'Lê Văn C',
        role: 'admin',
        imgUrl: 'https://i.pinimg.com/564x/0d/64/98/0d6498c55b29e638f571e7a8dfa9b9d1.jpg',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NDMyMTA5ODc2IiwibmFtZSI6IkxlIFZhbiBDIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refreshToken: 'mock_admin_refresh_token',
        adminId: 'A001'
      }
    },
    'staff@example.com': {
      password: 'password123',
      data: {
        name: 'Phạm Thị D',
        role: 'staff',
        imgUrl: 'https://i.pinimg.com/564x/cd/e4/47/cde447b4b1e4788e7bc3cd9cb2565e34.jpg',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTQzMjEwOTg3IiwibmFtZSI6IlBoYW0gVGhpIEQiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        refreshToken: 'mock_staff_refresh_token',
        staffId: 'S456',
        department: 'PDT' // Phòng Đào Tạo
      }
    }
  };

  const login = async (userData) => {
    try {
      // In a real app, this would be an API call
      const { email, password } = userData;
      
      // Check if user exists in our mock database
      if (!mockUsers[email]) {
        throw new Error('Invalid login credentials');
      }
      
      // Check password
      if (mockUsers[email].password !== password) {
        throw new Error('Invalid login credentials');
      }
      
      // Get user data
      const userResponse = mockUsers[email].data;
      
      // Extract user information
      const { name, role, imgUrl, accessToken, refreshToken, ...additionalInfo } = userResponse;
      
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