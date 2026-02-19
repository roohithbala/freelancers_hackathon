import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Code, Activity, Layers, Sparkles, ChevronRight, Layout } from 'lucide-react';

const IdeaSelection = ({ ideas, onSelect, isLoading }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-24 relative">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/2 rounded-full blur-[150px] pointer-events-none"></div>
                
                <Motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center space-x-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-8 backdrop-blur-xl"
                >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">Synthesis Engine Complete</span>
                </Motion.div>
                
                <Motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-6xl font-bold text-white mb-8 font-display tracking-tight uppercase"
                >
                    Select Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">Foundation</span>
                </Motion.h2>
                <Motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-400 max-w-2xl mx-auto text-xl font-light leading-relaxed"
                >
                    We've synthesized several architectural pathways based on your parameters. Select the most viable concept to generate a detailed implementation blueprint.
                </Motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {ideas.map((idea, index) => (
                    <IdeaCard 
                        key={index}
                        idea={idea}
                        index={index}
                        onSelect={onSelect}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
};

const IdeaCard = ({ idea, index, onSelect, isLoading }) => (
    <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="h-full"
    >
        <button
            onClick={() => !isLoading && onSelect(idea)}
            disabled={isLoading}
            className="w-full h-full text-left group relative transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
        >
            <div className="h-full bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden group-hover:bg-white/[0.04] group-hover:border-primary/30 transition-all duration-500 shadow-2xl shadow-black/40 flex flex-col">
                
                {/* Header Decoration */}
                <div className="h-2 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/50 transition-all"></div>
                
                <div className="p-10 flex flex-col flex-grow">
                    {/* Icon & Badge */}
                    <div className="flex justify-between items-start mb-10">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
                            <Layout className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                            idea.difficulty === 'Beginner' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                            idea.difficulty === 'Intermediate' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' :
                            'bg-orange-500/10 border-orange-500/20 text-orange-400'
                        }`}>
                            {idea.difficulty}
                        </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {idea.title}
                    </h3>
                    
                    <p className="text-slate-400 text-base font-light leading-relaxed mb-10 flex-grow">
                        {idea.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-8 border-t border-white/5 group-hover:border-white/10 transition-colors">
                        <div className="flex flex-wrap gap-2 mb-8">
                            {idea.tech_stack.slice(0, 3).map((tech, i) => (
                                <span key={i} className="text-[10px] font-bold px-3 py-1.5 bg-white/5 rounded-lg text-slate-500 border border-white/5 tracking-wider uppercase">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Generate Blueprint</span>
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:translate-x-1">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    </Motion.div>
);

export default IdeaSelection;
