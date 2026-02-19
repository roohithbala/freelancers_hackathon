import React, { useState, useEffect } from 'react';
import { Rocket, LogIn, UserPlus, Sun, Moon } from 'lucide-react';

const NavBar = ({ onLogin, onSignup, onHome }) => {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const html = document.documentElement;
    if (dark) html.classList.add('dark');
    else html.classList.remove('dark');
  }, [dark]);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-600/20 rounded-xl border border-blue-500/30">
            <Rocket className="h-6 w-6 text-blue-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-lg md:text-xl font-bold tracking-tight">AI Architect</span>
            <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest">Blueprint Generator</span>
          </div>
        </button>

        <div className="hidden md:flex items-center space-x-4 text-sm text-slate-300">
          <a href="#" className="hover:text-white">Features</a>
          <a href="#" className="hover:text-white">Pricing</a>
          <a href="#" className="hover:text-white">Docs</a>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={onLogin}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-sm"
          >
            <span className="inline-flex items-center"><LogIn className="h-4 w-4 mr-2" />Login</span>
          </button>
          <button
            onClick={onSignup}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm shadow-lg shadow-blue-900/20"
          >
            <span className="inline-flex items-center"><UserPlus className="h-4 w-4 mr-2" />Sign Up</span>
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </div>
  );
};

export default NavBar;
