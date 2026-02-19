import React from 'react';
import { LayoutGrid, Settings, Sparkles, Activity, Plus } from 'lucide-react';

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-3 rounded-xl text-sm transition-colors ${
      active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
    }`}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </button>
);

const StatCard = ({ title, value, sub }) => (
  <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-blue-500/40 transition-colors">
    <div className="text-sm text-slate-400">{title}</div>
    <div className="mt-2 text-2xl font-bold">{value}</div>
    <div className="text-xs text-slate-500 mt-1">{sub}</div>
  </div>
);

const FeatureCard = ({ title, desc, onClick }) => (
  <button onClick={onClick} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold">{title}</div>
      <Sparkles className="h-5 w-5 text-purple-400" />
    </div>
    <div className="mt-2 text-slate-400 text-sm">{desc}</div>
  </button>
);

const FloatingAction = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl hover:scale-105 transition"
    aria-label="New"
  >
    <Plus className="h-6 w-6" />
  </button>
);

const Dashboard = ({ onOpenGenerator }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-3 space-y-3">
        <SidebarItem icon={<LayoutGrid className="h-5 w-5" />} label="Overview" active />
        <SidebarItem icon={<Activity className="h-5 w-5" />} label="Activity" />
        <SidebarItem icon={<Settings className="h-5 w-5" />} label="Settings" />
      </div>
      <div className="lg:col-span-9 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Projects" value="12" sub="Active blueprints" />
          <StatCard title="This Week" value="4" sub="New generations" />
          <StatCard title="Rating" value="A-" sub="Quality score" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard title="Generate New Blueprint" desc="Create an end-to-end architecture with AI." onClick={onOpenGenerator} />
          <FeatureCard title="View Saved Blueprints" desc="Browse your previously saved ideas." />
        </div>
      </div>
      <FloatingAction onClick={onOpenGenerator} />
    </div>
  );
};

export default Dashboard;
