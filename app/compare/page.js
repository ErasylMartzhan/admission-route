'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StepHeader from '../../components/StepHeader';
import { useProfile } from '../../lib/ProfileContext';
import { universities } from '../../lib/data/universities';

export default function ComparePage() {
  const { profile, compareIds, loaded } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !profile) router.replace('/profile');
  }, [loaded, profile, router]);

  if (!profile) return null;

  const selected = universities.filter((u) => compareIds.includes(u.id));

  if (selected.length < 2) {
    return (
      <main>
        <StepHeader />
        <section className="max-w-2xl mx-auto px-4 py-10 space-y-4">
          <p className="text-ink-soft">
            Выберите два варианта на экране рекомендаций, чтобы увидеть сравнение.
          </p>
          <Link href="/recommendations" className="text-accent font-semibold underline">
            Вернуться к рекомендациям
          </Link>
        </section>
      </main>
    );
  }

  const rows = [
    { label: 'Город', get: (u) => u.city },
    { label: 'Грант', get: (u) => (u.grantAvailable ? 'Доступен' : 'Нет') },
    { label: 'Стоимость от (KZT/год)', get: (u) => u.tuitionFromKzt.toLocaleString('ru-RU') },
    { label: 'Проходной балл ЕНТ (демо)', get: (u) => u.entThreshold },
    { label: 'Направления', get: (u) => u.directions.join(', ') },
  ];

  return (
    <main>
      <StepHeader />
      <section className="max-w-2xl mx-auto px-4 py-10 space-y-6">
        <h1 className="font-display text-2xl font-bold">Сравнение</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 text-ink-soft"></th>
                {selected.map((u) => (
                  <th key={u.id} className="text-left p-2 font-display">
                    {u.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <td className="p-2 text-ink-soft">{row.label}</td>
                  {selected.map((u) => (
                    <td key={u.id} className="p-2">
                      {row.get(u)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          href="/roadmap"
          className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-xl"
        >
          Построить roadmap
        </Link>
      </section>
    </main>
  );
}
