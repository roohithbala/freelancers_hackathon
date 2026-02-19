import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Database, Cloud, Shield, CheckCircle } from 'lucide-react';

const steps = [
    { text: "Initializing AI Architect Core...", icon: Terminal, color: "text-blue-400" },
    { text: "Analyzing Industry Trends & Competitors...", icon: Cloud, color: "text-purple-400" },
    { text: "Selecting Optimal Tech Stack...", icon: Database, color: "text-yellow-400" },
    { text: "Designing Scalable Microservices Architecture...", icon: Cpu, color: "text-cyan-400" },
    { text: "Running Security Vulnerability Scan...", icon: Shield, color: "text-red-400" },
    { text: "Finalizing Blueprint & Cost Estimation...", icon: CheckCircle, color: "text-green-400" }
];

const LoadingTerminal = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        let stepIndex = 0;
        const interval = setInterval(() => {
            if (stepIndex < steps.length) {
                setLogs(prev => [...prev, steps[stepIndex]]);
                setCurrentStep(stepIndex);
                stepIndex++;
            } else {
                clearInterval(interval);
            }
        }, 2500); // 15 seconds total approx

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto my-12">
            <div className="w-full bg-slate-950 rounded-lg overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-500/10">
                {/* Terminal Header */}
                <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">ai-architect --build --v2</div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 font-mono text-sm h-64 overflow-y-auto bg-black/50 backdrop-blur-md relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

                    <AnimatePresence>
                        {logs.map((log, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center mb-3 text-slate-300"
                            >
                                <span className="text-slate-600 mr-3">➜</span>
                                <log.icon className={`w-4 h-4 mr-3 ${log.color}`} />
                                <span className={index === logs.length - 1 ? "text-white font-bold" : ""}>
                                    {log.text}
                                </span>
                                {index === logs.length - 1 && (
                                    <motion.span
                                        animate={{ opacity: [0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="ml-2 w-2 h-4 bg-cyan-500/50 inline-block align-middle"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-slate-800 w-full">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 15, ease: "linear" }}
                    />
                </div>
            </div>

            <p className="mt-4 text-slate-500 text-sm animate-pulse">
                Generating comprehensive project analysis...
            </p>
        </div>
    );
};

export default LoadingTerminal;
