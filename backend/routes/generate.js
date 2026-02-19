const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { getSystemPrompt, getUserPrompt, getIdeasPrompt } = require('../utils/prompts');
const { generateCompletion } = require('../utils/aiProvider');

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

        const systemPrompt = getSystemPrompt();
        let userPrompt;

        if (mode === 'ideas') {
            userPrompt = getIdeasPrompt({ domain, skillLevel, techStack, goal, timeframe }, previousProjects || []);
        } else {
            let specificGoal = goal;
            if (selectedIdea) {
                specificGoal = `Build: ${selectedIdea.title}. ${selectedIdea.description}. Original Goal: ${goal}`;
            }
            userPrompt = getUserPrompt({ domain, skillLevel, techStack, goal: specificGoal, timeframe }, isPremium, previousProjects, role);
        }

        try {
            const messages = [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ];

            const data = await generateCompletion(messages, previousProjects);
            const content = data.choices[0].message.content;

            if (mode === 'ideas') {
                let ideas = [];
                const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                if (jsonMatch) {
                    ideas = JSON.parse(jsonMatch[1]);
                } else {
                    try {
                        ideas = JSON.parse(content);
                    } catch (e) {
                        // Try to find JSON array in content
                        const arrayMatch = content.match(/\[[\s\S]*\]/);
                        if (arrayMatch) {
                            try {
                                ideas = JSON.parse(arrayMatch[0]);
                            } catch (e2) {
                                console.warn("Failed to parse ideas JSON:", e2);
                            }
                        }
                    }
                }
                res.json({ ideas });
            } else {
                // Blueprint mode - parse markdown AND extract JSON block
                let structuredData = {};
                const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                if (jsonMatch) {
                    try {
                        structuredData = JSON.parse(jsonMatch[1]);
                    } catch (e) {
                        console.warn("Failed to parse blueprint JSON:", e);
                    }
                }

                // Parse markdown to extract problem, features, techStack, roadmap
                const parsedFields = parseBlueprintMarkdown(content);

                // Merge parsed fields into structured data (parsed fields take priority for these keys)
                const mergedData = {
                    ...structuredData,
                    problem: parsedFields.problem || structuredData.problem || '',
                    features: parsedFields.features || structuredData.features || [],
                    techStack: parsedFields.techStack || structuredData.techStack || [],
                    roadmap: parsedFields.roadmap || structuredData.roadmap || [],
                    title: parsedFields.title || structuredData.title || selectedIdea?.title || ''
                };

                res.json({ 
                    blueprint: content,
                    data: mergedData
                });
            }

        } catch (providerError) {
            console.error("All AI providers failed:", providerError);
            return res.status(500).json({ error: 'Failed to generate content. Please check backend logs.' });
        }

    } catch (error) {
        console.error('Error generating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
