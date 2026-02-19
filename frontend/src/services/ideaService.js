import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, orderBy, limit, serverTimestamp } from 'firebase/firestore';

// Simple deterministic 53-bit hash for strings (cyrb53)
function cyrb53(str, seed = 0) {
  let h1 = 0xDEADBEEF ^ seed, h2 = 0x41C6CE57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

class IdeaService {
  constructor() {
    this.apiBase = 'http://localhost:5000/api';
  }

  // Fetch ALL previous idea titles (both saved projects and generated content) to avoid duplicates
  async getPreviousProjectTitles(currentUser) {
    if (!currentUser) return [];
    const allTitles = new Set();
    try {
      // 1. From saved projects
      const savedQ = query(
        collection(db, "projects"),
        where("userId", "==", currentUser.uid)
      );
      const savedSnap = await getDocs(savedQ);
      savedSnap.docs.forEach(d => {
        const title = d.data().title;
        if (title) allTitles.add(title);
      });

      // 2. From all generated content (ideas + blueprints)
      const genQ = query(
        collection(db, "generated_content"),
        where("userId", "==", currentUser.uid)
      );
      const genSnap = await getDocs(genQ);
      genSnap.docs.forEach(d => {
        const data = d.data();
        if (data.title) allTitles.add(data.title);
        // Also extract titles from generated idea arrays
        if (data.ideas && Array.isArray(data.ideas)) {
          data.ideas.forEach(idea => {
            if (idea.title) allTitles.add(idea.title);
          });
        }
      });
    } catch (e) {
      console.warn('Could not fetch previous projects:', e);
    }
    return [...allTitles];
  }

  // Save user prompt/selection history to Firestore for learning
  async savePromptHistory(currentUser, promptData) {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, "prompt_history"), {
        userId: currentUser.uid,
        ...promptData,
        createdAt: new Date()
      });
    } catch (e) {
      console.warn('Could not save prompt history:', e);
    }
  }

  // Fetch user's past prompt preferences
  async getUserPreferences(currentUser) {
    if (!currentUser) return { domains: [], techStacks: [], goals: [] };
    try {
      const q = query(
        collection(db, "prompt_history"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const snapshot = await getDocs(q);
      const history = snapshot.docs.map(doc => doc.data());
      return {
        domains: [...new Set(history.map(h => h.domain).filter(Boolean))],
        techStacks: [...new Set(history.flatMap(h => (h.techStack || '').split(',').map(s => s.trim())).filter(Boolean))],
        goals: [...new Set(history.map(h => h.goal).filter(Boolean))],
        recentSelections: history.filter(h => h.type === 'idea_selected').map(h => h.selectedTitle)
      };
    } catch (e) {
      console.warn('Could not fetch user preferences:', e);
      return { domains: [], techStacks: [], goals: [] };
    }
  }

  // Real AI generation calling our backend
  async generateIdeas(formData, currentUser) {
    try {
      // Get previous projects to avoid duplicates
      const previousProjects = currentUser ? await this.getPreviousProjectTitles(currentUser) : [];

      // compute prompt hash to prevent duplicate regeneration
      const promptObj = { mode: 'ideas', domain: formData.domain, skillLevel: formData.skillLevel, techStack: formData.techStack, goal: formData.goal, timeframe: formData.timeframe };
      const promptKey = JSON.stringify(promptObj);
      const promptHash = cyrb53(promptKey).toString();

      // Disable caching for 'ideas' mode to ensure uniqueness every time the user clicks generate
      // Only keep caching for the detailed 'blueprint' mode to save tokens on identical requests

      // Save this prompt to history
      await this.savePromptHistory(currentUser, {
        type: 'generate_ideas',
        domain: formData.domain,
        skillLevel: formData.skillLevel,
        techStack: formData.techStack,
        goal: formData.goal,
        timeframe: formData.timeframe
      });

      const res = await fetch(`${this.apiBase}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: formData.domain,
          skillLevel: formData.skillLevel,
          techStack: formData.techStack || 'Any',
          goal: formData.goal || 'Startup MVP',
          timeframe: formData.timeframe || '1 Month',
          mode: 'ideas',
          previousProjects: previousProjects,
          role: 'Student',
          isPremium: false,
          // Ask backend to limit tokens and temperature to reduce cost and verbosity
          maxTokens: 512,
          temperature: 0.2,
          promptHash
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate ideas');
      }
      
      const result = await res.json();

      // Save all generated ideas to Firestore (include promptHash)
      if (currentUser && result.ideas?.length) {
        try {
          await addDoc(collection(db, "generated_content"), {
            userId: currentUser.uid,
            type: 'ideas',
            ideas: result.ideas,
            promptHash,
            prompt: {
              domain: formData.domain,
              skillLevel: formData.skillLevel,
              techStack: formData.techStack,
              goal: formData.goal,
              timeframe: formData.timeframe
            },
            createdAt: new Date()
          });
        } catch (e) {
          console.warn('Could not save generated ideas:', e);
        }
      }

      return { success: true, data: result.ideas };
    } catch (error) {
      console.error('Error generating ideas:', error);
      return { success: false, error: error.message };
    }
  }

  async generateBlueprint(idea, formData, currentUser) {
    try {
      // Save this selection to history
      await this.savePromptHistory(currentUser, {
        type: 'idea_selected',
        selectedTitle: idea.title,
        domain: formData.domain,
        skillLevel: formData.skillLevel
      });

      // compute prompt hash for blueprint (include selected idea title to avoid duplicates)
      const blueprintPromptObj = { mode: 'blueprint', selectedTitle: idea.title, domain: formData.domain, skillLevel: formData.skillLevel, techStack: formData.techStack, goal: formData.goal, timeframe: formData.timeframe };
      const blueprintPromptKey = JSON.stringify(blueprintPromptObj);
      const blueprintPromptHash = cyrb53(blueprintPromptKey).toString();

      // Check cache for existing blueprint
      if (currentUser) {
        try {
          const cachedQ = query(
            collection(db, 'generated_content'),
            where('userId', '==', currentUser.uid),
            where('promptHash', '==', blueprintPromptHash),
            where('type', '==', 'blueprint')
          );
          const cachedSnap = await getDocs(cachedQ);
          if (!cachedSnap.empty) {
            const docData = cachedSnap.docs[0].data();
            return { success: true, data: { ...idea, blueprint: docData.blueprint, data: docData.structuredData }, cached: true };
          }
        } catch (e) {
          console.warn('Blueprint cache lookup failed:', e);
        }
      }

      const res = await fetch(`${this.apiBase}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: formData.domain,
          skillLevel: formData.skillLevel,
          techStack: formData.techStack || 'Any',
          goal: formData.goal || 'Startup MVP',
          timeframe: formData.timeframe || '1 Month',
          mode: 'blueprint',
          selectedIdea: idea,
          isPremium: false,
          role: 'Student',
          // token limit and temperature to control cost and verbosity
          maxTokens: 768,
          temperature: 0.15,
          promptHash: blueprintPromptHash
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate blueprint');
      }
      
      const data = await res.json();
      
      // Ensure we always have a readable title for the generated idea
      const fallbackTitle = (data.data && data.data.title) || idea.title || (idea.description ? idea.description.split(/[\.\n]/)[0].slice(0,60) : 'New Project Idea');

      const generatedIdea = {
        ...idea,
        blueprint: data.blueprint,
        data: data.data,
        problem: data.data?.problem || idea.description || '',
        features: data.data?.features || idea.features || [],
        roadmap: data.data?.roadmap || idea.roadmap || [],
        techStack: Array.isArray(data.data?.techStack)
          ? data.data.techStack.map(t => typeof t === 'string' ? t : t.name || t)
          : idea.tech_stack || [],
        title: (data.data && data.data.title) || idea.title || fallbackTitle,
        domain: formData.domain,
        skillLevel: formData.skillLevel,
        verification: data.verification
      };

      // Save the full blueprint and verification to Firestore
      if (currentUser) {
        try {
          await addDoc(collection(db, "generated_content"), {
            userId: currentUser.uid,
            type: 'blueprint',
            title: (data.data && data.data.title) || idea.title || fallbackTitle,
            blueprint: data.blueprint,
            structuredData: data.data,
            promptHash: blueprintPromptHash,
            verification: data.verification || { summary: 'not-run', issues: [] },
            prompt: {
              domain: formData.domain,
              skillLevel: formData.skillLevel,
              techStack: formData.techStack,
              goal: formData.goal,
              timeframe: formData.timeframe
            },
            createdAt: new Date()
          });
        } catch (e) {
          console.warn('Could not save generated blueprint:', e);
        }
      }

      return { success: true, data: generatedIdea };
    } catch (error) {
      console.error('Error generating blueprint:', error);
      return { success: false, error: error.message };
    }
  }

  async saveIdea(idea, currentUser) {
    if (!currentUser) return { success: false, error: 'User not authenticated' };
    try {
      // Determine a clear title to save (avoid generic empty titles)
      const structuredData = idea.data || {};
      const derivedTitle = (idea.title && idea.title.toString().trim())
        || (structuredData.title && structuredData.title.toString().trim())
        || (idea.description ? idea.description.split(/[\.\n]/)[0].slice(0,80) : null)
        || `New Project — ${idea.domain || 'Idea'} — ${new Date().toISOString().slice(0,10)}`;

      // Check for duplicate: don't save if title already exists for this user
      const existingQ = query(
        collection(db, "projects"),
        where("userId", "==", currentUser.uid),
        where("title", "==", derivedTitle)
      );
      const existingSnap = await getDocs(existingQ);
      if (!existingSnap.empty) {
        return { success: false, error: 'This project is already saved.' };
      }

      // Save the COMPLETE project data including all structured fields
      const projectData = {
        userId: currentUser.uid,
        title: derivedTitle,
        description: idea.description || '',
        problem: idea.problem || '',
        features: Array.isArray(idea.features) ? idea.features : [],
        techStack: Array.isArray(idea.techStack) ? idea.techStack : [],
        roadmap: Array.isArray(idea.roadmap) ? idea.roadmap : [],
        blueprint: idea.blueprint || '',
        domain: idea.domain || '',
        skillLevel: idea.skillLevel || '',
        goal: idea.goal || '',
        timeframe: idea.timeframe || '',
        // Full structured data from AI blueprint
        pitchDeck: structuredData.pitchDeck || idea.pitchDeck || [],
        scores: structuredData.scores || idea.scores || {},
        costEstimate: structuredData.costEstimate || idea.costEstimate || {},
        mockUI: structuredData.mockUI || idea.mockUI || {},
        createdAt: serverTimestamp(),
        savedAt: serverTimestamp(),
        saved: true
      };

      const docRef = await addDoc(collection(db, "projects"), projectData);

      // Track this save in prompt history
      await this.savePromptHistory(currentUser, {
        type: 'idea_saved',
        selectedTitle: idea.title,
        domain: idea.domain
      });

      return { success: true, data: { ...projectData, id: docRef.id, createdAt: new Date(), savedAt: new Date() } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getSavedIdeas(currentUser) {
    if (!currentUser) return [];
    try {
      const q = query(collection(db, "projects"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          // Convert Firestore Timestamps to JS Dates for display
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt || new Date(),
          savedAt: data.savedAt?.toDate ? data.savedAt.toDate() : data.savedAt || data.createdAt?.toDate?.() || new Date()
        };
      });
    } catch (error) {
      console.error('Error reading saved ideas:', error);
      return [];
    }
  }

  async deleteIdea(ideaId) {
    try {
      await deleteDoc(doc(db, "projects", ideaId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getDomains() {
    return ['health', 'fintech', 'education', 'ecommerce', 'streaming', 'social', 'security'];
  }

  getSkillLevels() {
    return ['novice', 'beginner', 'intermediate', 'advanced'];
  }
}

export default new IdeaService();
