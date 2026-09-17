'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StepHeader from '../../components/StepHeader';
import { useProfile } from '../../lib/ProfileContext';
import { universities } from '../../lib/data/universities';
import { recommend } from '../../lib/recommend';

export default function RecommendationsPage() {
  const { profile, loaded, compareIds, toggleCompare } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !profile) router.replace('/profile');
  }, [loaded, profile, router]);

  if (!profile) return null;

  const results = recommend(profile, universities, 3);

  return (
    <main>
      <StepHeader />
      <section className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <h1 className="font-display text-2xl font-bold">Рекомендации</h1>
        <p className="text-ink-soft text-sm">
          Выберите до двух вариантов, чтобы сравнить их между собой.
        </p>
        <div className="space-y-4">
          {results.map((uni) => (
            <div key={uni.id} className="bg-white border border-border rounded-2xl p-5">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">{uni.name}</h2>
                  <p className="text-ink-soft text-sm">{uni.city}</p>
                </div>
                <button
                  onClick={() => toggleCompare(uni.id)}
                  className={`text-xs px-3 py-1.5 rounded-full border flex-shrink-0 ${
                    compareIds.includes(uni.id) ? 'bg-accent text-white border-accent' : 'border-border'
                  }`}
                >
                  {compareIds.includes(uni.id) ? 'Выбрано' : 'Сравнить'}
                </button>
              </div>
              <ul className="mt-3 space-y-1 text-sm">
                {uni.reasons.map((r, i) => (
                  <li key={i} className="text-ink-soft">
                    • {r}
                  </li>
                ))}
              </ul>
              {uni.isDemoData ? (
                <p className="mt-3 text-xs text-ink-soft italic">
                  Демонстрационные данные — уточните актуальные условия на сайте вуза.
                </p>
              ) : (
                <p className="mt-3 text-xs text-ink-soft italic">
                  Проходной балл по данным на 2025 год, может измениться —{' '}
                  <a href={uni.source} target="_blank" rel="noreferrer" className="underline text-accent">
                    источник
                  </a>
                  {uni.sourceNote ? `. ${uni.sourceNote}` : ''}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/compare"
            className={`bg-accent text-white font-semibold px-6 py-3 rounded-xl ${
              compareIds.length < 2 ? 'opacity-40 pointer-events-none' : ''
            }`}
          >
            Сравнить выбранные
          </Link>
          <Link href="/roadmap" className="border border-border font-semibold px-6 py-3 rounded-xl">
            Сразу к roadmap
          </Link>
        </div>
      </section>
    </main>
  );
}
