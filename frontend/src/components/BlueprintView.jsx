import React, { useEffect, useRef, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import { Download, Share2, Edit, ExternalLink, Box, Layers, Code, Zap, Save, ChevronRight, FileText, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import DeepDiveStats from './DeepDiveStats';
import ExportTools from './ExportTools';
import MockUIPreview from './MockUIPreview';

const BlueprintView = ({ blueprint, blueprintData, onSave, isSaving }) => {
    const blueprintRef = useRef(null);
    const [parsedStats, setParsedStats] = useState(null);
    const [cleanMarkdown, setCleanMarkdown] = useState('');
    const [mermaidCode, setMermaidCode] = useState('');

    useEffect(() => {
        if (!blueprint) return;

        // Initialize Mermaid
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif'
        });

        // 1. Extract JSON Stats Block
        const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
        const jsonMatch = blueprint.match(jsonRegex);

        let stats = null;
        let markdownContent = blueprint;

        if (jsonMatch) {
            try {
                stats = JSON.parse(jsonMatch[1]);
                setParsedStats(stats);
                markdownContent = blueprint.replace(jsonRegex, '');
            } catch (e) {
                console.warn("Could not parse Deep Dive JSON stats:", e);
            }
        }

        // 2. Extract Mermaid Diagram
        const mermaidRegex = /```mermaid([\s\S]*?)```/;
        const mermaidMatch = markdownContent.match(mermaidRegex);
        let mCode = null;

        if (mermaidMatch) {
            mCode = mermaidMatch[1].trim();
            mCode = mCode.replace(/^mermaid\s*/i, '');
            const graphStart = mCode.indexOf('graph');
            if (graphStart !== -1) {
                mCode = mCode.substring(graphStart);
            }
            setMermaidCode(mCode);
            markdownContent = markdownContent.replace(mermaidRegex, '');
        } else {
            setMermaidCode(null);
        }

        setCleanMarkdown(markdownContent);

        setTimeout(() => {
            mermaid.contentLoaded();
        }, 500);

    }, [blueprint]);

    if (!blueprint) return null;

    const openDrawIo = () => {
        window.open('https://app.diagrams.net/', '_blank');
    };

    const getTitle = () => {
        const titleMatch = cleanMarkdown.match(/^#\s+(.*)/m);
        return titleMatch ? titleMatch[1].trim() : 'Project_Blueprint';
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 animate-fade-in-up pb-32 px-4">

            {/* Main Blueprint Card */}
            <div ref={blueprintRef} className="relative group">
                {/* Decorative border glow */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-white/10 to-primary/30 rounded-[40px] blur-[2px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                <div className="relative bg-brand-dark/60 backdrop-blur-3xl border border-white/10 rounded-[40px] shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">

                    {/* Header Utility Bar */}
                    <div className="px-10 py-6 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                <Layers className="text-primary w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white tracking-tight font-display uppercase">
                                    System <span className="text-primary/80">Architecture</span>
                                </h2>
                                <div className="flex items-center space-x-2 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                    <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">Protocol Validated • Build-Ready</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <button 
                                onClick={onSave} 
                                disabled={isSaving}
                                className="flex items-center space-x-3 px-6 py-3 bg-white text-black hover:bg-white/90 disabled:bg-slate-800 disabled:text-slate-500 rounded-2xl transition-all font-bold shadow-xl shadow-white/5 hover:scale-105 active:scale-95"
                            >
                                <Save className="h-4 w-4" /> 
                                <span className="uppercase tracking-widest text-xs">{isSaving ? 'Synchronizing...' : 'Save Design'}</span>
                            </button>
                            <button onClick={openDrawIo} className="flex items-center space-x-3 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 rounded-2xl transition-all text-white hover:border-primary/50 group/edit">
                                <Edit className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" /> 
                                <span className="uppercase tracking-widest text-xs font-bold text-slate-400 group-hover:text-white transition-colors">Export Map</span>
                            </button>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 md:px-20">
                        {/* Visual Prototype / Mock UI - From New Request */}
                        {blueprintData?.mockUI && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="mb-20"
                            >
                                <div className="flex items-center mb-8 space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Globe className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Visual Product DNA</h3>
                                </div>
                                
                                <MockUIPreview mockData={blueprintData.mockUI} />
                                
                                <div className="mt-6 flex items-center justify-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Aesthetic Alignment</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Layout Calibrated</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Mermaid Diagram Section */}
                        {mermaidCode && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mb-20"
                            >
                                <div className="flex items-center mb-8 space-x-3">
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Box className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Infrastructure Visualization</h3>
                                </div>
                                
                                <div className="p-10 bg-black/40 rounded-[32px] border border-white/5 overflow-x-auto shadow-inner relative group/diagram">
                                    <div className="absolute inset-0 bg-dots opacity-10 [mask-image:radial-gradient(circle,black,transparent)] pointer-events-none"></div>
                                    <div className="mermaid flex justify-center min-w-[600px] relative z-10 py-10">
                                        {mermaidCode}
                                    </div>
                                    <div className="absolute top-4 right-6 flex items-center space-x-4 opacity-30">
                                        <div className="flex space-x-1">
                                            <div className="w-1 h-3 bg-slate-700 rounded-full"></div>
                                            <div className="w-1 h-4 bg-primary rounded-full"></div>
                                            <div className="w-1 h-2 bg-slate-700 rounded-full"></div>
                                        </div>
                                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">Interactive Schema v1.0</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Markdown Content */}
                        <div className="prose prose-invert prose-lg max-w-none 
                            prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-white
                            prose-h1:text-4xl prose-h1:mb-12 prose-h1:pb-6 prose-h1:border-b prose-h1:border-white/5
                            prose-h2:text-2xl prose-h2:text-primary/80 prose-h2:mt-20 prose-h2:mb-8
                            prose-h3:text-xl prose-h3:text-slate-300
                            prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-light
                            prose-strong:text-white prose-strong:font-bold
                            prose-ul:list-none prose-ul:pl-0
                            prose-code:text-primary/80 prose-code:bg-primary/5 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                            prose-blockquote:border-l-2 prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-400 prose-blockquote:font-light prose-blockquote:italic
                        ">
                            <ReactMarkdown components={{
                                h1: ({ node, ...props }) => <h1 className="text-5xl font-bold tracking-tighter" {...props} />,
                                h2: ({ node, ...props }) => (
                                    <div className="flex flex-col mb-8 group/h2">
                                        <div className="h-px w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-12"></div>
                                        <h2 className="text-3xl font-bold m-0" {...props} />
                                    </div>
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="flex items-start my-4 group/li" {...props}>
                                        <div className="mr-4 mt-2 p-1 bg-primary/20 rounded-lg group-hover/li:bg-primary transition-colors">
                                            <ChevronRight className="w-3 h-3 text-primary group-hover/li:text-white transition-colors" />
                                        </div>
                                        <span className="text-slate-400 group-hover/li:text-slate-200 transition-colors">{props.children}</span>
                                    </li>
                                ),
                                ul: ({ node, ...props }) => <ul className="space-y-2 mb-10" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-8 last:mb-0" {...props} />
                            }}>
                                {cleanMarkdown}
                            </ReactMarkdown>
                        </div>

                        {/* Export Section */}
                        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-3 text-slate-500">
                                    <Share2 className="w-4 h-4" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em]">Deployment Pipeline</h4>
                                </div>
                                <p className="text-xs text-slate-600 max-w-xs font-light tracking-wide italic">Securely export your system documentation to various development environments.</p>
                            </div>
                            <ExportTools
                                blueprintRef={blueprintRef}
                                markdownContent={blueprint}
                                title={getTitle()}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Deep Dive Modules */}
            {parsedStats && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="h-24 w-px bg-gradient-to-b from-primary/50 to-transparent"></div>
                    </div>
                    <DeepDiveStats stats={parsedStats} />
                </motion.div>
            )}

        </div>
    );
};

export default BlueprintView;
