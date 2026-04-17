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
  Award,
  Eye,
  Layers
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
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500 overflow-x-hidden relative">
      <Navigation />

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 bg-noise z-[1]"></div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-500/10 dark:bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 dark:bg-purple-600/20 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 pt-32 pb-32 md:pt-48 md:pb-48 min-h-[90vh] flex items-center justify-center">
          <div className="max-w-[100rem] mx-auto flex flex-col items-center text-center">
            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-3 bg-white/50 dark:bg-slate-900/30 border border-border rounded-full px-8 py-3 mb-10 shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-5 h-5 text-accent-500" />
              <span className="text-xs font-black text-accent-700 dark:text-accent-100 uppercase tracking-[0.4em]">The Intelligent Project Architect</span>
            </Motion.div>

            <Motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-7xl md:text-[10rem] font-black tracking-tight mb-10 leading-[0.9] font-heading"
            >
              <span className="text-900 block mb-2">
                Blueprint Your
              </span>
              <span className="text-gradient block">
                Next Innovation
              </span>
            </Motion.h1>

            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-700 dark:text-muted max-w-4xl mx-auto leading-relaxed mb-16 font-medium"
            >
              IdeaForge transforms your ambition into actionable projects.
              Get AI-generated blueprints with tech stacks, features, and roadmaps
              tailored to your unique skill set.
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-8 justify-center w-full sm:w-auto mb-32"
            >
              <Link to="/generate">
                <Button size="xl" className="group text-lg px-12 py-6 rounded-[2rem] bg-gradient-cosmic text-white border-0 shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:scale-[1.05] transition-all font-black uppercase tracking-[0.2em]">
                  <Rocket className="w-6 h-6 mr-4 group-hover:animate-bounce" />
                  Launch Project Agent
                  <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              {!currentUser && (
                <Link to="/signup">
                  <Button variant="secondary" size="xl" className="text-lg px-12 py-6 rounded-[2rem] card-glass text-900 shadow-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-black uppercase tracking-[0.2em]">
                    <UserPlus className="w-6 h-6 mr-4" />
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
              className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-7xl pt-20 border-t border-slate-100 dark:border-white/5"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-7xl font-black text-900 mb-4 font-heading tracking-tighter">{stat.number}</div>
                  <div className="text-xs font-black text-500 uppercase tracking-[0.4em] font-body opacity-60">{stat.label}</div>
                </div>
              ))}
            </Motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 bg-surface-2 dark:bg-slate-900/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="text-left max-w-2xl">
                <h2 className="text-sm font-black text-accent-500 uppercase tracking-[0.3em] mb-4">Core Capabilities</h2>
                <h3 className="text-4xl md:text-6xl font-black text-900 leading-tight">
                  Everything you need to <span className="text-gradient">ideate and build</span>.
                </h3>
              </div>
              <p className="text-700 dark:text-400 text-lg max-w-md text-left font-medium">
                Our AI considers thousands of variables to ensure your project idea is both challenging and achievable.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="p-10 card-glass shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-cosmic rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-500/20">
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-900 mb-4">{feature.title}</h4>
                  <p className="text-700 dark:text-400 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Repository Pulse */}
        <section className="px-6 py-24 bg-white dark:bg-[#020617]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Left Column: Repo Summary */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Project Insights</h2>
                  <h3 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">
                    GitHub <span className="text-gradient">Pulse</span>
                  </h3>
                  <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">
                    Powered by the most advanced neural models to provide deep architectural understanding of our codebase.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Stars', count: '0', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
                    { label: 'Watchers', count: '0', icon: <Eye className="w-4 h-4 text-blue-500" /> },
                    { label: 'Forks', count: '0', icon: <TrendingUp className="w-4 h-4 text-emerald-500" /> },
                    { label: 'Packages', count: '3', icon: <Layers className="w-4 h-4 text-purple-500" /> }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
                      <div className="mb-3">{stat.icon}</div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.count}</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Middle Column: Packages */}
              <div className="lg:col-span-1 space-y-6">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Architecture Packages</h4>
                <div className="space-y-4">
                  {[
                    { name: 'freelancers-app', desc: 'Core business logic & state management' },
                    { name: 'freelancers-backend', desc: 'Secure API & Neural Inference engine' },
                    { name: 'freelancers-frontend', desc: 'Premium UI/UX and Architect Console' }
                  ].map((pkg, i) => (
                    <div key={i} className="flex items-center p-5 rounded-2xl border-2 border-slate-50 dark:border-slate-800/50 bg-white dark:bg-slate-900/30 hover:border-indigo-500/30 transition-all group">
                      <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mr-4 text-indigo-600 group-hover:scale-110 transition-transform">
                        <Code className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 dark:text-white">{pkg.name}</p>
                        <p className="text-[10px] text-gray-500 dark:text-gray-500 uppercase tracking-tighter">{pkg.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Contributors */}
              <div className="lg:col-span-1 space-y-6">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Core Contributors</h4>
                <div className="grid gap-3">
                  {[
                    { name: 'Roohith Bala G', handle: '@roohithbala' },
                    { name: 'Nesiya Selladurai', handle: '@Nesiya-Selladurai' },
                    { name: 'Miruthula B', handle: '@Miruthulabalasubramanian' }
                  ].map((dev, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-transparent hover:border-indigo-500/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                             <Users className="w-5 h-5 text-indigo-500" />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">{dev.name}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{dev.handle}</p>
                        </div>
                      </div>
                      <Github className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                
                <div className="pt-4">
                  <a href="https://github.com/roohithbala/freelancers_hackathon" target="_blank" rel="noreferrer" className="block w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-xl">
                    Explore Repository
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-20 border-t border-gray-100 dark:border-slate-900 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                 </div>
                 <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase px-2">IdeaForge</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-8">
                The neural-core powered project architect for the next generation of builders.
              </p>
              <div className="flex items-center space-x-6 text-xs font-black uppercase tracking-widest text-gray-400">
                <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
                <Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link>
              </div>
            </div>

            <div className="col-span-1">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-6">Ecosystem</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                <li><a href="https://github.com/roohithbala" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">Roohith Bala G</a></li>
                <li><a href="https://github.com/Nesiya-Selladurai" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">Nesiya Selladurai</a></li>
                <li><a href="https://github.com/Miruthulabalasubramanian" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">Miruthula B</a></li>
              </ul>
            </div>

            <div className="col-span-2">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-6">Acknowledgments</h4>
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">KEC Freelancer Club Internships</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  Heartfelt gratitude to <span className="text-indigo-500">KEC Freelancer Club</span> for providing internships via <span className="font-bold">Pick My Car</span>. 
                  Special thanks to <span className="text-gray-900 dark:text-white">Mr. S. Selvaraj</span> and <span className="text-gray-900 dark:text-white">Ms. M. Geetha</span> for organizing this GitHub-centric event.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 dark:border-slate-900 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">
              Architected with Precision by the IdeaForge Core Team
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
