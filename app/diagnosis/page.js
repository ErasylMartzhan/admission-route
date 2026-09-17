'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StepHeader from '../../components/StepHeader';
import { useProfile } from '../../lib/ProfileContext';
import { GRADES, BUDGETS } from '../../lib/constants';
import { useAiText } from '../../lib/ai/useAiText';

export default function DiagnosisPage() {
  const { profile, loaded } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !profile) router.replace('/profile');
  }, [loaded, profile, router]);

  const gradeLabel = profile ? GRADES.find((g) => g.value === profile.grade)?.label : null;
  const budgetLabel = profile ? BUDGETS.find((b) => b.value === profile.budget)?.label : null;

  const templateText = profile
    ? [
        `Вы — ${gradeLabel}, интересуетесь: ${profile.interests.join(', ')}.`,
        `Бюджет: ${budgetLabel}.`,
        profile.entScore ? `Ожидаемый балл ЕНТ: ${profile.entScore}.` : '',
        `Предпочитаемые города: ${profile.cities.join(', ')}.`,
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  const { data: aiText, source } = useAiText(
    '/api/ai/diagnosis',
    profile ? { profile, templateText } : null,
    templateText,
    (j) => j.text
  );

  if (!profile) return null;

  return (
    <main>
      <StepHeader />
      <section className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <h1 className="font-display text-2xl font-bold">Ваша диагностика</h1>
        <div className="bg-white border border-border rounded-2xl p-6 space-y-3">
          {source === 'ai' ? (
            <p>{aiText}</p>
          ) : (
            <>
              <p>
                Вы — <b>{gradeLabel}</b>, интересуетесь: <b>{profile.interests.join(', ')}</b>.
              </p>
              <p>
                Бюджет: <b>{budgetLabel}</b>.{' '}
                {profile.entScore && (
                  <>
                    Ожидаемый балл ЕНТ: <b>{profile.entScore}</b>.
                  </>
                )}
              </p>
              <p>
                Предпочитаемые города: <b>{profile.cities.join(', ')}</b>.
              </p>
            </>
          )}
          <p className="text-ink-soft text-sm">
            На основе этого мы подобрали вузы и направления, которые лучше всего сочетаются с
            вашими интересами, баллом и бюджетом.
          </p>
        </div>
        <Link
          href="/recommendations"
          className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-xl"
        >
          Смотреть рекомендации
        </Link>
      </section>
    </main>
  );
}
