import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Eye, 
  Download, 
  Share2,
  Lightbulb,
  Target,
  Code,
  Map,
  Shield,
  Globe,
  Users,
  Zap
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useToast } from '../components/ui/Toast';
import Navigation from '../components/Navigation';
import FlowDiagram from '../components/FlowDiagram';
import Storyboard from '../components/Storyboard';
import ideaService from '../services/ideaService';
import { formatDate, capitalizeFirst } from '../utils/helpers';

const ProjectFlowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');

  React.useEffect(() => {
    const loadProject = () => {
      try {
        const savedIdeas = ideaService.getSavedIdeas();
        const project = savedIdeas.find(idea => idea.id === id);
        
        if (project) {
          setProjectData(project);
        } else {
          error('Project not found');
          navigate('/saved');
        }
      } catch (err) {
        error('Failed to load project');
        navigate('/saved');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id, navigate, error]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: projectData.title,
        text: `Check out this project idea: ${projectData.title}`,
        url: window.location.href
      }).then(() => {
        success('Project shared successfully');
      }).catch(() => {
        // Fallback to copying link
        copyToClipboard(window.location.href);
      });
    } else {
      copyToClipboard(window.location.href);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      success('Link copied to clipboard');
    }).catch(() => {
      error('Failed to copy link');
    });
  };

  const handleExport = () => {
    const exportData = {
      project: projectData,
      exportDate: new Date().toISOString(),
      type: 'project-blueprint'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${projectData.title.toLowerCase().replace(/\s+/g, '-')}-blueprint.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'from-green-400 to-emerald-500';
      case 'intermediate': return 'from-blue-400 to-indigo-500';
      case 'advanced': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getSkillLevelIcon = (level) => {
    switch (level) {
      case 'beginner': return <Zap className="w-4 h-4" />;
      case 'intermediate': return <Target className="w-4 h-4" />;
      case 'advanced': return <Users className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const views = {
    overview: { title: 'Overview', icon: <Eye className="w-5 h-5" /> },
    flow: { title: 'Flow Diagram', icon: <Globe className="w-5 h-5" /> },
    storyboard: { title: 'Storyboard', icon: <Map className="w-5 h-5" /> }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <Button onClick={() => navigate('/saved')} variant="primary">
            Back to Saved Ideas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={() => navigate('/saved')}
              variant="secondary"
              size="sm"
              className="shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="ml-2">Back to Saved</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleShare}
                variant="secondary"
                size="sm"
                className="shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                <span className="ml-2">Share</span>
              </Button>
              <Button
                onClick={handleExport}
                variant="secondary"
                size="sm"
                className="shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span className="ml-2">Export</span>
              </Button>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {projectData.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 bg-gradient-to-r ${getSkillLevelColor(projectData.skillLevel)} rounded-full text-white text-sm font-medium flex items-center`}>
                    {getSkillLevelIcon(projectData.skillLevel)}
                    <span className="ml-2">{capitalizeFirst(projectData.skillLevel)}</span>
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full text-white text-sm font-medium flex items-center">
                    <Target className="w-4 h-4" />
                    <span className="ml-2">{capitalizeFirst(projectData.domain)}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Created {formatDate(projectData.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>

        {/* View Selector */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-2">
            <div className="flex space-x-2">
              {Object.entries(views).map(([key, view]) => (
                <button
                  key={key}
                  onClick={() => setActiveView(key)}
                  className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 ${
                    activeView === key
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {view.icon}
                  <span className="font-medium">{view.title}</span>
                </button>
              ))}
            </div>
          </div>
        </Motion.div>

        {/* Content Area */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeView === 'overview' && (
            <div className="space-y-8">
              {/* Problem Statement */}
              <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    Problem Statement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {projectData.problem}
                  </p>
                </CardContent>
              </Card>

              {/* Tech Stack */}
              <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-3">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    Tech Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {projectData.techStack.map((tech, index) => (
                      <Motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200 rounded-lg font-mono text-sm text-indigo-700 shadow-sm"
                      >
                        {tech}
                      </Motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-3">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {projectData.features.map((feature, index) => (
                      <Motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
                      >
                        <Shield className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </Motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Implementation Roadmap */}
              <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                      <Map className="w-5 h-5 text-white" />
                    </div>
                    Implementation Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectData.roadmap.map((step, index) => (
                      <Motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-700 font-medium">{step}</span>
                        </div>
                      </Motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeView === 'flow' && (
            <FlowDiagram projectData={projectData} />
          )}

          {activeView === 'storyboard' && (
            <Storyboard projectData={projectData} />
          )}
        </Motion.div>
      </div>
    </div>
  );
};

export default ProjectFlowPage;
