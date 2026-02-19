import React from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
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
  Code
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
      icon: <Users className="w-6 h-6" />,
      title: 'Skill-Based',
      description: 'Projects matched to your experience level from beginner to advanced'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Ideas Generated' },
    { number: '50+', label: 'Project Templates' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <Motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">IdeaForge</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
            <Link 
              to="/signup"
            >
              <Button variant="primary" size="sm" className="shadow-lg">
                <UserPlus className="w-4 h-4" />
                <span className="ml-2">Sign Up</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <Motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 p-4 bg-white/90 backdrop-blur-xl rounded-lg shadow-xl border border-white/20"
          >
            <div className="flex flex-col space-y-3">
              <Link 
                to="/login"
                className="flex items-center justify-center space-x-2 px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <Link 
                to="/signup"
                className="flex items-center justify-center"
              >
                <Button variant="primary" size="sm" fullWidth className="shadow-lg">
                  <UserPlus className="w-4 h-4" />
                  <span className="ml-2">Sign Up</span>
                </Button>
              </Link>
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
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {stats.map((stat, index) => (
                <Motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {stat.label}
                  </div>
                </Motion.div>
              ))}
            </div>

            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">AI-Powered Project Generation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              Generate Your Next
              <br />
              <span className="text-4xl md:text-6xl">Big Idea</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Get personalized project ideas with complete blueprints, tech stacks, and implementation roadmaps
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                to="/generate"
              >
                <Button variant="primary" size="xl" className="shadow-2xl backdrop-blur-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 rounded-2xl px-8 py-4">
                  <Lightbulb className="w-6 h-6" />
                  <span className="ml-2">Generate Idea</span>
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link 
                to="/login"
              >
                <Button variant="secondary" size="xl" className="shadow-xl backdrop-blur-xl bg-white/80 border border-white/20 hover:bg-white/90 rounded-2xl px-8 py-4">
                  <LogIn className="w-6 h-6 text-indigo-600" />
                  <span className="ml-2">Sign In</span>
                </Button>
              </Link>
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
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose IdeaForge?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features to accelerate your project development
            </p>
          </Motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  <CardContent className="text-center p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
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
            transition={{ duration: 0.8 }}
          >
            <Card className="backdrop-blur-xl bg-gradient-to-r from-indigo-600 to-purple-600 border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  Ready to Start Building?
                </h2>
                <p className="text-xl text-indigo-100 mb-8">
                  Join thousands of developers generating amazing project ideas
                </p>
                <Link 
                  to="/generate"
                >
                  <Button variant="secondary" size="xl" className="shadow-2xl backdrop-blur-xl bg-white text-indigo-600 hover:bg-gray-50 border-0 rounded-2xl px-8 py-4">
                    <Code className="w-6 h-6" />
                    <span className="ml-2">Generate Your First Idea</span>
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">IdeaForge</span>
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 IdeaForge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
