'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '../../components/StepHeader';
import { useProfile } from '../../lib/ProfileContext';
import { buildRoadmap } from '../../lib/roadmap';

export default function NextStepPage() {
  const { profile, loaded, roadmapProgress, setRoadmapStep } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !profile) router.replace('/profile');
  }, [loaded, profile, router]);

  if (!profile) return null;

  const steps = buildRoadmap(profile);
  const next = steps.find((s) => !roadmapProgress[s.id]);

  return (
    <main>
      <StepHeader />
      <section className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        {next ? (
          <>
            <p className="text-ink-soft">Ваш ближайший шаг</p>
            <h1 className="font-display text-3xl font-bold">{next.title}</h1>
            <p className="text-ink-soft">{next.due}</p>
            <p>{next.desc}</p>
            <button
              onClick={() => setRoadmapStep(next.id, true)}
              className="bg-accent text-white font-semibold px-6 py-3 rounded-xl"
            >
              Отметить как выполнено
            </button>
          </>
        ) : (
          <h1 className="font-display text-2xl font-bold">Все шаги выполнены 🎉</h1>
        )}
      </section>
    </main>
  );
}
