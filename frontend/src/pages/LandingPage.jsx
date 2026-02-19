import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Lightbulb, 
  ArrowRight, 
  Zap, 
  Target, 
  Users,
  Menu,
  X,
  LogIn,
  UserPlus,
  TrendingUp,
  Shield,
  Code,
  Sun,
  Moon,
  Rocket,
  Sparkles,
  Github,
  Award
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Navigation from '../components/Navigation';

const LandingPage = () => {
  const { isDarkMode } = useTheme();
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Generation',
      description: 'Get personalized project ideas based on your domain and skill level'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Domain Specific',
      description: 'Tailored suggestions for health, fintech, education, and more'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Implementation Roadmap',
      description: 'Step-by-step guidance from concept to deployment'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Ideas Generated' },
    { number: '50+', label: 'Project Templates' },
    { number: '95%', label: 'User Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      <Navigation />
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 dark:bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 rounded-full px-6 py-2.5 mb-8 shadow-sm backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">The Intelligent Project Architect</span>
            </Motion.div>

            <Motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                Blueprint Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Next Innovation
              </span>
            </Motion.h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 font-medium"
            >
              IdeaForge transforms your ambition into actionable projects. 
              Get AI-generated blueprints with tech stacks, features, and roadmaps 
              tailored to your unique skill set.
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
            >
              <Link to="/generate">
                <Button size="xl" className="group text-lg px-10 py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-2xl shadow-indigo-500/30 dark:shadow-indigo-500/20">
                  <Rocket className="w-5 h-5 mr-3 group-hover:animate-bounce" />
                  Launch Project Agent
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {!currentUser && (
                <Link to="/signup">
                  <Button variant="secondary" size="xl" className="text-lg px-10 py-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white shadow-xl hover:bg-gray-50 dark:hover:bg-slate-800">
                    <UserPlus className="w-5 h-5 mr-3" />
                    Join The Community
                  </Button>
                </Link>
              )}
            </Motion.div>

            {/* Stats */}
            <Motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-24"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-sm font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </Motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 bg-gray-50 dark:bg-slate-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="text-left max-w-2xl">
                <h2 className="text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-4">Core Capabilities</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  Everything you need to <span className="text-indigo-600 dark:text-indigo-400">ideate and build</span>.
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md text-left font-medium">
                Our AI considers thousands of variables to ensure your project idea is both challenging and achievable.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="p-10 rounded-3xl bg-white dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/20">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Preview */}
        <section className="px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-[3rem] bg-slate-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
              <div className="p-16 flex flex-col items-center text-center">
                <div className="mb-10 p-5 bg-white/10 rounded-3xl backdrop-blur-md">
                   <Code className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                  Build with <span className="italic">Expert Precision</span>
                </h2>
                <p className="text-xl text-indigo-200/80 max-w-2xl mb-12 font-medium">
                  Join the elite group of developers using IdeaForge to architect 
                  their portfolio and production applications. 
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                   <Link to="/generate">
                     <button className="rounded-2xl bg-white text-indigo-900 hover:bg-gray-100 px-10 py-4 font-bold text-lg transition-colors shadow-xl">
                       Get Started Free
                     </button>
                   </Link>
                   <Link to="/saved">
                     <button className="rounded-2xl border-2 border-white/20 text-white hover:bg-white/10 px-10 py-4 font-bold text-lg transition-colors bg-transparent">
                       View Examples
                     </button>
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-16 border-t border-gray-100 dark:border-slate-900 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-white" />
             </div>
             <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase px-2">IdeaForge</span>
          </div>
          <div className="flex items-center space-x-8 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
             <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
             <div className="h-4 w-px bg-gray-200 dark:bg-slate-800"></div>
             <a href="#" className="hover:text-indigo-600 transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 text-center text-xs text-gray-400 dark:text-gray-600 font-bold uppercase tracking-[0.2em]">
           © 2024 IdeaForge Systems Lab. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
