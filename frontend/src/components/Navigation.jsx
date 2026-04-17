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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/generate', label: 'Synthesis', icon: Layout },
    { path: '/saved', label: 'Repository', icon: History }
  ];

  return (
    <>
      <nav className="sticky top-0 z-[60] py-4 px-6 bg-white/70 dark:bg-slate-950/70 backdrop-blur-3xl border-b border-slate-200/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-xl shadow-indigo-500/20">
                <Cpu className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase font-heading">
                Idea<span className="text-indigo-600 dark:text-indigo-400">Forge</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-8">
              {navLinks.map(({ path, label, icon: Icon }) => (
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
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-3 md:gap-6 lg:pl-8 lg:border-l border-slate-200 dark:border-white/10">
            <button
              onClick={toggleTheme}
              className="p-2.5 md:p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:scale-110 active:scale-95 transition-all duration-300 border border-slate-200 dark:border-white/5 group shadow-inner"
            >
              {isDarkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
            </button>

            {currentUser ? (
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-4 group p-1 pr-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-[2px] shadow-lg shadow-indigo-500/20">
                  <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                    {currentUser.photoURL ? (
                      <img src={currentUser.photoURL} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 md:w-5 md:h-5 text-indigo-500" />
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-black text-slate-900 dark:text-white leading-tight uppercase font-heading tracking-tight">
                    {currentUser.displayName?.split(' ')[0] || 'Architect'}
                  </span>
                </div>
              </button>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <button className="btn-cosmic px-6 py-3 text-[10px]">
                  Access Console
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
            >
              <Layout className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[70] lg:hidden"
            />
            <Motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-slate-950 shadow-2xl z-[80] p-8 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600">Architect Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900">
                   <Moon className="w-5 h-5 rotate-90" />
                </button>
              </div>

              <div className="space-y-4 flex-grow">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 p-5 rounded-[2rem] border-2 transition-all ${
                      isActive(path)
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-500/20'
                        : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-black uppercase tracking-widest">{label}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                {!currentUser && (
                   <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                     <button className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-500/20">
                        Launch Console
                     </button>
                   </Link>
                )}
                {currentUser && (
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="w-full py-5 bg-rose-500 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-rose-500/20 flex items-center justify-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Terminate Session
                  </button>
                )}
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProfile && (
          <ProfileModal key="profile-modal" onClose={() => setShowProfile(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
