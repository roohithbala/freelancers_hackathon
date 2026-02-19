import React, { useState } from 'react';
import { Send, Target, Clock, Terminal, Zap, Code, Award } from 'lucide-react';

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

        <div className="w-full max-w-4xl mx-auto">
            {/* Command Deck Container */}
            <div className="glass-panel p-1 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nebula-purple via-nebula-cyan to-nebula-pink opacity-50"></div>
                
                <div className="bg-[#0B0B15]/80 p-6 md:p-8 rounded-[22px]">
                    <div className="flex items-center mb-8 border-b border-white/5 pb-4">
                        <Terminal className="h-5 w-5 text-nebula-cyan mr-3" />
                        <h2 className="text-lg font-mono text-slate-300 tracking-wider">PROJECT_CONFIGURATION_PROTOCOL</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Domain Input */}
                            <div className="md:col-span-2 group">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-nebula-cyan transition-colors">
                                    Target Domain
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                        <Zap className="h-5 w-5 text-slate-500 group-focus-within:text-nebula-cyan transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleChange}
                                        placeholder="e.g. Healthcare, FinTech, E-commerce, EdTech"
                                        className="w-full pl-12 pr-4 py-4 input-glitch rounded-xl focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Skill Level */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Likely Complexity</label>
                                <div className="relative">
                                    <Award className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                                    <select
                                        name="skillLevel"
                                        value={formData.skillLevel}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 input-glitch rounded-xl appearance-none cursor-pointer"
                                    >
                                        <option value="Beginner">Beginner (CRUD, Basic UI)</option>
                                        <option value="Intermediate">Intermediate (Auth, API)</option>
                                        <option value="Advanced">Advanced (Microservices, AI)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Preferred Stack</label>
                                <div className="relative">
                                    <Code className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                                    <input
                                        type="text"
                                        name="techStack"
                                        value={formData.techStack}
                                        onChange={handleChange}
                                        placeholder="e.g. React, Node, Python"
                                        className="w-full pl-12 pr-4 py-4 input-glitch rounded-xl"
                                    />
                                </div>
                            </div>

                            {/* Project Goal */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Objective</label>
                                <div className="relative">
                                    <Target className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                                    <select
                                        name="goal"
                                        value={formData.goal}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 input-glitch rounded-xl appearance-none cursor-pointer"
                                    >
                                        <option value="Portfolio">Portfolio Piece</option>
                                        <option value="Hackathon">Hackathon Winner</option>
                                        <option value="Startup">Startup MVP</option>
                                        <option value="Learning">Learning Concept</option>
                                    </select>
                                </div>
                            </div>

                            {/* Timeframe */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Timeline</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-4 h-5 w-5 text-slate-500" />
                                    <select
                                        name="timeframe"
                                        value={formData.timeframe}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 input-glitch rounded-xl appearance-none cursor-pointer"
                                    >
                                        <option value="1 Weekend">1 Weekend</option>
                                        <option value="1 Week">1 Week</option>
                                        <option value="1 Month">1 Month</option>
                                        <option value="3 Months">3 Months</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-gradient-to-r from-blue-600 via-nebula-purple to-nebula-pink rounded-xl font-bold text-white text-lg hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] transition-all transform hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center relative overflow-hidden group"
                            >
                                {loading ? (
                                    <>
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        <span className="relative z-10 flex items-center">
                                            <div className="h-5 w-5 border-2 border-white/50 border-t-white rounded-full animate-spin mr-3"></div>
                                            Generating Blueprint...
                                        </span>
                                    </>
                                ) : (
                                    <span className="flex items-center relative z-10">
                                        <Send className="mr-2 h-5 w-5" /> Generate Architecture
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputForm;
