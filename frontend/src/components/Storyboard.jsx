import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  Lightbulb, 
  Target, 
  Users, 
  Code, 
  Zap, 
  TrendingUp,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Award,
  Rocket
} from 'lucide-react';

const Storyboard = ({ projectData }) => {
  const [activeSection, setActiveSection] = useState('concept');

  const conceptFlow = [
    {
      id: 1,
      title: 'Problem Identification',
      description: projectData?.problem || 'Understanding the core challenge and user needs',
      icon: <Target className="w-8 h-8" />,
      color: 'from-red-400 to-pink-500',
      details: [
        'Analyze market gaps',
        'Identify user pain points',
        'Research existing solutions',
        'Define unique value proposition'
      ]
    },
    {
      id: 2,
      title: 'Idea Generation',
      description: 'Brainstorming innovative solutions and approaches',
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-500',
      details: [
        'Creative ideation sessions',
        'Technical feasibility assessment',
        'Market viability analysis',
        'Resource requirement planning'
      ]
    },
    {
      id: 3,
      title: 'Solution Design',
      description: 'Creating the technical architecture and user experience',
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-400 to-indigo-500',
      details: [
        'System architecture design',
        'User interface planning',
        'Technology stack selection',
        'Development roadmap creation'
      ]
    }
  ];

  const userJourney = [
    {
      id: 1,
      title: 'Discovery',
      description: 'User discovers the solution',
      icon: <Globe className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-500',
      steps: [
        'Marketing channels',
        'Word of mouth',
        'Search engines',
        'Social media'
      ],
      userAction: 'User searches for solutions to their problem'
    },
    {
      id: 2,
      title: 'Engagement',
      description: 'User interacts with the platform',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'from-purple-400 to-pink-500',
      steps: [
        'Sign up/Login',
        'Explore features',
        'Generate ideas',
        'Save projects'
      ],
      userAction: 'User signs up and explores the platform capabilities'
    },
    {
      id: 3,
      title: 'Conversion',
      description: 'User achieves their goal',
      icon: <Award className="w-8 h-8" />,
      color: 'from-indigo-400 to-blue-500',
      steps: [
        'Generate project idea',
        'Review blueprint',
        'Save for later',
        'Share with team'
      ],
      userAction: 'User successfully generates and saves their project idea'
    }
  ];

  const featureConnections = [
    {
      feature: 'AI Generation',
      connectsTo: ['User Input', 'Domain Selection', 'Skill Level'],
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      feature: 'Blueprint Creation',
      connectsTo: ['Tech Stack', 'Roadmap', 'Features'],
      icon: <Code className="w-6 h-6" />,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      feature: 'Project Management',
      connectsTo: ['Save Ideas', 'Export', 'Share'],
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-400 to-emerald-500'
    },
    {
      feature: 'Flow Visualization',
      connectsTo: ['User Flow', 'System Flow', 'Data Flow'],
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const implementationSteps = [
    {
      phase: 'Foundation',
      duration: 'Week 1-2',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-red-400 to-pink-500',
      tasks: [
        'Project setup and configuration',
        'Core architecture implementation',
        'Database design and setup',
        'Basic UI components creation'
      ]
    },
    {
      phase: 'Development',
      duration: 'Week 3-6',
      icon: <Code className="w-8 h-8" />,
      color: 'from-blue-400 to-indigo-500',
      tasks: [
        'Feature implementation',
        'API integration',
        'User interface development',
        'Testing and debugging'
      ]
    },
    {
      phase: 'Refinement',
      duration: 'Week 7-8',
      icon: <Star className="w-8 h-8" />,
      color: 'from-green-400 to-emerald-500',
      tasks: [
        'Performance optimization',
        'User experience improvements',
        'Security enhancements',
        'Documentation and deployment'
      ]
    }
  ];

  const sections = {
    concept: { title: 'Idea Concept', icon: <Lightbulb className="w-5 h-5" /> },
    journey: { title: 'User Journey', icon: <Users className="w-5 h-5" /> },
    features: { title: 'Feature Connections', icon: <Zap className="w-5 h-5" /> },
    implementation: { title: 'Implementation', icon: <Code className="w-5 h-5" /> }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Project Storyboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete visual journey from concept to implementation
          </p>
        </div>

        {/* Section Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-2">
            <div className="flex space-x-2">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`px-4 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 ${
                    activeSection === key
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {section.icon}
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          {/* Concept Section */}
          {activeSection === 'concept' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Idea Concept Flow</h3>
                <p className="text-gray-600">From problem identification to solution design</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {conceptFlow.map((item, index) => (
                  <Motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300`}>
                      <div className="mb-4">{item.icon}</div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/90 mb-4">{item.description}</p>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {index < conceptFlow.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-indigo-400" />
                      </div>
                    )}
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          )}

          {/* User Journey Section */}
          {activeSection === 'journey' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">User Journey Map</h3>
                <p className="text-gray-600">Complete user experience from discovery to conversion</p>
              </div>
              
              <div className="space-y-6">
                {userJourney.map((phase, index) => (
                  <Motion.div
                    key={phase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-6"
                  >
                    <div className={`w-24 h-24 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center text-white shadow-xl flex-shrink-0`}>
                      {phase.icon}
                    </div>
                    <div className="flex-1 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h4>
                      <p className="text-gray-600 mb-4">{phase.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">Key Steps:</h5>
                          <ul className="space-y-1">
                            {phase.steps.map((step, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-center">
                                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">User Action:</h5>
                          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                            {phase.userAction}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          )}

          {/* Feature Connections Section */}
          {activeSection === 'features' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Feature Connections</h3>
                <p className="text-gray-600">How different features work together</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {featureConnections.map((feature, index) => (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
                        {feature.icon}
                      </div>
                      <h4 className="text-xl font-bold">{feature.feature}</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-white/90 font-semibold">Connects to:</p>
                      <div className="flex flex-wrap gap-2">
                        {feature.connectsTo.map((connection, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-sm"
                          >
                            {connection}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          )}

          {/* Implementation Section */}
          {activeSection === 'implementation' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Implementation Timeline</h3>
                <p className="text-gray-600">Step-by-step development roadmap</p>
              </div>
              
              <div className="space-y-6">
                {implementationSteps.map((phase, index) => (
                  <Motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-6"
                  >
                    <div className={`w-20 h-20 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center text-white shadow-xl flex-shrink-0`}>
                      {phase.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-bold text-gray-900">{phase.phase}</h4>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {phase.duration}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-3 text-indigo-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl">
            <Target className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Concept Phases</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl">
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Journey Stages</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl">
            <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Feature Sets</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl">
            <Code className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Weeks Timeline</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storyboard;
