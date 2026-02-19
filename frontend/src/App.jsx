import React, { useState, useEffect } from 'react';
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

const Header = ({ setShowSaved, setShowAuthModal, setShowProfileModal }) => {
  const { currentUser } = useAuth();

  return (
    <header className="sticky top-4 z-40 w-full max-w-7xl mx-auto px-4 mb-8">
      <div className="glass-panel rounded-2xl p-4 flex justify-between items-center">
                {/* Logo Area */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 blur-lg group-hover:blur-md transition-all"></div>
            <Rocket className="h-6 w-6 text-primary relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-tighter font-display uppercase">AI Architect</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Systems Lab</span>
          </div>
        </div>

        {/* Actions Area */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            <>
              <button 
                onClick={() => setShowSaved(true)} 
                className="hidden sm:flex items-center px-4 py-2 glass-button rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:border-blue-500/50"
              >
                <BookOpen className="h-4 w-4 mr-2" /> My Ideas
              </button>
              
              <button 
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center p-1.5 pr-4 glass-button rounded-full group"
              >
                <img 
                  src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=0D8ABC&color=fff`} 
                  alt="User" 
                  className="h-8 w-8 rounded-full border border-white/10 group-hover:border-primary/50 transition-colors" 
                />
                <span className="ml-3 text-sm font-medium text-slate-400 group-hover:text-white hidden sm:block">
                  Account
                </span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => setShowAuthModal(true)} 
              className="flex items-center px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <LogIn className="h-4 w-4 mr-2" /> 
              Sign In
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
  // State
  const [blueprint, setBlueprint] = useState(null);
  const [blueprintData, setBlueprintData] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [step, setStep] = useState('input'); // 'input' | 'ideas' | 'blueprint'
  const [lastInputData, setLastInputData] = useState(null); // Store input for step 2
  const [selectedIdea, setSelectedIdea] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { currentUser } = useAuth();
  const [view, setView] = useState('landing');

  // Handle Auth State Changes (Login & Logout)
  useEffect(() => {
    if (currentUser) {
      setView('generator');
    } else {
      // User logged out - Reset State
      setBlueprint(null);
      setView('landing');
      setShowSaved(false);
      setShowProfileModal(false);
      setShowPremiumModal(false);
      setSelectedIdea(null);
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
    setIdeas([]);
    setLastInputData(formData);
    setSelectedIdea(null);

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

      // Step 1: Generate Ideas
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mode: 'ideas',
          previousProjects: [], // Ideally fetch history here if needed
          role: role,
          isPremium: isPremium
        }),
      });

      if (!res.ok) throw new Error('Failed to generate ideas');
      
      const result = await res.json();
      if (result.ideas) {
          setIdeas(result.ideas);
          setStep('ideas');
          setView('generator');
      } else {
          throw new Error('No ideas returned from AI');
      }

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

  const handleIdeaSelect = async (idea) => {
      setLoading(true);
      setSelectedIdea(idea);
      try {
          // Step 2: Generate Blueprint for selected idea
          const res = await fetch('http://localhost:5000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...lastInputData,
              mode: 'blueprint',
              selectedIdea: idea,
              isPremium: currentUser?.isPremium || false,
              role: currentUser?.role || 'Student'
            }),
          });
    
          if (!res.ok) throw new Error('Failed to generate blueprint');
          
          const data = await res.json();
          setBlueprint(data.blueprint);
          setBlueprintData(data.data);
          setStep('blueprint');
      } catch (error) {
          console.error(error);
          alert('Error generating blueprint. Please try again.');
      } finally {
          setLoading(false);
      }
  };

  const handleSave = async () => {
    if (!currentUser || !blueprint) return;
    try {
      // Use selected idea title, or fallback to regex match, or default
      let title = selectedIdea?.title;
      
      if (!title) {
          const titleMatch = blueprint.match(/# (.*)/);
          title = titleMatch ? titleMatch[1].replace(/#|\*/g, '').trim() : "New Project Idea";
      }

      // Fetch user role again for saving (optional but good for metadata)
      // For now we just save basic info

      await addDoc(collection(db, "projects"), {
        userId: currentUser.uid,
        blueprint: blueprint,
        title: title,
        role: selectedIdea?.difficulty || 'Project', // Also save difficulty/role
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
    <div className="min-h-screen bg-background relative text-white selection:bg-primary/30 overflow-x-hidden font-sans">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-dots opacity-20 pointer-events-none z-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
        <div className="fixed top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none z-0"></div>
        <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col min-h-screen">

      <Header setShowSaved={setShowSaved} setShowAuthModal={setShowAuthModal} setShowProfileModal={setShowProfileModal} />

      {showSaved && <SavedProjects onClose={() => setShowSaved(false)} onSelectProject={loadProject} />}
      {showPremiumModal && <PaymentModal onClose={() => setShowPremiumModal(false)} onUpgrade={handleUpgrade} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}

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
              currentUser={currentUser}
            />
        ) : (
            <div className="max-w-7xl mx-auto px-6 animate-fade-in-up">
                
                {/* Step 1: Input Form */}
                {step === 'input' && (
                    <div className="flex flex-col items-center">
                        <div className="mb-10 text-center space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-display uppercase">
                                Architect Your Vision
                            </h1>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                                Configure the parameters below to generate a comprehensive production-ready blueprint.
                            </p>
                        </div>
                        <InputForm onGenerate={handleGenerate} loading={loading} />
                    </div>
                )}

                {/* Step 2: Idea Selection */}
                {step === 'ideas' && (
                    <IdeaSelection 
                        ideas={ideas} 
                        onSelect={handleIdeaSelect} 
                        isLoading={loading} 
                    />
                )}

                {/* Step 3: Blueprint View */}
                {step === 'blueprint' && blueprint && (
                    <div className="relative animate-fade-in">
                        <button 
                            onClick={() => {
                                setBlueprint(null);
                                setStep('ideas');
                            }}
                            className="mb-8 px-4 py-2 glass-button rounded-lg text-slate-300 hover:text-white flex items-center group"
                        >
                            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Ideas
                        </button>
                        
                        <BlueprintView 
                            blueprint={blueprint} 
                            blueprintData={blueprintData}
                            onSave={handleSave}
                            isSaving={loading}
                        />

                        <div className="mt-8 text-center">
                             <button 
                                onClick={() => {
                                    setBlueprint(null);
                                    setStep('input');
                                    setIdeas([]);
                                }}
                                className="text-slate-500 hover:text-white transition-colors underline"
                            >
                                Start New Project
                            </button>
                        </div>
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
