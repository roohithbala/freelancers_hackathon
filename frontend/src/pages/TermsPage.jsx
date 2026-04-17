import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FileText, Scale, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-6 py-24">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-indigo-600 mb-12 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <header>
            <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-6">
              <Scale className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">Terms of Service</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
              The framework of our engagement. 
              Last updated: April 17, 2024
            </p>
          </header>

          <section className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptable Use</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                IdeaForge is designed for creators and builders. Any use of the platform for generating harmful, illegal, or malicious project blueprints is strictly prohibited.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                While the AI core belongs to IdeaForge, the specific unique implementations you build based on our blueprints are yours. The blueprints themselves are provided for educational and starting purposes.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Tiered Access</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Access to generation cycles is governed by your tier (Hobbyist, Innovator, or Architect). Misuse of API endpoints or attempting to bypass rate limits will result in account suspension.
              </p>
            </div>
          </section>
        </Motion.div>
      </main>
    </div>
  );
};

export default TermsPage;
