const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 6000);

export async function callGemini({ system, prompt, json = false, maxTokens = 600 }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('NO_KEY');

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

  const generationConfig = { temperature: 0.6, maxOutputTokens: maxTokens };
  if (json) generationConfig.responseMimeType = 'application/json';
  if (MODEL.includes('2.5-flash')) generationConfig.thinkingConfig = { thinkingBudget: 0 };

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        signal: ctrl.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig,
        }),
      }
    );
    if (!res.ok) throw new Error(`HTTP_${res.status}`);
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
    if (!text) throw new Error('EMPTY');
    return json ? JSON.parse(text.replace(/```json|```/g, '').trim()) : text;
  } finally {
    clearTimeout(timer);
  }
}

export function numbersAreGrounded(output, sourceText) {
  const nums = s => (String(s).match(/\d+(?:[.,]\d+)?/g) || []).map(n => n.replace(',', '.'));
  const allowed = new Set(nums(sourceText));
  return nums(output).every(n => allowed.has(n));
}
