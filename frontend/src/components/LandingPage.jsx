import React, { useState, useEffect } from 'react';
import { Rocket, Zap, Layers, Users, ArrowRight, CheckCircle, Sparkles, Box, GitBranch, Star, Trophy, Target, Code2, Lightbulb, Brain } from 'lucide-react';

const LandingPage = ({ onGetStarted, onShowFlowDiagram, onShowPortfolio, currentUser }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full flex flex-col items-center overflow-hidden relative">
            
            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="particle absolute w-1 h-1 bg-blue-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 8}s`,
                            animationDuration: `${8 + Math.random() * 4}s`
                        }}
                    />
                ))}
            </div>
            
            {/* Mouse Follow Gradient */}
            <div 
                className="fixed w-[500px] h-[500px] pointer-events-none z-0 opacity-20 blur-[100px]"
                style={{
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                    left: mousePosition.x - 250,
                    top: mousePosition.y - 250,
                    transition: 'all 0.1s ease-out'
                }}
            />
            
            {/* Hero Section */}
            <div className="w-full max-w-7xl mx-auto px-6 pt-16 pb-20 flex flex-col items-center text-center relative z-10">
                
                {/* Enhanced Background Glows */}
                <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[800px] h-[800px] aurora-bg rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none floating-animation"></div>
                
                {/* Floating Tech Icons */}
                <div className="absolute top-32 left-16 floating-animation" style={{ animationDelay: '0s' }}>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                        <Code2 className="h-6 w-6 text-blue-400" />
                    </div>
                </div>
                <div className="absolute top-48 right-20 floating-animation" style={{ animationDelay: '2s' }}>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                        <Brain className="h-6 w-6 text-purple-400" />
                    </div>
                </div>
                <div className="absolute top-96 left-32 floating-animation" style={{ animationDelay: '4s' }}>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                        <Lightbulb className="h-6 w-6 text-yellow-400" />
                    </div>
                </div>

                {/* Premium Badge */}
                <div className="gradient-border mb-8 group cursor-default animate-fade-in-up">
                    <div className="inline-flex items-center space-x-3 py-2.5 px-6 rounded-full">
                        <div className="relative">
                            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse-glow" />
                            <div className="absolute inset-0 animate-ping">
                                <Sparkles className="h-5 w-5 text-yellow-400/50" />
                            </div>
                        </div>
                        <span className="text-sm font-semibold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            AI Architect v3.0 • Now with Advanced AI
                        </span>
                        <div className="px-2 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                            <span className="text-xs font-bold text-green-400">LIVE</span>
                        </div>
                    </div>
                </div>

                {/* Main Heading */}
                <div className="relative mb-8">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight leading-[0.9] font-display animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="block">Build The</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hero-glow relative">
                            Future
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-2xl -z-10"></div>
                        </span>
                        <span className="block text-5xl md:text-6xl lg:text-7xl text-slate-300 mt-2">With AI</span>
                    </h1>
                </div>

                <p className="max-w-3xl text-xl md:text-2xl text-slate-300 mb-12 animate-fade-in-up leading-relaxed font-medium" style={{ animationDelay: '0.2s' }}>
                    Transform your ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold">production-ready architectures</span> in seconds. 
                    <br className="hidden md:block" />
                    Get detailed <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-bold">implementation roadmaps</span> and cost estimates powered by AI.
                </p>

                {/* Enhanced CTA Section */}
                <div className="flex flex-col items-center space-y-8 mb-16">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <button 
                            onClick={onGetStarted}
                            className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-bold text-white shadow-[0_0_60px_-10px_rgba(59,130,246,0.7)] hover:shadow-[0_0_80px_-5px_rgba(59,130,246,0.9)] transition-all transform hover:scale-[1.02] animate-fade-in-up overflow-hidden" 
                            style={{ animationDelay: '0.3s' }}
                        >
                            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors rounded-2xl"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer-enhanced rounded-2xl"></div>
                            <span className="relative flex items-center text-xl tracking-wide">
                                <Rocket className="mr-3 h-6 w-6 group-hover:animate-bounce-subtle" />
                                {currentUser ? 'Launch Generator' : 'Start Building Now'} 
                                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                        
                        <div className="flex space-x-4">
                            <button 
                                onClick={onShowFlowDiagram}
                                className="group relative px-8 py-5 glass-button rounded-2xl font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/50 transition-all transform hover:scale-[1.02] animate-fade-in-up backdrop-blur-xl" 
                                style={{ animationDelay: '0.4s' }}
                            >
                                <span className="flex items-center text-lg">
                                    <GitBranch className="mr-3 h-5 w-5 text-purple-400 group-hover:text-purple-300 group-hover:rotate-12 transition-all" />
                                    See Demo
                                </span>
                            </button>
                            
                            <button 
                                onClick={onShowPortfolio}
                                className="group relative px-8 py-5 glass-button rounded-2xl font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-cyan-500/50 transition-all transform hover:scale-[1.02] animate-fade-in-up backdrop-blur-xl" 
                                style={{ animationDelay: '0.5s' }}
                            >
                                <span className="flex items-center text-lg">
                                    <svg className="mr-3 h-5 w-5 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Portfolio
                                </span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Enhanced Trust Indicators */}
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12 text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="flex items-center space-x-3">
                            <div className="flex -space-x-2">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">A</div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">B</div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-red-400 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">C</div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-slate-900">+50K</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">50,000+ developers</div>
                                <div className="text-xs text-slate-500">Building amazing projects</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">4.9/5 rating</div>
                                <div className="text-xs text-slate-500">From 2,000+ reviews</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                                <Trophy className="h-5 w-5 text-green-400" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-white">Award Winning</div>
                                <div className="text-xs text-slate-500">Top AI Tool 2026</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Call to Action for Portfolio */}
                    <div className="mt-8 p-6 rounded-2xl glass-panel border border-cyan-500/20 bg-cyan-500/5 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">✨ See Visual Tech Stacks in Action</h3>
                            <p className="text-slate-400 mb-4">Experience our interactive portfolio showcase with stunning visual representations</p>
                            <button 
                                onClick={onShowPortfolio}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Portfolio Demo
                            </button>
                        </div>
                    </div>
                </div>
            
                {/* Advanced 3D Preview */}
                <div className="relative w-full max-w-6xl perspective-1000 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    
                    {/* Floating Status Cards */}
                    <div className="absolute -top-8 -left-8 p-4 glass-panel rounded-2xl floating-animation hidden lg:block z-20 group hover:scale-105 transition-all">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse"></div>
                            <span className="text-xs font-mono text-green-400 font-semibold">SYSTEM ONLINE</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-28 bg-gradient-to-r from-green-500/30 to-green-500/10 rounded-full"></div>
                            <div className="h-2 w-20 bg-gradient-to-r from-blue-500/30 to-blue-500/10 rounded-full"></div>
                        </div>
                    </div>
                    
                    <div className="absolute -top-4 -right-12 p-4 glass-panel rounded-2xl floating-animation hidden lg:block z-20 group hover:scale-105 transition-all" style={{ animationDelay: '1s' }}>
                        <div className="flex items-center space-x-2 mb-3">
                            <Trophy className="h-4 w-4 text-yellow-400" />
                            <span className="text-xs font-bold text-yellow-400">PREMIUM</span>
                        </div>
                        <div className="text-xs text-slate-400">Advanced AI Models</div>
                    </div>

                    <div className="absolute -bottom-8 -left-16 p-4 glass-panel rounded-2xl floating-animation hidden lg:block z-20" style={{ animationDelay: '2s' }}>
                        <div className="flex items-center space-x-2 mb-2">
                            <Target className="h-4 w-4 text-purple-400" />
                            <span className="text-xs font-semibold text-purple-400">99.9% Accuracy</span>
                        </div>
                        <div className="text-xs text-slate-500">AI-Powered Recommendations</div>
                    </div>

                    {/* Enhanced Interface Mockup */}
                    <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-white/10 shadow-2xl overflow-hidden transform hover:rotate-x-2 transition-all duration-700 ease-out group backdrop-blur-xl">
                        
                        {/* Glowing Border Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Premium Browser Header */}
                        <div className="relative h-12 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-white/10 flex items-center px-6 space-x-3">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg"></div>
                            </div>
                            <div className="flex-1 max-w-md">
                                <div className="h-6 bg-white/5 rounded-lg flex items-center px-3 text-xs text-slate-400 font-mono border border-white/10">
                                    🔒 ai-architect.pro/dashboard
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-6 w-6 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    <Sparkles className="h-3 w-3 text-white" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Enhanced Mock Content */}
                        <div className="relative p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-[400px]">
                            
                            {/* Advanced Sidebar */}
                            <div className="col-span-2 space-y-6">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                        <Rocket className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="h-6 w-32 bg-gradient-to-r from-white/20 to-white/10 rounded-lg animate-pulse"></div>
                                </div>
                                
                                <div className="space-y-4">
                                    {[
                                        { color: 'from-blue-500 to-cyan-500', width: 'w-full' },
                                        { color: 'from-purple-500 to-pink-500', width: 'w-5/6' },
                                        { color: 'from-green-500 to-emerald-500', width: 'w-4/6' },
                                        { color: 'from-yellow-500 to-orange-500', width: 'w-3/6' }
                                    ].map((item, i) => (
                                        <div key={i} className="group cursor-pointer">
                                            <div className="h-12 bg-white/5 rounded-xl border border-white/10 p-3 hover:border-white/20 transition-all hover:bg-white/10">
                                                <div className={`h-2 ${item.width} bg-gradient-to-r ${item.color} rounded-full mb-2`}></div>
                                                <div className="h-1.5 w-2/3 bg-white/20 rounded-full"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Main Dashboard Area */}
                            <div className="col-span-3 space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="h-8 w-1/2 bg-gradient-to-r from-white/20 to-white/10 rounded-lg animate-pulse"></div>
                                    <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                                        <div className="h-4 w-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded"></div>
                                    </div>
                                </div>
                                
                                {/* Interactive Chart Area */}
                                <div className="h-48 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl border border-white/10 relative overflow-hidden group/chart">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover/chart:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {/* Animated Chart Elements */}
                                    <div className="absolute inset-0 flex items-end justify-center p-6 space-x-2">
                                        {[60, 80, 45, 90, 75, 95, 70].map((height, i) => (
                                            <div 
                                                key={i}
                                                className="bg-gradient-to-t from-blue-500/40 to-purple-500/40 rounded-t-md flex-1 max-w-8 transition-all duration-500 hover:from-blue-500/60 hover:to-purple-500/60"
                                                style={{ 
                                                    height: `${height}%`,
                                                    animationDelay: `${i * 0.1}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Floating Metrics */}
                                    <div className="absolute top-4 left-4">
                                        <div className="text-xs text-cyan-400 font-mono mb-1">Performance</div>
                                        <div className="text-lg font-bold text-white">98.7%</div>
                                    </div>
                                </div>
                                
                                {/* Feature Cards Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { icon: Zap, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-orange-500/20' },
                                        { icon: Layers, color: 'text-blue-400', bg: 'from-blue-500/20 to-cyan-500/20' },
                                        { icon: Target, color: 'text-purple-400', bg: 'from-purple-500/20 to-pink-500/20' }
                                    ].map((item, i) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <div key={i} className="group cursor-pointer">
                                                <div className={`h-20 bg-gradient-to-br ${item.bg} rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all hover:scale-105 flex items-center justify-center`}>
                                                    <IconComponent className={`h-6 w-6 ${item.color} group-hover:scale-110 transition-transform`} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Premium Overlay Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>
                                <div className="text-sm font-semibold text-white">AI-Powered Architecture Generation</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            
            {/* Animated Stats Section */}
            <StatsSection />
            
            {/* Enhanced Features Section */}
            <div className="w-full relative z-10 py-24">
                <div className="absolute inset-0 aurora-bg opacity-30 -z-10"></div>
                
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full py-2 px-6 mb-6">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-400">Premium Features</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                Engineered
                            </span>
                            {" "}for Excellence
                        </h2>
                        <p className="text-slate-400 max-w-3xl mx-auto text-xl leading-relaxed">
                            Experience the perfect blend of AI intelligence and real-world architectural expertise. 
                            Built by developers, for developers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <EnhancedFeatureCard 
                            icon={<Zap className="h-7 w-7 text-yellow-400" />}
                            title="Lightning-Fast Generation"
                            description="Get comprehensive system architectures in under 10 seconds. Our advanced AI models process complex requirements instantly."
                            gradient="from-yellow-500/20 to-orange-500/20"
                            delay="0"
                        />
                        <EnhancedFeatureCard 
                            icon={<Layers className="h-7 w-7 text-blue-400" />}
                            title="Production-Ready Blueprints"
                            description="Every generated architecture follows industry best practices with scalable, maintainable, and secure design patterns."
                            gradient="from-blue-500/20 to-cyan-500/20"
                            delay="0.1"
                        />
                        <EnhancedFeatureCard 
                            icon={<Brain className="h-7 w-7 text-purple-400" />}
                            title="Intelligent Recommendations"
                            description="AI analyzes your requirements and suggests optimal tech stacks, deployment strategies, and architecture patterns."
                            gradient="from-purple-500/20 to-pink-500/20"
                            delay="0.2"
                        />
                        <EnhancedFeatureCard 
                            icon={<Target className="h-7 w-7 text-green-400" />}
                            title="Cost Optimization"
                            description="Get detailed cost breakdowns and optimization suggestions to minimize infrastructure expenses while maximizing performance."
                            gradient="from-green-500/20 to-emerald-500/20"
                            delay="0.3"
                        />
                        <EnhancedFeatureCard 
                            icon={<Users className="h-7 w-7 text-cyan-400" />}
                            title="Team Collaboration"
                            description="Share blueprints with your team, get feedback, and iterate on designs all within the platform."
                            gradient="from-cyan-500/20 to-blue-500/20"
                            delay="0.4"
                        />
                        <EnhancedFeatureCard 
                            icon={<Code2 className="h-7 w-7 text-pink-400" />}
                            title="Code Generation"
                            description="Generate starter code, configuration files, and deployment scripts based on your architecture blueprint."
                            gradient="from-pink-500/20 to-rose-500/20"
                            delay="0.5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Stats Section Component
const StatsSection = () => {
    const stats = [
        { number: "50K+", label: "Projects Generated", icon: <Rocket className="h-6 w-6" /> },
        { number: "99.9%", label: "Uptime SLA", icon: <Target className="h-6 w-6" /> },
        { number: "<10s", label: "Average Response", icon: <Zap className="h-6 w-6" /> },
        { number: "4.9/5", label: "User Rating", icon: <Star className="h-6 w-6" /> }
    ];

    return (
        <div className="w-full py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 via-purple-950/20 to-pink-950/20"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center group">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 mb-4 group-hover:scale-110 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-blue-500/20 group-hover:to-purple-500/20">
                                <div className="text-blue-400 group-hover:text-white transition-colors">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-display animate-count-up">
                                {stat.number}
                            </div>
                            <div className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Enhanced Feature Card Component
const EnhancedFeatureCard = ({ icon, title, description, gradient, delay }) => (
    <div 
        className="group relative p-8 rounded-2xl glass-panel hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        style={{ animationDelay: `${delay}s` }}
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
        
        <div className="relative z-10">
            <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all shadow-lg group-hover:scale-110 duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
                {title}
            </h3>
            <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                {description}
            </p>
        </div>
        
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute top-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
    </div>
);

// Keep original FeatureCard for backward compatibility
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

// Keep original FeatureCard for backward compatibility
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
