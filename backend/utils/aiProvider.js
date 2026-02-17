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

async function generateCompletion(messages) {
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
    console.warn("All APIs failed. Switching to DEMO MODE.");
    return {
        choices: [{
            message: {
                content: `
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

## 💰 Monetization Strategy
*   **Freemium**: Basic disease detection is free.
*   **Premium**: $5/mo for advanced weather patterns and market connectivity.

## 🧪 Implementation Roadmap
*   **Week 1**: Train TFLite model on 'PlantVillage' dataset.
*   **Week 2**: Build React Native Shell.
*   **Week 3**: Integrate Offline Sync.
`
            }
        }]
    };
}

module.exports = { generateCompletion };
