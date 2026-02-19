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
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { error, success } = useToast();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        success(SUCCESS_MESSAGES.LOGIN_SUCCESS);
        return { success: true };
      } else {
        error(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    setLoading(true);
    try {
      const result = await authService.loginGoogle();
      if (result.success) {
        success(SUCCESS_MESSAGES.LOGIN_SUCCESS);
        return { success: true };
      } else {
        error(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const result = await authService.signup(name, email, password);
      if (result.success) {
        success(SUCCESS_MESSAGES.SIGNUP_SUCCESS);
        return { success: true };
      } else {
        error(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const result = await authService.logout();
      if (result.success) {
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
      const result = await authService.updateProfile(updates);
      if (result.success) {
        success(SUCCESS_MESSAGES.PROFILE_UPDATED);
        return { success: true };
      } else {
        error(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword) => {
    setLoading(true);
    try {
      const result = await authService.updatePassword(newPassword);
      if (result.success) {
        success(SUCCESS_MESSAGES.PASSWORD_CHANGED);
        return { success: true };
      } else {
        error(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    loading,
    login,
    loginGoogle,
    signup,
    logout,
    updateProfile,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
