import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  User, 
  Database, 
  Shield, 
  ArrowRight, 
  ArrowDown, 
  ArrowLeft, 
  ArrowUp,
  Globe,
  Lock,
  Code,
  Zap,
  Server,
  Cloud,
  Smartphone,
  Monitor,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const FlowDiagram = ({ projectData }) => {
  const [activeFlow, setActiveFlow] = useState('user');

  const getNodeIcon = (nodeType) => {
    switch (nodeType) {
      case 'user': return <User className="w-5 h-5" />;
      case 'auth': return <Shield className="w-5 h-5" />;
      case 'database': return <Database className="w-5 h-5" />;
      case 'api': return <Code className="w-5 h-5" />;
      case 'server': return <Server className="w-5 h-5" />;
      case 'cloud': return <Cloud className="w-5 h-5" />;
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'web': return <Monitor className="w-5 h-5" />;
      case 'lock': return <Lock className="w-5 h-5" />;
      case 'globe': return <Globe className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getNodeColor = (nodeType) => {
    switch (nodeType) {
      case 'user': return 'from-blue-400 to-indigo-500';
      case 'auth': return 'from-green-400 to-emerald-500';
      case 'database': return 'from-purple-400 to-pink-500';
      case 'api': return 'from-orange-400 to-red-500';
      case 'server': return 'from-cyan-400 to-blue-500';
      case 'cloud': return 'from-indigo-400 to-purple-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const userFlow = [
    { id: 1, type: 'user', label: 'User Access', description: 'User opens the application' },
    { id: 2, type: 'auth', label: 'Authentication', description: 'Login or signup process' },
    { id: 3, type: 'web', label: 'Dashboard', description: 'View project ideas' },
    { id: 4, type: 'user', label: 'Generate Idea', description: 'Select domain and skill level' },
    { id: 5, type: 'api', label: 'AI Processing', description: 'Generate project blueprint' },
    { id: 6, type: 'user', label: 'Review & Save', description: 'Review generated content' },
    { id: 7, type: 'database', label: 'Storage', description: 'Save to localStorage' }
  ];

  const pageFlow = [
    { id: 1, type: 'web', label: 'Landing Page', description: 'Entry point of application' },
    { id: 2, type: 'auth', label: 'Login/Signup', description: 'User authentication' },
    { id: 3, type: 'web', label: 'Generate Page', description: 'Main generation interface' },
    { id: 4, type: 'web', label: 'Results Display', description: 'Show generated project' },
    { id: 5, type: 'web', label: 'Saved Ideas', description: 'Manage saved projects' },
    { id: 6, type: 'web', label: 'Project Details', description: 'Full project view' }
  ];

  const systemFlow = [
    { id: 1, type: 'user', label: 'Frontend', description: 'React application' },
    { id: 2, type: 'api', label: 'Service Layer', description: 'Mock data generation' },
    { id: 3, type: 'database', label: 'Local Storage', description: 'Data persistence' },
    { id: 4, type: 'server', label: 'State Management', description: 'React Context' },
    { id: 5, type: 'cloud', label: 'UI Components', description: 'Reusable components' }
  ];

  const authFlow = [
    { id: 1, type: 'user', label: 'User Input', description: 'Email and password' },
    { id: 2, type: 'lock', label: 'Validation', description: 'Input validation' },
    { id: 3, type: 'auth', label: 'Auth Service', description: 'Mock authentication' },
    { id: 4, type: 'database', label: 'Storage', description: 'User data storage' },
    { id: 5, type: 'user', label: 'Session', description: 'User session active' }
  ];

  const dataFlow = [
    { id: 1, type: 'user', label: 'User Action', description: 'Generate request' },
    { id: 2, type: 'api', label: 'Service Call', description: 'ideaService.generateIdea()' },
    { id: 3, type: 'server', label: 'Data Processing', description: 'Mock data generation' },
    { id: 4, type: 'database', label: 'Local Storage', description: 'Save project data' },
    { id: 5, type: 'user', label: 'UI Update', description: 'Display results' }
  ];

  const flows = {
    user: { title: 'User Flow', data: userFlow, icon: <User className="w-5 h-5" /> },
    page: { title: 'Page Flow', data: pageFlow, icon: <Globe className="w-5 h-5" /> },
    system: { title: 'System Flow', data: systemFlow, icon: <Server className="w-5 h-5" /> },
    auth: { title: 'Authentication Flow', data: authFlow, icon: <Shield className="w-5 h-5" /> },
    data: { title: 'Data Flow', data: dataFlow, icon: <Database className="w-5 h-5" /> }
  };

  const renderFlowDiagram = (flowData) => {
    const isVertical = activeFlow === 'user' || activeFlow === 'auth' || activeFlow === 'data';
    
    return (
      <div className={`flex ${isVertical ? 'flex-col space-y-6' : 'flex-row space-x-6'} items-center justify-center p-8`}>
        {flowData.map((node, index) => (
          <React.Fragment key={node.id}>
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className={`w-32 h-32 bg-gradient-to-br ${getNodeColor(node.type)} rounded-2xl flex flex-col items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group`}>
                <div className="mb-2 group-hover:scale-110 transition-transform">
                  {getNodeIcon(node.type)}
                </div>
                <div className="text-xs font-semibold text-center px-2">
                  {node.label}
                </div>
              </div>
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-40 text-center">
                <p className="text-xs text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
                  {node.description}
                </p>
              </div>
            </Motion.div>
            
            {index < flowData.length - 1 && (
              <Motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="flex items-center justify-center"
              >
                {isVertical ? (
                  <ArrowDown className="w-8 h-8 text-indigo-400" />
                ) : (
                  <ArrowRight className="w-8 h-8 text-indigo-400" />
                )}
              </Motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Project Flow Diagram
          </h2>
          <p className="text-gray-600">
            Visual representation of the complete project architecture and user journey
          </p>
        </div>

        {/* Flow Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-2">
            <div className="flex space-x-2">
              {Object.entries(flows).map(([key, flow]) => (
                <button
                  key={key}
                  onClick={() => setActiveFlow(key)}
                  className={`px-4 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 ${
                    activeFlow === key
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {flow.icon}
                  <span className="font-medium">{flow.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
            <h3 className="text-2xl font-bold text-white text-center">
              {flows[activeFlow].title}
            </h3>
          </div>
          <div className="min-h-[400px] relative">
            {renderFlowDiagram(flows[activeFlow].data)}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { type: 'user', label: 'User Action' },
              { type: 'auth', label: 'Authentication' },
              { type: 'database', label: 'Data Storage' },
              { type: 'api', label: 'API/Service' },
              { type: 'server', label: 'System' },
              { type: 'web', label: 'Web Page' },
              { type: 'cloud', label: 'Cloud Service' },
              { type: 'lock', label: 'Security' }
            ].map((item) => (
              <div key={item.type} className="flex items-center space-x-2">
                <div className={`w-8 h-8 bg-gradient-to-br ${getNodeColor(item.type)} rounded-lg flex items-center justify-center text-white`}>
                  {getNodeIcon(item.type)}
                </div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowDiagram;
