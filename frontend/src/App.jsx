import React, { useState } from 'react';
import { generateProjectIdea } from './services/aiService';
import InputForm from './components/InputForm';
import BlueprintView from './components/BlueprintView';
import { Rocket, LogIn, LogOut, Save, BookOpen, GitBranch } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { db } from './firebase';
import LoadingTerminal from './components/LoadingTerminal';
import { PlusCircle } from 'lucide-react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

import AuthModal from './components/AuthModal';
import ProfileModal from './components/ProfileModal';
import LandingPage from './components/LandingPage';
import FlowDiagramModal from './components/FlowDiagramModal';
import ProjectShowcase from './components/ProjectShowcase';

const Header = ({ setShowSaved, setShowAuthModal, setShowProfileModal, setShowFlowDiagram }) => {
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-4 z-40 w-full max-w-7xl mx-auto px-4 mb-8">
      <div className="glass-panel rounded-2xl p-4 flex justify-between items-center">
        {/* Logo Area */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="p-2.5 bg-blue-600/20 rounded-xl border border-blue-500/30 group-hover:bg-blue-600/30 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-400/20 blur-lg group-hover:blur-md transition-all"></div>
            <Rocket className="h-6 w-6 text-blue-400 relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-tight font-display">AI Architect</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest text-[10px]">Blueprint Generator</span>
          </div>
        </div>

        {/* Actions Area */}
        <div className="flex items-center space-x-3">
          {/* How It Works Button - Always Visible */}
          <button 
            onClick={() => setShowFlowDiagram(true)}
            className="hidden md:flex items-center px-4 py-2 glass-button rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
          >
            <GitBranch className="h-4 w-4 mr-2 text-purple-400" /> How It Works
          </button>

          {currentUser ? (
            <>
              <button 
                onClick={() => setShowSaved(true)} 
                className="hidden sm:flex items-center px-4 py-2 glass-button rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-blue-500/50"
              >
                <BookOpen className="h-4 w-4 mr-2" /> My Ideas
              </button>
              
              <button 
                onClick={() => setView('showcase')} 
                className="hidden sm:flex items-center px-4 py-2 glass-button rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-purple-500/50"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Portfolio
              </button>
              
              <button 
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center p-1.5 pr-4 glass-button rounded-full hover:border-blue-500/50 group"
              >
                <img 
                  src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=0D8ABC&color=fff`} 
                  alt="User" 
                  className="h-8 w-8 rounded-full border border-slate-600 group-hover:border-blue-400 transition-colors" 
                />
                <span className="ml-3 text-sm font-medium text-slate-300 group-hover:text-white hidden sm:block">
                  Profile
                </span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)} 
              className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
            >
              <LogIn className="h-4 w-4 mr-2" /> 
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const SavedProjects = ({ onClose, onSelectProject }) => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      if (!currentUser) return;
      try {
        const q = query(collection(db, "projects"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [currentUser]);

  return (
    <div className="fixed inset-0 bg-slate-900/95 z-50 flex justify-end">
      <div className="w-full max-w-md bg-slate-800 h-full p-6 overflow-y-auto border-l border-slate-700">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Saved Blueprints</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">Close</button>
        </div>

        {loading ? (
            <div className="text-center text-slate-400">Loading...</div>
        ) : projects.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">No saved projects yet.</div>
        ) : (
            <div className="space-y-4">
            {projects.map(p => (
                <div 
                    key={p.id} 
                    onClick={() => onSelectProject(p)}
                    className="bg-slate-900 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors cursor-pointer group"
                >
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{p.title || "Untitled Project"}</h3>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{p.role || 'Project'}</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">{new Date(p.createdAt?.toDate()).toLocaleDateString()}</p>
                <div className="text-slate-300 text-sm line-clamp-3">
                    {p.blueprint.substring(0, 150)}...
                </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
};

import PaymentModal from './components/PaymentModal';

const PremiumModalDesc = ({ onClose, onUpgrade }) => (
  <div className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4">
    <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-yellow-500/50 shadow-2xl shadow-yellow-500/10">
      <div className="text-center mb-6">
        <div className="inline-flex p-3 rounded-full bg-yellow-500/10 mb-4">
          <Rocket className="h-8 w-8 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Usage Limit Reached</h2>
        <p className="text-slate-400">You've used your 5 free generations. Upgrade to Premium for unlimited access!</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center text-slate-300">
          <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
          <span>Unlimited Generations</span>
        </div>
        <div className="flex items-center text-slate-300">
          <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
          <span>Detailed Implementation Plans</span>
        </div>
        <div className="flex items-center text-slate-300">
          <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
          <span>Priority Support</span>
        </div>
        <div className="flex items-center text-slate-300">
          <span className="h-2 w-2 bg-blue-500 rounded-full mr-3"></span>
          <span>Educational Institution Licensing</span>
        </div>
      </div>

      <button onClick={onUpgrade} className="w-full mt-8 py-3 px-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold rounded-lg transition-all transform hover:scale-[1.02]">
        Upgrade for $9/mo
      </button>
      <button onClick={onClose} className="w-full mt-3 py-2 text-slate-500 hover:text-slate-300">
        Maybe Later
      </button>
    </div>
  </div>
);

const MainContent = () => {
  const [blueprint, setBlueprint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showFlowDiagram, setShowFlowDiagram] = useState(false);
  const { currentUser } = useAuth();
  const [view, setView] = useState('landing');

  // Handle Auth State Changes (Login & Logout)
  React.useEffect(() => {
    if (currentUser) {
      setView('generator');
    } else {
      // User logged out - Reset State
      setBlueprint(null);
      setView('landing');
      setShowSaved(false);
      setShowProfileModal(false);
      setShowPremiumModal(false);
    }
  }, [currentUser]);

  /* Usage Limit Logic */
  // ... (keeping existing logic)

  const handleGenerate = async (formData) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setError(null);
    setBlueprint(null);

    try {
      const { doc, getDoc, setDoc, updateDoc, increment } = await import('firebase/firestore');
      const userDocRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      let isPremium = false;
      let usageCount = 0;
      let role = 'Student'; // Default

      if (userSnap.exists()) {
        const data = userSnap.data();
        isPremium = data.isPremium || false;
        usageCount = data.usageCount || 0;
        role = data.role || 'Student';
      } else {
        await setDoc(userDocRef, { 
            uid: currentUser.uid, 
            email: currentUser.email, 
            usageCount: 0, 
            isPremium: false,
            role: 'Student'
        });
      }

      if (!isPremium && usageCount >= 5) {
        setShowPremiumModal(true);
        setLoading(false);
        return;
      }

      // Start the request
      // Fetch previous projects to avoid repetition
      let previousProjects = [];
      try {
        const q = query(collection(db, "projects"), where("userId", "==", currentUser.uid));
        const historySnap = await getDocs(q);
        previousProjects = historySnap.docs.map(doc => doc.data().title).filter(t => t);
      } catch (e) {
        console.warn("Failed to fetch history for avoidance:", e);
      }

      const generatePromise = generateProjectIdea({ ...formData, isPremium, previousProjects, role });
      const delayPromise = new Promise(resolve => setTimeout(resolve, 8000)); // Min 8 sec for animation

      const [blueprintResult] = await Promise.all([generatePromise, delayPromise]);

      setBlueprint(blueprintResult);

      await updateDoc(userDocRef, {
        usageCount: increment(1),
        lastGenerated: new Date()
      });

    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentUser || !blueprint) return;
    try {
      const titleMatch = blueprint.match(/# (.*)/);
      const title = titleMatch ? titleMatch[1].replace(/#|\*/g, '').trim() : "New Project Idea";

      // Fetch user role again for saving (optional but good for metadata)
      // For now we just save basic info

      await addDoc(collection(db, "projects"), {
        userId: currentUser.uid,
        blueprint: blueprint,
        title: title,
        createdAt: new Date()
      });
      alert("Project Saved!");
    } catch (e) {
      console.error("Error saving: ", e);
      alert("Failed to save project.");
    }
  };

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, { isPremium: true });
      alert("🎉 Payment Successful! You are now a Premium Member.");
      setShowPremiumModal(false);
    } catch (e) {
      console.error("Upgrade failed", e);
      alert("Upgrade failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetProject = () => {
    setBlueprint(null);
    setError(null);
  };

  const loadProject = (project) => {
      setBlueprint(project.blueprint);
      setShowSaved(false);
      setView('generator'); // Switch to generator view when loading a project
  };

  return (
    <div className="min-h-screen bg-[#0B0B15] relative text-white selection:bg-nebula-cyan/30 overflow-x-hidden font-sans">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none z-0"></div>
        <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-nebula-purple/10 via-transparent to-transparent pointer-events-none z-0"></div>
        <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-nebula-cyan/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col min-h-screen">

      <Header setShowSaved={setShowSaved} setShowAuthModal={setShowAuthModal} setShowProfileModal={setShowProfileModal} setShowFlowDiagram={setShowFlowDiagram} />

      {showSaved && <SavedProjects onClose={() => setShowSaved(false)} onSelectProject={loadProject} />}
      {showPremiumModal && <PaymentModal onClose={() => setShowPremiumModal(false)} onUpgrade={handleUpgrade} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
      <FlowDiagramModal isOpen={showFlowDiagram} onClose={() => setShowFlowDiagram(false)} />

      <div className="w-full pb-20">
        {view === 'landing' && !blueprint ? (
            <LandingPage 
              onGetStarted={() => {
                if (currentUser) {
                  setView('generator');
                } else {
                  setShowAuthModal(true);
                }
              }}
              onShowFlowDiagram={() => setShowFlowDiagram(true)}
              onShowPortfolio={() => setView('showcase')}
              currentUser={currentUser}
            />
        ) : view === 'showcase' ? (
            <ProjectShowcase onBack={() => setView(currentUser ? 'generator' : 'landing')} />
        ) : (
            <div className="max-w-6xl mx-auto px-6 animate-fade-in-up">
                {!blueprint ? (
                    <div className="flex flex-col items-center">
                        <div className="mb-10 text-center space-y-4">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight font-display">
                                Architect Your Vision
                            </h1>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Configure the parameters below to generate a comprehensive production-ready blueprint.
                            </p>
                        </div>
                        <InputForm onGenerate={handleGenerate} loading={loading} />
                    </div>
                ) : (
                    <div className="relative animate-fade-in">
                        <button 
                            onClick={() => setBlueprint(null)}
                            className="mb-8 px-4 py-2 glass-button rounded-lg text-slate-300 hover:text-white flex items-center group"
                        >
                            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Generator
                        </button>
                        
                        <BlueprintView 
                            blueprint={blueprint} 
                            onSave={handleSave}
                            isSaving={loading}
                        />
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

export default App;
