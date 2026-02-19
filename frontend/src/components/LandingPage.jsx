import React from 'react';
import { Rocket, Zap, Layers, Users, ArrowRight, CheckCircle, Sparkles, Box, Layout, Cpu, Globe } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="w-full flex flex-col items-center bg-background selection:bg-primary/30">
            
            {/* Hero Section */}
            <div className="w-full max-w-7xl mx-auto px-6 pt-32 pb-40 flex flex-col items-center text-center relative overflow-visible">
                
                {/* Background Decor */}
                <div className="absolute top-0 inset-x-0 h-[500px] bg-dots [mask-image:radial-gradient(ellipse_at_center,black,transparent)] opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

                {/* Badge */}
                <Motion.div 
                    className="inline-flex items-center space-x-2 bg-secondary/50 border border-white/10 rounded-full py-1.5 px-4 mb-10 backdrop-blur-xl shadow-inner group cursor-default"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm text-slate-300 font-medium tracking-wide">Enterprise Intelligence Powered by AI</span>
                </Motion.div>

                {/* Main Heading */}
                <Motion.h1 
                    className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[1.05] font-display"
                >
                    Build the future <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-blue-400 text-glow">
                        at the speed of thought
                    </span>
                </Motion.h1>

                <Motion.p 
                    className="max-w-2xl text-xl text-slate-400 mb-12 leading-relaxed font-light"
                >
                    Transform your sketches into scalable systems. AI Architect generates <span className="text-white">full-scale blueprints</span>, infrastructure maps, and development roadmaps in seconds.
                </Motion.p>

                {/* CTA Button */}
                <Motion.div>
                    <button 
                        onClick={onGetStarted}
                        className="group relative px-10 py-5 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer"></div>
                        <span className="relative flex items-center text-lg tracking-tight">
                            Create a Blueprint <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </Motion.div>
            
                {/* 3D Visual Preview */}
                <Motion.div 
                    className="mt-32 relative w-full max-w-6xl px-4"
                >
                    {/* Floating Decorative Elements */}
                    <div className="absolute -top-16 -left-16 p-4 bg-brand-card/80 backdrop-blur-3xl rounded-3xl animate-float hidden lg:block z-20 border border-white/10 shadow-black/40">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-500/20 rounded-xl">
                                <Cpu className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <div className="h-2 w-20 bg-white/20 rounded mb-1.5"></div>
                                <div className="h-1.5 w-12 bg-white/10 rounded"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute -bottom-10 -right-20 p-5 bg-brand-card/80 backdrop-blur-3xl rounded-3xl animate-float hidden lg:block z-20 border border-white/10 shadow-black/40" style={{ animationDelay: '2s' }}>
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-xs text-slate-300 font-mono tracking-widest uppercase">System Integrity: 100%</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1.5 w-40 bg-white/5 rounded"></div>
                            <div className="h-1.5 w-32 bg-white/5 rounded"></div>
                        </div>
                    </div>

                    {/* Main Interface Mockup */}
                    <div className="relative group [perspective:1000px]">
                        <div className="relative rounded-[32px] bg-brand-dark border border-white/5 shadow-[0_0_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-1000 ease-out transform group-hover:[transform:rotateX(2deg)]">
                            {/* Browser Header */}
                            <div className="h-14 bg-white/[0.02] border-b border-white/5 flex items-center px-6 space-x-2">
                                <div className="flex space-x-1.5">
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                    <div className="w-3 h-3 rounded-full bg-white/10"></div>
                                </div>
                                <div className="ml-6 h-7 flex-grow max-w-sm bg-black/40 rounded-full border border-white/5 flex items-center px-4 text-[11px] text-slate-500 font-medium font-mono">
                                    <Globe className="w-3 h-3 mr-2 opacity-50" /> dashboard.ai-architect.dev
                                </div>
                            </div>
                            
                            {/* Content Mockup */}
                            <div className="p-8 md:p-12 h-[500px] flex gap-8">
                                <div className="w-1/4 space-y-6">
                                    <div className="h-6 w-3/4 bg-white/10 rounded-md"></div>
                                    <div className="space-y-3">
                                        {[1,2,3,4,5].map(i => (
                                            <div key={i} className="h-12 w-full bg-white/5 rounded-xl border border-white/5"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-grow space-y-8">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-3">
                                            <div className="h-10 w-64 bg-white/10 rounded-lg"></div>
                                            <div className="h-4 w-48 bg-white/5 rounded-md"></div>
                                        </div>
                                        <div className="h-12 w-32 bg-primary/20 rounded-xl border border-primary/30"></div>
                                    </div>
                                    <div className="h-full bg-black/40 rounded-3xl border border-white/5 relative p-8">
                                        <div className="absolute inset-0 bg-dots opacity-5 [mask-image:radial-gradient(circle,black,transparent)]"></div>
                                        <div className="flex gap-4">
                                            <div className="w-2/3 h-64 bg-white/5 rounded-2xl border border-white/5"></div>
                                            <div className="flex-grow space-y-4">
                                                <div className="h-12 w-full bg-white/5 rounded-2xl border border-white/5"></div>
                                                <div className="h-12 w-full bg-white/5 rounded-2xl border border-white/5"></div>
                                                <div className="h-12 w-full bg-white/5 rounded-2xl border border-white/5"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative Background Glow for Mockup */}
                        <div className="absolute -inset-10 bg-primary/20 blur-[100px] -z-10 group-hover:opacity-100 transition-opacity opacity-50"></div>
                    </div>
                </Motion.div>
            </div>

            {/* Features Section */}
            <div className="w-full py-40 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/2 rounded-full blur-[150px] pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="text-center mb-24">
                        <Motion.span 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block"
                        >
                            Infrastructure Optimization
                        </Motion.span>
                        <Motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="text-5xl md:text-6xl font-bold text-white mb-8 font-display tracking-tight"
                        >
                            Architectural Excellence. <br /> Automated.
                        </Motion.h2>
                        <Motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-slate-400 max-w-2xl mx-auto text-xl font-light leading-relaxed"
                        >
                            Professional-grade tools combined with adaptive AI to build systems that scale effortlessly.
                        </Motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FeatureCard 
                            icon={<Cpu className="h-7 w-7 text-indigo-400" />}
                            title="Intelligent Stacks"
                            description="AI-driven stack selection based on performance, scalability, and cost efficiency."
                            delay={0}
                        />
                        <FeatureCard 
                            icon={<Layout className="h-7 w-7 text-white" />}
                            title="System Mapping"
                            description="Interactive infrastructure visualizations that bridge the gap between idea and code."
                            delay={0.1}
                        />
                        <FeatureCard 
                            icon={<CheckCircle className="h-7 w-7 text-emerald-400" />}
                            title="Validated Patterns"
                            description="Every blueprint follows rigorous industry standards and cloud-native architectural patterns."
                            delay={0.2}
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="w-full py-32 px-6 flex flex-col items-center">
                <div className="w-full max-w-5xl rounded-[40px] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to build your masterpiece?</h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-xl font-light">Join the next generation of architects and start generating your project blueprints today.</p>
                    <button 
                        onClick={onGetStarted}
                        className="px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
                    >
                        Initialize Your First Project
                    </button>
                </div>
            </div>

            {/* Footer Style */}
            <div className="w-full border-t border-white/5 pt-20 pb-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-slate-500 text-sm">
                    <div className="flex flex-col space-y-4 mb-8 md:mb-0">
                        <div className="flex items-center space-x-3 text-white">
                            <Box className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold tracking-tighter font-display uppercase">AI Architect</span>
                        </div>
                        <p className="max-w-xs text-xs leading-relaxed text-slate-600">The world's most advanced AI-powered system architecture and roadmap generator.</p>
                    </div>
                    <div className="flex flex-wrap gap-x-12 gap-y-4">
                        <div className="flex flex-col space-y-3">
                            <span className="text-white font-bold text-xs uppercase tracking-widest mb-1">Product</span>
                            <a href="#" className="hover:text-white transition-colors">Features</a>
                            <a href="#" className="hover:text-white transition-colors">Roadmap</a>
                            <a href="#" className="hover:text-white transition-colors">Changelog</a>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <span className="text-white font-bold text-xs uppercase tracking-widest mb-1">Resources</span>
                            <a href="#" className="hover:text-white transition-colors">Documentation</a>
                            <a href="#" className="hover:text-white transition-colors">API Reference</a>
                            <a href="#" className="hover:text-white transition-colors">Community</a>
                        </div>
                        <div className="flex flex-col space-y-3">
                            <span className="text-white font-bold text-xs uppercase tracking-widest mb-1">Legal</span>
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 text-[10px] text-slate-700 uppercase tracking-[0.2em] font-bold text-center border-t border-white/[0.02] pt-8">
                    &copy; 2026 AI Architect Labs. All rights reserved.
                </div>
            </div>
            
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        className="p-10 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500 group h-full relative"
    >
        <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-110">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors duration-500">{description}</p>
    </motion.div>
);

export default LandingPage;
