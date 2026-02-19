import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { 
  Lightbulb, 
  Save, 
  RefreshCw,
  Code,
  Target,
  Map,
  CheckCircle,
  Bookmark,
  Download,
  Layers,
  Zap,
  TrendingUp,
  Clock,
  Users,
  Shield,
  Rocket,
  Eye,
  Globe
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Loading from '../components/ui/Loading';
import { useToast } from '../components/ui/Toast';
import Navigation from '../components/Navigation';
import FlowDiagram from '../components/FlowDiagram';
import Storyboard from '../components/Storyboard';
import ideaService from '../services/ideaService';
import { capitalizeFirst } from '../utils/helpers';

const GenerateIdeaPage = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const [domain, setDomain] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [activeView, setActiveView] = useState('details');

  const domains = ideaService.getDomains();
  const skillLevels = ideaService.getSkillLevels();

  const handleGenerate = () => {
    if (!domain || !skillLevel) {
      error('Please select both domain and skill level');
      return;
    }

    setLoading(true);
    setGeneratedIdea(null);

    // Simulate loading delay for UX
    setTimeout(() => {
      try {
        const result = ideaService.generateIdea(domain, skillLevel);
        if (result.success) {
          setGeneratedIdea(result.data);
          success('Project idea generated successfully!');
        } else {
          error(result.error || 'Failed to generate idea');
        }
      } catch (err) {
        error('Failed to generate idea. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const handleSave = () => {
    if (!generatedIdea) return;

    setIsSaving(true);
    try {
      const result = ideaService.saveIdea(generatedIdea);
      if (result.success) {
        success('Idea saved successfully!');
        navigate('/saved');
      } else {
        error(result.error || 'Failed to save idea');
      }
    } catch (err) {
      error('Failed to save idea. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBookmark = () => {
    if (!generatedIdea) return;

    setIsBookmarking(true);
    try {
      const result = ideaService.saveIdea({ ...generatedIdea, bookmarked: true });
      if (result.success) {
        success('Idea bookmarked successfully!');
      } else {
        error(result.error || 'Failed to bookmark idea');
      }
    } catch (err) {
      error('Failed to bookmark idea. Please try again.');
    } finally {
      setIsBookmarking(false);
    }
  };

  const handleRegenerate = () => {
    setGeneratedIdea(null);
    handleGenerate();
  };

  const handlePrint = () => {
    if (!generatedIdea) return;
    
    const printContent = `
PROJECT BLUEPRINT
================

Title: ${generatedIdea.title}
Domain: ${capitalizeFirst(generatedIdea.domain)}
Skill Level: ${capitalizeFirst(generatedIdea.skillLevel)}

PROBLEM STATEMENT
================
${generatedIdea.problem}

TECH STACK
===========
${generatedIdea.techStack.join(', ')}

KEY FEATURES
=============
${generatedIdea.features.map((feature, index) => `${index + 1}. ${feature}`).join('\n')}

IMPLEMENTATION ROADMAP
====================
${generatedIdea.roadmap.map((step, index) => `${index + 1}. ${step}`).join('\n')}
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${generatedIdea.title} - Project Blueprint</title>
          <style>
            body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1f2937; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
            h1 { color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
            h2 { color: #6366f1; margin-top: 30px; }
            pre { background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #4f46e5; }
          </style>
        </head>
        <body>
          <pre>${printContent}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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
      case 'intermediate': return <TrendingUp className="w-4 h-4" />;
      case 'advanced': return <Rocket className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const views = {
    details: { title: 'Details', icon: <Eye className="w-5 h-5" /> },
    flow: { title: 'Flow Diagram', icon: <Globe className="w-5 h-5" /> },
    storyboard: { title: 'Storyboard', icon: <Map className="w-5 h-5" /> }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      {/* Floating Generate Button */}
      <Motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={handleGenerate}
          disabled={loading || !domain || !skillLevel}
          variant="primary"
          size="lg"
          className="shadow-2xl backdrop-blur-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 rounded-full px-8"
        >
          {loading ? (
            <>
              <Loading size="sm" />
              <span className="ml-2">Generating...</span>
            </>
          ) : (
            <>
              <Lightbulb className="w-6 h-6" />
              <span className="ml-2">Generate Idea</span>
            </>
          )}
        </Button>
      </Motion.div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6 shadow-lg">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">AI-Powered Project Generation</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Generate Your Next
            <br />
            <span className="text-4xl md:text-5xl">Big Idea</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized project ideas with complete blueprints, tech stacks, and implementation roadmaps
          </p>
        </Motion.div>

        {/* Generation Form */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-indigo-500" />
                    Domain
                  </label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  >
                    <option value="">Select a domain</option>
                    {domains.map((d) => (
                      <option key={d} value={d}>
                        {capitalizeFirst(d)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-purple-500" />
                    Skill Level
                  </label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900"
                  >
                    <option value="">Select skill level</option>
                    {skillLevels.map((level) => (
                      <option key={level} value={level}>
                        {capitalizeFirst(level)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </Motion.div>

        {/* Generated Idea Display */}
        {generatedIdea && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Project Title Card */}
            <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <CardTitle className="text-3xl font-bold text-white text-center">
                  {generatedIdea.title}
                </CardTitle>
                <div className="flex justify-center space-x-4 mt-4">
                  <span className={`px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium flex items-center`}>
                    <Target className="w-4 h-4 mr-2" />
                    {capitalizeFirst(generatedIdea.domain)}
                  </span>
                  <span className={`px-4 py-2 bg-gradient-to-r ${getSkillLevelColor(generatedIdea.skillLevel)} rounded-full text-white text-sm font-medium flex items-center`}>
                    {getSkillLevelIcon(generatedIdea.skillLevel)}
                    <span className="ml-2">{capitalizeFirst(generatedIdea.skillLevel)}</span>
                  </span>
                </div>
              </div>
            </Card>

            {/* View Selector */}
            <div className="flex justify-center">
              <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-2">
                <div className="flex space-x-2">
                  {Object.entries(views).map(([key, view]) => (
                    <button
                      key={key}
                      onClick={() => setActiveView(key)}
                      className={`px-4 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 ${
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
            </div>

            {/* Content Area */}
            {activeView === 'details' && (
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
                      {generatedIdea.problem}
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
                      {generatedIdea.techStack.map((tech, index) => (
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
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      Key Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {generatedIdea.features.map((feature, index) => (
                        <Motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
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
                      {generatedIdea.roadmap.map((step, index) => (
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

                {/* Blueprint Summary */}
                <Card className="backdrop-blur-xl bg-white/70 border border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      Project Blueprint
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-700">Timeline</div>
                        <div className="text-xs text-gray-500">{generatedIdea.roadmap.length} Steps</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                        <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-700">Team Size</div>
                        <div className="text-xs text-gray-500">2-4 Developers</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <Code className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-700">Complexity</div>
                        <div className="text-xs text-gray-500">{capitalizeFirst(generatedIdea.skillLevel)}</div>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                        <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-gray-700">Difficulty</div>
                        <div className="text-xs text-gray-500">Medium</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeView === 'flow' && (
              <FlowDiagram projectData={generatedIdea} />
            )}

            {activeView === 'storyboard' && (
              <Storyboard projectData={generatedIdea} />
            )}

            {/* Floating Action Buttons */}
            <div className="fixed bottom-24 right-8 flex flex-col space-y-3 z-40">
              <Motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  variant="primary"
                  size="lg"
                  className="shadow-2xl backdrop-blur-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 rounded-full px-6"
                >
                  {isSaving ? (
                    <>
                      <Loading size="sm" />
                      <span className="ml-2">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span className="ml-2">Save</span>
                    </>
                  )}
                </Button>
              </Motion.div>

              <Motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  onClick={handleBookmark}
                  disabled={isBookmarking}
                  variant="secondary"
                  size="lg"
                  className="shadow-2xl backdrop-blur-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 rounded-full px-6"
                >
                  {isBookmarking ? (
                    <>
                      <Loading size="sm" />
                      <span className="ml-2">Bookmarking...</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-5 h-5" />
                      <span className="ml-2">Bookmark</span>
                    </>
                  )}
                </Button>
              </Motion.div>

              <Motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  onClick={handlePrint}
                  variant="secondary"
                  size="lg"
                  className="shadow-2xl backdrop-blur-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0 rounded-full px-6"
                >
                  <Download className="w-5 h-5" />
                  <span className="ml-2">Print</span>
                </Button>
              </Motion.div>
            </div>
          </Motion.div>
        )}
      </div>
    </div>
  );
};

export default GenerateIdeaPage;
