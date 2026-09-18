'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useProfile } from '@/lib/ProfileContext';
import { GRADES, BUDGETS } from '@/lib/constants';
import { useAiText } from '@/lib/ai/useAiText';

export default function DiagnosisPage() {
  const { profile, loaded } = useProfile();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

  const templateText = profile
    ? [
        `Вы — ${GRADES.find((g) => g.value === profile.grade)?.label}, интересуетесь: ${profile.interests.join(', ')}.`,
        `Бюджет: ${BUDGETS.find((b) => b.value === profile.budget)?.label}.`,
        profile.entScore ? `Ожидаемый балл ЕНТ: ${profile.entScore}.` : '',
        `Предпочитаемые города: ${profile.cities.join(', ')}.`,
      ]
        .filter(Boolean)
        .join(' ')
    : '';

  const { data: aiText, source: aiSource, loading: aiLoading } = useAiText(
    '/api/ai/diagnosis',
    profile ? { profile, templateText } : null,
    templateText,
    (j) => j.text
  );

  if (!profile) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg via-neutral-50 to-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full" />
          </div>
          <p className="text-neutral-600">Загрузка вашего профиля...</p>
        </div>
      </main>
    );
  }

  const gradeLabel = GRADES.find((g) => g.value === profile.grade)?.label;
  const budgetLabel = BUDGETS.find((b) => b.value === profile.budget)?.label;

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/recommendations');
    }, 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg via-neutral-50 to-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-display-md font-bold text-neutral-900 mb-2">
            Ваша диагностика готова
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Мы проанализировали ваш профиль и подобрали идеальные вузы
          </p>
        </div>

        {/* Персональный разбор профиля (AI, с откатом на шаблон) */}
        <Card size="lg" className="mb-8">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">🤖</span>
            <div className="flex-1">
              <p className="font-semibold text-neutral-900 mb-2">
                Что мы видим в вашем профиле
              </p>
              {aiLoading ? (
                <div className="space-y-2 animate-pulse" aria-hidden="true">
                  <div className="h-3 bg-neutral-200 rounded w-full" />
                  <div className="h-3 bg-neutral-200 rounded w-11/12" />
                  <div className="h-3 bg-neutral-200 rounded w-3/4" />
                </div>
              ) : (
                <p className="text-body-md text-neutral-700 leading-relaxed">{aiText}</p>
              )}
              {aiSource === 'ai' && !aiLoading && (
                <p className="text-body-xs text-neutral-500 mt-2">
                  Текст сгенерирован ИИ на основе ваших ответов. Баллы и сроки берутся из
                  проверенных данных, а не придумываются моделью.
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Основная карточка с информацией */}
        <Card size="lg" className="mb-8 bg-gradient-to-br from-white to-primary-50 border-primary-200">
          <div className="space-y-6">
            {/* Класс/статус */}
            <div className="flex items-start gap-4 pb-6 border-b border-primary-200">
              <div className="text-3xl flex-shrink-0">📚</div>
              <div className="flex-1">
                <p className="text-body-sm text-neutral-600 mb-1">Класс / Статус</p>
                <p className="text-heading-md font-semibold text-neutral-900">
                  {gradeLabel}
                </p>
              </div>
            </div>

            {/* Интересы */}
            <div className="pb-6 border-b border-primary-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">⭐</span>
                <p className="text-body-sm text-neutral-600">Ваши интересы</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <Badge key={interest} variant="primary" size="md">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* ЕНТ балл */}
            {profile.entScore && (
              <div className="pb-6 border-b border-primary-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">📊</span>
                  <p className="text-body-sm text-neutral-600">Ожидаемый балл ЕНТ</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-display-sm font-bold text-primary-500">
                    {profile.entScore}
                  </div>
                  <p className="text-body-sm text-neutral-600">из 140 баллов</p>
                </div>
              </div>
            )}

            {/* Бюджет */}
            <div className="pb-6 border-b border-primary-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">💰</span>
                <p className="text-body-sm text-neutral-600">Тип финансирования</p>
              </div>
              <p className="text-heading-md font-semibold text-neutral-900">
                {budgetLabel}
              </p>
            </div>

            {/* Города */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">📍</span>
                <p className="text-body-sm text-neutral-600">Предпочтительные города</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.cities.map((city) => (
                  <Badge key={city} variant="success" size="md">
                    {city}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Обучение за рубежом */}
            {profile.abroad && (
              <div className="mt-6 pt-6 border-t border-primary-200 bg-warning-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🌍</span>
                  <div>
                    <p className="font-semibold text-neutral-900">Обучение за рубежом</p>
                    <p className="text-body-sm text-neutral-700 mt-1">
                      Мы также покажем международные опции, требующие IELTS/SAT
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Процесс анализа */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-success-500 text-white font-bold mb-3">
              ✓
            </div>
            <p className="font-semibold text-neutral-900 mb-1">Профиль собран</p>
            <p className="text-body-sm text-neutral-600">Все данные загружены</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-success-500 text-white font-bold mb-3">
              ✓
            </div>
            <p className="font-semibold text-neutral-900 mb-1">Анализ выполнен</p>
            <p className="text-body-sm text-neutral-600">Вузы отобраны</p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-500 text-white font-bold mb-3 animate-pulse">
              3
            </div>
            <p className="font-semibold text-neutral-900 mb-1">Рекомендации</p>
            <p className="text-body-sm text-neutral-600">Смотрим сейчас</p>
          </div>
        </div>

        {/* Подсказка */}
        <Card variant="accent" className="mb-12">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-semibold text-neutral-900">Как мы подбираем вузы</p>
              <p className="text-body-sm text-neutral-700 mt-1">
                Мы сопоставляем ваши интересы с направлениями вуза, ваш ожидаемый балл ЕНТ —
                с проходным баллом прошлого года, а также учитываем бюджет и город. Это подбор
                по совпадениям, а не прогноз шансов на поступление.
              </p>
            </div>
          </div>
        </Card>

        {/* Кнопки действия */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/profile')}
            className="order-2 md:order-1"
          >
            ← Вернуться в профиль
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            isLoading={isTransitioning}
            className="order-1 md:order-2"
          >
            Смотреть рекомендации →
          </Button>
        </div>
      </div>
    </main>
  );
}