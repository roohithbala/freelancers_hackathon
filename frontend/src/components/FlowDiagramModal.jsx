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
            description: 'Technical architecture showing how all components work together',
            icon: <GitBranch className="h-5 w-5" />,
            mermaidCode: `graph TB
    %% User Interface Layer
    subgraph "🎨 Frontend (React + Vite)"
        A[👤 Student/User] --> B[🏠 Landing Page]
        B --> C[🔐 Firebase Authentication]
        C --> D{Authenticated?}
        D -->|Yes| E[📝 Input Form]
        D -->|No| F[🔑 Login Required]
        E --> G[📊 Project Configuration]
        G --> H[🚀 Generate Blueprint]
    end

    %% Input Processing
    subgraph "📋 User Input Data"
        G --> I[🎯 Domain<br/>Fintech/Healthcare/EdTech]
        G --> J[⭐ Skill Level<br/>Beginner/Intermediate/Expert]
        G --> K[💻 Tech Stack<br/>React/Node/Python etc.]
        G --> L[🎪 Project Goal<br/>MVP/Learning/Portfolio]
        G --> M[⏰ Timeframe<br/>1 Week to 6 Months]
    end

    %% Backend Processing
    subgraph "⚙️ Backend API (Node.js + Express)"
        H --> N[🌐 POST /api/generate]
        N --> O[✅ Input Validation]
        O --> P[📝 Prompt Generation]
        P --> Q[🧠 AI Provider Service]
    end

    %% AI Processing Layer
    subgraph "🤖 AI Processing Engine"
        Q --> R{Primary AI Available?}
        R -->|Yes| S[🦾 Groq API<br/>llama-3.3-70b-versatile]
        R -->|No| T[💎 Gemini Flash<br/>Fallback Provider]
        S --> U[📋 System Prompt<br/>+ User Prompt]
        T --> U
        U --> V[🧮 AI Model Processing]
        V --> W[📄 Generated Blueprint]
    end

    %% Content Generation
    subgraph "📖 Blueprint Content Structure"
        W --> X[📝 Markdown Content<br/>Problem Statement<br/>Features List<br/>Implementation Guide]
        W --> Y[🎨 Mermaid Diagram<br/>System Architecture<br/>Data Flow Charts]
        W --> Z[📊 JSON Statistics<br/>Complexity Metrics<br/>Time Estimates]
    end

    %% Display Layer
    subgraph "🖥️ Blueprint Display"
        X --> AA[📱 Blueprint View Component]
        Y --> AB[🎨 Mermaid Renderer<br/>Visual Diagrams]
        Z --> AC[📈 Deep Dive Stats<br/>Interactive Charts]
        AA --> AD[💾 Save to Firebase]
        AB --> AD
        AC --> AD
    end

    %% User Actions
    subgraph "🛠️ User Actions"
        AD --> AE[📚 View Saved Blueprints]
        AD --> AF[📤 Export Tools<br/>PDF/PNG/Markdown]
        AD --> AG[✏️ Edit in Draw.io<br/>Custom Diagrams]
        AD --> AH[🔄 Generate New Version]
    end

    %% Database Layer
    subgraph "🗄️ Data Storage (Firebase)"
        C --> AI[(🔐 User Authentication<br/>Google OAuth)]
        AD --> AJ[(💾 Firestore Database<br/>Saved Blueprints)]
        AE --> AJ
    end

    %% External Services
    subgraph "🌍 External Integrations"
        AG --> AK[🎨 Draw.io Integration<br/>Manual Diagram Editing]
        AF --> AL[📄 Export Formats<br/>PDF, PNG, MD]
    end

    %% Styling
    classDef userLayer fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef frontendLayer fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef backendLayer fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef aiLayer fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef dataLayer fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef externalLayer fill:#f1f8e9,stroke:#689f38,stroke-width:2px

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
            description: 'Step-by-step guide for students to use the AI generator',
            icon: <Users className="h-5 w-5" />,
            mermaidCode: `flowchart TD
    %% Student Journey Flow
    Start([🎓 Student starts learning<br/>wants project idea]) --> Login[🔐 Sign in with Google<br/>Firebase Authentication]
    
    Login --> Form[📝 Fill Project Configuration Form]
    
    subgraph "📋 Student Input"
        Form --> Domain[🎯 Choose Domain<br/>🏥 Healthcare<br/>💰 Fintech<br/>📚 Education<br/>🎮 Gaming]
        Form --> Skill[⭐ Select Skill Level<br/>🌱 Beginner<br/>🔧 Intermediate<br/>💪 Expert]
        Form --> Tech[💻 Pick Tech Stack<br/>⚛️ React<br/>🟢 Node.js<br/>🐍 Python<br/>📱 Mobile]
        Form --> Goal[🎪 Set Goal<br/>📖 Learning Project<br/>🚀 Startup MVP<br/>💼 Portfolio Piece]
        Form --> Time[⏰ Choose Timeframe<br/>📅 1 Week<br/>📅 1 Month<br/>📅 3 Months]
    end
    
    Domain --> Generate[🚀 Click Generate Blueprint]
    Skill --> Generate
    Tech --> Generate
    Goal --> Generate
    Time --> Generate
    
    Generate --> Loading[⏳ AI Processing...<br/>🤖 Generating custom blueprint]
    
    Loading --> Result[📊 Generated Blueprint Ready!]
    
    subgraph "📖 What Student Gets"
        Result --> Problem[📝 Problem Statement<br/>Clear project description<br/>Why it matters]
        Result --> Features[✨ Feature List<br/>What to build<br/>Step-by-step features]
        Result --> Architecture[🏗️ System Architecture<br/>Visual diagrams<br/>How components connect]
        Result --> Roadmap[🗓️ Implementation Roadmap<br/>Week-by-week plan<br/>Learning milestones]
        Result --> Code[💻 Tech Guidelines<br/>Code structure<br/>Best practices]
    end
    
    subgraph "🛠️ Student Actions"
        Problem --> Save[💾 Save to My Collection]
        Features --> Export[📤 Export as PDF/PNG<br/>Share with friends/mentors]
        Architecture --> Edit[✏️ Edit diagrams in Draw.io<br/>Customize visually]
        Roadmap --> Implement[🔨 Start Implementation<br/>Follow the roadmap]
        Code --> Learn[📚 Learn & Code<br/>Build the project]
    end
    
    Save --> Profile[👤 My Profile<br/>View all saved projects<br/>Track progress]
    Export --> Share[🔗 Share with others<br/>Get feedback]
    Edit --> CustomDiagram[🎨 Custom Architecture<br/>Personal modifications]
    Implement --> Portfolio[🏆 Add to Portfolio<br/>Showcase skills]
    Learn --> NewIdea[💡 Need another idea?<br/>Generate more projects]
    
    NewIdea --> Form
    Portfolio --> Form
    
    %% Styling for better visual appeal
    classDef startNode fill:#4CAF50,stroke:#2E8B57,stroke-width:3px,color:#fff
    classDef inputNode fill:#2196F3,stroke:#1976D2,stroke-width:2px,color:#fff
    classDef processNode fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:#fff
    classDef resultNode fill:#9C27B0,stroke:#7B1FA2,stroke-width:2px,color:#fff
    classDef actionNode fill:#607D8B,stroke:#455A64,stroke-width:2px,color:#fff
    classDef endNode fill:#E91E63,stroke:#C2185B,stroke-width:2px,color:#fff
    
    class Start,NewIdea startNode
    class Login,Form,Domain,Skill,Tech,Goal,Time inputNode
    class Generate,Loading processNode
    class Result,Problem,Features,Architecture,Roadmap,Code resultNode
    class Save,Export,Edit,Implement,Learn actionNode
    class Profile,Share,CustomDiagram,Portfolio endNode`
        },
        {
            id: 'technical-architecture',
            title: '💻 Technical Architecture',
            description: 'Code components and their relationships in the system',
            icon: <Book className="h-5 w-5" />,
            mermaidCode: `graph TB
    %% Frontend Components
    subgraph "🎨 Frontend Components (React)"
        App[📱 App.jsx<br/>Main Application Container]
        Landing[🏠 LandingPage.jsx<br/>Welcome & Features]
        Auth[🔐 AuthModal.jsx<br/>Login Interface]
        Input[📝 InputForm.jsx<br/>Project Configuration]
        Blueprint[📊 BlueprintView.jsx<br/>Display Generated Content]
        Profile[👤 ProfileModal.jsx<br/>User Profile]
        Loading[⏳ LoadingTerminal.jsx<br/>AI Processing Animation]
    end

    %% Frontend Services
    subgraph "🔧 Frontend Services"
        AuthContext[🔐 AuthContext.jsx<br/>User Authentication State]
        AIService[🧠 aiService.js<br/>API Communication]
        Firebase[🔥 firebase.js<br/>Firebase Configuration]
    end

    %% Backend Structure
    subgraph "⚙️ Backend API (Node.js)"
        Server[🌐 server.js<br/>Express Server Setup]
        Routes[🛣️ routes/generate.js<br/>API Endpoint Handler]
        AIProvider[🤖 utils/aiProvider.js<br/>AI Service Manager]
        Prompts[📝 utils/prompts.js<br/>Prompt Templates]
    end

    %% External Services
    subgraph "🌍 External APIs & Services"
        GroqAPI[🦾 Groq API<br/>Primary AI Provider<br/>llama-3.3-70b-versatile]
        GeminiAPI[💎 Gemini API<br/>Fallback AI Provider<br/>gemini-1.5-flash]
        FirebaseAuth[🔐 Firebase Auth<br/>Google OAuth]
        Firestore[💾 Firestore Database<br/>User Data & Blueprints]
        DrawIO[🎨 Draw.io<br/>Diagram Editing]
    end

    %% Component Relationships
    App --> Landing
    App --> Auth
    App --> Input
    App --> Blueprint
    App --> Profile
    App --> Loading
    
    Auth --> AuthContext
    Blueprint --> AuthContext
    Profile --> AuthContext
    
    Input --> AIService
    Blueprint --> AIService
    
    AuthContext --> Firebase
    Firebase --> FirebaseAuth
    Firebase --> Firestore
    
    AIService --> Server
    Server --> Routes
    Routes --> AIProvider
    Routes --> Prompts
    
    AIProvider --> GroqAPI
    AIProvider --> GeminiAPI
    
    Blueprint --> DrawIO
    
    %% Data Flow
    subgraph "📊 Data Flow Process"
        UserInput[👤 User Input<br/>Domain, Skills, Tech Stack] --> ValidationStep[✅ Input Validation<br/>Backend Processing]
        ValidationStep --> PromptGeneration[📝 Dynamic Prompt Creation<br/>Based on User Preferences]
        PromptGeneration --> AIProcessing[🧠 AI Model Processing<br/>Blueprint Generation]
        AIProcessing --> ContentParsing[📖 Content Parsing<br/>Markdown + Mermaid + JSON]
        ContentParsing --> UIRendering[🖥️ UI Rendering<br/>Display Blueprint]
        UIRendering --> UserActions[🛠️ User Actions<br/>Save, Export, Edit]
    end

    %% Technical Implementation Details
    subgraph "💻 Key Technologies Used"
        ReactVite[⚛️ React + Vite<br/>Frontend Framework<br/>Fast Development]
        TailwindCSS[🎨 Tailwind CSS<br/>Styling Framework<br/>Responsive Design]
        FramerMotion[✨ Framer Motion<br/>Animations<br/>Smooth Transitions]
        MermaidJS[📊 Mermaid.js<br/>Diagram Rendering<br/>Auto-Generated Charts]
        ExpressJS[🟢 Express.js<br/>Backend Framework<br/>RESTful APIs]
        NodeFetch[🌐 Node-fetch<br/>HTTP Requests<br/>API Communication]
    end

    %% Styling
    classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef service fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    classDef backend fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef external fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef process fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef tech fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    
    class App,Landing,Auth,Input,Blueprint,Profile,Loading frontend
    class AuthContext,AIService,Firebase service
    class Server,Routes,AIProvider,Prompts backend
    class GroqAPI,GeminiAPI,FirebaseAuth,Firestore,DrawIO external
    class UserInput,ValidationStep,PromptGeneration,AIProcessing,ContentParsing,UIRendering,UserActions process
    class ReactVite,TailwindCSS,FramerMotion,MermaidJS,ExpressJS,NodeFetch tech`
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