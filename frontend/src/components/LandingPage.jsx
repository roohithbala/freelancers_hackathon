import React from 'react';
import { Rocket, Zap, Layers, Users, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="w-full flex flex-col items-center">
            
            {/* Hero Section */}
            <div className="w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center relative">
                {/* Glowing orb background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full py-2 px-4 mb-8 backdrop-blur-sm animate-fade-in-up">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-sm text-slate-300 font-medium">New: Role-Based Architectures</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight font-display animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Turn Ideas into <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-glow">
                        Production Blueprints
                    </span>
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Stop brainstorming, start building. Generate detailed full-stack project blueprints, 
                    tech stacks, and implementation roadmaps in seconds.
                </p>

                <button 
                    onClick={onGetStarted}
                    className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all hover:scale-105 animate-fade-in-up" 
                    style={{ animationDelay: '0.3s' }}
                >
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
                    <span className="flex items-center text-lg">
                        Launch Generator <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            
                {/* Visual Preview / Mockup */}
                <div className="mt-20 relative w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
                    <div className="glass-panel p-4 rounded-xl relative">
                        <div className="flex space-x-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="space-y-4">
                                <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                                <div className="h-24 w-full bg-slate-800/50 rounded-lg"></div>
                                <div className="h-24 w-full bg-slate-800/50 rounded-lg"></div>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <div className="h-40 w-full bg-slate-800/50 rounded-lg flex items-center justify-center border border-slate-700 border-dashed">
                                    <div className="text-slate-600 text-sm">System Architecture Diagram</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-12 w-full bg-slate-800/50 rounded"></div>
                                    <div className="h-12 w-full bg-slate-800/50 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="w-full bg-slate-900/50 border-y border-white/5 backdrop-blur-sm py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Built for Builders</h2>
                        <p className="text-slate-400">Everything you need to go from zero to one.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Zap className="h-6 w-6 text-yellow-400" />}
                            title="Instant Tech Stacks"
                            description="Forget dependency hell. Get perfectly matched frontend, backend, and DB choices."
                        />
                         <FeatureCard 
                            icon={<Layers className="h-6 w-6 text-purple-400" />}
                            title="Full Roadmaps"
                            description="Week-by-week implementation guides tailored to your timeline."
                        />
                         <FeatureCard 
                            icon={<Users className="h-6 w-6 text-cyan-400" />}
                            title="Role-Based Prompts"
                            description="Switch between 'Student' and 'Startup' modes for customized blueprints."
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-1">
        <div className="h-12 w-12 rounded-lg bg-slate-900 flex items-center justify-center mb-4 shadow-lg">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
