import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronRight, Layout } from 'lucide-react';

const IdeaSelection = ({ ideas, onSelect, isLoading }) => {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
    >
        <button
            onClick={() => !isLoading && onSelect(idea)}
            disabled={isLoading}
            className="w-full h-full text-left group relative transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
            <div className="h-full bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-3xl overflow-hidden group-hover:border-indigo-400 dark:group-hover:border-indigo-600 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 transition-all duration-300 shadow-lg flex flex-col">
                
                {/* Top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-30 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="p-8 flex flex-col flex-grow">
                    {/* Icon & Badge */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3.5 bg-gray-100 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-all">
                            <Layout className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                            idea.difficulty === 'Beginner' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400' :
                            idea.difficulty === 'Intermediate' ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400' :
                            'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-400'
                        }`}>
                            {idea.difficulty}
                        </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {idea.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8 flex-grow">
                        {idea.description}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t-2 border-gray-100 dark:border-slate-800">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {idea.tech_stack?.slice(0, 3).map((tech, i) => (
                                <span key={i} className="text-[10px] font-black px-3 py-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 tracking-wider uppercase">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-gray-500 dark:text-gray-500 uppercase tracking-widest group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                Generate Blueprint
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
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
