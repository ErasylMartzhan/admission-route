import { NextResponse } from 'next/server';
import { callGemini, numbersAreGrounded } from '../../../../lib/ai/gemini';

const SYSTEM = `Ты — наставник по поступлению. Пиши на русском, на "ты", тепло и конкретно.
Используй ТОЛЬКО факты из профиля и шаблонной диагностики. Не придумывай баллы, вузы, дедлайны, шансы.
Никаких гарантий поступления. 3–5 предложений, без markdown и списков.
Структура: к чему идёшь → 1–2 сильные стороны → главное ограничение и что с ним делать.`;

export async function POST(req) {
  try {
    const { profile, templateText } = await req.json();
    if (!templateText) return NextResponse.json({ ok: false }, { status: 400 });

    const text = await callGemini({
      system: SYSTEM,
      prompt: `Профиль (JSON):\n${JSON.stringify(profile)}\n\nШаблонная диагностика (факты):\n${templateText}\n\nПерепиши как живой персональный текст.`,
    });

    if (!numbersAreGrounded(text, JSON.stringify(profile) + templateText)) {
      return NextResponse.json({ ok: false, reason: 'ungrounded' });
    }
    return NextResponse.json({ ok: true, text });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: String(e?.message || e) });
  }
}
