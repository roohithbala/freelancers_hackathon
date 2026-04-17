const getSystemPrompt = () => `[SYSTEM: NEURAL ARCHITECT V4.2]
[MODE: MASS SYNTHESIS | PRECISION: ELITE]
[CONSTRAINTS: No Student Projects | No CRUD | No Chatbots | No Generic Portfolios]
[OUTPUT: VC-Grade Startup Blueprints | Extreme Technical Depth]
[TONE: Professional | Direct | Architectural]`;

const getUserPrompt = (data, isPremium, role = 'Freelancer', groundingContext = '') => {
    const { domain, skillLevel, techStack, goal, timeframe } = data;

    const tierContext = {
        'Novice': 'Base Fundamentals | Max Stability',
        'Beginner': 'API Integration | Modern Frameworks',
        'Intermediate': 'Full-Stack Scaling | Performance Optimization',
        'Advanced': 'Distributed Systems | High-Concurrency | Enterprise Security'
    };

    return `[PROMPT: GENERATE BLUEPRINT]
[CONFIG:
  - Domain: ${domain}
  - Role: ${role}
  - Skill: ${skillLevel} (${tierContext[skillLevel] || 'Professional'})
  - Stack: ${techStack}
  - Goal: ${goal}
  - Time: ${timeframe}
  - Context: ${groundingContext}
]

[REQUIREMENTS:
  1. Title: Brandable & Disruptive
  2. Problem: 300-word deep dive into industry pain points
  3. Solution: Technical unfair advantage
  4. MVP Features: 8-10 high-impact items
  5. Architecture: Frontend, Backend, DB, Cloud (AWS/GCP/Azure)
  6. Graph: Mermaid Flowchart (graph TD)
  7. Roadmap: 4-week aggressive sprint
  8. Resume: 5 staff-engineer level impact points
]

[OUTPUT: Markdown + JSON Payload]

[JSON_STRUCTURE:
{
  "costEstimate": {"monthlyTotal": "$X", "breakdown": [{"service": "X", "cost": "$X"}]},
  "scores": {"scalability": 0-100, "security": 0-100, "innovation": 0-100},
  "mockUI": {
    "theme": {"primary": "#hex", "secondary": "#hex", "background": "dark/light"},
    "layout": "dashboard|grid|workflow",
    "components": [{"type": "analytics|graph|stats|feed", "title": "...", "data": []}]
  },
  "pitchDeck": [{"title": "Problem|Solution|Market", "content": "..."}]
}]
${isPremium ? '[PREMIUM_MODE: ENABLED - ENFORCE MICROSERVICES & CLOUD NATIVE]' : ''}`;
};

const getIdeasPrompt = (data, previousIdeas = [], count = 5) => {
    const { domain, skillLevel, techStack, goal, timeframe } = data;
    return `[PROMPT: MASS IDEA SYNTHESIS]
[GENERATE: ${count} UNIQUE CONCEPTS]
[CONFIG: ${domain} | ${skillLevel} | ${techStack} | ${goal} | ${timeframe}]
[AVOID: ${previousIdeas.join(', ')}]

[OUTPUT_FORMAT: JSON ARRAY ONLY]
[STRUCTURE:
  [{"title": "...", "description": "...", "difficulty": "...", "tech_stack": [], "id": "..."}]
]

[RULE: 100% INNOVATION | 0% REPETITION | NO TEXT OUTSIDE JSON]`;
};

module.exports = { getSystemPrompt, getUserPrompt, getIdeasPrompt };
