import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Lightbulb, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Settings, 
  History, 
  Zap,
  Layout,
  Cpu
} from 'lucide-react';
import ProfileModal from './ProfileModal';

const Navigation = () => {
  const { currentUser, userTier, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  const isActive = (path) => location.pathname === path;

  const getTierBadgeStyles = (tier) => {
    switch (tier) {
      case 'pro': return 'bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-600/30';
      case 'elite': return 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border border-slate-200 dark:border-white/5';
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-[60] py-4 px-6 bg-white/70 dark:bg-slate-950/70 backdrop-blur-3xl border-b border-slate-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-xl shadow-indigo-500/20">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-lg flex items-center justify-center animate-pulse">
                <Zap className="w-2.5 h-2.5 text-indigo-950 fill-current" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase font-heading">
                Idea<span className="text-indigo-600 dark:text-indigo-400">Forge</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] font-black">Neural Core</span>
                <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] font-black italic underline decoration-indigo-500/50">v2.0</span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-12">
            <div className="hidden lg:flex items-center gap-8">
              {[
                { path: '/generate', label: 'Synthesis', icon: Layout },
                { path: '/saved', label: 'Repository', icon: History }
              ].map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`group relative flex items-center gap-2.5 py-2 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive(path)
                      ? 'text-indigo-600 dark:text-white'
                      : 'text-slate-500 hover:text-indigo-600 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive(path) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-indigo-500'} transition-colors`} />
                  {label}
                  {isActive(path) && (
                    <Motion.div 
                      layoutId="nav-active-pill" 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Actions Section */}
            <div className="flex items-center gap-6 pl-8 border-l border-slate-200 dark:border-white/10">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 transition-all duration-300 border border-slate-200 dark:border-white/5 group shadow-inner"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />
                )}
              </button>

              {currentUser ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center gap-4 group p-1 pr-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/5 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-[2px] shadow-lg shadow-indigo-500/20">
                      <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                        {currentUser.photoURL ? (
                          <img src={currentUser.photoURL} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-indigo-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-black text-slate-900 dark:text-white leading-tight uppercase font-heading tracking-tight">
                      {currentUser.displayName?.split(' ')[0] || 'Architect'}
                    </span>
                    <span className={`mt-1 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${getTierBadgeStyles(userTier)}`}>
                      {userTier} Access
                    </span>
                  </div>
                </button>
              ) : (
                <Link to="/login">
                  <button className="btn-cosmic px-6 py-3 text-[10px]">
                    Access Console
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showProfile && (
          <ProfileModal key="profile-modal" onClose={() => setShowProfile(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
