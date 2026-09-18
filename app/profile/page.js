'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Chip from '@/components/Chip';
import Icon from '@/components/Icon';
import { useProfile } from '@/lib/ProfileContext';
import { INTERESTS, CITIES, BUDGETS, GRADES } from '@/lib/constants';

const EMPTY_FORM = {
  grade: '11',
  interests: [],
  entScore: '',
  budget: 'flexible',
  cities: ['Любой город'],
  abroad: false,
};

function Section({ icon, title, hint, children }) {
  return (
    <Card padding="lg">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex items-center justify-center w-9 h-9 rounded-md bg-primary-50 text-primary-600 flex-shrink-0">
          <Icon name={icon} className="w-5 h-5" />
        </span>
        <div>
          <h2 className="text-heading-md font-semibold text-ink">{title}</h2>
          {hint && <p className="text-body-sm text-ink-soft mt-1">{hint}</p>}
        </div>
      </div>
      {children}
    </Card>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { profile, loaded, setProfile } = useProfile();
  const [form, setForm] = useState(profile || EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (loaded && profile) setForm(profile);
  }, [loaded]);

  function toggleInterest(interest) {
    setErrors({});
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
      cities: f.cities.includes(city)
        ? f.cities.filter((c) => c !== city)
        : [...f.cities, city],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.interests.length === 0) {
      setErrors({ interests: 'Выберите хотя бы одно направление — на нём строится весь подбор' });
      return;
    }

    setIsSubmitting(true);
    setProfile({ ...form, entScore: form.entScore ? Number(form.entScore) : null });

    setTimeout(() => {
      router.push('/diagnosis');
    }, 300);
  }

  return (
    <main className="min-h-screen bg-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Section icon="graduation" title="Класс или статус">
            <div className="flex flex-wrap gap-2.5">
              {GRADES.map((g) => (
                <Chip
                  key={g.value}
                  selected={form.grade === g.value}
                  onClick={() => setForm((f) => ({ ...f, grade: g.value }))}
                >
                  {g.label}
                </Chip>
              ))}
            </div>
          </Section>

          <Section
            icon="star"
            title="Интересы"
            hint="Выберите одно или несколько направлений — это основной сигнал для подбора."
          >
            <div className="flex flex-wrap gap-2.5">
              {INTERESTS.map((i) => (
                <Chip
                  key={i}
                  selected={form.interests.includes(i)}
                  onClick={() => toggleInterest(i)}
                >
                  {i}
                </Chip>
              ))}
            </div>

            {errors.interests && (
              <p className="flex items-center gap-1.5 text-body-sm text-error-600 mt-4" role="alert">
                <Icon name="alert" className="w-4 h-4 flex-shrink-0" />
                {errors.interests}
              </p>
            )}

            <p className="text-body-xs text-ink-muted mt-4 pt-4 border-t border-line">
              Выбрано направлений: <span className="font-semibold text-ink">{form.interests.length}</span>
            </p>
          </Section>

          <Section
            icon="target"
            title="Ожидаемый балл ЕНТ"
            hint="Необязательно. Если знаете примерный результат — подбор будет точнее."
          >
            <Input
              type="number"
              min="0"
              max="140"
              inputMode="numeric"
              value={form.entScore}
              onChange={(e) => setForm((f) => ({ ...f, entScore: e.target.value }))}
              placeholder="например, 110"
              hint="Максимум — 140 баллов. Оценку можно уточнить позже."
            />
          </Section>

          <Section icon="wallet" title="Финансирование">
            <div className="space-y-2.5">
              {BUDGETS.map((b) => (
                <label
                  key={b.value}
                  className={`flex items-start gap-3 min-h-tap p-3.5 rounded-md border cursor-pointer
                    transition-all duration-base
                    ${
                      form.budget === b.value
                        ? 'bg-primary-50 border-primary-500'
                        : 'bg-surface border-line-strong hover:border-primary-300 hover:bg-primary-50/40'
                    }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={b.value}
                    checked={form.budget === b.value}
                    onChange={() => setForm((f) => ({ ...f, budget: b.value }))}
                    className="w-5 h-5 mt-0.5 accent-primary-500 cursor-pointer focus-ring rounded-full"
                  />
                  <span className="text-body-md font-medium text-ink">{b.label}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section icon="pin" title="Города" hint="Можно выбрать несколько.">
            <div className="flex flex-wrap gap-2.5">
              {CITIES.map((c) => (
                <Chip key={c} selected={form.cities.includes(c)} onClick={() => toggleCity(c)}>
                  {c}
                </Chip>
              ))}
            </div>
          </Section>

          <Card variant="muted" padding="lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.abroad}
                onChange={(e) => setForm((f) => ({ ...f, abroad: e.target.checked }))}
                className="w-5 h-5 mt-0.5 accent-primary-500 rounded cursor-pointer focus-ring"
              />
              <span>
                <span className="flex items-center gap-2 text-body-md font-medium text-ink">
                  <Icon name="globe" className="w-4 h-4 text-ink-soft" />
                  Рассматриваю обучение за рубежом
                </span>
                <span className="block text-body-sm text-ink-soft mt-1">
                  Поступление за рубеж обычно идёт не через ЕНТ: нужны IELTS, SAT, эссе или
                  экзамен вуза. Такие варианты будем помечать отдельно.
                </span>
              </span>
            </label>
          </Card>

          <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3 pt-2">
            <Button variant="ghost" size="lg" icon="arrowLeft" iconPosition="left" onClick={() => router.back()}>
              Назад
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon="arrowRight"
              disabled={form.interests.length === 0}
              isLoading={isSubmitting}
              loadingText="Готовим разбор…"
            >
              Показать диагностику
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
