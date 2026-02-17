const getSystemPrompt = () => {
   return `You are a world-class AI Product Architect, Startup Mentor, and Technical CTO.

You do NOT generate generic ideas.

You generate:
1. Deeply researched, real-world problem-driven startup-grade project ideas
2. With clear differentiation from existing solutions
3. With strong technical feasibility
4. With monetization strategy
5. With scalable architecture planning

You must avoid:
- Generic student-level CRUD projects
- Overused ideas (chatbot, e-commerce, todo app, weather app, basic AI chatbot, etc.)
- Ideas without clear competitive edge

Every idea must:
- Solve a non-obvious problem
- Have a defensible uniqueness factor
- Be realistically buildable
- Be impressive in a hackathon/demo setting
- Have real startup potential

Think like a VC-backed founder.`;
};

const getUserPrompt = (data, isPremium) => {
   const { domain, skillLevel, techStack, goal, timeframe } = data;

   // Base Prompt
   let prompt = `Generate a highly innovative project blueprint.

User Profile:
- Domain: ${domain}
- Skill Level: ${skillLevel}
- Preferred Stack: ${techStack}
- Goal: ${goal}
- Timeframe: ${timeframe}

Generate exactly ONE deeply developed project idea.

Return structured output in the following format:

1. 🔥 Project Title (unique and brandable)

2. 🎯 Core Problem (real-world, clearly defined, underserved problem)

3. 🧠 Why Existing Solutions Fail
   - Mention competitors or common solutions
   - Explain their gap

4. 🚀 Unique Innovation Layer
   - What makes this 10x better?
   - Technical differentiation`;

   // Premium Sections
   if (isPremium) {
      prompt += `
   - AI or system design edge

5. 🏗 Technical Architecture
   - Frontend
   - Backend
   - AI Model Usage
   - Database
   - Deployment
   - Scaling Strategy

6. 🧩 Core Features (MVP)

7. 🛠 Advanced Features (Post-MVP)

    8. 📊 System Architecture Diagram
       - Provide a Mermaid.js 'graph TD' code block.
       - Start strictly with: \`\`\`mermaid
       - Content MUST start with: graph TD
       - Use ONLY this node format: id["Node Label"]
       - Use ONLY simple arrows: A --> B or A -- "Label" --> B
       - NO brackets () or {} or [] in the text.
       - NO special arrow types like |>


      9. 💰 Monetization Strategy
         - Early monetization
            - Long - term revenue model

      10. 📈 Future Expansion Vision(How this becomes a big startup)

      11. 🏆 Hackathon Demo Strategy(How to impress judges)

      12. 🧪 Implementation Roadmap(Week - by - week plan)

Be highly specific.
Be bold.
Be technically detailed.
Avoid fluff.`;
   } else {
      // Free Tier (Concise)
      prompt += `

      5. 🏗 Core Tech Stack(Brief)

      6. 🧩 Key Features(MVP Only)

      7. 🧪 Simple Implementation Steps

      8. 📊 System Architecture Diagram
       - Provide a Mermaid.js 'graph TD' code block.
       - Start strictly with: \`\`\`mermaid
       - Content MUST start with: graph TD
       - Use ONLY this node format: id["Node Label"]
       - Use ONLY simple arrows: A --> B or A -- "Label" --> B
       - NO brackets () or {} or [] in the text.
       - NO special arrow types like |> 
       - example:
         graph TD
         A["User"] -- "Request" --> B["Backend"]
         B --> C["Database"]
         
    KEEP IT CONCISE. This is a Free Tier generation.
    Do NOT include monetization or expansion plans.
`;
   }

   return prompt;
};

module.exports = { getSystemPrompt, getUserPrompt };
