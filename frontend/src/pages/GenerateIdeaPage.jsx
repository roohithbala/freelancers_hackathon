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
  Rocket,
  Eye,
  Globe,
  Sparkles,
  Terminal,
  Award,
  ChevronDown,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Loading from '../components/ui/Loading';
import { useToast } from '../components/ui/Toast';
import Navigation from '../components/Navigation';
import FlowDiagram from '../components/FlowDiagram';
import Storyboard from '../components/Storyboard';
import ideaService from '../services/ideaService';
import { capitalizeFirst } from '../utils/helpers';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import IdeaSelection from '../components/IdeaSelection';
import PaymentButton from '../components/PaymentButton';

const GenerateIdeaPage = () => {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { currentUser, userTier } = useAuth();
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    domain: '',
    skillLevel: '',
    techStack: '',
    goal: 'Startup MVP',
    timeframe: '1 Month'
  });
  const [loading, setLoading] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeView, setActiveView] = useState('details');
  const [ideas, setIdeas] = useState([]);
  const [step, setStep] = useState('input');

  const domains = ideaService.getDomains();
  const skillLevels = ideaService.getSkillLevels();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!formData.domain || !formData.skillLevel) {
      error('Please select both domain and skill level');
      return;
    }

    // Tier Enforcement
    if (formData.goal === 'Hackathon' && userTier === 'free') {
      error('Innovator Tier required for Hackathon projects.');
      return;
    }
    if (formData.goal === 'Startup MVP' && userTier !== 'elite') {
      error('Architect Tier required for Startup MVP blueprints.');
      return;
    }

    setLoading(true);
    setIdeas([]);
    setGeneratedIdea(null);
    try {
      // 1. Fetch ALL previous project titles for unique generation
      const previousProjects = await ideaService.getPreviousProjectTitles(currentUser);
      
      // 2. Generate with history as a constraint
      const result = await ideaService.generateIdeas(formData, currentUser);
      if (result.success) {
        setIdeas(result.data);
        setStep('selection');
        success('Project ideas generated successfully!');
      } else {
        error(result.error || 'Failed to generate ideas');
      }
    } catch (err) {
      error('Failed to generate ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleIdeaSelect = async (idea) => {
    setLoading(true);
    try {
      const result = await ideaService.generateBlueprint(idea, formData, currentUser);
      if (result.success) {
        setGeneratedIdea(result.data);
        setStep('blueprint');
        success('Detailed blueprint generated!');
      } else {
        error(result.error || 'Failed to generate blueprint');
      }
    } catch (err) {
      error('Failed to generate blueprint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedIdea) return;
    setIsSaving(true);
    try {
      const result = await ideaService.saveIdea(generatedIdea, currentUser);
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

  const handleRegenerate = () => {
    setGeneratedIdea(null);
    setStep('input');
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'from-emerald-400 to-emerald-600';
      case 'intermediate': return 'from-indigo-400 to-indigo-600';
      case 'advanced': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const views = {
    details: { title: 'Details', icon: <Eye className="w-5 h-5" /> },
    flow: { title: 'Flow Diagram', icon: <Globe className="w-5 h-5" /> },
    storyboard: { title: 'Storyboard', icon: <Map className="w-5 h-5" /> },
    ...(userTier === 'elite' && { audit: { title: 'Technical Audit', icon: <ShieldCheck className="w-5 h-5" /> } })
  };

  const pricingPlans = [
    { id: 'free', name: 'Hobbyist', price: '₹0', features: ['Portfolio Concepts', 'Standard AI Rendering'], color: 'slate' },
    { id: 'pro', name: 'Innovator', price: '₹199', features: ['Hackathon Mode', 'Priority Llama Inference', 'Architectural Grounding'], color: 'indigo' },
    { id: 'elite', name: 'Architect', price: '₹499', features: ['Startup MVP Mode', 'VC-Grade Blueprints', 'Technical Hallucination Audit'], color: 'amber' },
  ];

  /* ---------- shared select classes for strong light-mode contrast ---------- */
  const selectClass =
    "w-full bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-white/5 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-bold appearance-none cursor-pointer shadow-inner backdrop-blur-xl";

  const inputClass =
    "w-full bg-white/70 dark:bg-slate-800/40 border-2 border-slate-200 dark:border-white/5 rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-bold shadow-inner backdrop-blur-xl";

  const labelClass =
    "flex items-center gap-2.5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em] mb-3 ml-1";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 relative overflow-hidden">
      <Navigation />

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 dark:bg-indigo-600/5 blur-[120px] rounded-full animate-slow-spin"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/5 blur-[120px] rounded-full"></div>
        <div className="bg-noise absolute inset-0"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Tier Upgrade Section */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className={`relative p-8 rounded-[40px] border-2 transition-all duration-700 ${
              userTier === plan.id 
                ? 'bg-indigo-600 border-indigo-400/50 text-white shadow-[0_48px_80px_-16px_rgba(79,70,229,0.4)] scale-105 z-10' 
                : 'bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl border-slate-200/50 dark:border-white/5 text-slate-900 dark:text-slate-100 hover:border-indigo-200 dark:hover:border-indigo-800'
            }`}>
              {userTier === plan.id && (
                <Motion.div layoutId="active-badge" className="absolute -top-4 left-1/2 -track-x-1/2 px-5 py-1.5 bg-amber-400 text-indigo-950 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">Level Active</Motion.div>
              )}
              <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-3 ${userTier === plan.id ? 'text-indigo-100' : 'text-slate-500'}`}>{plan.name}</h4>
              <div className="text-5xl font-black mb-8 flex items-baseline gap-2 font-heading">
                {plan.price}
                <span className={`text-[11px] font-bold ${userTier === plan.id ? 'text-indigo-200' : 'text-slate-400'} uppercase tracking-widest`}>/ Token</span>
              </div>
              <ul className="space-y-5 mb-12">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3.5 text-xs font-bold leading-tight">
                    <div className={`mt-0.5 p-0.5 rounded-full ${userTier === plan.id ? 'bg-indigo-300/30' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                        <CheckCircle className={`w-3.5 h-3.5 ${userTier === plan.id ? 'text-indigo-100' : 'text-indigo-500'}`} />
                    </div>
                    <span className={userTier === plan.id ? 'text-indigo-50' : 'text-slate-600 dark:text-slate-400'}>{f}</span>
                  </li>
                ))}
              </ul>
              {userTier !== plan.id && plan.id !== 'free' && (
                <div className="pt-2">
                    <PaymentButton amount={parseInt(plan.price.replace('₹', ''))} plan={plan.id} />
                </div>
              )}
              {plan.id === 'free' && (
                <div className={`text-center py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-dashed ${userTier === 'free' ? 'bg-white/10 border-indigo-200/30 text-indigo-100' : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-400'}`}>
                    Baseline System Access
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Header Section */}
        <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/50 dark:bg-indigo-900/20 backdrop-blur-xl border border-slate-200 dark:border-indigo-800/50 rounded-full px-6 py-2.5 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="text-[10px] font-black text-slate-700 dark:text-indigo-300 uppercase tracking-[0.3em]">
              {step === 'input' ? 'Neural Config Console' : step === 'selection' ? 'Synthesis Complete' : 'System Blueprint x1.0'}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 text-slate-900 dark:text-white uppercase font-heading">
            {step === 'input' ? 'Architect' : 'Blueprint'} <span className="text-indigo-600 dark:text-indigo-400">Labs</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed font-body">
            {step === 'input'
              ? 'Initialize the architectural synthesis engine to generate production-ready system maps.'
              : 'Multi-dimensional analysis complete. Explore the technical core of your vision.'}
          </p>
        </Motion.div>

        {/* ============ Step 1: Input Form ============ */}
        {step === 'input' && (
          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
              {/* Form Header Bar */}
              <div className="px-10 py-4 border-b-2 border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl">
                    <Terminal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500 dark:text-gray-500">System Parameters v4.0</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>

              <div className="p-10 md:p-14 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Domain */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Target Industry or Domain</span>
                    </label>
                    <div className="relative">
                      <select name="domain" value={formData.domain} onChange={handleChange} className={selectClass}>
                        <option value="">Select a domain</option>
                        {domains.map((d) => (
                          <option key={d} value={d}>{capitalizeFirst(d)}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Skill Level */}
                  <div>
                    <label className={labelClass}>
                      <Award className="w-3.5 h-3.5 text-purple-500" />
                      <span>Complexity Level</span>
                    </label>
                    <div className="relative">
                      <select name="skillLevel" value={formData.skillLevel} onChange={handleChange} className={selectClass}>
                        <option value="">Select skill level</option>
                        {skillLevels.map((level) => (
                          <option key={level} value={level}>{capitalizeFirst(level)}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <label className={labelClass}>
                      <Code className="w-3.5 h-3.5 text-blue-500" />
                      <span>Preferred Stack</span>
                    </label>
                    <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="React, Node.js, AWS..." className={inputClass} />
                  </div>

                  {/* Goal */}
                  <div>
                    <label className={labelClass}>
                      <Target className="w-3.5 h-3.5 text-rose-500" />
                      <span>Market Objective</span>
                    </label>
                    <div className="relative">
                      <select name="goal" value={formData.goal} onChange={handleChange} className={selectClass}>
                        <option value="Portfolio">Educational Showcase</option>
                        <option value="Hackathon">Rapid Competition MVP</option>
                        <option value="Startup MVP">Scalable Startup MVP</option>
                        <option value="Learning">Deep Dive Concept</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Timeframe */}
                  <div>
                    <label className={labelClass}>
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Deployment Timeline</span>
                    </label>
                    <div className="relative">
                      <select name="timeframe" value={formData.timeframe} onChange={handleChange} className={selectClass}>
                        <option value="1 Weekend">Hyper Speed (2 days)</option>
                        <option value="1 Week">Standard Sprint (7 days)</option>
                        <option value="1 Month">Full Cycle (30 days)</option>
                        <option value="3 Months">Quarterly Release</option>
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !formData.domain || !formData.skillLevel}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center shadow-lg shadow-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider text-base group"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Initializing Synthesis...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5" />
                        <span>Run Design Architect</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Motion.div>
        )}

        {/* ============ Step 2: Idea Selection ============ */}
        {step === 'selection' && (
          <IdeaSelection ideas={ideas} onSelect={handleIdeaSelect} isLoading={loading} />
        )}

        {/* ============ Step 3: Blueprint ============ */}
        {step === 'blueprint' && generatedIdea && (
          <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Title Banner */}
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <div className="bg-indigo-600 p-10 text-center">
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{generatedIdea.title}</h2>
                <div className="flex justify-center gap-3 flex-wrap">
                  <span className="px-5 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm font-bold flex items-center gap-2 uppercase tracking-wider">
                    <Target className="w-4 h-4" /> {capitalizeFirst(generatedIdea.domain)}
                  </span>
                  <span className={`px-5 py-2 bg-gradient-to-r ${getSkillLevelColor(generatedIdea.skillLevel)} rounded-full text-white text-sm font-bold uppercase tracking-wider`}>
                    {capitalizeFirst(generatedIdea.skillLevel)}
                  </span>
                </div>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex justify-center">
              <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-lg inline-flex gap-1">
                {Object.entries(views).map(([key, view]) => (
                  <button
                    key={key}
                    onClick={() => setActiveView(key)}
                    className={`px-5 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-bold text-sm uppercase tracking-wider ${
                      activeView === key
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {view.icon}
                    <span>{view.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Details View */}
            {activeView === 'details' && (
              <div className="space-y-6">
                {/* Problem Statement */}
                <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl p-10 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-rose-500/25">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Problem Statement</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{generatedIdea.problem}</p>
                </div>

                {/* Tech Stack */}
                <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl p-10 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-indigo-600/25">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {generatedIdea.techStack?.map((tech, index) => (
                      <span key={index} className="px-5 py-2.5 bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl font-mono text-sm text-indigo-700 dark:text-indigo-300 font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl p-10 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-emerald-500/25">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Key Features</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {generatedIdea.features?.map((feature, index) => (
                      <div key={index} className="flex items-start p-4 bg-emerald-50 dark:bg-emerald-900/15 border-2 border-emerald-200 dark:border-emerald-800/40 rounded-2xl">
                        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800 dark:text-gray-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Implementation Roadmap */}
                <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl p-10 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-purple-600/25">
                      <Map className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Implementation Roadmap</h3>
                  </div>
                  <div className="space-y-4">
                    {generatedIdea.roadmap?.map((roadmapStep, index) => (
                      <div key={index} className="flex items-start p-5 bg-purple-50 dark:bg-purple-900/15 border-2 border-purple-200 dark:border-purple-800/40 rounded-2xl">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-black mr-4 flex-shrink-0 text-sm shadow-lg shadow-purple-600/25">
                          {index + 1}
                        </div>
                        <span className="text-gray-800 dark:text-gray-300 font-medium pt-2">{roadmapStep}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView === 'audit' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl p-10 shadow-lg">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-amber-500/25">
                        <ShieldCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">Technical Audit</h3>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Llama 3.1 8B Precision Review</p>
                      </div>
                    </div>
                    {generatedIdea.verification?.summary && (
                       <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                         generatedIdea.verification.issues?.length === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                       }`}>
                         {generatedIdea.verification.issues?.length === 0 ? 'Verified Traceable' : 'Risks Annotated'}
                       </span>
                    )}
                  </div>

                  {generatedIdea.verification?.issues?.length > 0 ? (
                    <div className="space-y-4">
                      {generatedIdea.verification.issues.map((issue, idx) => (
                        <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800">
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                              issue.severity === 'high' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                            }`}>
                              {issue.severity} Risk
                            </span>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{issue.path}</span>
                          </div>
                          <p className="text-gray-900 dark:text-gray-200 font-bold mb-2">"{issue.text}"</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{issue.reason}</p>
                          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                            <p className="text-indigo-700 dark:text-indigo-300 text-xs font-black uppercase tracking-widest mb-1">Recommendation</p>
                            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">{issue.recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">No Hallucinations Detected</h4>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Our verifier found no obvious technical risks or unverifiable statements in this blueprint.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeView === 'flow' && <FlowDiagram projectData={generatedIdea} />}
            {activeView === 'storyboard' && <Storyboard projectData={generatedIdea} />}

            {/* Floating Actions */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
              <button onClick={handleSave} disabled={isSaving}
                className="flex items-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 disabled:opacity-50">
                {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={handleRegenerate}
                className="flex items-center gap-2 px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl shadow-xl transition-all hover:scale-105">
                <RefreshCw className="w-5 h-5" />
                New Idea
              </button>
            </div>
          </Motion.div>
        )}
      </div>
    </div>
  );
};

export default GenerateIdeaPage;
