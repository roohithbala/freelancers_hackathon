import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import PublicLayout from '../layouts/PublicLayout';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import GenerateIdeaPage from '../pages/GenerateIdeaPage';
import SavedIdeasPage from '../pages/SavedIdeasPage';
import ProjectFlowPage from '../pages/ProjectFlowPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route path="/generate" element={
        <ProtectedRoute>
          <GenerateIdeaPage />
        </ProtectedRoute>
      } />
      
      <Route path="/saved" element={
        <ProtectedRoute>
          <SavedIdeasPage />
        </ProtectedRoute>
      } />

      <Route path="/project/:id" element={
        <ProtectedRoute>
          <ProjectFlowPage />
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRoutes;
