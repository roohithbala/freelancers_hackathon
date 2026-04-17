const OpenAI = require("openai");
const fetch = require('node-fetch');

// Configuration
const GPT_MODEL = "gpt-4o-mini";
const GEMINI_DIRECT_MODEL_NAME = "gemini-1.5-flash";
const GEMINI_DIRECT_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_DIRECT_MODEL_NAME}:generateContent`;

// Helper for OpenAI GPT (Primary)
async function callOpenAI(messages, apiKey, options = {}) {
    console.log(`Attempting OpenAI GPT API (${GPT_MODEL})...`);

    const client = new OpenAI({ apiKey });

    try {
        const payload = {
            messages,
            model: GPT_MODEL,
            temperature: typeof options.temperature === 'number' ? options.temperature : 0.2,
        };
        if (options.maxTokens) payload.max_tokens = options.maxTokens;

        const completion = await client.chat.completions.create(payload);

        return {
            choices: [{
                message: {
                    content: completion.choices[0]?.message?.content
                }
            }]
        };
    } catch (error) {
        throw new Error(`OpenAI GPT failed: ${error.message}`);
    }
}

// Helper for Groq via OpenAI SDK
async function callGroq(messages, apiKey, options = {}) {
    console.log("Attempting Groq API via OpenAI SDK...");

    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1",
    });

    try {
        const payload = {
            messages: messages,
            model: options.model || process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
            temperature: typeof options.temperature === 'number' ? options.temperature : 0.2,
        };
        if (options.maxTokens) payload.max_tokens = Math.min(options.maxTokens, 8192);

        const completion = await client.chat.completions.create(payload);

        return {
            choices: [{
                message: {
                    content: completion.choices[0]?.message?.content
                }
            }]
        };
    } catch (error) {
        throw new Error(`Groq SDK failed: ${error.message}`);
    }
}

// Helper for Google Gemini Direct (Backup)
async function callGeminiDirect(messages, apiKey, options = {}) {
    console.log(`Attempting Google Gemini Direct API (${GEMINI_DIRECT_MODEL_NAME})...`);

    // Gemini Pro doesn't support system instructions well in v1beta, so we combine them.
    const systemMessage = messages.find(m => m.role === 'system')?.content || "";
    const userMessage = messages.find(m => m.role === 'user')?.content || "";
    const combinedPrompt = `${systemMessage}\n\nUser Request:\n${userMessage}`;

    const body = {
        contents: [{ parts: [{ text: combinedPrompt }] }]
    };
    
    // Support generationConfig for maxTokens
    if (options.maxTokens) {
        body.generationConfig = {
            maxOutputTokens: options.maxTokens,
            temperature: typeof options.temperature === 'number' ? options.temperature : 0.2
        };
    }

    const response = await fetch(`${GEMINI_DIRECT_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini Direct failed: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Gemini Direct returned no text.");

    return {
        choices: [{
            message: { content: text }
        }]
    };
}

// Helper for Hugging Face Inference API
async function callHuggingFace(messages, apiKey, options = {}) {
    console.log("Attempting Hugging Face Inference API (Llama-3.1-8B-Instruct)...");

    const model = "meta-llama/Llama-3.1-8B-Instruct";
    const url = `https://api-inference.huggingface.co/models/${model}`;

    // Format chat messages for Llama 3.1 Instruct
    // Simple version: join them as a single string if templates aren't handled server-side
    const prompt = messages.map(m => `${m.role === 'system' ? 'System' : m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: options.maxTokens || 2048,
                    temperature: typeof options.temperature === 'number' ? Math.max(options.temperature, 0.01) : 0.2,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`HF API failed: ${response.status} ${err}`);
        }

        const data = await response.json();
        // HF usually returns an array for text-generation
        const text = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;

        if (!text) throw new Error("Hugging Face returned no text.");

        return {
            choices: [{
                message: { content: text }
            }]
        };
    } catch (error) {
        throw new Error(`Hugging Face failed: ${error.message}`);
    }
}

async function generateCompletion(messages, avoidList = [], options = {}) {
    console.log("AI Provider Status:", {
        hasOpenAI: !!process.env.OPENAI_API_KEY,
        hasGroq: !!process.env.GROQ_API_KEY,
        hasGemini: !!process.env.GOOGLE_API_KEY,
        hasHF: !!process.env.HF_API_KEY
    });

    // 1. Try OpenAI GPT (Primary) - As requested "ChatGPT base model"
    if (process.env.OPENAI_API_KEY) {
        try {
            const result = await callOpenAI(messages, process.env.OPENAI_API_KEY, {
                ...options,
                temperature: typeof options.temperature === 'number' ? options.temperature : 0.4
            });
            return { ...result, provider: 'OpenAI (GPT-4o-mini)' };
        } catch (e) {
            console.error(`OpenAI GPT Attempt Failed: ${e.message}`);
        }
    }

    // 2. Try Groq (Secondary)
    if (process.env.GROQ_API_KEY) {
        try {
            const result = await callGroq(messages, process.env.GROQ_API_KEY, {
                ...options,
                model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
                temperature: typeof options.temperature === 'number' ? options.temperature : 0.4
            });
            return { ...result, provider: `Groq (${process.env.GROQ_MODEL || "llama-3.1-8b-instant"})` };
        } catch (e) {
            console.error(`Groq Attempt Failed: ${e.message}`);
        }
    }

    // 3. Try Google Gemini Direct (Tertiary)
    if (process.env.GOOGLE_API_KEY) {
        try {
            const result = await callGeminiDirect(messages, process.env.GOOGLE_API_KEY, {
                ...options,
                temperature: typeof options.temperature === 'number' ? options.temperature : 0.4
            });
            return { ...result, provider: 'Google Gemini Pro' };
        } catch (e) {
            console.error(e.message);
        }
    }

    // 4. Try Hugging Face (Quaternary)
    if (process.env.HF_API_KEY) {
        try {
            const result = await callHuggingFace(messages, process.env.HF_API_KEY, {
                ...options,
                temperature: typeof options.temperature === 'number' ? options.temperature : 0.4
            });
            return { ...result, provider: 'Hugging Face (Llama-3.1-8B)' };
        } catch (e) {
            console.error(`HF Attempt Failed: ${e.message}`);
        }
    }

    // 5. Fallback: Expanded Mock Data for Variety
    console.warn("All APIs failed or unavailable. Switching to HIGH-VARIETY DEMO MODE.");

    const mockBlueprints = [
        `# 🚀 Project: SmartHarvest AI
## 🎯 Core Problem
Small-scale farmers lose 40% of crops due to unpredictable weather and pest attacks.
## 🏗 Technical Architecture
- **Frontend**: React Native
- **AI**: TensorFlow Lite (On-device)
- **Database**: MongoDB
## 🧩 Core Features (MVP)
1. Pest detection via computer vision.
2. Hyper-local weather alerts.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[Mobile App] --> B[Local DB]
    A --> C[AI Model]
\`\`\``,
        `# 🚀 Project: FinWiz AI
## 🎯 Core Problem
Gen Z lacks financial literacy and struggles with basic budgeting.
## 🏗 Technical Architecture
- **Frontend**: Flutter
- **Backend**: Python FastAPI
- **Database**: PostgreSQL
## 🧩 Core Features (MVP)
1. AI Financial Coach.
2. Gamified savings rewards.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[App] --> B[FastAPI]
    B --> C[AI Engine]
\`\`\``,
        `# 🚀 Project: MediConnect VR
## 🎯 Core Problem
Medical students lack realistic surgical practice without risking safety.
## 🏗 Technical Architecture
- **Frontend**: Three.js / WebXR
- **Backend**: Supabase
## 🧩 Core Features (MVP)
1. Virtual OR environment.
2. Real-time multiplayer guidance.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[VR Headset] --> B[Supabase Realtime]
\`\`\``,
        `# 🚀 Project: CyberShield 360
## 🎯 Core Problem
Small businesses are highly vulnerable to ransomware attacks.
## 🏗 Technical Architecture
- **Engine**: Go / Python
- **Stack**: ELK Stack for logging
## 🧩 Core Features (MVP)
1. Real-time threat detection.
2. Automated immutable backups.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[Agent] --> B[Central Engine]
    B --> C[ELK Stack]
\`\`\``,
        `# 🚀 Project: EduStream Interactive
## 🎯 Core Problem
Low engagement rates in asynchronous online courses.
## 🏗 Technical Architecture
- **Frontend**: Vue.js
- **Real-time**: Socket.io
## 🧩 Features:
1. Live collaborative whiteboards.
2. Peer-to-peer mentoring rooms.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[Student] --> B[Socket.io Server]
    B --> C[Shared State]
\`\`\``,
        `# 🚀 Project: AquaSense IOT
## 🎯 Core Problem
Massive water wastage in urban apartments due to undetected leaks.
## 🏗 Technical Architecture
- **Hardware**: ESP32 / Arduino
- **App**: React Native
## 🧩 Features:
1. Real-time flow monitoring.
2. Automatic valve shut-off.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[Sensors] --> B[MQTT Broker]
    B --> C[Mobile App]
\`\`\``,
        `# 🚀 Project: GreenRoute Logistics
## 🎯 Core Problem
High carbon emissions in urban last-mile delivery.
## 🏗 Technical Architecture
- **Core**: Rust
- **Map**: Google Maps API
## 🧩 Features:
1. AI route optimization for EVs.
2. Verified carbon credit tracking.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[Driver App] --> B[Rust Optimizer]
    B --> C[PostgreSQL]
\`\`\``,
        `# 🚀 Project: MentalEase AI
## 🎯 Problem: Crisis counselor burnout.
## 🏗 Tech: Next.js, OpenAI Whisper, Redis.
## 🧩 Features:
1. Crisis triage automation.
2. Counselor sentiment analysis.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[User] --> B[Whisper API]
    B --> C[Analysis Engine]
\`\`\``,
        `# 🚀 Project: SecureDoc Blockchain
## 🎯 Problem: Medical record tampering.
## 🏗 Tech: Solidity, IPFS, React.
## 🧩 Features:
1. Patient-owned data vaults.
2. Immutable audit trails.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[Clinic] --> B[Smart Contract]
    B --> C[IPFS Storage]
\`\`\``,
        `# 🚀 Project: SkillSwap Portal
## 🎯 Problem: Barter system for professional skills.
## 🌐 Tech: React, Firebase, Algolia.
## 🧩 Features:
1. Skill matching algorithm.
2. Video-verified endorsements.
## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[User A] --> B[Matching Engine]
    B --> C[User B]
\`\`\``
    ];

    // Filter out avoidList if provided
    let available = mockBlueprints;
    if (avoidList && avoidList.length > 0) {
        available = mockBlueprints.filter(bp => {
            const titleMatch = bp.match(/# 🚀 Project: (.*?)(?:\s|##|$)/);
            const title = titleMatch ? titleMatch[1].trim() : "";
            return !avoidList.some(avoid => (title && avoid.toLowerCase().includes(title.toLowerCase())) || (title && title.toLowerCase().includes(avoid.toLowerCase())));
        });
    }

    if (available.length === 0) available = mockBlueprints;
    if (options.mode === 'ideas') {
        const mockIdeas = available.map(bp => {
            const titleMatch = bp.match(/# 🚀 Project: (.*?)(?:\s|##|$)/);
            const title = titleMatch ? titleMatch[1].trim() : "Mock Project";
            return {
                title: title,
                description: "Revolutionizing the industry with AI-driven insights and scalable architecture.",
                difficulty: "Intermediate",
                tech_stack: ["React", "Node.js", "AI"],
                id: title.toLowerCase().replace(/\s+/g, '-')
            };
        }).slice(0, 5);
        
        return {
            choices: [{
                message: {
                    content: JSON.stringify(mockIdeas)
                }
            }],
            provider: 'IdeaForge Neural Fallback (No API Keys Found)'
        };
    }

    const randomBlueprint = available[Math.floor(Math.random() * available.length)];

    return {
        choices: [{
            message: {
                content: randomBlueprint
            }
        }],
        provider: 'IdeaForge Neural Fallback (No API Keys Found)'
    };
}

module.exports = { generateCompletion };
