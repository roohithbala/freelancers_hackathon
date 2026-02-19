import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Star, Calendar, Users, Code2 } from 'lucide-react';
import TechStackVisual from './TechStackVisual';

const ProjectShowcase = ({ onBack }) => {
    const [selectedProject, setSelectedProject] = useState(0);

    const portfolioProjects = [
        {
            id: 1,
            title: "AI-Powered Mental Health Chatbot for Students",
            description: "An intelligent chatbot providing 24/7 mental health support for students with NLP-powered conversations and sentiment analysis.",
            technologies: ["React", "Redux", "Material-UI", "Node.js", "Express.js", "MongoDB", "TensorFlow.js", "NLP libraries", "JWT", "AWS"],
            features: [
                "Natural Language Processing for empathetic responses",
                "Sentiment analysis and mood tracking",
                "Personalized resource recommendations", 
                "Crisis intervention protocols",
                "Anonymous chat sessions",
                "Integration with counseling services"
            ],
            stats: { users: "5K+", uptime: "99.9%", satisfaction: "4.8/5" },
            category: "Healthcare AI",
            timeline: "3 weeks",
            github: "#",
            demo: "#"
        },
        {
            id: 2,
            title: "Smart E-Learning Platform with AI Tutoring",
            description: "Adaptive learning platform with AI-powered personalized tutoring and real-time performance analytics.",
            technologies: ["Next.js", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "OpenAI", "Docker", "Google Cloud"],
            features: [
                "AI-powered personalized learning paths",
                "Real-time progress analytics", 
                "Interactive coding exercises",
                "Peer collaboration tools",
                "Automated assignment grading",
                "Multi-language support"
            ],
            stats: { users: "12K+", uptime: "99.7%", satisfaction: "4.9/5" },
            category: "EdTech",
            timeline: "4 weeks", 
            github: "#",
            demo: "#"
        },
        {
            id: 3,
            title: "Real-Time Trading Dashboard with ML Predictions",
            description: "Advanced trading platform with machine learning price prediction and risk management tools.",
            technologies: ["React", "Redux", "Node.js", "Express.js", "MongoDB", "Python", "Scikit-learn", "Redis", "AWS"],
            features: [
                "ML-powered price prediction models",
                "Real-time market data streaming",
                "Risk assessment algorithms",
                "Portfolio optimization tools", 
                "Automated trading strategies",
                "Advanced charting and analytics"
            ],
            stats: { users: "8K+", uptime: "99.8%", satisfaction: "4.7/5" },
            category: "FinTech",
            timeline: "5 weeks",
            github: "#", 
            demo: "#"
        }
    ];

    const currentProject = portfolioProjects[selectedProject];

    return (
        <div className="min-h-screen bg-[#0B0B15] relative text-white overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none z-0"></div>
            <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none z-0"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                    <button 
                        onClick={onBack}
                        className="p-3 glass-button rounded-xl hover:bg-white/10 transition-all group"
                    >
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-white font-display">Portfolio Showcase</h1>
                        <p className="text-slate-400">Interactive project demonstrations with visual tech stacks</p>
                    </div>
                </div>

                {/* Project Selector */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {portfolioProjects.map((project, index) => (
                            <div 
                                key={project.id}
                                onClick={() => setSelectedProject(index)}
                                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 group ${
                                    selectedProject === index 
                                        ? 'glass-panel border-blue-500/50 bg-blue-500/5' 
                                        : 'glass-panel hover:border-white/20'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        project.category === 'Healthcare AI' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                        project.category === 'EdTech' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                    }`}>
                                        {project.category}
                                    </div>
                                    {selectedProject === index && (
                                        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
                                    )}
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>
                                
                                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                
                                <div className="flex items-center space-x-4 text-xs text-slate-500">
                                    <div className="flex items-center space-x-1">
                                        <Users className="h-3 w-3" />
                                        <span>{project.stats.users}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-3 w-3" />
                                        <span>{project.stats.satisfaction}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{project.timeline}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Project Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Project Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass-panel p-6 rounded-2xl">
                            <h2 className="text-2xl font-bold text-white mb-4">{currentProject.title}</h2>
                            <p className="text-slate-300 mb-6 leading-relaxed">{currentProject.description}</p>
                            
                            {/* Action Buttons */}
                            <div className="flex space-x-3 mb-6">
                                <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition-all hover:scale-105">
                                    <ExternalLink className="h-4 w-4" />
                                    <span>Live Demo</span>
                                </button>
                                <button className="px-4 py-3 glass-button rounded-xl hover:bg-white/10 transition-all">
                                    <Github className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {Object.entries(currentProject.stats).map(([key, value]) => (
                                    <div key={key} className="text-center">
                                        <div className="text-2xl font-bold text-white mb-1">{value}</div>
                                        <div className="text-xs text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Code2 className="h-5 w-5 text-blue-400 mr-2" />
                                Key Features
                            </h3>
                            <ul className="space-y-3">
                                {currentProject.features.map((feature, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                                        <span className="text-slate-300 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Tech Stack Visualization */}
                    <div className="lg:col-span-2">
                        <div className="glass-panel p-1 rounded-2xl">
                            <TechStackVisual projectData={currentProject} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectShowcase;