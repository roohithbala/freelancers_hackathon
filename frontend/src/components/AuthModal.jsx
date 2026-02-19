import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, LogIn, UserPlus, Check, AlertCircle, Sparkles } from 'lucide-react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Student'); // Default role
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '', color: 'bg-slate-700' });
    const [loading, setLoading] = useState(false);
    const { loginEmail, signupEmail, loginGoogle } = useAuth();

    const getErrorMessage = (errCode) => {
        switch (errCode) {
            case 'auth/invalid-credential':
                return 'Invalid email or password. Please try again.';
            case 'auth/user-not-found':
                return 'No account found with this email.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/email-already-in-use':
                return 'Account already exists! Please log in instead.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters.';
            case 'auth/operation-not-allowed':
                return 'Email/Password login is not enabled. Check Firebase Console.';
            case 'auth/popup-closed-by-user':
                return 'Sign-in popup was closed.';
            default:
                return 'An error occurred. Please try again.';
        }
    };

    const checkStrength = (pass) => {
        let score = 0;
        if (!pass) return { score: 0, message: '', color: 'bg-slate-700' };

        if (pass.length > 7) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[a-z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score <= 2) return { score, message: 'Weak', color: 'bg-red-500' };
        if (score <= 4) return { score, message: 'Medium', color: 'bg-yellow-500' };
        return { score, message: 'Strong', color: 'bg-green-500' };
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        if (!isLogin) setPasswordStrength(checkStrength(val));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!isLogin) {
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                setLoading(false);
                return;
            }
            if (passwordStrength.score < 2) { 
                 // Slightly relaxed rule for demo, but kept reasonable
                 setError("Password is too weak. Add numbers or symbols.");
                 setLoading(false);
                 return;
            }
        }

        try {
            if (isLogin) {
                await loginEmail(email, password);
            } else {
                const userCredential = await signupEmail(email, password);
                const user = userCredential.user;
                
                // Save user role and data to Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    role: role,
                    usageCount: 0,
                    isPremium: false,
                    createdAt: new Date()
                });
            }
            onClose();
        } catch (err) {
            console.error(err.code, err.message);
            setError(getErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginGoogle();
            onClose();
        } catch (err) {
            console.error(err.code, err.message);
            setError(getErrorMessage(err.code));
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-[#0B0B15]/80 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="relative w-full max-w-md max-h-[90vh] flex flex-col"
                >
                    {/* Glass Card Container */}
                    <div className="glass-panel p-1 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col max-h-full">
                        
                        {/* Gradient Glow */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="bg-[#0f1016]/95 backdrop-blur-xl rounded-[20px] relative flex flex-col overflow-hidden max-h-full">
                            
                            {/* Close Button */}
                            <button 
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all z-20"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto custom-scrollbar flex-grow">
                                {/* Header */}
                                <div className="p-8 pb-6 text-center relative z-10">
                                    <div className="inline-flex justify-center items-center p-3 bg-white/5 rounded-2xl mb-4 border border-white/10 shadow-lg">
                                        <Sparkles className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2 font-display tracking-tight">
                                        {isLogin ? 'Welcome Back' : 'Join AI Architect'}
                                    </h2>
                                    <p className="text-slate-400 text-sm">
                                        {isLogin ? 'Sign in to access your blueprints' : 'Start building your dream projects in seconds'}
                                    </p>
                                </div>

                                {/* Body */}
                                <div className="px-8 pb-8 relative z-10">
                                    {error && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm flex items-center"
                                        >
                                            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                            {error}
                                        </motion.div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:bg-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                                                    placeholder="name@company.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:bg-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                            
                                            {/* Strength Meter (Signup Only) */}
                                            {!isLogin && password && (
                                                <div className="mt-3 px-1">
                                                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-1.5">
                                                        <span>Password Strength</span>
                                                        <span className={passwordStrength.color.replace('bg-', 'text-')}>{passwordStrength.message}</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full ${passwordStrength.color} transition-all duration-300`} 
                                                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Confirm Password (Signup Only) */}
                                        <AnimatePresence>
                                            {!isLogin && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mb-5">
                                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Confirm Password</label>
                                                        <div className="relative group">
                                                            <Check className={`absolute left-4 top-3.5 h-5 w-5 transition-colors ${
                                                                confirmPassword && password === confirmPassword ? 'text-green-500' : 'text-slate-500'
                                                            }`} />
                                                            <input
                                                                type="password"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white outline-none transition-all placeholder:text-slate-600 ${
                                                                    confirmPassword && password !== confirmPassword 
                                                                    ? 'border-red-500/50 focus:border-red-500' 
                                                                    : 'border-white/10 focus:border-blue-500/50'
                                                                }`}
                                                                placeholder="••••••••"
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Select Role</label>
                                                    <div className="grid grid-cols-2 gap-3 mb-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setRole('Student')}
                                                            className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                                                                role === 'Student' 
                                                                ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]' 
                                                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                                            }`}
                                                        >
                                                            <div className="font-bold text-sm">Student</div>
                                                            <div className="text-[10px] opacity-70">Learning</div>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setRole('Startup')}
                                                            className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                                                                role === 'Startup' 
                                                                ? 'bg-purple-600/20 border-purple-500/50 text-white shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]' 
                                                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                                            }`}
                                                        >
                                                            <div className="font-bold text-sm">Startup</div>
                                                            <div className="text-[10px] opacity-70">Building</div>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center shadow-lg shadow-blue-500/20 group"
                                        >
                                            {loading ? (
                                                <span className="flex items-center">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <>
                                                    {isLogin ? 'Sign In' : 'Create Account'}
                                                    {isLogin ? <LogIn className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /> : <UserPlus className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-8 relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/10"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                                            <span className="px-4 bg-[#0f1016] text-slate-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleGoogleLogin}
                                        className="mt-6 w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all flex justify-center items-center group"
                                    >
                                        <svg className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        Google Account
                                    </button>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-black/20 p-4 text-center border-t border-white/5 text-sm backdrop-blur-sm flex-shrink-0">
                                <span className="text-slate-500">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                </span>
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-blue-400 hover:text-blue-300 font-bold ml-1 transition-colors"
                                >
                                    {isLogin ? 'Sign Up' : 'Log In'}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AuthModal;
