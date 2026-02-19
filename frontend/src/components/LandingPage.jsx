import React from 'react';
import { Rocket, Zap, Layers, Users, ArrowRight, CheckCircle, Sparkles, Box } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="w-full flex flex-col items-center overflow-hidden">
            
            {/* Hero Section */}
            <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-32 flex flex-col items-center text-center relative z-10">
                
                {/* Ambient Background Glows */}
                <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-nebula-purple/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
                <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-nebula-cyan/20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

                {/* Badge */}
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full py-1.5 px-4 mb-8 backdrop-blur-md animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
                    <Sparkles className="h-4 w-4 text-nebula-amber" />
                    <span className="text-sm text-slate-300 font-medium">AI Architect v2.0 is Live</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight leading-[1.1] font-display animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Architect Your <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-cyan via-white to-nebula-purple text-glow">
                        Next Big Thing
                    </span>
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
                    Stop brainstorming, start building. Generate production-ready <span className="text-white font-semibold">System Architectures, Cost Estimates, and Roadmaps</span> in seconds with AI.
                </p>

                {/* CTA Button */}
                <button 
                    onClick={onGetStarted}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-nebula-purple rounded-2xl font-bold text-white shadow-[0_0_50px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_0_70px_-10px_rgba(124,58,237,0.7)] transition-all transform hover:scale-105 animate-fade-in-up overflow-hidden" 
                    style={{ animationDelay: '0.3s' }}
                >
                    <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer"></div>
                    <span className="relative flex items-center text-lg tracking-wide">
                        Initialize Generator <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            
                {/* 3D Visual Preview */}
                <div className="mt-24 relative w-full max-w-5xl perspective-1000 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-12 -left-12 p-4 glass-panel rounded-2xl animate-float-slow hidden md:block z-20">
                        <Box className="h-8 w-8 text-nebula-cyan mb-2" />
                        <div className="h-2 w-24 bg-white/20 rounded mb-2"></div>
                        <div className="h-2 w-16 bg-white/10 rounded"></div>
                    </div>
                    
                    <div className="absolute -bottom-8 -right-8 p-4 glass-panel rounded-2xl animate-float hidden md:block z-20" style={{ animationDelay: '1s' }}>
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <div className="text-xs text-green-400 font-mono">System Online</div>
                        </div>
                        <div className="h-2 w-32 bg-white/10 rounded"></div>
                    </div>

                    {/* Main Interface Mockup */}
                    <div className="relative rounded-xl bg-[#0F0F1A] border border-white/10 shadow-2xl overflow-hidden transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out group">
                        {/* Fake Browser Header */}
                        <div className="h-10 bg-[#1A1A2E] border-b border-white/5 flex items-center px-4 space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            <div className="ml-4 h-5 w-64 bg-white/5 rounded-md flex items-center px-2 text-[10px] text-slate-500 font-mono">
                                ai-architect.app/generator
                            </div>
                        </div>
                        
                        {/* Mock Content */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8 opacity-80 group-hover:opacity-100 transition-opacity">
                            {/* Simulator Sidebar */}
                            <div className="col-span-1 space-y-4">
                                <div className="h-8 w-3/4 bg-white/10 rounded-lg animate-pulse"></div>
                                <div className="space-y-2">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="h-10 w-full bg-white/5 rounded-lg border border-white/5"></div>
                                    ))}
                                </div>
                            </div>
                            {/* Simulator Main */}
                            <div className="col-span-3 space-y-6">
                                <div className="flex justify-between">
                                    <div className="h-12 w-1/2 bg-white/10 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="h-12 w-32 bg-nebula-purple/20 rounded-lg border border-nebula-purple/30"></div>
                                </div>
                                <div className="h-64 w-full bg-[#0B0B15] rounded-xl border border-white/10 relative overflow-hidden">
                                     {/* Mock Graph */}
                                     <div className="absolute inset-0 flex items-center justify-center">
                                         <div className="w-24 h-24 rounded-full border-4 border-nebula-cyan/30 animate-spin-slow border-t-nebula-cyan"></div>
                                     </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                                    <div className="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                                    <div className="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                                </div>
                            </div>
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F1A] via-transparent to-transparent opacity-50 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full relative z-10 py-24">
                <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-3xl -z-10 skew-y-3 transform origin-top-left scale-110"></div>
                
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-nebula-cyan font-bold tracking-widest text-sm uppercase mb-2 block">Powerful Features</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">Engineered for Excellence</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            We've combined state-of-the-art AI models with real-world architectural patterns.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard 
                            icon={<Zap className="h-6 w-6 text-nebula-amber" />}
                            title="Instant Tech Stacks"
                            description="Forget dependency hell. Get perfectly matched frontend, backend, and DB choices tailored to your project goals."
                            delay="0"
                        />
                         <FeatureCard 
                            icon={<Layers className="h-6 w-6 text-nebula-purple" />}
                            title="Full Implementation Roadmaps"
                            description="Week-by-week implementation guides broken down into manageable sprints for rapid development."
                            delay="0.1"
                        />
                         <FeatureCard 
                            icon={<Users className="h-6 w-6 text-nebula-cyan" />}
                            title="Role-Based Intelligence"
                            description="Switch between 'Student' mode for learning and 'Startup' mode for MVPs and investor-ready pitches."
                            delay="0.2"
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <div 
        className="p-8 rounded-2xl glass-panel group hover:-translate-y-2 transition-all duration-300"
        style={{ animationDelay: `${delay}s` }}
    >
        <div className="h-14 w-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all shadow-[0_0_20px_-5px_rgba(0,0,0,0.5)]">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-nebula-cyan transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{description}</p>
    </div>
);

export default LandingPage;
