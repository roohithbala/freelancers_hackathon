import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Lightbulb, Sun, Moon, User } from 'lucide-react';
import Button from './ui/Button';
import ProfileModal from './ProfileModal';

const Navigation = () => {
  const { currentUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-[60] bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-gray-100 dark:border-slate-900 px-6 py-4 transition-all duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl shadow-indigo-600/30">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 dark:text-white leading-none tracking-tighter uppercase">IdeaForge</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] font-black mt-1">Systems Lab</span>
            </div>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-10">
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/generate"
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl transition-all duration-300 font-bold uppercase tracking-widest text-xs ${
                  isActive('/generate')
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center">Generate</span>
              </Link>

              <Link
                to="/saved"
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl transition-all duration-300 font-bold uppercase tracking-widest text-xs ${
                  isActive('/saved')
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900'
                }`}
              >
                <span>Library</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4 pl-6 border-l border-gray-100 dark:border-slate-900">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-all duration-300 border border-gray-100 dark:border-slate-800 shadow-sm"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {currentUser ? (
                <button
                  onClick={() => setShowProfile(true)}
                  className="flex items-center space-x-4 group cursor-pointer"
                >
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tight">
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </span>
                    <span className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] font-black">
                      Profile
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 p-[2px] shadow-lg shadow-indigo-600/20 transition-transform hover:scale-105">
                     <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center p-1">
                        {currentUser.photoURL ? (
                          <img src={currentUser.photoURL} alt="User" className="w-full h-full rounded-2xl object-cover" />
                        ) : <User className="w-6 h-6 text-indigo-600" />}
                     </div>
                  </div>
                </button>
              ) : (
                  <Link to="/login">
                     <Button size="sm" className="hidden md:flex rounded-2xl px-6 py-3 font-black uppercase tracking-widest text-[10px]">
                        Access Entry
                     </Button>
                  </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default Navigation;
