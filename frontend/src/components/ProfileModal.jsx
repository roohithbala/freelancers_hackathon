import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { X, User, Save, LogOut, Key, ChevronDown, ChevronUp, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileModal = ({ onClose }) => {
    const { currentUser, logout, updateUserPassword } = useAuth();
    const [role, setRole] = useState('Student');
    
    // Password Change State
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser) return;
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRole(docSnap.data().role || 'Student');
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [currentUser]);

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            const docRef = doc(db, "users", currentUser.uid);
            await setDoc(docRef, { role: role }, { merge: true });
            onClose();
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            onClose();
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordMessage('');
        
        if (newPassword !== confirmNewPassword) {
            setPasswordMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        if (newPassword.length < 8) {
             setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
             return;
        }

        setSaving(true);
        try {
            await updateUserPassword(newPassword);
            setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
            setNewPassword('');
            setConfirmNewPassword('');
            setTimeout(() => setShowPasswordChange(false), 2000);
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/requires-recent-login') {
                setPasswordMessage({ type: 'error', text: 'Please log out and log in again to change password.' });
            } else {
                setPasswordMessage({ type: 'error', text: 'Failed to update password.' });
            }
        } finally {
            setSaving(false);
        }
    };

    if (!currentUser) return null;

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
                    className="relative w-full max-w-md flex flex-col max-h-[90vh]"
                >
                    {/* Glass Card */}
                    <div className="glass-panel p-1 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col max-h-full">
                         {/* Gradient Glow */}
                         <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
                         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="bg-[#0f1016]/95 backdrop-blur-xl rounded-[20px] relative flex flex-col overflow-hidden max-h-full">
                            
                            {/* Close Button */}
                            <button 
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-all z-20"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Header */}
                            <div className="p-8 pb-6 text-center border-b border-white/5 relative z-10 flex-shrink-0">
                                <div className="relative inline-block mb-4 group">
                                    <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                    <img 
                                        src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=0D8ABC&color=fff`} 
                                        alt="User" 
                                        className="h-20 w-20 rounded-full border-2 border-white/20 shadow-xl relative z-10" 
                                    />
                                    <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1.5 border-4 border-[#0f1016] z-20">
                                        <User className="h-3 w-3 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-white mb-1 font-display tracking-tight">{currentUser.email}</h2>
                                <div className="flex items-center justify-center space-x-2">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                                        {role} Account
                                    </span>
                                </div>
                            </div>

                            {/* Body - Scrollable */}
                            <div className="p-8 space-y-6 relative z-10 overflow-y-auto custom-scrollbar">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl text-sm flex items-center">
                                        <Shield className="w-4 h-4 mr-2" />
                                        {error}
                                    </div>
                                )}

                                {loading ? (
                                    <div className="text-center text-slate-400 py-8 flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                                        <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-4 h-4 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">Configuration Profile</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setRole('Student')}
                                                className={`p-4 rounded-xl border text-center transition-all duration-300 group ${
                                                    role === 'Student' 
                                                    ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]' 
                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                            >
                                                <div className="font-bold mb-1 flex justify-center"><Zap className={`w-5 h-5 mb-2 ${role === 'Student' ? 'text-blue-400' : 'text-slate-500'}`} /></div>
                                                <div className="font-bold text-sm mb-0.5">Student</div>
                                                <div className="text-[10px] opacity-70">Explore & Learn</div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setRole('Startup')}
                                                className={`p-4 rounded-xl border text-center transition-all duration-300 group ${
                                                    role === 'Startup' 
                                                    ? 'bg-purple-600/20 border-purple-500/50 text-white shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]' 
                                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                            >
                                                <div className="font-bold mb-1 flex justify-center"><Shield className={`w-5 h-5 mb-2 ${role === 'Startup' ? 'text-purple-400' : 'text-slate-500'}`} /></div>
                                                <div className="font-bold text-sm mb-0.5">Startup</div>
                                                <div className="text-[10px] opacity-70">Build & Launch</div>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-white/5 pt-4">
                                    <button 
                                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                                        className="flex items-center justify-between w-full text-left text-slate-300 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5 group border border-transparent hover:border-white/10"
                                    >
                                        <span className="flex items-center font-medium text-sm">
                                            <Key className="w-4 h-4 mr-3 text-slate-500 group-hover:text-blue-400 transition-colors" /> Change Password
                                        </span>
                                        {showPasswordChange ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>

                                    <AnimatePresence>
                                        {showPasswordChange && (
                                            <motion.form 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                onSubmit={handleChangePassword} 
                                                className="mt-3 space-y-3 overflow-hidden"
                                            >
                                                {passwordMessage && (
                                                    <div className={`text-xs p-3 rounded-lg border ${
                                                        passwordMessage.type === 'error' 
                                                        ? 'bg-red-500/10 border-red-500/20 text-red-200' 
                                                        : 'bg-green-500/10 border-green-500/20 text-green-200'
                                                    }`}>
                                                        {passwordMessage.text}
                                                    </div>
                                                )}
                                                
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="New Password"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:bg-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                                                    required
                                                />
                                                <input
                                                    type="password"
                                                    value={confirmNewPassword}
                                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                    placeholder="Confirm New Password"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:bg-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-600"
                                                    required
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={saving}
                                                    className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-xl transition-colors font-medium border border-slate-600 hover:border-slate-500"
                                                >
                                                    Update Password
                                                </button>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="pt-2 flex flex-col gap-3">
                                    <button
                                        onClick={handleSave}
                                        disabled={loading || saving}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex justify-center items-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? 'Saving...' : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" /> Save Profile
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-3 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-slate-300 hover:text-red-400 font-medium rounded-xl transition-colors flex justify-center items-center group"
                                    >
                                        <LogOut className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProfileModal;
