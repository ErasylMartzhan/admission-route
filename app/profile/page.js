'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
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
    const newErrors = {};

    if (form.interests.length === 0) {
      newErrors.interests = 'Выберите хотя бы один интерес';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setProfile({ ...form, entScore: form.entScore ? Number(form.entScore) : null });
    
    setTimeout(() => {
      router.push('/diagnosis');
    }, 300);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg via-neutral-50 to-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        {/* Заголовок */}
        <div className="mb-12">
          <h1 className="text-display-md font-bold text-neutral-900 mb-2">
            Расскажите о себе
          </h1>
          <p className="text-body-lg text-neutral-600">
            Эта информация поможет найти идеальные вузы и программы именно для вас
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 mb-12">
          {/* 1. Класс / статус */}
          <Card size="lg">
            <h3 className="text-heading-md font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>📚</span> Класс / статус
            </h3>
            <div className="flex flex-wrap gap-3">
              {GRADES.map((g) => (
                <button
                  type="button"
                  key={g.value}
                  onClick={() => setForm((f) => ({ ...f, grade: g.value }))}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-250 text-sm ${
                    form.grade === g.value
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </Card>

          {/* 2. Интересы */}
          <Card size="lg">
            <h3 className="text-heading-md font-semibold text-neutral-900 mb-2 flex items-center gap-2">
              <span>⭐</span> Интересы
            </h3>
            <p className="text-body-sm text-neutral-600 mb-4">
              Выберите один или несколько направлений
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              {INTERESTS.map((i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => toggleInterest(i)}
                  className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-250 text-sm ${
                    form.interests.includes(i)
                      ? 'bg-primary-500 text-white shadow-md ring-2 ring-primary-200'
                      : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>

            {errors.interests && (
              <p className="text-error-500 text-body-sm">⚠️ {errors.interests}</p>
            )}

            <div className="mt-4 pt-4 border-t border-neutral-200">
              <p className="text-caption text-neutral-600">
                ✓ Выбрано: <span className="font-semibold text-primary-600">{form.interests.length}</span>
              </p>
            </div>
          </Card>

          {/* 3. ЕНТ балл */}
          <Card size="lg">
            <h3 className="text-heading-md font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>📊</span> Ожидаемый балл ЕНТ
            </h3>

            <Input
              type="number"
              min="0"
              max="140"
              value={form.entScore}
              onChange={(e) => setForm((f) => ({ ...f, entScore: e.target.value }))}
              placeholder="например, 110"
              helperText="Если знаете примерный результат, укажите для точнее рекомендаций"
            />

            {form.entScore && (
              <div className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-body-sm text-primary-900">
                  💡 Ваш прогноз: <span className="font-semibold">{form.entScore} баллов</span>
                </p>
              </div>
            )}
          </Card>

          {/* 4. Бюджет */}
          <Card size="lg">
            <h3 className="text-heading-md font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>💰</span> Предпочтения по финансированию
            </h3>

            <div className="space-y-3">
              {BUDGETS.map((b) => (
                <label
                  key={b.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    form.budget === b.value
                      ? 'bg-primary-50 border-primary-500'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={b.value}
                    checked={form.budget === b.value}
                    onChange={() => setForm((f) => ({ ...f, budget: b.value }))}
                    className="w-5 h-5 mt-0.5 text-primary-500 cursor-pointer"
                  />
                  <div>
                    <p className="font-medium text-neutral-900">{b.label}</p>
                    {b.description && (
                      <p className="text-body-sm text-neutral-600 mt-0.5">{b.description}</p>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* 5. Города */}
          <Card size="lg">
            <h3 className="text-heading-md font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <span>📍</span> Предпочтительные города
            </h3>
            <p className="text-body-sm text-neutral-600 mb-4">
              Выберите один или несколько городов
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {CITIES.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => toggleCity(c)}
                  className={`px-3 py-2.5 rounded-lg font-medium transition-all duration-250 text-sm ${
                    form.cities.includes(c)
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200">
              <p className="text-caption text-neutral-600">
                ✓ Выбрано: <span className="font-semibold text-primary-600">{form.cities.length}</span>
              </p>
            </div>
          </Card>

          {/* 6. Обучение за рубежом */}
          <Card size="lg" variant="accent">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.abroad}
                onChange={(e) => setForm((f) => ({ ...f, abroad: e.target.checked }))}
                className="w-5 h-5 mt-1 text-primary-500 rounded cursor-pointer"
              />
              <div>
                <p className="font-medium text-neutral-900">
                  🌍 Рассматриваю обучение за рубежом
                </p>
                <p className="text-body-sm text-neutral-600 mt-1">
                  Поступление за рубеж обычно не через ЕНТ (требуется IELTS, SAT, эссе или экзамен вуза)
                </p>
              </div>
            </label>

            {form.abroad && (
              <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
                <p className="text-body-sm text-warning-900">
                  ℹ️ Мы будем отмечать иностранные опции отдельно в рекомендациях
                </p>
              </div>
            )}
          </Card>

          {/* Кнопки действия */}
          <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.back()}
              className="order-2 md:order-1"
            >
              ← Назад
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={form.interests.length === 0}
              isLoading={isSubmitting}
              className="order-1 md:order-2"
            >
              Показать диагностику →
            </Button>
          </div>
        </form>

        {/* Бонус: подсказка */}
        <div className="mt-16 p-6 bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl">
          <h4 className="font-semibold text-neutral-900 mb-2">💡 Совет</h4>
          <p className="text-body-sm text-neutral-700">
            Чем точнее вы заполните анкету, тем более релевантные рекомендации получите.
            Если вы ещё не решили про интересы — выбирайте те, которые вас привлекают сейчас.
          </p>
        </div>
      </div>
    </main>
  );
}