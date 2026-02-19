import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, UserPlus, ArrowRight, User, Github, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, loginGoogle } = useAuth();
  const { isDarkMode } = useTheme();
  const { error, success } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(formData.name, formData.email, formData.password);
      if (result.success) {
        navigate('/generate');
      }
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const result = await loginGoogle();
      if (result.success) {
        navigate('/generate');
      }
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col md:flex-row-reverse transition-colors duration-500 overflow-hidden">
      {/* Left Side: Branding/Visual */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 left-0 w-full h-full bg-white/10 blur-[120px] rounded-full transform -translate-x-1/3 -translate-y-1/3"></div>
           <div className="absolute bottom-0 right-0 w-full h-full bg-purple-600/20 blur-[120px] rounded-full transform translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-white/20"
          >
            <UserPlus className="w-10 h-10 text-white" />
          </Motion.div>
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-white mb-6 leading-tight uppercase tracking-tighter"
          >
            Join The <br/><span className="text-indigo-200 italic font-medium lowercase">innovation</span> Lab
          </Motion.h2>
          <Motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-indigo-100 text-lg font-medium leading-relaxed"
          >
            Start your journey as an architect today. Join 10,000+ builders 
            creating the next generation of software.
          </Motion.p>

          <div className="mt-16 inline-flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10">
             <Sparkles className="w-5 h-5 text-indigo-200" />
             <span className="text-white text-sm font-bold uppercase tracking-widest">Early Access Protocol Active</span>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-slate-950 transition-colors duration-500">
        <Motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">Request Access</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Create your credentials to enter the platform.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Architect Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                icon={<User className="w-4 h-4" />}
                className="py-3.5 bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 focus:ring-indigo-500 rounded-2xl"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Email Endpoint</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="architect@ideaforge.com"
                icon={<Mail className="w-4 h-4" />}
                className="py-3.5 bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 focus:ring-indigo-500 rounded-2xl"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Secure Key</label>
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 p-2">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  className="py-3.5 bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 focus:ring-indigo-500 rounded-2xl"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Confirm Key</label>
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  icon={<Lock className="w-4 h-4" />}
                  rightIcon={
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-gray-400 hover:text-gray-600 p-2">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  className="py-3.5 bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 focus:ring-indigo-500 rounded-2xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="xl"
              fullWidth
              disabled={isLoading}
              className="py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-2xl shadow-indigo-500/20 text-lg font-bold mt-8"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="ml-3">Processing Request...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center">
                   Register Credentials
                   <ArrowRight className="ml-3 w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
              <span className="px-4 bg-white dark:bg-slate-950 text-gray-400 dark:text-gray-600">Sync with Identity</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignup}
            variant="outline"
            size="xl"
            fullWidth
            disabled={isLoading}
            className="py-5 rounded-2xl border-gray-200 dark:border-slate-800 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-900 font-bold transition-all shadow-lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google API
          </Button>

          <p className="mt-10 text-center text-gray-500 dark:text-gray-400 font-medium">
            Already verified?{' '}
            <Link 
              to="/login" 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-black uppercase tracking-tighter"
            >
              Sign In
            </Link>
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
