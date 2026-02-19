import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { X, Book, GitBranch, Users, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';

const FlowDiagramModal = ({ isOpen, onClose }) => {
    const [currentDiagram, setCurrentDiagram] = useState(0);
    const [copiedStates, setCopiedStates] = useState({});
    const diagramRefs = useRef([]);

    const diagrams = [
        {
            id: 'system-flow',
            title: '🔄 Complete System Flow',
            description: 'Hyper-detailed technical architecture showing the synergy between AI, Backend, and Frontend.',
            icon: <GitBranch className="h-5 w-5" />,
            mermaidCode: `graph TB
    %% User Interface Layer
    subgraph "🎨 Frontend (High-Performance React)"
        A[👤 Student/Innovator] --> B[🏠 Systems Lab Landing]
        B --> C[🔐 Firebase Auth Service]
        C --> D{Identity Verified?}
        D -->|Yes| E[📝 Command Deck Input]
        D -->|No| F[🔑 Auth Barrier]
        E --> G[📊 Synthesis Engine Parameters]
        G --> H[🚀 Trigger Architect Logic]
    end

    %% Input Processing
    subgraph "📋 Parameter Vectorization"
        G --> I["🎯 Domain Strategy (e.g. Fintech 4.0)"]
        G --> J["⭐ Complexity Calibration (L1-L3)"]
        G --> K["💻 Optimized Stack (e.g. T3 Stack)"]
        G --> L["🎪 Product North Star (MVP/Scale)"]
        G --> M["⏰ Sprint Timeframe (Hyper-Burst)"]
    end

    %% Backend Processing
    subgraph "⚙️ Pro-Backend (Node.js + L7 Routing)"
        H --> N[🌐 POST /api/generate]
        N --> O[✅ Schema Validation]
        O --> P[📝 Multi-Stage Prompt Injection]
        P --> Q[🧠 AI Orchestrator Node]
    end

    %% AI Processing Layer
    subgraph "🤖 Neural Synthesis Interface"
        Q --> R{Latency/Reliability Check}
        R -->|Active| S["🦾 Groq Llama-3 (70B Inference)"]
        R -->|Degraded| T["💎 Gemini 1.5 Flash (Fallback)"]
        S --> U[📋 Systematic Prompt Context]
        T --> U
        U --> V[🧮 Neural Architecture Generation]
        V --> W[📄 Blueprint Object (Proto-JSON)]
    end

    %% Content Generation
    subgraph "📖 Component Factory"
        W --> X[📝 Technical Specs (MD)]
        W --> Y[🎨 System Layouts (Mermaid)]
        W --> Z[📊 Unit Metrics (JSON/Stats)]
    end

    %% Display Layer
    subgraph "🖥️ Visual Intelligence Hub"
        X --> AA[📱 Blueprint Intelligence View]
        Y --> AB[🎨 Dynamic Schema Renderer]
        Z --> AC[📈 Performance Analytics Panel]
        AA --> AD[💾 Persistent State Storage]
        AB --> AD
        AC --> AD
    end

    %% User Actions
    subgraph "🛠️ Post-Generation Operations"
        AD --> AE[📚 Personal Archive Repository]
        AD --> AF[📤 Multi-Format Export (PDF/MD)]
        AD --> AG[✏️ CAD-Level Diagram Sync]
        AD --> AH[🔄 Revision Control Sync]
    end

    %% Database Layer
    subgraph "🗄️ Secure Data Core (Firebase)"
        C --> AI[(🔐 Encrypted Identity Store)]
        AD --> AJ[(💾 Production-Grade Firestore)]
        AE --> AJ
    end

    %% External Services
    subgraph "🌍 Global Integrations"
        AG --> AK[🎨 Diagram System Interaction]
        AF --> AL[📄 Document Pipeline]
    end

    %% Styling
    classDef userLayer fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef frontendLayer fill:#1e293b,stroke:#8b5cf6,stroke-width:2px,color:#fff
    classDef backendLayer fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#fff
    classDef aiLayer fill:#1e1b4b,stroke:#f59e0b,stroke-width:2px,color:#fff
    classDef dataLayer fill:#1e293b,stroke:#ec4899,stroke-width:2px,color:#fff
    classDef externalLayer fill:#0f172a,stroke:#6366f1,stroke-width:2px,color:#fff

    class A,B,C userLayer
    class E,G,AA,AB,AC frontendLayer
    class N,O,P,Q backendLayer
    class R,S,T,U,V,W aiLayer
    class AI,AJ dataLayer
    class AK,AL externalLayer`
        },
        {
            id: 'student-journey',
            title: '🎓 Student Journey Flow',
            description: 'Empowering students from raw curiosity to a portfolio-ready technical roadmap.',
            icon: <Users className="h-5 w-5" />,
            mermaidCode: `flowchart TD
    %% Student Journey Flow
    Start([🎓 Student ID 101: Needs Portfolio-Winner]) --> Login[🔐 Secure Gateway Access]
    
    Login --> Form[📝 Precision Parameter Input]
    
    subgraph "📋 Student Choice Vector"
        Form --> Domain["🎯 Domain Expertise <br/>(AI-Ops / Crypto / MedTech)"]
        Form --> Skill["⭐ Technical Tier <br/>(Rising Star to Master)"]
        Form --> Tech["💻 Preferred Ecosystem <br/>(Rust / Golang / React)"]
        Form --> Goal["🎪 Success Metric <br/>(VC Pitch / Resume / MVP)"]
        Form --> Time["⏰ Development Window <br/>(Speed-Build vs Deep-Dev)"]
    end
    
    subgraph "⚡ AI Architect Engine"
        Domain --> Architect[🚀 Neural Blueprint Induction]
        Skill --> Architect
        Tech --> Architect
        Goal --> Architect
        Time --> Architect
        
        Architect --> Synthesis[⏳ Real-time Structural Analysis]
    end
    
    Synthesis --> Result[📊 Blueprint v1.0 Generated]
    
    subgraph "💎 Premium Deliverables"
        Result --> Problem["📝 Master Narrative <br/>(Problem/Solution/Market)"]
        Result --> Features["✨ Logic Matrix <br/>(MVP vs Phase 2 Features)"]
        Result --> Architecture["🏗️ Diagrammatic Schema <br/>(Visual Infrastructure)"]
        Result --> Roadmap["🗓️ Sprint Roadmap <br/>(Weekly Deliverables)"]
        Result --> Code["💻 Code Standards <br/>(Architecture Patterns)"]
    end
    
    subgraph "🛠️ Professional Actions"
        Problem --> Save[💾 Cloud Persistence]
        Features --> Export[📤 Production Export]
        Architecture --> Edit[✏️ Visual Refinement]
        Roadmap --> Build[🔨 Direct Implementation]
        Code --> Mastery[📚 Skills Acquisition]
    end
    
    Save --> Archive[👤 Personal IP Repository]
    Export --> Success[🔗 Recruiter/Founder Showcase]
    Edit --> Finalize[🎨 Design Optimization]
    Build --> Launch[🚀 Production Deployment]
    Mastery --> Upskill[💡 Advanced Knowledge Leap]
    
    Upskill --> NewEdge[💡 Generate Next Evolution]
    NewEdge --> Form
    
    %% Styling
    classDef stepNode fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef highlightNode fill:#1e1b4b,stroke:#f59e0b,stroke-width:3px,color:#fff
    classDef launchNode fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#fff
    
    class Start,Login,Form stepNode
    class Architect,Synthesis,Result highlightNode
    class Launch,Success,Archive launchNode`
        },
        {
            id: 'technical-architecture',
            title: '💻 Technical Architecture',
            description: 'Advanced component topology and dependency mapping.',
            icon: <Book className="h-5 w-5" />,
            mermaidCode: `graph TB
    %% Frontend Atomic Components
    subgraph "🎨 Frontend Micro-Architecture (Next/React)"
        App[📱 Root Module]
        Landing[🏠 Hero Ecosystem]
        Auth[🔐 Secure Auth Bridge]
        Input[📝 Dynamic Logic Form]
        Blueprint[📊 Blueprint Viewport]
        MockUI[🎨 Live Mock Prototype]
        Stats[📈 Real-time Analytics]
    end

    %% State & Data Management
    subgraph "🔧 Global State & Intelligence"
        AuthContext[🔐 Identity Context]
        AIService[🧠 AI Dispatcher]
        Firebase[🔥 Firebase Driver]
        IconMapper[🖼️ Tech Icon Factory]
    end

    %% API Backend Service
    subgraph "⚙️ Edge Backend (Node.js)"
        Server[🌐 Express Gateway]
        Routes[🛣️ Architecture Routes]
        Orchestrator[🤖 AI Provider Logic]
        Prompter[📝 Prompt Template System]
    end

    %% Cloud Infrastructure
    subgraph "🌎 Distributed Services"
        Groq[🦾 Groq Neural Engine]
        Gemini[💎 Google AI Cluster]
        AuthCluster[🔐 Google OAuth Node]
        Database[(💾 Distributed Firestore)]
    end

    %% Integration Flows
    App --> Landing
    Input --> AIService
    Blueprint --> MockUI
    Blueprint --> Stats
    
    AIService --> Server
    Server --> Orchestrator
    Orchestrator --> Prompter
    Orchestrator --> Groq
    Orchestrator --> Gemini
    
    AuthContext --> AuthCluster
    Blueprint --> Database
    Stats --> Database

    %% Technology Topology
    subgraph "🛠️ Build Framework Stack"
        Vite[⚡ Vite Build Engine]
        Tailwind[🎨 Tailwind CSS v3]
        Framer[✨ Motion Engine]
        Mermaid[📊 Render Logic]
    end

    %% Styling
    classDef component fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    classDef logic fill:#1e1b4b,stroke:#8b5cf6,stroke-width:2px,color:#fff
    classDef backend fill:#052e16,stroke:#10b981,stroke-width:2px,color:#fff
    classDef cloud fill:#450a0a,stroke:#ef4444,stroke-width:2px,color:#fff
    
    class App,Landing,Auth,Input,Blueprint,MockUI,Stats component
    class AuthContext,AIService,Firebase,IconMapper logic
    class Server,Routes,Orchestrator,Prompter backend
    class Groq,Gemini,AuthCluster,Database cloud`
        }
    ];

    useEffect(() => {
        if (!isOpen) return;

        // Initialize Mermaid with dark theme
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif',
            flowchart: {
                curve: 'basis',
                padding: 10
            },
            themeVariables: {
                darkMode: true,
                primaryColor: '#3B82F6',
                primaryTextColor: '#E2E8F0',
                primaryBorderColor: '#1E40AF',
                lineColor: '#64748B',
                backgroundColor: '#0F172A'
            }
        });

        // Render all diagrams
        const timer = setTimeout(() => {
            diagramRefs.current.forEach((ref, index) => {
                if (ref && diagrams[index]) {
                    const diagramId = `diagram-${diagrams[index].id}`;
                    ref.innerHTML = '';
                    
                    try {
                        mermaid.render(diagramId, diagrams[index].mermaidCode, (svgCode) => {
                            ref.innerHTML = svgCode;
                        });
                    } catch (error) {
                        console.error('Mermaid rendering error:', error);
                        ref.innerHTML = `<div class="text-red-400">Error rendering diagram</div>`;
                    }
                }
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [isOpen, currentDiagram]);

    const handleCopyDiagram = async (diagramIndex) => {
        try {
            await navigator.clipboard.writeText(diagrams[diagramIndex].mermaidCode);
            setCopiedStates({ ...copiedStates, [diagramIndex]: true });
            setTimeout(() => {
                setCopiedStates({ ...copiedStates, [diagramIndex]: false });
            }, 2000);
        } catch (error) {
            console.error('Failed to copy diagram code:', error);
        }
    };

    const nextDiagram = () => {
        setCurrentDiagram((prev) => (prev + 1) % diagrams.length);
    };

    const prevDiagram = () => {
        setCurrentDiagram((prev) => (prev - 1 + diagrams.length) % diagrams.length);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-7xl h-full max-h-[90vh] glass-panel rounded-3xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
                            {diagrams[currentDiagram].icon}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white font-display">
                                How It Works
                            </h2>
                            <p className="text-slate-400 text-sm">
                                Interactive flow diagrams for students
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-xl glass-button hover:border-red-500/50 text-slate-400 hover:text-white transition-all"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex space-x-2">
                        {diagrams.map((diagram, index) => (
                            <button
                                key={diagram.id}
                                onClick={() => setCurrentDiagram(index)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                    currentDiagram === index
                                        ? 'bg-blue-600/30 border border-blue-500/50 text-white'
                                        : 'glass-button text-slate-400 hover:text-white hover:border-blue-500/30'
                                }`}
                            >
                                {diagram.icon}
                                <span className="hidden sm:inline">{diagram.title}</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleCopyDiagram(currentDiagram)}
                            className="flex items-center space-x-2 px-3 py-1.5 glass-button rounded-lg text-xs text-slate-400 hover:text-white hover:border-blue-500/30 transition-all"
                        >
                            {copiedStates[currentDiagram] ? (
                                <Check className="h-4 w-4 text-green-400" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">Copy Code</span>
                        </button>
                        <button
                            onClick={prevDiagram}
                            className="p-2 glass-button rounded-lg text-slate-400 hover:text-white hover:border-blue-500/30 transition-all"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                            onClick={nextDiagram}
                            className="p-2 glass-button rounded-lg text-slate-400 hover:text-white hover:border-blue-500/30 transition-all"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Diagram Content */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {diagrams[currentDiagram].title}
                        </h3>
                        <p className="text-slate-400">
                            {diagrams[currentDiagram].description}
                        </p>
                    </div>
                    
                    {/* Mermaid Diagram Container */}
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50 overflow-auto">
                        <div 
                            ref={(el) => diagramRefs.current[currentDiagram] = el}
                            className="mermaid-container min-h-[400px] flex items-center justify-center"
                        >
                            <div className="text-slate-400">Loading diagram...</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
                    <span>Diagram {currentDiagram + 1} of {diagrams.length}</span>
                    <span>Use these diagrams to understand the complete system flow</span>
                </div>
            </div>
        </div>
    );
};

export default FlowDiagramModal;