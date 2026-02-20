import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, Shield, CheckCircle, RefreshCw, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const { error, success } = useToast();

  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'success'
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // OTP state
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Step 1: Send OTP for Reset
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mode: 'reset' })
      });
      const data = await res.json();
      
      if (res.ok) {
        success('Verification code sent to your email!');
        setStep('otp');
        setResendCooldown(RESEND_COOLDOWN);
        setOtpDigits(Array(OTP_LENGTH).fill(''));
        setTimeout(() => inputRefs.current[0]?.focus(), 300);
      } else {
        error(data.error || 'Failed to send verification code');
      }
    } catch (err) {
      error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP and Trigger Firebase Reset
  const verifyOtpAndReset = async (otp) => {
    setOtpVerifying(true);
    try {
      const res = await fetch('http://localhost:5000/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        // OTP Verified → Now trigger standard Firebase Reset Email
        const resetRes = await forgotPassword(email);
        if (resetRes.success) {
          setStep('success');
        }
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

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (newDigits.every(d => d !== '')) {
      verifyOtpAndReset(newDigits.join(''));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-500 relative overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-0 w-full h-full bg-indigo-600/10 blur-[120px] rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-full h-full bg-purple-600/10 blur-[120px] rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg card-glass p-10 md:p-12 relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]"
      >
        <AnimatePresence mode="wait">
          {step === 'email' && (
            <Motion.div
              key="email-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/30">
                  <KeyRound className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Forgot Password?</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">No worries! We'll help you secure your account in two simple steps.</p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Account Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@example.com"
                    icon={<Mail className="w-4 h-4" />}
                    className="py-4 text-lg bg-gray-50 dark:bg-slate-900 border-gray-100 dark:border-slate-800 focus:ring-indigo-500 rounded-2xl"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="xl"
                  fullWidth
                  disabled={isLoading}
                  className="py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-2xl shadow-indigo-500/20 text-lg font-bold mt-4"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="ml-3">Processing...</span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Verification Code
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Link to="/login" className="inline-flex items-center text-gray-500 hover:text-indigo-600 font-bold text-sm transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Sign In
                </Link>
              </div>
            </Motion.div>
          )}

          {step === 'otp' && (
            <Motion.div
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/30">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Verify Identity</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">A security code has been transmitted to your email. Enter it below.</p>
              </div>

              <div className="flex justify-center gap-3">
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
                    className={`w-14 h-16 text-center text-2xl font-black rounded-2xl border-2 transition-all outline-none
                      ${digit
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white'
                      }
                      focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20
                    `}
                    disabled={otpVerifying}
                  />
                ))}
              </div>

              <Button
                onClick={() => verifyOtpAndReset(otpDigits.join(''))}
                fullWidth
                size="xl"
                disabled={otpVerifying || otpDigits.some(d => d === '')}
                className="py-5 rounded-2xl bg-indigo-600 font-bold text-white shadow-2xl shadow-indigo-500/20"
              >
                {otpVerifying ? 'Verifying...' : 'Verify & Continue'}
              </Button>

              <div className="text-center">
                {resendCooldown > 0 ? (
                  <p className="text-sm text-gray-400 font-bold">Resend available in {resendCooldown}s</p>
                ) : (
                  <button onClick={handleSendOtp} className="text-indigo-600 font-bold text-sm hover:underline flex items-center justify-center mx-auto">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Code
                  </button>
                )}
              </div>
            </Motion.div>
          )}

          {step === 'success' && (
            <Motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Check Your Inbox</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  Identity confirmed! We've dispatched a secure password reset link to <strong className="text-indigo-600">{email}</strong>. 
                  Follow the link in the email to define your new credentials.
                </p>
              </div>
              <div className="pt-4">
                <Link to="/login">
                  <Button variant="secondary" fullWidth size="xl" className="rounded-2xl font-black uppercase tracking-widest text-xs">
                    Return to Mission Control
                  </Button>
                </Link>
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </Motion.div>
      
      {/* Footer Branding */}
      <div className="mt-12 relative z-10 flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
        <Sparkles className="w-4 h-4 text-indigo-500" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400">IdeaForge Security Protocols</span>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
