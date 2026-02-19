import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn, Github, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginGoogle } = useAuth();
  const { isDarkMode } = useTheme();
  const { error, success } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/generate');
      }
    } catch (err) {
      // Error handled by context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-500 overflow-hidden">
      {/* Left Side: Branding/Visual */}
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-full h-full bg-indigo-600/20 blur-[120px] rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
           <div className="absolute bottom-0 left-0 w-full h-full bg-purple-600/20 blur-[120px] rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-500/40"
          >
            <LogIn className="w-10 h-10 text-white" />
          </Motion.div>
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-white mb-6 leading-tight"
          >
            Access Your <br/><span className="text-indigo-400 italic">Project Forge</span>
          </Motion.h2>
          <Motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-slate-400 text-lg font-medium leading-relaxed"
          >
            Rejoin the community of builders architecting the future 
            with AI-powered precision.
          </Motion.p>
          
          <div className="mt-16 grid grid-cols-2 gap-4">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                <Sparkles className="w-6 h-6 text-indigo-400 mb-3" />
                <div className="text-white font-bold mb-1 uppercase tracking-widest text-[10px]">AI Core</div>
                <div className="text-slate-400 text-xs">Proprietary LLM stack</div>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                <Shield className="w-6 h-6 text-purple-400 mb-3" />
                <div className="text-white font-bold mb-1 uppercase tracking-widest text-[10px]">Secure</div>
                <div className="text-slate-400 text-xs">Firestore protected</div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-slate-950 transition-colors duration-500">
        <Motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="md:hidden text-center mb-10">
             <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                <LogIn className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">IdeaForge</h1>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Log in to your account to manage your ideas.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Email Connection</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="architect@example.com"
                icon={<Mail className="w-4 h-4" />}
                className="py-4 text-lg bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 focus:ring-indigo-500 rounded-2xl"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Secure Key</label>
              <Input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your verification key"
                icon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                className="py-4 text-lg bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 focus:ring-indigo-500 rounded-2xl"
                required
              />
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
                  <span className="ml-3">Decrypting Access...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center">
                   Initiate Session
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
              <span className="px-4 bg-white dark:bg-slate-950 text-gray-400 dark:text-gray-600">Alternate Protocols</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
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
            Sign in with Google API
          </Button>

          <p className="mt-10 text-center text-gray-500 dark:text-gray-400 font-medium">
            New to the lab?{' '}
            <Link 
              to="/signup" 
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-black uppercase tracking-tighter"
            >
              Request Access
            </Link>
          </p>
        </Motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
