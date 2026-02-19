import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Target, Clock, Terminal, Zap, Code, Award, Sparkles, ChevronRight, ArrowRight } from 'lucide-react';

const InputForm = ({ onGenerate, loading }) => {
    const [formData, setFormData] = useState({
        domain: '',
        skillLevel: 'Intermediate',
        techStack: '',
        goal: 'Startup MVP',
        timeframe: '1 Month'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(formData);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl mx-auto px-4"
        >
            <div className="relative group">
                {/* Decorative border glow */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-white/20 to-primary/50 rounded-[40px] blur-[2px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <div className="relative bg-brand-dark/40 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
                    
                    {/* Header Utility Bar */}
                    <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Terminal className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500">Configuration Console v4.0</span>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            
                            {/* Domain Input */}
                            <div className="md:col-span-2 group/field">
                                <label className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-primary transition-colors">
                                    <Sparkles className="w-3 h-3" />
                                    <span>Target Industry or Domain</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleChange}
                                        placeholder="Healthcare SaaS, AI FinTech, E-commerce Logistics..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-slate-600 focus:bg-white/[0.05] focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg font-light"
                                        required
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within/field:opacity-100 transition-opacity">
                                        <Zap className="w-5 h-5 text-primary" />
                                    </div>
                                </div>
                            </div>

                            {/* Complexity */}
                            <div className="group/field">
                                <label className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-primary transition-colors">
                                    <Award className="w-3 h-3" />
                                    <span>Likely Complexity</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="skillLevel"
                                        value={formData.skillLevel}
                                        onChange={handleChange}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white appearance-none cursor-pointer focus:bg-white/[0.05] focus:border-primary/50 outline-none transition-all font-light"
                                    >
                                        <option value="Novice">Novice (Simple Logic)</option>
                                        <option value="Beginner">Beginner (Fast Prototype)</option>
                                        <option value="Intermediate">Intermediate (Scalable Core)</option>
                                        <option value="Advanced">Advanced (Enterprise Grade)</option>
                                    </select>
                                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="group/field">
                                <label className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-primary transition-colors">
                                    <Code className="w-3 h-3" />
                                    <span>Preferred Stack</span>
                                </label>
                                <input
                                    type="text"
                                    name="techStack"
                                    value={formData.techStack}
                                    onChange={handleChange}
                                    placeholder="React, Node.js, AWS..."
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-slate-600 focus:bg-white/[0.05] focus:border-primary/50 outline-none transition-all font-light"
                                />
                            </div>

                            {/* Objective */}
                            <div className="group/field">
                                <label className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-primary transition-colors">
                                    <Target className="w-3 h-3" />
                                    <span>Market Objective</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="goal"
                                        value={formData.goal}
                                        onChange={handleChange}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white appearance-none cursor-pointer focus:bg-white/[0.05] focus:border-primary/50 outline-none transition-all font-light"
                                    >
                                        <option value="Portfolio">Educational Showcase</option>
                                        <option value="Hackathon">Rapid Competition MVP</option>
                                        <option value="Startup">Scalable Startup MVP</option>
                                        <option value="Learning">Deep Dive Concept</option>
                                    </select>
                                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="group/field">
                                <label className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1 group-focus-within/field:text-primary transition-colors">
                                    <Clock className="w-3 h-3" />
                                    <span>Deployment Timeline</span>
                                </label>
                                <div className="relative">
                                    <select
                                        name="timeframe"
                                        value={formData.timeframe}
                                        onChange={handleChange}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white appearance-none cursor-pointer focus:bg-white/[0.05] focus:border-primary/50 outline-none transition-all font-light"
                                    >
                                        <option value="1 Weekend">Hyper Speed (2 days)</option>
                                        <option value="1 Week">Standard Sprint (7 days)</option>
                                        <option value="1 Month">Full Cycle (30 days)</option>
                                        <option value="3 Months">Quarterly Release</option>
                                    </select>
                                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 rotate-90 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-10 flex flex-col items-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center shadow-2xl shadow-white/5 relative overflow-hidden group/btn"
                            >
                                {loading ? (
                                    <div className="flex items-center space-x-3">
                                        <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
                                        <span className="tracking-tight">Initializing Synthesis...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl tracking-tight">Run Design Architect</span>
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12 translate-x-[-200%] group-hover/btn:animate-shimmer"></div>
                            </button>
                            <p className="mt-6 text-[10px] text-slate-600 uppercase tracking-widest font-bold">Press ENTER to execute build command</p>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default InputForm;
