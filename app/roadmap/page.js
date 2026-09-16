'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StepHeader from '../../components/StepHeader';
import { useProfile } from '../../lib/ProfileContext';
import { buildRoadmap } from '../../lib/roadmap';

export default function RoadmapPage() {
  const { profile, loaded, roadmapProgress, setRoadmapStep } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !profile) router.replace('/profile');
  }, [loaded, profile, router]);

  if (!profile) return null;

  const steps = buildRoadmap(profile);

  return (
    <main>
      <StepHeader />
      <section className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <h1 className="font-display text-2xl font-bold">Ваш roadmap</h1>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={step.id} className="bg-white border border-border rounded-2xl p-4 flex gap-3">
              <input
                type="checkbox"
                className="mt-1 accent-accent"
                checked={!!roadmapProgress[step.id]}
                onChange={(e) => setRoadmapStep(step.id, e.target.checked)}
              />
              <div>
                <p className="font-semibold">
                  {i + 1}. {step.title}
                </p>
                <p className="text-xs text-ink-soft">{step.due}</p>
                <p className="text-sm mt-1">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link
          href="/next-step"
          className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-xl"
        >
          Что делать дальше?
        </Link>
      </section>
    </main>
  );
}
