import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { X, User, Save, LogOut } from 'lucide-react';

const ProfileModal = ({ onClose }) => {
    const { currentUser, logout } = useAuth();
    const [role, setRole] = useState('Student');
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
            // Use setDoc with merge: true to create if not exists
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

    if (!currentUser) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl overflow-hidden relative">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Header */}
                <div className="p-8 pb-4 text-center border-b border-slate-700/50">
                    <div className="relative inline-block mb-4">
                        <img 
                            src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=0D8ABC&color=fff`} 
                            alt="User" 
                            className="h-20 w-20 rounded-full border-4 border-slate-700 shadow-xl" 
                        />
                        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 border-2 border-slate-800">
                            <User className="h-4 w-4 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">Edit Profile</h2>
                    <p className="text-slate-400 text-sm">{currentUser.email}</p>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="text-center text-slate-400 py-8">Loading profile...</div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-3">Your Role</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('Student')}
                                    className={`p-4 rounded-xl border text-center transition-all ${
                                        role === 'Student' 
                                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg ring-1 ring-blue-500' 
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="font-bold mb-1">Student</div>
                                    <div className="text-xs opacity-75">Explore & Learn</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('Startup')}
                                    className={`p-4 rounded-xl border text-center transition-all ${
                                        role === 'Startup' 
                                        ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg ring-1 ring-purple-500' 
                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800'
                                    }`}
                                >
                                    <div className="font-bold mb-1">Startup</div>
                                    <div className="text-xs opacity-75">Build & Launch</div>
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 text-center">
                                This helps AI generate better project blueprints for you.
                            </p>
                        </div>
                    )}

                    <div className="pt-4 flex flex-col gap-3">
                        <button
                            onClick={handleSave}
                            disabled={loading || saving}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex justify-center items-center shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Saving...' : (
                                <>
                                    <Save className="mr-2 h-4 w-4" /> Save Changes
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors flex justify-center items-center"
                        >
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
