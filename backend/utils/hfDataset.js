const fetch = require('node-fetch');

const HF_API_KEY = process.env.HF_API_KEY;

/**
 * fetchGroundingData
 * Fetches relevant context from a Hugging Face dataset to ground the AI generation.
 * This helps mitigate hallucinations by providing real-world examples/problems.
 */
async function fetchGroundingData(domain = 'technology') {
    if (!HF_API_KEY) {
        console.warn('HF_API_KEY not found, skipping dataset grounding.');
        return '';
    }

    try {
        // Primary dataset for chat prompts
        const dataset = 'fka/awesome-chatgpt-prompts';
        const url = `https://datasets-server.huggingface.co/rows?dataset=${dataset}&config=default&split=train&offset=0&limit=100`;

        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${HF_API_KEY}` }
        });

        let groundingText = '';

        if (response.ok) {
            const data = await response.json();
            const relevantRows = data.rows
                .map(r => r.row.prompt)
                .filter(p => 
                    p.toLowerCase().includes('mermaid') || 
                    p.toLowerCase().includes('diagram') || 
                    p.toLowerCase().includes('architect') || 
                    p.toLowerCase().includes(domain.toLowerCase())
                )
                .slice(0, 5);
            
            if (relevantRows.length > 0) {
                groundingText += `\n\n### Architectural Grounding Context:\n${relevantRows.join('\n\n')}`;
            }
        }

        // Secondary search for specialized Mermaid snippets if available
        // We can inject a few hardcoded high-quality Mermaid patterns as a secondary fallback if the dataset search is sparse
        const mermaidPatterns = `
        ### Mermaid Flowchart Patterns (Grounding):
        - graph TD; A[User] --> B(API); B --> C{Auth}; C -- Yes --> D[Database]; C -- No --> E[Login];
        - graph LR; Start --> Step1[Validate] --> Step2[Process] --> End;
        - graph TD; Client["Frontend (React)"] --- Server["Backend (Node)"] --- DB[(PostgreSQL)];
        `;
        
        groundingText += `\n\n${mermaidPatterns}`;

        return groundingText;
    } catch (error) {
        console.error('Error fetching grounding data:', error.message);
        return '';
    }
}

module.exports = { fetchGroundingData };
