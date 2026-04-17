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

[REQUIREMENTS (USE EXACT MARKDOWN HEADERS):
## Title
Brandable & Disruptive Name
## Core Problem
300-word deep dive into industry pain points
## Tech Stack
- **Frontend**: framework
- **Backend**: framework
- **Database**: db
## Core Features
- Feature 1
- Feature 2
## Architecture
Frontend, Backend, DB, Cloud (AWS/GCP/Azure)
## Graph
Mermaid Flowchart (graph TD)
## Implementation Roadmap
- Week 1: ...
## Resume
5 staff-engineer level impact points]

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
[GENERATE EXACTLY: ${count} UNIQUE CONCEPTS]
[CONFIG: ${domain} | ${skillLevel} | ${techStack} | ${goal} | ${timeframe}]
[AVOID: ${previousIdeas.join(', ')}]

[OUTPUT_FORMAT: STRICT JSON ARRAY OF EXACTLY ${count} OBJECTS]
[STRUCTURE:
  [
    {"title": "...", "description": "...", "difficulty": "...", "tech_stack": [], "id": "..."},
    // ... exactly ${count} objects
  ]
]

[RULE: 100% INNOVATION | 0% REPETITION | NO TEXT OUTSIDE JSON | MUST RETURN EXACTLY ${count} ITEMS]`;
};

module.exports = { getSystemPrompt, getUserPrompt, getIdeasPrompt };
