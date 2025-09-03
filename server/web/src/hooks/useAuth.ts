import { useState, useEffect } from 'react';
import type { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    
    if (token && role) {
      setUser({
        id: '1',
        email: 'admin@attendance.com',
        name: 'Admin User',
        role: role as 'student' | 'faculty' | 'admin'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Implement login logic
    setLoading(true);
    try {
      // API call to login
      // Set user and token
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};