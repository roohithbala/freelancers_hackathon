const fetch = require('node-fetch');

const HF_API = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || 'google/flan-t5-large';

async function callHfInference(prompt) {
  if (!HF_API) throw new Error('HuggingFace API key not configured (HF_API_KEY).');

  const url = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_API}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true }, parameters: { max_new_tokens: 512 } })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HF inference failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  // API returns array or object depending on model
  if (Array.isArray(data) && data[0] && data[0].generated_text) return data[0].generated_text;
  if (data.generated_text) return data.generated_text;
  if (typeof data === 'string') return data;
  // If model returns text field
  if (data[0] && data[0].text) return data[0].text;
  return JSON.stringify(data);
}

/**
 * verifyBlueprint
 * Takes a generated blueprint markdown and asks an HF model to flag likely hallucinations,
 * unsupported claims, or risky/incorrect technical suggestions. Returns a structured object
 * with `issues` array and a short `summary`.
 */
async function verifyBlueprint(markdown) {
  const prompt = `You are a meticulous technical reviewer. Given the following project blueprint in markdown, identify any statements that are likely hallucinations, unverifiable facts, or risky/incorrect technical recommendations. Return a JSON object with two keys: "summary" (a short human readable summary) and "issues" (an array of objects with keys: "path" (where in the doc, e.g., 'features[2]'), "text" (the exact text or quoted excerpt), "severity" (low|medium|high), "reason" (why it may be incorrect), "recommendation" (how to fix it)).

Blueprint:
-----BEGIN BLUEPRINT-----\n${markdown}\n-----END BLUEPRINT-----\n
Only return valid JSON. If there are no issues, return {"summary":"No obvious hallucinations detected","issues":[]}.`;

  try {
    const raw = await callHfInference(prompt);
    // Attempt to extract JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : raw;
    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (e) {
    console.warn('HF verifier failed:', e.message);
    return { summary: 'Verification unavailable', issues: [] };
  }
}

module.exports = { verifyBlueprint };
