import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, YAxis, CartesianGrid } from 'recharts';
import { DollarSign, Shield, Cpu, Activity, Zap, BarChart3, PieChart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <div className="space-y-12 mt-20">
            
            <div className="relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/20 via-white/5 to-primary/20 rounded-[40px] blur-[2px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                
                <div className="relative bg-brand-dark/40 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 md:p-16 overflow-hidden">
                    
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/2 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Radar Chart Section */}
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <PieChart className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Viability Analytics</h3>
                            </div>
                            
                            <div className="flex-grow min-h-[350px] bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={350}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                        <PolarGrid stroke="rgba(255,255,255,0.05)" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar
                                            name="System Score"
                                            dataKey="A"
                                            stroke="#ffffff"
                                            strokeWidth={1}
                                            fill="#ffffff"
                                            fillOpacity={0.15}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'rgb(15, 15, 21)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Cost Section */}
                        <div className="flex flex-col">
                            <div className="flex items-center space-x-3 mb-10">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <DollarSign className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Operational Overhead</h3>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 flex flex-col h-full">
                                <div className="mb-10">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Monthly Total Estimate</span>
                                    <div className="text-5xl font-bold text-white tracking-tighter">
                                        {costEstimate.monthlyTotal || "$0.00"}
                                    </div>
                                </div>

                                <div className="flex-grow min-h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={costData} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={100} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600 }} />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                                contentStyle={{ backgroundColor: 'rgb(15, 15, 21)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            />
                                            <Bar dataKey="cost" fill="rgba(255,255,255,0.8)" radius={[0, 4, 4, 0]} barSize={16} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-[10px] text-slate-600 mt-8 font-bold uppercase tracking-widest flex items-center">
                                    <Shield className="w-3 h-3 mr-2 opacity-50" /> Protocol-standard cloud pricing applied
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Pitch Deck Section */}
                    {pitchDeck && pitchDeck.length > 0 && (
                        <div className="mt-20 pt-16 border-t border-white/5">
                            <div className="flex items-center space-x-3 mb-12">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Pitch Assets Generator</h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {pitchDeck.map((slide, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-500 group/slide relative overflow-hidden">
                                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-full blur-xl group-hover/slide:bg-primary/20 transition-all"></div>
                                        <div className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] mb-4 flex items-center justify-between">
                                            <span>Slide 0{idx + 1}</span>
                                            <div className="h-px flex-grow mx-4 bg-primary/20"></div>
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-4 tracking-tight uppercase group-hover:text-primary transition-colors">{slide.title}</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed font-light">
                                            {slide.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeepDiveStats;
