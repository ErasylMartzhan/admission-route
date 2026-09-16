'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '../../components/StepHeader';
import { useProfile } from '../../lib/ProfileContext';
import { INTERESTS, CITIES, BUDGETS, GRADES } from '../../lib/constants';

export default function ProfilePage() {
  const router = useRouter();
  const { profile, setProfile } = useProfile();
  const [form, setForm] = useState(
    profile || {
      grade: '11',
      interests: [],
      entScore: '',
      budget: 'flexible',
      cities: ['Любой город'],
    }
  );

  function toggleInterest(interest) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));
  }

  function toggleCity(city) {
    setForm((f) => ({
      ...f,
      cities: f.cities.includes(city) ? f.cities.filter((c) => c !== city) : [...f.cities, city],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setProfile({ ...form, entScore: form.entScore ? Number(form.entScore) : null });
    router.push('/diagnosis');
  }

  return (
    <main>
      <StepHeader />
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        <h1 className="font-display text-2xl font-bold">Расскажите о себе</h1>

        <fieldset>
          <legend className="font-semibold mb-2">Класс / статус</legend>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((g) => (
              <button
                type="button"
                key={g.value}
                onClick={() => setForm((f) => ({ ...f, grade: g.value }))}
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  form.grade === g.value ? 'bg-accent text-white border-accent' : 'border-border'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-semibold mb-2">Интересы (выберите один или несколько)</legend>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button
                type="button"
                key={i}
                onClick={() => toggleInterest(i)}
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  form.interests.includes(i) ? 'bg-accent text-white border-accent' : 'border-border'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-semibold mb-2">Ожидаемый балл ЕНТ (если знаете)</legend>
          <input
            type="number"
            min="0"
            max="140"
            value={form.entScore}
            onChange={(e) => setForm((f) => ({ ...f, entScore: e.target.value }))}
            placeholder="например, 110"
            className="w-full border border-border rounded-lg px-3 py-2 bg-white"
          />
        </fieldset>

        <fieldset>
          <legend className="font-semibold mb-2">Бюджет</legend>
          <div className="flex flex-col gap-2">
            {BUDGETS.map((b) => (
              <label key={b.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="budget"
                  checked={form.budget === b.value}
                  onChange={() => setForm((f) => ({ ...f, budget: b.value }))}
                />
                {b.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-semibold mb-2">Предпочитаемый город</legend>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => toggleCity(c)}
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  form.cities.includes(c) ? 'bg-accent text-white border-accent' : 'border-border'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={form.interests.length === 0}
          className="bg-accent text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-40"
        >
          Показать диагностику
        </button>
      </form>
    </main>
  );
}
