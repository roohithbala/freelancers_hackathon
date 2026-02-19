import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-xl border border-white/10">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-blue-400 to-purple-400"></div>
              </div>
              <span className="text-xl font-bold tracking-tight">AI Architect</span>
            </div>
            <p className="mt-4 text-slate-400 max-w-md">
              Generate production-ready blueprints with a clean, modern and slightly futuristic UI.
            </p>
            <div className="flex items-center space-x-3 mt-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <Github className="h-5 w-5 text-slate-300" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <Twitter className="h-5 w-5 text-slate-300" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <Linkedin className="h-5 w-5 text-slate-300" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-slate-200">Features</a></li>
              <li><a href="#" className="hover:text-slate-200">Roadmap</a></li>
              <li><a href="#" className="hover:text-slate-200">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-slate-200">About</a></li>
              <li><a href="#" className="hover:text-slate-200">Blog</a></li>
              <li><a href="#" className="hover:text-slate-200">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} AI Architect</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-300">Privacy</a>
            <a href="#" className="hover:text-slate-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
