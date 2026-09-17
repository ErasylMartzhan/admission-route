import { NextResponse } from 'next/server';
import { callGemini, numbersAreGrounded } from '../../../../lib/ai/gemini';

const SYSTEM = `Ты объясняешь абитуриенту, почему программа ему подходит. Русский, "ты", 2–3 предложения на вариант.
Опирайся ТОЛЬКО на переданные reasons и профиль. Не добавляй новых чисел, городов, грантов, дедлайнов.
Связывай факт с целью/интересом пользователя. Без гарантий.
Ответ строго JSON: {"items":[{"id":"...","text":"..."}]}`;

export async function POST(req) {
  try {
    const { profile, items } = await req.json();
    if (!Array.isArray(items) || !items.length) return NextResponse.json({ ok: false }, { status: 400 });

    const out = await callGemini({
      system: SYSTEM,
      json: true,
      maxTokens: 250 * items.length,
      prompt: `Профиль:\n${JSON.stringify(profile)}\n\nВарианты:\n${JSON.stringify(items)}`,
    });

    const byId = {};
    for (const it of out?.items || []) {
      const src = items.find(x => String(x.id) === String(it.id));
      if (!src || typeof it.text !== 'string' || !it.text.trim()) continue;
      if (numbersAreGrounded(it.text, JSON.stringify(src) + JSON.stringify(profile))) {
        byId[src.id] = it.text.trim();
      }
    }
    return NextResponse.json({ ok: true, byId });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: String(e?.message || e) });
  }
}
