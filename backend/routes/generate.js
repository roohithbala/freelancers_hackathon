const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { getSystemPrompt, getUserPrompt } = require('../utils/prompts');
const { generateCompletion } = require('../utils/aiProvider');

router.post('/', async (req, res) => {
    try {
        const { domain, skillLevel, techStack, goal, timeframe, isPremium, previousProjects, role, mode, selectedIdea } = req.body;

        if (!domain || !skillLevel || !techStack || !goal || !timeframe) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const systemPrompt = getSystemPrompt();
        let userPrompt;

        if (mode === 'ideas') {
            const { getIdeasPrompt } = require('../utils/prompts');
            // Fetch previously generated ideas from DB if needed, or rely on client passing them
            // For hackathon speed, we'll rely on client passing previousProjects (which are titles)
            userPrompt = getIdeasPrompt({ domain, skillLevel, techStack, goal, timeframe }, previousProjects || []);
        } else {
            // Blueprint Generation Mode
            // If selectedIdea is passed, we can merge it into the goal or context to be more specific
            let specificGoal = goal;
            if (selectedIdea) {
                specificGoal = `Build: ${selectedIdea.title}. ${selectedIdea.description}. Original Goal: ${goal}`;
            }
            
            userPrompt = getUserPrompt({ domain, skillLevel, techStack, goal: specificGoal, timeframe }, isPremium, previousProjects, role);
        }

        // Use the new AI Provider with fallback
        try {
            const messages = [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ];

            const data = await generateCompletion(messages, previousProjects);
            // AI Provider returns the full structure, we need the content
            const content = data.choices[0].message.content;

            if (mode === 'ideas') {
                // Parse JSON array from content
                // It might be wrapped in ```json ... ```
                let ideas = [];
                const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
                if (jsonMatch) {
                    ideas = JSON.parse(jsonMatch[1]);
                } else {
                    // Try parsing directly if no code blocks
                    try {
                         ideas = JSON.parse(content);
                    } catch (e) {
                        console.warn("Failed to parse ideas JSON directly:", e);
                        // Fallback: simple text splitting if needed, or return raw
                    }
                }
                res.json({ ideas });
            } else {
                res.json({ blueprint: content });
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
