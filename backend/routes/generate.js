const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { getSystemPrompt, getUserPrompt } = require('../utils/prompts');
const { generateCompletion } = require('../utils/aiProvider');

router.post('/', async (req, res) => {
    try {
        const { domain, skillLevel, techStack, goal, timeframe, isPremium, previousProjects } = req.body;

        if (!domain || !skillLevel || !techStack || !goal || !timeframe) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const systemPrompt = getSystemPrompt();
        const userPrompt = getUserPrompt({ domain, skillLevel, techStack, goal, timeframe }, isPremium, previousProjects);

        // Legacy check removed. aiProvider handles keys and fallbacks.

        // Use the new AI Provider with fallback
        try {
            const messages = [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ];

            const data = await generateCompletion(messages, previousProjects);
            // AI Provider returns the full structure, we need the content
            // OpenAI/AIML structure: data.choices[0].message.content
            const blueprint = data.choices[0].message.content;

            res.json({ blueprint });
        } catch (providerError) {
            console.error("All AI providers failed:", providerError);
            return res.status(500).json({ error: 'Failed to generate project. Please check backend logs.' });
        }

    } catch (error) {
        console.error('Error generating project idea:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
