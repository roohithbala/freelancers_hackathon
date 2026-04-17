const OpenAI = require('openai');
const fetch = require('node-fetch');

const GPT_MODEL = 'gpt-4o-mini';
const HF_API = process.env.HF_API_KEY;
const HF_MODEL = 'meta-llama/Llama-3.1-8B-Instruct';

async function callGptVerifier(prompt) {
  if (!process.env.OPENAI_API_KEY) throw new Error('OpenAI API key not configured (OPENAI_API_KEY).');

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({
    model: GPT_MODEL,
    messages: [
      { role: 'system', content: 'You are a meticulous technical reviewer.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.1,
    max_tokens: 1024,
  });
  return completion.choices[0]?.message?.content || '';
}

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

async function callGroqVerifier(prompt) {
    if (!process.env.GROQ_API_KEY) throw new Error('Groq API key not configured.');

    const client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
    });

    try {
        const completion = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a meticulous technical reviewer." },
                { role: "user", content: prompt }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.1,
            max_tokens: 1024,
        });
        return completion.choices[0]?.message?.content || '';
    } catch (error) {
        throw new Error(`Groq verifier failed: ${error.message}`);
    }
}

/**
 * verifyBlueprint
 * Takes a generated blueprint markdown and asks a Groq model to flag likely hallucinations,
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
    // Try GPT first (Primary), fall back to Groq then HuggingFace
    let raw;
    try {
      raw = await callGptVerifier(prompt);
    } catch (gptErr) {
      console.warn('GPT verifier failed, falling back to Groq:', gptErr.message);
      try {
        raw = await callGroqVerifier(prompt);
      } catch (groqErr) {
        console.warn('Groq verifier failed, falling back to HuggingFace:', groqErr.message);
        raw = await callHfInference(prompt);
      }
    }
    // Extract JSON
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return { summary: 'Audit failed: No JSON in response', issues: [] };
    
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.warn('Verifier pipeline failed:', e.message);
    return { summary: 'Verification unavailable at this time', issues: [] };
  }
}

module.exports = { verifyBlueprint };
