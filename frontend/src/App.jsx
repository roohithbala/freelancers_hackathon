import React, { useState } from 'react';
import { generateProjectIdea } from './services/aiService';
import InputForm from './components/InputForm';
import BlueprintView from './components/BlueprintView';
import { Rocket, LogIn, LogOut, Save, BookOpen } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { db } from './firebase';
import LoadingTerminal from './components/LoadingTerminal';
import { PlusCircle } from 'lucide-react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Header = ({ setShowSaved }) => {
  const { currentUser, loginGoogle, logout } = useAuth();

  return (
    <div className="flex justify-between items-center w-full max-w-7xl px-4 py-4 mb-8">
      <div className="flex items-center space-x-2">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/50">
          <Rocket className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">AI Architect</span>
      </div>

      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            <button onClick={() => setShowSaved(true)} className="flex items-center text-slate-300 hover:text-white transition-colors">
              <BookOpen className="h-4 w-4 mr-1" /> My Ideas
            </button>
            <div className="flex items-center space-x-2">
              <img src={currentUser.photoURL} alt="User" className="h-8 w-8 rounded-full border border-slate-600" />
              <button onClick={logout} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors" title="Logout">
                <LogOut className="h-4 w-4 text-red-400" />
              </button>
            </div>
          </>
        ) : (
          <button onClick={loginGoogle} className="flex items-center py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-all">
            <LogIn className="h-4 w-4 mr-2" /> Login
          </button>
        )}
      </div>
    </div>
  );
};

const SavedProjects = ({ onClose }) => {
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
              <div key={p.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
                <h3 className="font-bold text-white mb-2">{p.title || "Untitled Project"}</h3>
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
  const { currentUser, loginGoogle } = useAuth();

  /* Usage Limit Logic */
  // ... (keeping existing logic for brevity, assuming it's unchanged unless I need to move it)
  // Actually, I need to include the functions if I'm replacing the whole component body or significant parts.
  // Since replace_file_content replaces a chunk, I need to be careful.
  // I'll rewrite MainContent but reuse the internal logic if possible, or re-implement it briefly.
  // The tool instructions say "complete drop-in replacement of the TargetContent". 

  // To avoid re-writing 100 lines of logic, I will target specific blocks or rewrite the whole component if I have to.
  // The usage logic is quite long.
  // Let's see if I can just change the return statement.
  // The return statement is lines 283-322.

  const handleGenerate = async (formData) => {
    if (!currentUser) {
      alert("Please login to generate blueprints.");
      loginGoogle();
      return;
    }

    setLoading(true);
    setError(null);
    setBlueprint(null);

    // Simulate "Deep Thought" delay for the terminal effect to finish
    // Real generation might be fast, we want the user to see the cool animation :D
    // But don't make it too fake. 

    try {
      const { doc, getDoc, setDoc, updateDoc, increment } = await import('firebase/firestore');
      const userDocRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      let isPremium = false;
      let usageCount = 0;

      if (userSnap.exists()) {
        const data = userSnap.data();
        isPremium = data.isPremium || false;
        usageCount = data.usageCount || 0;
      } else {
        await setDoc(userDocRef, { uid: currentUser.uid, email: currentUser.email, usageCount: 0, isPremium: false });
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

      const generatePromise = generateProjectIdea({ ...formData, isPremium, previousProjects });
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
      const title = titleMatch ? titleMatch[1] : "New Project Idea";

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

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
      <Header setShowSaved={setShowSaved} />

      {showSaved && <SavedProjects onClose={() => setShowSaved(false)} />}
      {showPremiumModal && <PaymentModal onClose={() => setShowPremiumModal(false)} onUpgrade={handleUpgrade} />}

      <div className="w-full max-w-6xl px-4 pb-20">

        {/* Hero Section - Only show when no blueprint and not loading */}
        {!loading && !blueprint && (
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              AI Startup <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Architect</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Generate investor-ready project blueprints, technical architectures, and implementation roadmaps in seconds.
            </p>
          </div>
        )}

        {/* Input Form */}
        {!loading && !blueprint && (
          <InputForm onGenerate={handleGenerate} loading={loading} />
        )}

        {/* Loading Terminal */}
        {loading && <LoadingTerminal />}

        {/* Error Display */}
        {error && (
          <div className="mt-8 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg w-full text-center">
            {error}
            <button onClick={() => setError(null)} className="ml-4 underline">Try Again</button>
          </div>
        )}

        {/* Blueprint View */}
        {blueprint && !loading && (
          <div className="relative animate-fade-in">
            {/* New Project Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={resetProject}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition-all"
              >
                <PlusCircle className="mr-2 h-5 w-5" /> New Project
              </button>
            </div>

            <BlueprintView blueprint={blueprint} />

            {currentUser && (
              <div className="text-center mt-12 pb-12">
                <button onClick={handleSave} className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-green-600 hover:bg-green-700 hover:shadow-green-500/30 transition-all transform hover:scale-105">
                  <Save className="h-5 w-5 mr-3" /> Save to My Projects
                </button>
              </div>
            )}
          </div>
        )}
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
