import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight, Sparkles, Shield, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loginGoogle } = useAuth();
  const { isDarkMode } = useTheme();
  const { error, success } = useToast();

  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // OTP state
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const inputRefs = useRef([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Verify credentials, then send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // First verify credentials with Firebase
      const result = await login(formData.email, formData.password);
      if (!result.success) {
        return; // Error already shown via AuthContext
      }

      // Credentials valid → send OTP
      const otpRes = await fetch('http://localhost:5000/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const otpData = await otpRes.json();
      
      if (otpRes.ok) {
        success('Verification code sent to your email!');
        setStep('otp');
        setResendCooldown(RESEND_COOLDOWN);
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        // Focus first input after transition
        setTimeout(() => inputRefs.current[0]?.focus(), 300);
      } else {
        error(otpData.error || 'Failed to send verification code');
      }
    } catch (err) {
      error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // OTP digit input handler
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // digits only

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1); // take last digit
    setOtpDigits(newDigits);

    // Auto-advance to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits filled
    if (newDigits.every(d => d !== '') && newDigits.join('').length === OTP_LENGTH) {
      verifyOtp(newDigits.join(''));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newDigits = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((d, i) => { newDigits[i] = d; });
    setOtpDigits(newDigits);
    if (pasted.length === OTP_LENGTH) {
      verifyOtp(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (otp) => {
    setOtpVerifying(true);
    try {
      const res = await fetch('http://localhost:5000/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        success('Login verified successfully!');
        navigate('/generate');
      } else {
        error(data.error || 'Invalid verification code');
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      error('Verification failed. Please try again.');
    } finally {
      setOtpVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();
      if (res.ok) {
        success('New verification code sent!');
        setResendCooldown(RESEND_COOLDOWN);
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        inputRefs.current[0]?.focus();
      } else {
        error(data.error || 'Failed to resend code');
      }
    } catch (err) {
      error('Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  // Google login (bypasses OTP)
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
      {/* Left Side: Branding */}
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
                <div className="text-white font-bold mb-1 uppercase tracking-widest text-[10px]">OTP Verified</div>
                <div className="text-slate-400 text-xs">Email verification</div>
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

          <AnimatePresence mode="wait">
            {step === 'credentials' ? (
              <Motion.div
                key="credentials"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
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
                    <div className="flex justify-end pr-1">
                      <Link 
                        to="/forgot-password" 
                        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
                      >
                        Forgot Password?
                      </Link>
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
                        <span className="ml-3">Verifying Credentials...</span>
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
                  Sign in with Google
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
            ) : (
              <Motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setStep('credentials')}
                  className="flex items-center text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 font-bold text-sm transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </button>

                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-gradient-cosmic rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Verify Your Identity</h1>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    We sent a 6-digit code to
                  </p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">
                    {formData.email}
                  </p>
                </div>

                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-3 mb-8" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-14 h-16 text-center text-2xl font-black rounded-2xl border-2 transition-all duration-200 outline-none
                        ${digit
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 shadow-lg shadow-indigo-500/10'
                          : 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white'
                        }
                        focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20
                      `}
                      disabled={otpVerifying}
                    />
                  ))}
                </div>

                {/* Verify button */}
                <Button
                  onClick={() => verifyOtp(otpDigits.join(''))}
                  size="xl"
                  fullWidth
                  disabled={otpVerifying || otpDigits.some(d => d === '')}
                  className="py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-2xl shadow-indigo-500/20 text-lg font-bold mb-6"
                >
                  {otpVerifying ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="ml-3">Verifying...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      Verify & Login
                    </span>
                  )}
                </Button>

                {/* Resend */}
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Didn't receive the code?</p>
                  {resendCooldown > 0 ? (
                    <p className="text-gray-400 dark:text-gray-500 text-sm font-bold">
                      Resend in <span className="text-indigo-600 dark:text-indigo-400">{resendCooldown}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center justify-center mx-auto transition-colors"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                      Resend Code
                    </button>
                  )}
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </Motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
