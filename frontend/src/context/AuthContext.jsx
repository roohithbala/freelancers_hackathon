import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
  const [userTier, setUserTier] = useState(() => {
    return localStorage.getItem('userTier') || 'free'; // 'free', 'pro', 'elite'
  });
  const [loading, setLoading] = useState(true);
  const { error, success } = useToast();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user tier from Firestore
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && docSnap.data().userTier) {
            setUserTier(docSnap.data().userTier);
          } else {
            // Default to free if not set in DB
            setUserTier('free');
          }
        } catch (err) {
          console.error("Error fetching user tier:", err);
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setTier = async (tier) => {
    setUserTier(tier);
    localStorage.setItem('userTier', tier);
    
    if (currentUser) {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        await setDoc(docRef, { 
          userTier: tier,
          updatedAt: new Date()
        }, { merge: true });
      } catch (err) {
        console.error("Error persisting user tier:", err);
      }
    }
    
    success(`Upgrade Successful! You are now in the ${tier.toUpperCase()} tier.`);
  };

  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      setCurrentUser(result.user);
      success(SUCCESS_MESSAGES.LOGIN);
    } else {
      error(result.error);
    }
    return result;
  };

  const loginGoogle = async () => {
    const result = await authService.loginGoogle();
    if (result.success) {
      setCurrentUser(result.user);
      success(SUCCESS_MESSAGES.LOGIN);
    } else {
      error(result.error);
    }
    return result;
  };

  const signup = async (name, email, password) => {
    const result = await authService.signup(name, email, password);
    if (result.success) {
      setCurrentUser(result.user);
      success(SUCCESS_MESSAGES.SIGNUP);
    } else {
      error(result.error);
    }
    return result;
  };

  const logout = async () => {
    const result = await authService.logout();
    if (result.success) {
      setCurrentUser(null);
      success(SUCCESS_MESSAGES.LOGOUT);
    } else {
      error(result.error);
    }
    return result;
  };

  const updateProfile = async (updates) => {
    const result = await authService.updateProfile(updates);
    if (result.success) {
      setCurrentUser({ ...authService.getCurrentUser() });
      success('Profile updated successfully');
    } else {
      error(result.error);
    }
    return result;
  };

  const changePassword = async (newPassword) => {
    const result = await authService.updatePassword(newPassword);
    if (result.success) {
      success('Password changed successfully');
    } else {
      error(result.error);
    }
    return result;
  };

  const forgotPassword = async (email) => {
    const result = await authService.resetPassword(email);
    if (result.success) {
      success('Password reset email sent! Please check your inbox.');
    } else {
      error(result.error);
    }
    return result;
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    userTier,
    setTier,
    loading,
    login,
    loginGoogle,
    signup,
    logout,
    updateProfile,
    changePassword,
    forgotPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
