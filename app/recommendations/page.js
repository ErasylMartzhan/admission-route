'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useProfile } from '@/lib/ProfileContext';
import { universities } from '@/lib/data/universities';
import { recommend } from '@/lib/recommend';

export default function RecommendationsPage() {
  const { profile, loaded, compareIds, toggleCompare } = useProfile();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

  if (!profile) return null;

  const results = recommend(profile, universities, 3);

  const handleCompare = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/compare');
    }, 300);
  };

  const handleRoadmap = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/roadmap');
    }, 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg via-neutral-50 to-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">⭐</div>
          <h1 className="text-display-md font-bold text-neutral-900 mb-3">
            Рекомендованные вузы
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            На основе вашего профиля мы подобрали {results.length} лучших вариантов.
            Выберите до двух для детального сравнения.
          </p>
        </div>

        {/* Счётчик выбора */}
        {compareIds.length > 0 && (
          <div className="mb-8 p-4 bg-primary-50 border border-primary-200 rounded-xl">
            <p className="text-center text-body-md text-primary-900">
              📌 Выбрано для сравнения: <span className="font-bold">{compareIds.length}</span>/2
            </p>
          </div>
        )}

        {/* Список вузов */}
        <div className="space-y-4 md:space-y-6 mb-12">
          {results.map((uni, index) => {
            const isSelected = compareIds.includes(uni.id);

            return (
              <Card
                key={uni.id}
                variant={isSelected ? 'accent' : 'default'}
                className={`transition-all duration-300 ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
              >
                {/* Заголовок и кнопка */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4 pb-4 border-b border-neutral-200">
                  <div className="flex-1">
                    {/* Рейтинг/позиция */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="primary" size="sm">
                        {index + 1}. Рекомендация
                      </Badge>
                      {uni.isAbroad && (
                        <Badge variant="warning" size="sm">
                          🌍 Международный
                        </Badge>
                      )}
                    </div>

                    {/* Название вуза */}
                    <h2 className="text-heading-lg font-bold text-neutral-900">
                      {uni.name}
                    </h2>

                    {/* Локация */}
                    <p className="text-body-md text-neutral-600 mt-2">
                      📍 {uni.city}
                      {uni.isAbroad ? `, ${uni.country}` : ''}
                    </p>
                  </div>

                  {/* Кнопка выбора */}
                  <button
                    onClick={() => toggleCompare(uni.id)}
                    disabled={compareIds.length >= 2 && !isSelected}
                    className={`
                      px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-250 whitespace-nowrap
                      ${
                        isSelected
                          ? 'bg-primary-500 text-white shadow-md'
                          : compareIds.length >= 2
                            ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                            : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200'
                      }
                    `}
                  >
                    {isSelected ? '✓ Выбрано' : 'Сравнить'}
                  </button>
                </div>

                {/* Причины рекомендации */}
                <div className="mb-4">
                  <p className="text-body-sm font-semibold text-neutral-900 mb-3">
                    ✨ Почему мы рекомендуем:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {uni.reasons.map((reason, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2 bg-primary-50 rounded-lg"
                      >
                        <span className="text-primary-500 font-bold flex-shrink-0">✓</span>
                        <p className="text-body-sm text-neutral-700">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Дополнительная информация */}
                <div className="pt-4 border-t border-neutral-200">
                  {uni.isAbroad ? (
                    <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                      <p className="text-body-sm text-warning-900">
                        <span className="font-semibold">🌍 Обучение за рубежом:</span> {uni.admissionNote}
                      </p>
                    </div>
                  ) : uni.isDemoData ? (
                    <p className="text-body-xs text-neutral-600">
                      ℹ️ Демонстрационные данные — уточните актуальные условия на сайте вуза.
                    </p>
                  ) : (
                    <p className="text-body-xs text-neutral-600">
                      📌 Проходной балл на 2025 год. Может измениться —{' '}
                      <a
                        href={uni.source}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary-500 font-semibold hover:underline"
                      >
                        источник
                      </a>
                      {uni.sourceNote ? `. ${uni.sourceNote}` : ''}
                    </p>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Кнопки действия */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <Button
            type="secondary"
            size="lg"
            onClick={() => router.push('/diagnosis')}
            className="order-2 md:order-1"
          >
            ← Назад к диагностике
          </Button>

          <Button
            type="primary"
            size="lg"
            onClick={handleCompare}
            disabled={compareIds.length < 2}
            isLoading={isTransitioning && compareIds.length >= 2}
            className="order-1 md:order-2"
          >
            Сравнить {compareIds.length}/2 →
          </Button>

          <Button
            type="secondary"
            size="lg"
            onClick={handleRoadmap}
            variant="ghost"
            className="order-3 md:order-3"
          >
            Сразу к roadmap
          </Button>
        </div>

        {/* Подсказка */}
        <Card variant="accent">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-semibold text-neutral-900">Совет</p>
              <p className="text-body-sm text-neutral-700 mt-1">
                Выберите 2 вуза для детального сравнения условий поступления, программ и стоимости.
                Это поможет вам выбрать оптимальный вариант.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}