const fetch = require('node-fetch');

const HF_API = process.env.HF_API_KEY;
const HF_MODEL = 'meta-llama/Llama-3.1-8B-Instruct'; // Upgraded to user-requested model

async function callHfInference(prompt) {
  if (!HF_API) throw new Error('HuggingFace API key not configured (HF_API_KEY).');

  const url = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
  
  // Format for Llama 3.1 Instruct
  const formattedPrompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a meticulous technical reviewer.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_API}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
        inputs: formattedPrompt, 
        options: { wait_for_model: true }, 
        parameters: { max_new_tokens: 1024, temperature: 0.1 } 
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HF inference failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  const text = Array.isArray(data) ? data[0]?.generated_text : data.generated_text;
  
  // Strip the prompt part if HF returns it
  return text ? text.replace(formattedPrompt, '').trim() : '';
}

/**
 * verifyBlueprint
 * Takes a generated blueprint markdown and asks an HF model to flag likely hallucinations,
 * unsupported claims, or risky/incorrect technical suggestions.
 */
async function verifyBlueprint(markdown) {
  const prompt = `Review the following project blueprint for technical accuracy. 
Identify any hallucinations, incorrect tech stack pairings, or unrealistic implementation steps.
Return ONLY valid JSON in this format:
{
  "summary": "Short overall audit summary",
  "issues": [
    {
      "text": "specific text from doc",
      "severity": "low|medium|high",
      "reason": "why it is technically inaccurate",
      "recommendation": "the correct technical approach"
    }
  ]
}

Blueprint:
${markdown}`;

  try {
    const raw = await callHfInference(prompt);
    // Extract JSON
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { summary: 'Audit failed: No JSON in response', issues: [] };
    
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.warn('HF verifier failed:', e.message);
    return { summary: 'Verification unavailable at this time', issues: [] };
  }
}

module.exports = { verifyBlueprint };
