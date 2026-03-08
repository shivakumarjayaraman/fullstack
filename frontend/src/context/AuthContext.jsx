import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);
  
  const fetchUser = async () => {
    try {
      // You can add an endpoint to get current user
      // const response = await api.get('/auth/me');
      // setUser(response.data);
      setLoading(false);
    } catch (error) {
      localStorage.removeItem('token');
      setLoading(false);
    }
  };
  
  const login = (userData) => {
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
