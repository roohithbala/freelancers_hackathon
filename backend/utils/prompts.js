const getSystemPrompt = () => `Act as an Elite AI Product Architect & CTO.
Focus: Real-world problem solving, startup-grade technical depth, and clear differentiation.
Avoid: Generic CRUD, overused ideas (chatbots, todos), and student-level projects.
Every idea must be VC-ready, technically sound, and impressive in a high-stakes demo.`;

const getUserPrompt = (data, isPremium, previousProjects = [], role = 'Student', groundingContext = '') => {
    const { domain, skillLevel, techStack, goal, timeframe } = data;

    const tiers = {
        'Novice': 'Focus: Fundamentals. Constraints: No complex state/APIs. Scope: 1-2 core features.',
        'Beginner': 'Focus: Component architecture & API consumption. Constraints: Basic hooks/routing. Scope: CRUD MVP.',
        'Intermediate': 'Focus: Scalability & Modularity. Constraints: Context/Redux, DB Schemas, Auth. Scope: Production MVP.',
        'Advanced': 'Focus: Enterprise Architecture. Constraints: Microservices, WebSockets, CI/CD. Scope: High-concurrency platform.'
    };

    const sections = role === 'Startup' 
        ? '1.Brandable Name 2.Unfair Advantage 3.Monetization 4.GTM Strategy 5.MVP Features 6.Modern Tech Stack'
        : '1.Project Title 2.Learning Outcomes 3.Wow Factor 4.Industry Tech Stack 5.Scope-Strict Features 6.Resume Points';

    let prompt = `Role: Senior Staff Engineer. Skill: ${skillLevel}.
Config: Domain:${domain}, Stack:${techStack}, Goal:${goal}, Time:${timeframe}.
Avoid: ${previousProjects.join(', ')}.
${groundingContext ? `Context: ${groundingContext}` : ''}

Generate 1 deep blueprint. Markdown format:
${sections}
7.Architecture(Frontend,Backend,DB,Deploy)
8.Mermaid Graph TD (IDs: ui, api, auth, db. Labels: "Name")
9.Roadmap(3 weeks) 10.Future Scale 11.ASCII File Tree 12.Visual Mockup

APPEND JSON AT END:
{
  "costEstimate": {"monthlyTotal": "$X", "breakdown": [{"service": "X", "cost": "$X"}]},
  "scores": {"scalability": 0-100, "security": 0-100, "innovation": 0-100},
  "mockUI": {
    "theme": {"primary": "#hex", "secondary": "#hex", "background": "dark/light"},
    "layout": "sidebar|header|grid",
    "components": [{"type": "hero|stats|analytics", "title": "...", "data": []}]
  },
  "pitchDeck": [{"title": "Problem|Solution|Market", "content": "..."}]
}`;

    if (isPremium) prompt += "\n[PREMIUM: Add Advanced Scaling & System Deep Dive]";
    return prompt;
};

const getIdeasPrompt = (data, previousIdeas = [], count = 5) => {
    const { domain, skillLevel, techStack, goal, timeframe } = data;
    return `Mentor Mode: Generate ${count} UNIQUE project ideas. 
Context: ${domain}, ${skillLevel}, ${techStack}, ${goal}, ${timeframe}.
Avoid: ${previousIdeas.join(', ')}.

Return ONLY JSON array of ${count} objects:
[{"title": "Name", "description": "1 sentence wow factor", "difficulty": "${skillLevel}", "tech_stack": ["max 3"], "id": "kebab-name"}]
No text. High innovation only.`;
};

module.exports = { getSystemPrompt, getUserPrompt, getIdeasPrompt };
