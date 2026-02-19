import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { X, User, Save, LogOut, Key, ChevronDown, ChevronUp, Shield, Zap, Mail, Edit3, Check } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const ProfileModal = ({ onClose }) => {
    const { currentUser, logout, changePassword, updateProfile } = useAuth();
    const { isDarkMode } = useTheme();
    const [role, setRole] = useState('Student');
    
    // Display name editing
    const [displayName, setDisplayName] = useState('');
    const [editingName, setEditingName] = useState(false);

    // Password Change State
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser) return;
            setDisplayName(currentUser.displayName || currentUser.email?.split('@')[0] || '');
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRole(docSnap.data().role || 'Student');
                    if (docSnap.data().displayName) {
                        setDisplayName(docSnap.data().displayName);
                    }
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [currentUser]);

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSuccessMsg('');
        try {
            const docRef = doc(db, "users", currentUser.uid);
            await setDoc(docRef, { 
                role, 
                displayName,
                email: currentUser.email,
                updatedAt: new Date()
            }, { merge: true });

            // Update Firebase Auth profile
            if (updateProfile && displayName !== currentUser.displayName) {
                await updateProfile({ displayName });
            }

            setSuccessMsg('Profile saved successfully!');
            setEditingName(false);
            setTimeout(() => setSuccessMsg(''), 3000);
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
            const result = await changePassword(newPassword);
            if (result && result.success) {
                setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
                setNewPassword('');
                setConfirmNewPassword('');
                setTimeout(() => setShowPasswordChange(false), 2000);
            } else {
                const errMsg = result?.error || 'Failed to update password.';
                if (errMsg.includes('recent') || errMsg.includes('re-authenticate')) {
                    setPasswordMessage({ type: 'error', text: 'Please log out and log in again to change password.' });
                } else {
                    setPasswordMessage({ type: 'error', text: errMsg });
                }
            }
        } catch (err) {
            console.error(err);
            setPasswordMessage({ type: 'error', text: 'Failed to update password.' });
        } finally {
            setSaving(false);
        }
    };

    if (!currentUser) return null;

    return (
        <AnimatePresence>
            <Motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 dark:bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-md"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <Motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="relative w-full max-w-md flex flex-col max-h-[90vh]"
                >
                    <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-full">
                        
                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white transition-all z-20"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Header with Avatar */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 pb-14 text-center relative">
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 p-1 shadow-xl border-4 border-white dark:border-slate-900">
                                    {currentUser.photoURL ? (
                                        <img src={currentUser.photoURL} alt="User" className="w-full h-full rounded-xl object-cover" />
                                    ) : (
                                        <div className="w-full h-full rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                                            <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <h2 className="text-lg font-black text-white uppercase tracking-wider">My Profile</h2>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="p-8 pt-14 space-y-6 overflow-y-auto">
                            {/* Messages */}
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm font-medium">
                                    {error}
                                </div>
                            )}
                            {successMsg && (
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                                    <Check className="w-4 h-4" /> {successMsg}
                                </div>
                            )}

                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="w-6 h-6 border-2 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                                </div>
                            ) : (
                                <>
                                    {/* Display Name */}
                                    <div>
                                        <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Display Name</label>
                                        <div className="flex items-center gap-2">
                                            {editingName ? (
                                                <input
                                                    type="text"
                                                    value={displayName}
                                                    onChange={(e) => setDisplayName(e.target.value)}
                                                    className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                    autoFocus
                                                />
                                            ) : (
                                                <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white text-sm font-semibold">
                                                    {displayName || 'Not set'}
                                                </div>
                                            )}
                                            <button
                                                onClick={() => setEditingName(!editingName)}
                                                className="p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Email (read-only) */}
                                    <div>
                                        <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
                                        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-xl">
                                            <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{currentUser.email}</span>
                                        </div>
                                    </div>

                                    {/* Role Selection */}
                                    <div>
                                        <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">Account Role</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setRole('Student')}
                                                className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                                                    role === 'Student' 
                                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 shadow-md' 
                                                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                                }`}
                                            >
                                                <Zap className={`w-5 h-5 mx-auto mb-2 ${role === 'Student' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`} />
                                                <div className={`font-bold text-sm ${role === 'Student' ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>Student</div>
                                                <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Explore & Learn</div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setRole('Startup')}
                                                className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                                                    role === 'Startup' 
                                                    ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 shadow-md' 
                                                    : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                                                }`}
                                            >
                                                <Shield className={`w-5 h-5 mx-auto mb-2 ${role === 'Startup' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-500'}`} />
                                                <div className={`font-bold text-sm ${role === 'Startup' ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400'}`}>Startup</div>
                                                <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Build & Launch</div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Change Password Section */}
                                    <div className="border-t-2 border-gray-100 dark:border-slate-800 pt-4">
                                        <button 
                                            onClick={() => setShowPasswordChange(!showPasswordChange)}
                                            className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 group border-2 border-transparent hover:border-gray-200 dark:hover:border-slate-700"
                                        >
                                            <span className="flex items-center font-bold text-sm">
                                                <Key className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors" /> Change Password
                                            </span>
                                            {showPasswordChange ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </button>

                                        <AnimatePresence>
                                            {showPasswordChange && (
                                                <Motion.form 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    onSubmit={handleChangePassword} 
                                                    className="mt-3 space-y-3 overflow-hidden"
                                                >
                                                    {passwordMessage && (
                                                        <div className={`text-xs p-3 rounded-xl border-2 font-medium ${
                                                            passwordMessage.type === 'error' 
                                                            ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300' 
                                                            : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                                                        }`}>
                                                            {passwordMessage.text}
                                                        </div>
                                                    )}
                                                    
                                                    <input
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        placeholder="New Password (min. 8 chars)"
                                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                                        required
                                                    />
                                                    <input
                                                        type="password"
                                                        value={confirmNewPassword}
                                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                        placeholder="Confirm New Password"
                                                        className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                                        required
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={saving}
                                                        className="w-full py-3 bg-gray-800 dark:bg-slate-700 hover:bg-gray-700 dark:hover:bg-slate-600 text-white text-sm rounded-xl transition-colors font-bold border-2 border-gray-700 dark:border-slate-600 disabled:opacity-50"
                                                    >
                                                        {saving ? 'Updating...' : 'Update Password'}
                                                    </button>
                                                </Motion.form>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </>
                            )}

                            {/* Action Buttons */}
                            <div className="pt-2 flex flex-col gap-3">
                                <button
                                    onClick={handleSave}
                                    disabled={loading || saving}
                                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex justify-center items-center shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                                >
                                    {saving ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Saving...
                                        </div>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" /> Save Profile
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3.5 bg-gray-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 border-2 border-gray-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-800 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-bold rounded-xl transition-all flex justify-center items-center group uppercase tracking-wider text-sm"
                                >
                                    <LogOut className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </Motion.div>
            </Motion.div>
        </AnimatePresence>
    );
};

export default ProfileModal;
