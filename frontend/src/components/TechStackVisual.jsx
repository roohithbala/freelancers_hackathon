import React, { useState } from 'react';
import { 
    Code2, Database, Cloud, Brain, Smartphone, Globe, 
    Server, Layers, Zap, Shield, BarChart3, Users,
    Cpu, Monitor, Palette, Lock, Settings, Rocket
} from 'lucide-react';

const TechStackVisual = ({ projectData }) => {
    const [activeStack, setActiveStack] = useState(null);

    const techStackMapping = {
        // Frontend Technologies
        'React': { icon: <Code2 className="h-6 w-6" />, color: 'from-blue-400 to-cyan-400', category: 'Frontend' },
        'Redux': { icon: <Layers className="h-6 w-6" />, color: 'from-purple-400 to-pink-400', category: 'Frontend' },
        'Material-UI': { icon: <Palette className="h-6 w-6" />, color: 'from-blue-500 to-indigo-500', category: 'Frontend' },
        'Vue.js': { icon: <Code2 className="h-6 w-6" />, color: 'from-green-400 to-emerald-400', category: 'Frontend' },
        'Angular': { icon: <Code2 className="h-6 w-6" />, color: 'from-red-400 to-pink-400', category: 'Frontend' },
        'Next.js': { icon: <Globe className="h-6 w-6" />, color: 'from-gray-400 to-slate-400', category: 'Frontend' },
        'Tailwind CSS': { icon: <Palette className="h-6 w-6" />, color: 'from-cyan-400 to-blue-400', category: 'Frontend' },
        
        // Backend Technologies  
        'Node.js': { icon: <Server className="h-6 w-6" />, color: 'from-green-500 to-lime-500', category: 'Backend' },
        'Express.js': { icon: <Server className="h-6 w-6" />, color: 'from-gray-500 to-slate-500', category: 'Backend' },
        'Python': { icon: <Code2 className="h-6 w-6" />, color: 'from-blue-500 to-yellow-500', category: 'Backend' },
        'Django': { icon: <Server className="h-6 w-6" />, color: 'from-green-600 to-green-400', category: 'Backend' },
        'Flask': { icon: <Server className="h-6 w-6" />, color: 'from-gray-600 to-gray-400', category: 'Backend' },
        'FastAPI': { icon: <Zap className="h-6 w-6" />, color: 'from-teal-500 to-green-500', category: 'Backend' },
        
        // Database Technologies
        'MongoDB': { icon: <Database className="h-6 w-6" />, color: 'from-green-400 to-emerald-600', category: 'Database' },
        'PostgreSQL': { icon: <Database className="h-6 w-6" />, color: 'from-blue-600 to-indigo-600', category: 'Database' },
        'MySQL': { icon: <Database className="h-6 w-6" />, color: 'from-orange-500 to-amber-500', category: 'Database' },
        'Redis': { icon: <Database className="h-6 w-6" />, color: 'from-red-500 to-pink-500', category: 'Database' },
        'Firebase': { icon: <Database className="h-6 w-6" />, color: 'from-yellow-500 to-orange-500', category: 'Database' },
        
        // AI/ML Technologies
        'TensorFlow.js': { icon: <Brain className="h-6 w-6" />, color: 'from-orange-400 to-red-500', category: 'AI/ML' },
        'PyTorch': { icon: <Brain className="h-6 w-6" />, color: 'from-orange-500 to-red-600', category: 'AI/ML' },
        'OpenAI': { icon: <Brain className="h-6 w-6" />, color: 'from-purple-500 to-indigo-600', category: 'AI/ML' },
        'Hugging Face': { icon: <Brain className="h-6 w-6" />, color: 'from-yellow-400 to-orange-400', category: 'AI/ML' },
        'Scikit-learn': { icon: <BarChart3 className="h-6 w-6" />, color: 'from-blue-500 to-cyan-500', category: 'AI/ML' },
        'NLP libraries': { icon: <Brain className="h-6 w-6" />, color: 'from-purple-400 to-pink-500', category: 'AI/ML' },
        
        // Cloud/DevOps
        'AWS': { icon: <Cloud className="h-6 w-6" />, color: 'from-orange-400 to-yellow-500', category: 'Cloud' },
        'Google Cloud': { icon: <Cloud className="h-6 w-6" />, color: 'from-blue-400 to-green-400', category: 'Cloud' },
        'Azure': { icon: <Cloud className="h-6 w-6" />, color: 'from-blue-500 to-indigo-500', category: 'Cloud' },
        'Docker': { icon: <Settings className="h-6 w-6" />, color: 'from-blue-400 to-cyan-500', category: 'Cloud' },
        'Kubernetes': { icon: <Settings className="h-6 w-6" />, color: 'from-blue-600 to-purple-600', category: 'Cloud' },
        
        // Mobile
        'React Native': { icon: <Smartphone className="h-6 w-6" />, color: 'from-blue-400 to-cyan-400', category: 'Mobile' },
        'Flutter': { icon: <Smartphone className="h-6 w-6" />, color: 'from-blue-500 to-cyan-500', category: 'Mobile' },
        
        // Authentication
        'JWT': { icon: <Shield className="h-6 w-6" />, color: 'from-green-500 to-emerald-500', category: 'Security' },
        'OAuth': { icon: <Lock className="h-6 w-6" />, color: 'from-purple-500 to-pink-500', category: 'Security' },
    };

    const categories = ['Frontend', 'Backend', 'Database', 'AI/ML', 'Cloud', 'Mobile', 'Security'];
    
    const categoryIcons = {
        'Frontend': <Monitor className="h-5 w-5" />,
        'Backend': <Server className="h-5 w-5" />,
        'Database': <Database className="h-5 w-5" />,
        'AI/ML': <Brain className="h-5 w-5" />,
        'Cloud': <Cloud className="h-5 w-5" />,
        'Mobile': <Smartphone className="h-5 w-5" />,
        'Security': <Shield className="h-5 w-5" />
    };

    const categoryColors = {
        'Frontend': 'from-blue-500 to-cyan-500',
        'Backend': 'from-green-500 to-emerald-500', 
        'Database': 'from-purple-500 to-indigo-500',
        'AI/ML': 'from-orange-500 to-red-500',
        'Cloud': 'from-gray-500 to-slate-500',
        'Mobile': 'from-pink-500 to-rose-500',
        'Security': 'from-yellow-500 to-amber-500'
    };

    // Demo project data - this would come from props in real usage
    const demoProject = {
        title: "AI-Powered Mental Health Chatbot for Students",
        technologies: [
            "React", "Redux", "Material-UI", 
            "Node.js", "Express.js", 
            "MongoDB", 
            "TensorFlow.js", "NLP libraries",
            "JWT", "AWS"
        ]
    };

    const project = projectData || demoProject;
    
    const getStacksByCategory = () => {
        const stacks = {};
        categories.forEach(cat => stacks[cat] = []);
        
        project.technologies.forEach(tech => {
            const techInfo = techStackMapping[tech];
            if (techInfo) {
                stacks[techInfo.category].push({ name: tech, ...techInfo });
            }
        });
        
        return stacks;
    };

    const stacksByCategory = getStacksByCategory();

    return (
        <div className="w-full max-w-6xl mx-auto p-8">
            {/* Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full py-2 px-6 mb-6">
                    <Rocket className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-semibold text-purple-300">Tech Stack Visualization</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        {project.title}
                    </span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Interactive visual representation of the complete technology stack
                </p>
            </div>

            {/* Tech Stack Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map(category => {
                    const techs = stacksByCategory[category];
                    if (techs.length === 0) return null;
                    
                    return (
                        <div key={category} className="group">
                            {/* Category Header */}
                            <div className={`flex items-center space-x-3 mb-6 p-4 rounded-2xl bg-gradient-to-r ${categoryColors[category]} bg-opacity-10 border border-white/10`}>
                                <div className={`p-2 rounded-xl bg-gradient-to-r ${categoryColors[category]} shadow-lg`}>
                                    <div className="text-white">
                                        {categoryIcons[category]}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{category}</h3>
                                    <p className="text-sm text-slate-400">{techs.length} technologies</p>
                                </div>
                            </div>

                            {/* Technology Cards */}
                            <div className="space-y-3">
                                {techs.map((tech, index) => (
                                    <div 
                                        key={tech.name}
                                        className="group/tech relative p-4 rounded-xl glass-panel hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                                        onMouseEnter={() => setActiveStack(tech.name)}
                                        onMouseLeave={() => setActiveStack(null)}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex items-center space-x-4">
                                            {/* Tech Icon */}
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${tech.color} shadow-lg group-hover/tech:scale-110 transition-transform duration-300`}>
                                                <div className="text-white">
                                                    {tech.icon}
                                                </div>
                                            </div>

                                            {/* Tech Info */}
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-white group-hover/tech:text-transparent group-hover/tech:bg-clip-text group-hover/tech:bg-gradient-to-r group-hover/tech:from-white group-hover/tech:to-blue-200 transition-all duration-300">
                                                    {tech.name}
                                                </h4>
                                                <p className="text-sm text-slate-400 capitalize">
                                                    {tech.category} Technology
                                                </p>
                                            </div>

                                            {/* Status Indicator */}
                                            <div className="flex flex-col items-end space-y-1">
                                                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                                                <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover/tech:opacity-10 transition-opacity duration-300 rounded-xl pointer-events-none`}></div>
                                        
                                        {/* Active Stack Highlight */}
                                        {activeStack === tech.name && (
                                            <div className="absolute inset-0 border-2 border-blue-400 rounded-xl pointer-events-none animate-pulse"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Architecture Flow Diagram */}
            <div className="mt-16 p-8 rounded-2xl glass-panel">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">System Architecture Flow</h3>
                <ArchitectureFlow technologies={project.technologies} />
            </div>
        </div>
    );
};

// Architecture Flow Component
const ArchitectureFlow = ({ technologies }) => {
    const layers = [
        { name: 'User Interface', techs: ['React', 'Redux', 'Material-UI', 'Tailwind CSS'], color: 'from-blue-500 to-cyan-500' },
        { name: 'API Layer', techs: ['Node.js', 'Express.js', 'FastAPI', 'Django'], color: 'from-green-500 to-emerald-500' },
        { name: 'AI/ML Processing', techs: ['TensorFlow.js', 'PyTorch', 'OpenAI', 'NLP libraries'], color: 'from-orange-500 to-red-500' },
        { name: 'Database Layer', techs: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'], color: 'from-purple-500 to-indigo-500' },
        { name: 'Cloud Infrastructure', techs: ['AWS', 'Google Cloud', 'Azure', 'Docker'], color: 'from-gray-500 to-slate-500' }
    ];

    return (
        <div className="space-y-8">
            {layers.map((layer, index) => {
                const layerTechs = technologies.filter(tech => layer.techs.includes(tech));
                if (layerTechs.length === 0) return null;

                return (
                    <div key={layer.name} className="relative">
                        {/* Connection Line */}
                        {index < layers.length - 1 && (
                            <div className="absolute left-1/2 -bottom-4 w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent transform -translate-x-0.5 z-10"></div>
                        )}

                        <div className={`p-6 rounded-2xl bg-gradient-to-r ${layer.color} bg-opacity-10 border border-white/10 group hover:border-white/20 transition-all duration-300`}>
                            <div className="text-center mb-4">
                                <h4 className="text-lg font-bold text-white mb-2">{layer.name}</h4>
                                <div className="flex justify-center space-x-4">
                                    {layerTechs.map((tech, techIndex) => (
                                        <div key={tech} className="flex flex-col items-center space-y-2 group/item">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${layer.color} shadow-lg group-hover/item:scale-110 transition-transform duration-300`}>
                                                <Code2 className="h-5 w-5 text-white" />
                                            </div>
                                            <span className="text-sm text-slate-300 font-medium">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TechStackVisual;