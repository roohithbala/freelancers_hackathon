import React, { useState } from 'react';
import { Send, Loader2, Code2, Target, Briefcase, Clock, Sparkles } from 'lucide-react';

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

    const inputClasses = "w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all hover:bg-slate-900/70 hover:border-slate-600";
    const labelClasses = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1";

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden group">
                
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700"></div>
                
                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/20 ring-1 ring-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                            <Sparkles className="h-6 w-6 text-blue-400" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 font-display">Configure Your Project</h2>
                        <p className="text-slate-400">Define your parameters and let our AI architect the blueprint.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Domain */}
                        <div className="group/field">
                            <label className={labelClasses}>Project Domain</label>
                            <div className="relative">
                                <Target className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/field:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    name="domain"
                                    value={formData.domain}
                                    onChange={handleChange}
                                    placeholder="e.g., FinTech, HealthTech, Web3, Generative AI"
                                    className={`${inputClasses} pl-12`}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Skill Level */}
                            <div>
                                <label className={labelClasses}>Skill Level</label>
                                <div className="relative">
                                    <select
                                        name="skillLevel"
                                        value={formData.skillLevel}
                                        onChange={handleChange}
                                        className={`${inputClasses} appearance-none cursor-pointer`}
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Goal */}
                            <div>
                                <label className={labelClasses}>Target Goal</label>
                                <div className="relative">
                                    <select
                                        name="goal"
                                        value={formData.goal}
                                        onChange={handleChange}
                                        className={`${inputClasses} appearance-none cursor-pointer`}
                                    >
                                        <option>Hackathon</option>
                                        <option>Portfolio</option>
                                        <option>Startup MVP</option>
                                        <option>Research</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="group/field">
                            <label className={labelClasses}>Preferred Tech Stack</label>
                            <div className="relative">
                                <Code2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/field:text-purple-400 transition-colors" />
                                <input
                                    type="text"
                                    name="techStack"
                                    value={formData.techStack}
                                    onChange={handleChange}
                                    placeholder="e.g., MERN, Next.js + Supabase, Python"
                                    className={`${inputClasses} pl-12 focus:ring-purple-500/50 focus:border-purple-500/50`}
                                    required
                                />
                            </div>
                        </div>

                        {/* Timeframe */}
                        <div className="group/field">
                            <label className={labelClasses}>Timeline</label>
                            <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within/field:text-cyan-400 transition-colors" />
                                <input
                                    type="text"
                                    name="timeframe"
                                    value={formData.timeframe}
                                    onChange={handleChange}
                                    placeholder="e.g., 48 Hours, 2 Weeks, 3 Months"
                                    className={`${inputClasses} pl-12 focus:ring-cyan-500/50 focus:border-cyan-500/50`}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-3 h-5 w-5" />
                                    <span>Architecting Solution...</span>
                                </>
                            ) : (
                                <>
                                    <span className="mr-2">Generate Blueprint</span>
                                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputForm;
