import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Shield, Lock, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

const PrivacyPage = () => {
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
            <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
              Your data security is our architectural priority. 
              Last updated: April 17, 2024
            </p>
          </header>

          <section className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Information Collection</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                We collect only essential information required to architect your project ideas. This includes your email for authentication and any domain preferences you specify during generation.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Data Usage</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Your data is used exclusively to train our neural core for better personalizations. We do not sell your data to third-party advertisers. All project blueprints are private to your account.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Security Architectures</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                We employ industry-standard encryption protocols and multi-layered firewalls to protect your identity. Our OTP-based login system ensures only you can access your vault of ideas.
              </p>
            </div>
          </section>
        </Motion.div>
      </main>
    </div>
  );
};

export default PrivacyPage;
