import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  Globe, 
  Users, 
  Star,
  Menu,
  X,
  LogIn,
  UserPlus
} from 'lucide-react';

const ModernLandingPage = ({ onLogin, onSignup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Features', 'Pricing', 'About', 'Contact'];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Generate comprehensive blueprints in seconds, not hours.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Grade',
      description: 'Production-ready architecture with security best practices.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Scalable Design',
      description: 'Build systems that grow with your business needs.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time collaboration.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechCorp',
      content: 'AI Architect transformed our development process. What used to take weeks now takes hours.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Lead Developer',
      content: 'The generated blueprints are incredibly detailed and follow best practices perfectly.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Startup Founder',
      content: 'This tool helped us scale from prototype to production in record time.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Navigation */}
      <Motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">AI Architect</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-gray-300 hover:text-white transition-colors">
                {item}
              </a>
            ))}
            <button 
              onClick={onLogin}
              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button 
              onClick={onSignup}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <Motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 p-4 bg-slate-800/90 backdrop-blur-lg rounded-lg"
          >
            {navItems.map((item) => (
              <a key={item} href="#" className="block py-2 text-gray-300 hover:text-white">
                {item}
              </a>
            ))}
            <div className="flex flex-col space-y-2 mt-4">
              <button 
                onClick={onLogin}
                className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <button 
                onClick={onSignup}
                className="flex items-center justify-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </div>
          </Motion.div>
        )}
      </Motion.nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-300">Powered by Advanced AI</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Build the Future
              <br />
              <span className="text-4xl md:text-6xl">at the Speed of Thought</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into production-ready systems. AI Architect generates comprehensive blueprints, 
              infrastructure maps, and development roadmaps in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onSignup}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl"
              >
                Get Started Free
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onLogin}
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl font-semibold text-lg hover:bg-slate-700/50 transition-all"
              >
                Sign In
              </button>
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose AI Architect?</h2>
            <p className="text-xl text-gray-300">Powerful features that accelerate your development</p>
          </Motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Leaders</h2>
            <p className="text-xl text-gray-300">See what our users have to say</p>
          </Motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Development?</h2>
            <p className="text-xl mb-8 text-blue-100">Join thousands of developers building faster with AI</p>
            <button 
              onClick={onSignup}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Start Building Now
              <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </button>
          </Motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">AI Architect</span>
              </div>
              <p className="text-gray-400 text-sm">Building the future, one blueprint at a time.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 AI Architect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernLandingPage;
