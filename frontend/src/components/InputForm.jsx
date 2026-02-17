import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

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
        <div className="w-full max-w-2xl mx-auto bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">🚀 Initialize Project Genesis</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Domain */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Project Domain</label>
                    <input
                        type="text"
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        placeholder="e.g., FinTech, HealthTech, Web3, Generative AI"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Skill Level */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Skill Level</label>
                        <select
                            name="skillLevel"
                            value={formData.skillLevel}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>

                    {/* Goal */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Project Goal</label>
                        <select
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option>Hackathon</option>
                            <option>Portfolio</option>
                            <option>Startup MVP</option>
                            <option>Research</option>
                        </select>
                    </div>
                </div>

                {/* Tech Stack */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Preferred Tech Stack</label>
                    <input
                        type="text"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                        placeholder="e.g., MERN, Next.js + Supabase, Python/Django"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Timeframe */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Timeframe</label>
                    <input
                        type="text"
                        name="timeframe"
                        value={formData.timeframe}
                        onChange={handleChange}
                        placeholder="e.g., 48 Hours, 2 Weeks, 3 Months"
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-[1.02] flex justify-center items-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Architecting Solution...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-5 w-5" />
                            Generate Blueprint
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default InputForm;
