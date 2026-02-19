const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { getSystemPrompt, getUserPrompt, getIdeasPrompt } = require('../utils/prompts');
const { generateCompletion } = require('../utils/aiProvider');
const { verifyBlueprint } = require('../utils/hfVerifier');

// Helper: parse markdown blueprint into structured fields
function parseBlueprintMarkdown(content) {
    const parsed = {};

    // Extract Problem/Core Problem
    const problemMatch = content.match(/(?:Core Problem|Problem Statement|Problem)[^\n]*\n([\s\S]*?)(?=\n##|\n\d+\.|$)/i);
    if (problemMatch) {
        parsed.problem = problemMatch[1]
            .replace(/^\s*[\*\-]\s*/gm, '')
            .replace(/\n+/g, ' ')
            .trim()
            .substring(0, 500);
    }

    // Extract Tech Stack items
    const techMatch = content.match(/(?:Tech(?:nical)?\s*(?:Architecture|Stack))[^\n]*\n([\s\S]*?)(?=\n##|\n\d+\.\s|$)/i);
    if (techMatch) {
        const techBlock = techMatch[1];
        const techItems = [];
        // Match "- **Frontend**: React" or "* Frontend: React" patterns
        const lines = techBlock.split('\n');
        for (const line of lines) {
            const techLine = line.match(/[\*\-]\s*\*?\*?([^:*]+)\*?\*?\s*:\s*(.+)/);
            if (techLine) {
                // Split the value by commas or "+"
                const techs = techLine[2].split(/[,+]/).map(t => t.replace(/[\*\(\)]/g, '').trim()).filter(Boolean);
                techItems.push(...techs);
            } else {
                // Simple bullet items
                const simpleTech = line.match(/[\*\-]\s+(.+)/);
                if (simpleTech && simpleTech[1].trim().length < 50) {
                    techItems.push(simpleTech[1].replace(/[\*\(\)]/g, '').trim());
                }
            }
        }
        if (techItems.length > 0) {
            parsed.techStack = [...new Set(techItems)].slice(0, 15);
        }
    }

    // Extract Features
    const featuresMatch = content.match(/(?:Core Features|Key Features|Features|MVP Features)[^\n]*\n([\s\S]*?)(?=\n##|\n\d+\.\s(?!.*feature)|\n---)/i);
    if (featuresMatch) {
        const featBlock = featuresMatch[1];
        const features = [];
        const lines = featBlock.split('\n');
        for (const line of lines) {
            const feat = line.match(/(?:\d+\.\s*|\*\s*|\-\s*)\*?\*?(.+)\*?\*?/);
            if (feat) {
                const text = feat[1].replace(/\*\*/g, '').replace(/^\s*\*?\*?\s*/, '').trim();
                if (text.length > 5 && text.length < 200) {
                    features.push(text);
                }
            }
        }
        if (features.length > 0) {
            parsed.features = features.slice(0, 10);
        }
    }

    // Extract Roadmap
    const roadmapMatch = content.match(/(?:Implementation Roadmap|Roadmap|Development Plan)[^\n]*\n([\s\S]*?)(?=\n##\s|\n\d+\.\s*(?:🎨|📂|Future|Visual)|$)/i);
    if (roadmapMatch) {
        const roadBlock = roadmapMatch[1];
        const steps = [];
        const lines = roadBlock.split('\n');
        for (const line of lines) {
            const step = line.match(/(?:\d+\.\s*|\*\s*|\-\s*)\*?\*?(.+)\*?\*?/);
            if (step) {
                const text = step[1].replace(/\*\*/g, '').trim();
                if (text.length > 5 && text.length < 300) {
                    steps.push(text);
                }
            }
        }
        if (steps.length > 0) {
            parsed.roadmap = steps.slice(0, 12);
        }
    }

    // Extract Title
    const titleMatch = content.match(/(?:Project|Startup)\s*(?:Name|Title)?[:\s]*(.+)/i) || content.match(/^#\s+(.+)/m);
    if (titleMatch) {
        parsed.title = titleMatch[1].replace(/[\*#🚀🎓]/g, '').replace(/\(.*?\)/g, '').trim();
    }

    return parsed;
}

router.post('/', async (req, res) => {
    try {
        const domain = req.body.domain || 'technology';
        const skillLevel = req.body.skillLevel || 'intermediate';
        const techStack = req.body.techStack || 'Any';
        const goal = req.body.goal || 'Startup MVP';
        const timeframe = req.body.timeframe || '1 Month';
        const { isPremium, previousProjects, role, mode, selectedIdea } = req.body;

        const { fetchGroundingData } = require('../utils/hfDataset');
        const groundingContext = await fetchGroundingData(domain);

        const systemPrompt = getSystemPrompt();
        let userPrompt;

        if (mode === 'ideas') {
            userPrompt = getIdeasPrompt({ domain, skillLevel, techStack, goal, timeframe }, previousProjects || []);
        } else {
            let specificGoal = goal;
            if (selectedIdea) {
                specificGoal = `Build: ${selectedIdea.title}. ${selectedIdea.description}. Original Goal: ${goal}`;
            }
            userPrompt = getUserPrompt({ domain, skillLevel, techStack, goal: specificGoal, timeframe }, isPremium, previousProjects, role, groundingContext);
        }

        try {
            const messages = [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ];

            // Allow client to request lower-cost generation by supplying maxTokens and lower temperature
            const genOptions = {
                maxTokens: req.body.maxTokens || (mode === 'ideas' ? 2048 : 4096),
                temperature: typeof req.body.temperature === 'number' ? req.body.temperature : 0.2
            };

            const data = await generateCompletion(messages, previousProjects, genOptions);
            const content = data.choices[0].message.content;

            // Robust JSON extraction helper
            const extractAndParseJSON = (text) => {
                console.log("Raw AI Text Length:", text.length);
                if (text.length < 500) console.log("Raw AI Text Snippet:", text);
                
                // 1. Try extracting from markdown code blocks
                const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
                if (jsonMatch) {
                    try { return JSON.parse(jsonMatch[1].trim()); } catch (e) { console.warn("Markdown JSON parse failed, trying raw..."); }
                }

                // 2. Try finding the first '{' or '[' and the last '}' or ']'
                const firstOpen = text.indexOf('{');
                const firstArray = text.indexOf('[');
                
                let start = -1;
                let end = -1;

                // Determine if we are looking for an object or array
                if (firstOpen !== -1 && (firstArray === -1 || firstOpen < firstArray)) {
                    start = firstOpen;
                    end = text.lastIndexOf('}');
                } else if (firstArray !== -1) {
                    start = firstArray;
                    end = text.lastIndexOf(']');
                }

                if (start !== -1) {
                    let jsonStr = end !== -1 ? text.substring(start, end + 1) : text.substring(start).trim();
                    
                    const tryParse = (str) => {
                        try { return JSON.parse(str); } catch (e) { return null; }
                    };

                    // 1. Direct try
                    let result = tryParse(jsonStr);
                    if (result) return result;

                    // 2. Surgical Repair
                    console.warn("Direct parse failed, attempting surgical repair...");
                    
                    // Fix A: AI often forgets to escape literal newlines inside strings.
                    // We only escape newlines that are NOT followed by a potential JSON structural character (", }, ], {)
                    let fixed = jsonStr.replace(/\n(?!\s*["\{\}\[\]])/g, '\\n');
                    
                    result = tryParse(fixed);
                    if (result) return result;

                    // Fix B: Handle Truncation (Backtracking)
                    // We look for the last potentially complete object boundary
                    console.warn("Attempting to rescue truncated JSON via backtracking...");
                    for (let i = fixed.length - 1; i > 0; i--) {
                        // We only stop at characters that could close a structure
                        if (fixed[i] === '}' || fixed[i] === ']' || fixed[i] === '"') {
                            let temp = fixed.substring(0, i + 1);
                            
                            // If it ends with a quote, it might be a truncated string value
                            if (temp.endsWith('"') && (temp.match(/(?<!\\)"/g) || []).length % 2 !== 0) {
                                // Close the string
                            } else if (temp.endsWith('"')) {
                                // String is balanced, but maybe the object isn't
                            }

                            // Robust matching of open/close counts
                            const count = (str, char) => (str.match(new RegExp('\\' + char, 'g')) || []).length;
                            const openB = count(temp, '{');
                            const closeB = count(temp, '}');
                            const openBr = count(temp, '[');
                            const closeBr = count(temp, ']');

                            let closer = "";
                            if (openB > closeB) closer += '}'.repeat(openB - closeB);
                            if (openBr > closeBr) closer += ']'.repeat(openBr - closeBr);
                            
                            let attempt = temp + closer;
                            // Final cleanup of trailing commas before closing
                            attempt = attempt.replace(/,\s*([\]\}])/g, '$1');
                            
                            result = tryParse(attempt);
                            if (result) return result;
                        }
                    }
                    
                    console.error("DEBUG - All repair attempts failed for current AI response.");
                    throw new Error("JSON parse failed after all surgical recovery attempts.");
                }
                
                throw new Error("No JSON found in response");
            };

            if (mode === 'ideas') {
                let ideas = [];
                try {
                    ideas = extractAndParseJSON(content);
                    // Ensure it's an array
                    if (!Array.isArray(ideas) && ideas.ideas) ideas = ideas.ideas;
                    if (!Array.isArray(ideas)) ideas = []; 
                } catch (e) {
                    console.error("Failed to parse ideas:", e);
                    // Fallback: empty array to prevent crash
                    ideas = [];
                }
                res.json({ ideas });
            } else {
                // Blueprint mode - parse markdown AND extract JSON block
                let structuredData = {};
                try {
                    structuredData = extractAndParseJSON(content);
                } catch (e) {
                    console.warn("Failed to extract structured data from blueprint:", e);
                }

                // Parse markdown to extract problem, features, techStack, roadmap
                // Ensure parseBlueprintMarkdown is defined or imported. If not available in this scope, we might need to rely on structuredData or simple regex.
                // Assuming parseBlueprintMarkdown is a helper function defined elsewhere in this file or imported. 
                // Since I cannot see it in the previous context, I will validly assume it exists based on the orphaned code.
                let parsedFields = {};
                try {
                     parsedFields = parseBlueprintMarkdown(content);
                } catch (e) {
                    console.warn("Markdown parsing failed:", e);
                }

                // Merge parsed fields into structured data
                const mergedData = {
                    ...structuredData,
                    problem: parsedFields.problem || structuredData.problem || '',
                    features: parsedFields.features || structuredData.features || [],
                    techStack: parsedFields.techStack || structuredData.techStack || [],
                    roadmap: parsedFields.roadmap || structuredData.roadmap || [],
                    title: parsedFields.title || structuredData.title || selectedIdea?.title || ''
                };

                // Verification using Llama 3.1 8B on Hugging Face
                console.log("Starting technical audit via Hugging Face Llama 3.1 8B...");
                let verification = { summary: 'Verification skipped', issues: [] };
                try {
                   verification = await verifyBlueprint(content);
                } catch (e) {
                   console.warn('Verification step failed:', e);
                   verification = { summary: 'Technical audit service unavailable', issues: [] };
                }

                res.json({
                    blueprint: content,
                    data: mergedData,
                    verification
                });
            }

        } catch (error) {
            console.error('Inner Error:', error);
            res.status(500).json({ error: 'Failed to generate project ideas', details: error.message });
        }
    } catch (mainError) {
        console.error('Main Error:', mainError);
        res.status(500).json({ error: 'Internal server error', details: mainError.message });
    }
});

module.exports = router;
