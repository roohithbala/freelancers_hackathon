import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, YAxis, CartesianGrid } from 'recharts';
import { DollarSign, Shield, Cpu, Activity, Zap } from 'lucide-react';

const DeepDiveStats = ({ stats }) => {
    if (!stats) return null;

    const { costEstimate = {}, scores = {}, pitchDeck = [] } = stats;

    const radarData = [
        { subject: 'Scalability', A: scores.scalability || 0, fullMark: 100 },
        { subject: 'Security', A: scores.security || 0, fullMark: 100 },
        { subject: 'Cost Efficiency', A: scores.costEfficiency || 0, fullMark: 100 },
        { subject: 'Innovation', A: scores.innovation || 0, fullMark: 100 },
        { subject: 'Completeness', A: scores.completeness || 0, fullMark: 100 },
    ];

    const costData = costEstimate.breakdown?.map(item => ({
        name: item.service,
        cost: parseFloat(item.cost.replace('$', '')) || 0,
    })) || [];

    return (
        <div className="space-y-6 mt-12 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl z-0"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8">

                {/* Radar Chart Section */}
                <div className="flex-1 min-h-[300px]">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-cyan-400" />
                        Project Health & Viability
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Project Score"
                                dataKey="A"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                fill="#06b6d4"
                                fillOpacity={0.3}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#38bdf8' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Cost Section */}
                <div className="flex-1 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                        Est. Monthly Infrastructure Cost
                    </h3>

                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-6">
                        {costEstimate.monthlyTotal || "$0.00"}
                    </div>

                    <div className="h-48 scrollbar-thin scrollbar-thumb-slate-700 overflow-y-auto pr-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={costData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
                                />
                                <Bar dataKey="cost" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-slate-500 mt-4 italic">
                        *Estimates based on current cloud provider pricing for MVP scale.
                    </p>
                </div>

            </div>

            {/* Pitch Deck Section */}
            {pitchDeck && (
                <div className="mt-8 border-t border-slate-800 pt-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                        Pitch Deck Generator
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {pitchDeck.map((slide, idx) => (
                            <div key={idx} className="bg-slate-900 p-4 rounded-lg border border-slate-800 hover:border-yellow-500/50 transition-colors group">
                                <div className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-2 group-hover:text-yellow-400">
                                    Slide {idx + 1}: {slide.title}
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {slide.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default DeepDiveStats;
