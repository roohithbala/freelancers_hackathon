import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  Target, 
  Code, 
  Zap, 
  Shield,
  CheckCircle,
  Clock,
  Rocket,
  Map,
  Layers,
  ArrowRight,
  DollarSign,
  BarChart3,
  Presentation
} from 'lucide-react';

// Extract clean text from a problem field that might contain raw JSON
function cleanProblem(raw) {
  if (!raw || typeof raw !== 'string') return '';
  // Strip markdown code fences first
  let cleaned = raw.replace(/```json\s*/gi, '').replace(/```/g, '').trim();
  // If it looks like JSON fragments, extract "content" values
  if (/["{}[\]]/.test(cleaned)) {
    const contentMatches = [...cleaned.matchAll(/"content"\s*:\s*"([^"]+)"/g)];
    if (contentMatches.length > 0) {
      return contentMatches.map(m => m[1]).join(' ');
    }
    // Try to strip all JSON artifacts
    cleaned = cleaned
      .replace(/[{}\[\]]/g, '')
      .replace(/"title"\s*:\s*"[^"]*"/g, '')
      .replace(/"content"\s*:/g, '')
      .replace(/"/g, '')
      .replace(/,\s*/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  return cleaned;
}

// Get the best problem text from available data
function extractProblem(projectData) {
  const pitchDeck = projectData?.pitchDeck || projectData?.data?.pitchDeck || [];
  // 1. Prefer the "Problem" slide from pitchDeck
  const problemSlide = pitchDeck.find(s => s.title && s.title.toLowerCase() === 'problem');
  if (problemSlide?.content) return problemSlide.content;
  // 2. Use description if it looks clean
  if (projectData?.description && !/[{}\[\]]/.test(projectData.description)) {
    return projectData.description;
  }
  // 3. Try cleaning the problem field
  const cleaned = cleanProblem(projectData?.problem || '');
  if (cleaned) return cleaned;
  // 4. Fall back to description even if it has JSON
  return cleanProblem(projectData?.description || '') || 'No problem statement available.';
}

const Storyboard = ({ projectData }) => {
  const [activeSection, setActiveSection] = useState('pitch');

  const problem = extractProblem(projectData);
  const features = projectData?.features || [];
  const techStack = projectData?.techStack || [];
  const roadmap = projectData?.roadmap || [];
  const title = projectData?.title || 'Untitled Project';
  const pitchDeck = projectData?.pitchDeck || projectData?.data?.pitchDeck || [];
  const scores = projectData?.scores || projectData?.data?.scores || {};
  const costEstimate = projectData?.costEstimate || projectData?.data?.costEstimate || {};

  const sections = {
    pitch: { title: 'Pitch Deck', icon: <Presentation className="w-5 h-5" /> },
    features: { title: 'Key Features', icon: <Zap className="w-5 h-5" /> },
    techStack: { title: 'Tech Stack', icon: <Code className="w-5 h-5" /> },
    roadmap: { title: 'Roadmap', icon: <Map className="w-5 h-5" /> },
    scores: { title: 'Scores & Cost', icon: <BarChart3 className="w-5 h-5" /> }
  };

  const scoreColors = {
    scalability: 'from-blue-400 to-cyan-500',
    security: 'from-green-400 to-emerald-500',
    costEfficiency: 'from-yellow-400 to-orange-500',
    innovation: 'from-purple-400 to-pink-500',
    completeness: 'from-indigo-400 to-blue-500'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-5">
          <h3 className="text-xl font-black text-white uppercase tracking-wider">
            {title} — Storyboard
          </h3>
        </div>

        {/* Section Tabs */}
        <div className="p-4 border-b-2 border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
          <div className="flex flex-wrap gap-2">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 font-bold text-sm uppercase tracking-wider ${
                  activeSection === key
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 border-2 border-gray-200 dark:border-slate-700'
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">

          {/* Pitch Deck — Problem, Solution, Market */}
          {activeSection === 'pitch' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 dark:text-white">Project Pitch</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Problem, Solution & Market</p>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
                <div className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Problem Statement</div>
                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed font-medium whitespace-pre-line">
                  {problem}
                </p>
              </div>

              {/* Pitch Deck Cards */}
              {pitchDeck.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-4">
                  {pitchDeck.map((slide, index) => {
                    const colors = [
                      'from-red-400 to-pink-500',
                      'from-blue-400 to-indigo-500',
                      'from-green-400 to-emerald-500',
                      'from-purple-400 to-pink-500',
                      'from-yellow-400 to-orange-500'
                    ];
                    const color = colors[index % colors.length];
                    return (
                      <Motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-xl`}
                      >
                        <h5 className="text-lg font-black mb-3 uppercase tracking-wider">{slide.title}</h5>
                        <p className="text-white/90 leading-relaxed">{slide.content}</p>
                      </Motion.div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 dark:text-gray-500 text-center py-4 text-sm">
                  No pitch deck data available. Try generating a new blueprint to get full pitch deck content.
                </p>
              )}

              {/* Tech stack preview */}
              {techStack.length > 0 && (
                <div className="mt-4">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Built With</div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-200 dark:border-indigo-700 rounded-xl text-indigo-700 dark:text-indigo-300 text-sm font-bold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Motion.div>
          )}

          {/* Features */}
          {activeSection === 'features' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 dark:text-white">Key Features</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{features.length} features planned</p>
                </div>
              </div>

              {features.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <Motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{feature}</span>
                    </Motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No features data available for this project.</p>
              )}
            </Motion.div>
          )}

          {/* Tech Architecture */}
          {activeSection === 'techStack' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 dark:text-white">Technology Stack</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{techStack.length} technologies</p>
                </div>
              </div>

              {techStack.length > 0 ? (
                <div className="space-y-6">
                  {/* Visual tech flow */}
                  <div className="flex flex-wrap items-center gap-3">
                    {techStack.map((tech, index) => (
                      <React.Fragment key={index}>
                        <Motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.08 }}
                          className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20"
                        >
                          {tech}
                        </Motion.div>
                        {index < techStack.length - 1 && (
                          <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Categorized view */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {techStack.map((tech, idx) => {
                      const category = categorizeTech(tech);
                      return (
                        <Motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-xl"
                        >
                          <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{category}</div>
                          <div className="text-gray-900 dark:text-white font-bold">{tech}</div>
                        </Motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No tech stack data available.</p>
              )}
            </Motion.div>
          )}

          {/* Roadmap */}
          {activeSection === 'roadmap' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 dark:text-white">Implementation Roadmap</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{roadmap.length} milestones</p>
                </div>
              </div>

              {roadmap.length > 0 ? (
                <div className="space-y-4">
                  {roadmap.map((step, index) => (
                    <Motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/30">
                          {index + 1}
                        </div>
                        {index < roadmap.length - 1 && (
                          <div className="w-0.5 h-8 bg-gradient-to-b from-purple-300 to-pink-200 dark:from-purple-700 dark:to-pink-800 mt-2" />
                        )}
                      </div>
                      <div className="flex-1 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4 -mt-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <span className="text-gray-800 dark:text-gray-200 font-medium">{step}</span>
                        </div>
                      </div>
                    </Motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No roadmap data available.</p>
              )}
            </Motion.div>
          )}

          {/* Scores & Cost */}
          {activeSection === 'scores' && (
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Scores */}
              {Object.keys(scores).length > 0 ? (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900 dark:text-white">Project Scores</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">AI-evaluated project metrics</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-5 gap-4">
                    {Object.entries(scores).map(([key, value], index) => (
                      <Motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08 }}
                        className="text-center"
                      >
                        <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${scoreColors[key] || 'from-gray-400 to-gray-500'} rounded-2xl flex items-center justify-center text-white shadow-xl mb-3`}>
                          <span className="text-2xl font-black">{value}</span>
                        </div>
                        <div className="text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        {/* Score bar */}
                        <div className="mt-2 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <Motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            className={`h-full bg-gradient-to-r ${scoreColors[key] || 'from-gray-400 to-gray-500'} rounded-full`}
                          />
                        </div>
                      </Motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <BarChart3 className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 dark:text-gray-500 text-sm">No scores available. Generate a new blueprint to get project scores.</p>
                </div>
              )}

              {/* Cost Estimate */}
              {costEstimate.monthlyTotal ? (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900 dark:text-white">Cost Estimate</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Estimated monthly hosting & services cost</p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
                    <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-4">
                      {costEstimate.monthlyTotal} <span className="text-sm font-bold text-gray-500">/month</span>
                    </div>
                    {Array.isArray(costEstimate.breakdown) && costEstimate.breakdown.length > 0 && (
                      <div className="space-y-2">
                        {costEstimate.breakdown.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2 border-b border-emerald-200 dark:border-emerald-800 last:border-0">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">{item.service}</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.cost}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <DollarSign className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 dark:text-gray-500 text-sm">No cost estimate available. Generate a new blueprint to get cost data.</p>
                </div>
              )}
            </Motion.div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-lg">
          <Presentation className="w-7 h-7 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-gray-900 dark:text-white">{pitchDeck.length}</div>
          <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pitch Slides</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-lg">
          <Shield className="w-7 h-7 text-emerald-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-gray-900 dark:text-white">{features.length}</div>
          <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Features</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-lg">
          <Code className="w-7 h-7 text-indigo-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-gray-900 dark:text-white">{techStack.length}</div>
          <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Technologies</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-lg">
          <Rocket className="w-7 h-7 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-gray-900 dark:text-white">{roadmap.length}</div>
          <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Milestones</div>
        </div>
        <div className="bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-5 text-center shadow-lg">
          <BarChart3 className="w-7 h-7 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-black text-gray-900 dark:text-white">{Object.keys(scores).length}</div>
          <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Scores</div>
        </div>
      </div>
    </div>
  );
};

function categorizeTech(tech) {
  const t = tech.toLowerCase();
  if (/react|vue|angular|next|svelte|html|css|tailwind|flutter|swift/i.test(t)) return 'Frontend';
  if (/node|express|fastapi|django|flask|spring|go|ruby|rails/i.test(t)) return 'Backend';
  if (/mongo|postgres|mysql|firebase|supabase|redis|dynamo|sqlite/i.test(t)) return 'Database';
  if (/tensorflow|pytorch|openai|groq|gemini|llm|ai|ml|nlp/i.test(t)) return 'AI / ML';
  if (/aws|gcp|azure|vercel|netlify|docker|kubernetes|ci|cd/i.test(t)) return 'Cloud / DevOps';
  if (/socket|websocket|graphql|rest|api|grpc/i.test(t)) return 'API / Protocol';
  if (/stripe|twilio|sendgrid|auth0|clerk/i.test(t)) return 'Service';
  return 'Technology';
}

export default Storyboard;
