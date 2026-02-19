import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Search, Bell, User, Clock, CheckCircle, BarChart3, PieChart, Activity, Cpu, Globe, Zap, Layers } from 'lucide-react';

const MockUIPreview = ({ mockData }) => {
    if (!mockData) return null;

    const { theme, layout, components } = mockData;

    const renderComponent = (comp, index) => {
        switch (comp.type) {
            case 'hero':
                return (
                    <div key={index} className="p-6 rounded-2xl mb-4 bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/20">
                        <h4 className="text-sm font-bold text-white mb-2">{comp.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-tight">{comp.subtitle}</p>
                    </div>
                );
            case 'stats':
                return (
                    <div key={index} className="grid grid-cols-2 gap-3 mb-4">
                        {comp.data.map((item, i) => (
                            <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5">
                                <div className="text-[14px] font-bold text-white mb-0.5">{item.value}</div>
                                <div className="text-[8px] text-slate-500 uppercase tracking-widest">{item.label}</div>
                            </div>
                        ))}
                    </div>
                );
            case 'analytics':
                return (
                    <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/5 mb-4 aspect-video flex flex-col items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-primary/40 mb-2" />
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Live Data Feed</span>
                    </div>
                );
            case 'activity-feed':
                return (
                    <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-4">
                        <div className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Recent Activity</div>
                        <div className="space-y-2">
                            {comp.items.map((item, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                    <p className="text-[9px] text-slate-500 truncate">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full bg-brand-dark rounded-[32px] border border-white/10 overflow-hidden shadow-2xl relative group">
            {/* Header / Browser Bar */}
            <div className="h-10 bg-white/[0.02] border-b border-white/5 flex items-center px-4 space-x-1.5 shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                <div className="ml-4 flex-grow max-w-[200px] h-5 bg-black/40 rounded-lg border border-white/5 flex items-center px-3 text-[8px] text-slate-600 font-mono">
                    https://{mockData.title || 'preview'}.app
                </div>
            </div>

            <div className="h-[400px] flex">
                {/* Sidebar if layout includes it */}
                {layout === 'sidebar-main' && (
                    <div className="w-16 border-r border-white/5 p-3 flex flex-col items-center space-y-4 shrink-0">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg border border-primary/30 mb-4 flex items-center justify-center text-primary">
                            <Layers className="w-4 h-4" />
                        </div>
                        <Globe className="w-4 h-4 text-slate-600" />
                        <Activity className="w-4 h-4 text-slate-600" />
                        <Cpu className="w-4 h-4 text-slate-600" />
                        <div className="mt-auto">
                            <User className="w-4 h-4 text-slate-600" />
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-grow p-6 overflow-y-auto scrollbar-hide">
                    {/* Header for non-sidebar layouts */}
                    {layout === 'header-body' && (
                        <div className="h-12 border-b border-white/5 mb-6 flex items-center justify-between px-2">
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-primary/20 rounded-lg"></div>
                                <div className="h-3 w-20 bg-white/10 rounded"></div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Search className="w-3.5 h-3.5 text-slate-600" />
                                <Bell className="w-3.5 h-3.5 text-slate-600" />
                            </div>
                        </div>
                    )}

                    <div className="max-w-2xl mx-auto">
                        {components.map((comp, idx) => renderComponent(comp, idx))}
                    </div>
                </div>
            </div>

            {/* Glowing Backdrop */}
            <div className="absolute -inset-10 bg-primary/5 blur-3xl -z-10 group-hover:opacity-100 transition-opacity"></div>
        </div>
    );
};

export default MockUIPreview;
