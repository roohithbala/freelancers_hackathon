import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Mail, Github, Heart, MessageCircle, ArrowLeft, Users, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const ContactPage = () => {
  const developers = [
    { name: 'Roohith Bala G', github: 'roohithbala', handle: '@roohithbala' },
    { name: 'Nesiya Selladurai', github: 'Nesiya-Selladurai', handle: '@Nesiya-Selladurai' },
    { name: 'Miruthula B', github: 'Miruthulabalasubramanian', handle: '@Miruthula' },
    { name: 'AI Copilot', github: 'Copilot', handle: '@Copilot' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
      <Navigation />

      <main className="max-w-5xl mx-auto px-6 py-24">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-indigo-600 mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <header>
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/20">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">Get in Touch</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed">
                Connect with the architects behind IdeaForge or reach out for collaboration opportunities.
              </p>
            </header>

            <div className="space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl">
                <Building className="w-10 h-10 mb-6 opacity-80" />
                <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">Special Acknowledgment</h2>
                <p className="text-indigo-100 font-medium leading-relaxed mb-6">
                  Heartfelt gratitude to <span className="text-white font-bold">KEC Freelancer Club</span> for providing internships via <span className="text-white font-bold">Pick My Car</span>.
                </p>
                <div className="pt-6 border-t border-white/20">
                  <p className="text-sm font-bold uppercase tracking-widest text-indigo-200 mb-2">Organizing Committee</p>
                  <p className="text-lg font-black text-white">Mr. S. Selvaraj & Dr. M. Geetha</p>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <a href="mailto:support@ideaforge.ai" className="flex items-center p-6 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-500 transition-all group">
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Support</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">roohithbala18@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900/40 border-2 border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-8 flex items-center">
                <Github className="w-4 h-4 mr-2" />
                Core Repository & Team
              </h3>

              <div className="space-y-4 mb-10">
                {developers.map((dev, i) => (
                  <a
                    key={i}
                    href={`https://github.com/${dev.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all border border-transparent hover:border-indigo-200 group"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center mr-4 text-gray-400 group-hover:text-indigo-600">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 dark:text-white">{dev.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{dev.handle}</p>
                      </div>
                    </div>
                    <Github className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                  </a>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Github className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm font-bold tracking-tight">freelancers_hackathon</span>
                  </div>
                  <span className="px-2 py-1 bg-indigo-500 rounded text-[10px] font-black uppercase">Main Branch</span>
                </div>
                <a
                  href="https://github.com/roohithbala/freelancers_hackathon"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-3 bg-white text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest text-center hover:bg-indigo-50 transition-colors"
                >
                  View Source Code
                </a>
              </div>
            </div>
          </Motion.div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
