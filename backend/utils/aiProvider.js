const OpenAI = require("openai");
const fetch = require('node-fetch');

// Configuration
const GEMINI_DIRECT_MODEL_NAME = "gemini-1.5-flash";
const GEMINI_DIRECT_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_DIRECT_MODEL_NAME}:generateContent`;

// Helper for Groq via OpenAI SDK
async function callGroq(messages, apiKey) {
    console.log("Attempting Groq API via OpenAI SDK...");

    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1",
    });

    try {
        const completion = await client.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile", // Updated to current stable model
            temperature: 0.7,
        });

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
async function callGeminiDirect(messages, apiKey) {
    console.log(`Attempting Google Gemini Direct API (${GEMINI_DIRECT_MODEL_NAME})...`);

    // Gemini Pro doesn't support system instructions well in v1beta, so we combine them.
    const systemMessage = messages.find(m => m.role === 'system')?.content || "";
    const userMessage = messages.find(m => m.role === 'user')?.content || "";
    const combinedPrompt = `${systemMessage}\n\nUser Request:\n${userMessage}`;

    const response = await fetch(`${GEMINI_DIRECT_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: combinedPrompt }] }]
        })
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

async function generateCompletion(messages, avoidList = []) {
    // 1. Try Groq (Primary)
    if (process.env.GROQ_API_KEY) {
        try {
            return await callGroq(messages, process.env.GROQ_API_KEY);
        } catch (e) {
            console.error(e.message);
        }
    }

    // 2. Try Google Gemini Direct (Secondary)
    if (process.env.GOOGLE_API_KEY) {
        try {
            return await callGeminiDirect(messages, process.env.GOOGLE_API_KEY);
        } catch (e) {
            console.error(e.message);
        }
    }

    // 3. Fallback: Mock Data
    console.warn("All APIs failed. Switching to DEMO MODE with random blueprint.");

    const mockBlueprints = [
        `
# 🚀 Project: SmartHarvest AI (Demo)

## 🎯 Core Problem
Small-scale farmers lose 40% of crops due to unpredictable weather and pest attacks, lacking access to enterprise-grade agronomy data.

## 🧠 Why Existing Solutions Fail
*   **Too Expensive**: Solutions like John Deere are for industrial farms.
*   **Too Complex**: Requires hardware sensors that are hard to maintain.

## 🚀 Unique Innovation Layer
*   **Computer Vision**: Uses simple smartphone photos to detect pests.
*   **Local-First AI**: Runs on-device to work without internet.

## 🏗 Technical Architecture
*   **Frontend**: React Native (Offline First)
*   **Backend**: Node.js + GraphQL
*   **AI**: Llama 3 via Groq (Cloud), TFLite (Local)
*   **Database**: MongoDB (Sync via WatermelonDB)

## 🧩 Core Features (MVP)
1.  **Pest Doctor**: Snap a photo, identifying disease.
2.  **Weather Guard**: Hyper-local alerts.
3.  **Market Connect**: Sell excess produce directly to consumers.

## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[Mobile App] -->|Offline Sync| B[Local DB]
    B -->|Sync| C[GraphQL API]
    C --> D[MongoDB]
    A -->|Image Analysis| E[TFLite Model]
\`\`\`
`,
        `
# 🚀 Project: FinWiz AI (Demo)

## 🎯 Core Problem
Gen Z lacks financial literacy and struggles with basic budgeting, often falling into debt traps with credit cards.

## 🧠 Why Existing Solutions Fail
*   **Boring UI**: Spreadsheets and traditional banking apps are unengaging.
*   **No Personalization**: Generic advice doesn't apply to gig-economy income.

## 🚀 Unique Innovation Layer
*   **Gamified Learning**: Earn crypto tokens for saving money.
*   **AI Financial Coach**: Chat with a persona that analyzes your spending in real-time.

## 🏗 Technical Architecture
*   **Frontend**: Flutter (Cross-platform)
*   **Backend**: Python FastAPI
*   **AI**: OpenAI GPT-4o Mini
*   **Database**: PostgreSQL + Redis

## 🧩 Core Features (MVP)
1.  **Expense Tracker**: Auto-categorize SMS transaction alerts.
2.  **Goal Setter**: Visual saving jars with progress bars.
3.  **Learn & Earn**: Short quizzes on finance to earn rewards.

## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[User App] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Finance Service]
    D --> E[AI Analysis Engine]
    E --> F[Vector DB]
\`\`\`
`,
        `
# 🚀 Project: MediConnect VR (Demo)

## 🎯 Core Problem
Medical students lack realistic surgical practice without risking patient safety or using expensive cadavers.

## 🧠 Why Existing Solutions Fail
*   **Lack of Haptics**: Textbooks and videos are 2D.
*   **High Cost**: VR simulators cost $50k+.

## 🚀 Unique Innovation Layer
*   **WebXR Support**: Runs in browser on Meta Quest 3 without app install.
*   **Multiplayer**: Senior surgeons can guide students remotely.

## 🏗 Technical Architecture
*   **Frontend**: Three.js + React Three Fiber
*   **Backend**: Supabase (Realtime)
*   **AI**: Stable Diffusion (Texture Generation)
*   **Database**: Supabase PostgreSQL

## 🧩 Core Features (MVP)
1.  **Virtual OR**: Interactive 3D operating room.
2.  **Procedure Guide**: Step-by-step AI voice guidance.
3.  **Global Leaderboard**: Score based on precision and time.

## 📊 System Architecture Diagram
\`\`\`mermaid
graph TD
    A[VR Headset] -->|WebSockets| B[Realtime Server]
    B --> C[State Sync]
    C --> D[Database]
    A -->|Assets| E[CDN]
\`\`\`
`
    ];

    // Filter out avoidList if provided
    let available = mockBlueprints;
    if (avoidList && avoidList.length > 0) {
        available = mockBlueprints.filter(bp => {
            const titleMatch = bp.match(/# 🚀 Project: (.*?) \(/);
            const title = titleMatch ? titleMatch[1] : "";
            // If the title is in avoidList (partial match), exclude it
            return !avoidList.some(avoid => title.includes(avoid) || avoid.includes(title));
        });
    }

    // If all filtered out, fallback to random from original
    if (available.length === 0) available = mockBlueprints;

    const randomBlueprint = available[Math.floor(Math.random() * available.length)];

    return {
        choices: [{
            message: {
                content: randomBlueprint
            }
        }]
    };
}

module.exports = { generateCompletion };
