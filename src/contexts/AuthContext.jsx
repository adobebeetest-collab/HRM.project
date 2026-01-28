import React, { createContext, useContext, useState, useEffect } from 'react';
import { showSuccess } from 'utils/toastHelper';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user_id');
    const storedName = localStorage.getItem('user_name');
    const storedSuperAdmin = localStorage.getItem('is_super_admin');
    const storedEmail = localStorage.getItem('user_email');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      setName(storedName);
      setIsSuperAdmin(storedSuperAdmin === 'true' || storedSuperAdmin === true);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken,user_name,is_super_admin) => {
    setUser(userData);
    setToken(authToken);
    setName(user_name);
    setIsSuperAdmin(is_super_admin);
    setIsAuthenticated(true);

    // Save to localStorage
    localStorage.setItem('access_token', authToken);
    localStorage.setItem('user_id', userData);
    localStorage.setItem('user_name', user_name);
    localStorage.setItem('is_super_admin', is_super_admin);
    


    
    // Show success message only once

  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsSuperAdmin(false);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('is_super_admin');
  };

  const value = {
    user,
    token,
    name,   
    isAuthenticated,
    isSuperAdmin,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
