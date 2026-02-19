import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { useToast } from '../components/ui/Toast';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { error, success } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = authService.getCurrentUser();
        const token = authService.getCurrentToken();
        
        if (currentUser && token) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        // Clear invalid session
        authService.clearSession();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        success(SUCCESS_MESSAGES.LOGIN_SUCCESS);
        return { success: true };
      } else {
        const message = result.error || ERROR_MESSAGES.INVALID_CREDENTIALS;
        error(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const message = err.message || ERROR_MESSAGES.INVALID_CREDENTIALS;
      error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const result = authService.signup(name, email, password);
      
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        success(SUCCESS_MESSAGES.SIGNUP_SUCCESS);
        return { success: true };
      } else {
        const message = result.error || ERROR_MESSAGES.GENERIC_ERROR;
        error(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const message = err.message || ERROR_MESSAGES.GENERIC_ERROR;
      error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const result = authService.logout();
      if (result.success) {
        setUser(null);
        setIsAuthenticated(false);
        success(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
      } else {
        error(ERROR_MESSAGES.GENERIC_ERROR);
      }
    } catch (err) {
      error(ERROR_MESSAGES.GENERIC_ERROR);
    }
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    try {
      const result = authService.updateProfile(updates);
      
      if (result.success) {
        setUser(result.user);
        success(SUCCESS_MESSAGES.PROFILE_UPDATED);
        return { success: true };
      } else {
        const message = result.error || ERROR_MESSAGES.GENERIC_ERROR;
        error(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const message = err.message || ERROR_MESSAGES.GENERIC_ERROR;
      error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      const result = authService.changePassword(currentPassword, newPassword);
      
      if (result.success) {
        success(SUCCESS_MESSAGES.PASSWORD_CHANGED);
        return { success: true };
      } else {
        const message = result.error || ERROR_MESSAGES.GENERIC_ERROR;
        error(message);
        return { success: false, error: message };
      }
    } catch (err) {
      const message = err.message || ERROR_MESSAGES.GENERIC_ERROR;
      error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
