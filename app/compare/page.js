'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useProfile } from '@/lib/ProfileContext';
import { universities } from '@/lib/data/universities';

export default function ComparePage() {
  const { profile, compareIds, loaded } = useProfile();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

  if (!profile) return null;

  const selected = universities.filter((u) => compareIds.includes(u.id));

  // Если выбрано менее 2 вузов
  if (selected.length < 2) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-bg via-neutral-50 to-bg">
        <StepHeader />

        <div className="container-md py-8 md:py-12">
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">📊</div>
            <h1 className="text-display-md font-bold text-neutral-900 mb-3">
              Сравнение вузов
            </h1>
            <p className="text-body-lg text-neutral-600">
              Выберите два вуза для детального сравнения
            </p>
          </div>

          <Card size="lg" variant="accent" className="max-w-md mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">📌</div>
              <h2 className="text-heading-md font-semibold text-neutral-900 mb-2">
                Недостаточно выбрано
              </h2>
              <p className="text-body-md text-neutral-700 mb-6">
                Для сравнения нужны минимум 2 вуза. Вы выбрали:{' '}
                <span className="font-bold text-primary-600">{selected.length}</span>
              </p>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => router.push('/recommendations')}
              >
                ← Вернуться к рекомендациям
              </Button>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  // Данные для сравнения
  const comparisonRows = [
    {
      label: 'Локация',
      icon: '📍',
      get: (u) =>
        u.country !== 'Казахстан' ? `${u.city}, ${u.country}` : u.city,
    },
    {
      label: 'Грант / стипендия',
      icon: '🎓',
      get: (u) => (u.grantAvailable ? 'Доступен' : 'Нет'),
      highlight: (u) => u.grantAvailable,
    },
    {
      label: 'Стоимость обучения (год)',
      icon: '💰',
      get: (u) =>
        u.tuitionFromKzt != null
          ? `${u.tuitionFromKzt.toLocaleString('ru-RU')} ₸`
          : 'Уточнить у вуза',
    },
    {
      label: 'Проходной балл ЕНТ',
      icon: '📈',
      get: (u) =>
        u.entThreshold != null
          ? `~${u.entThreshold} (${u.isDemoData ? 'демо' : '2025'})`
          : 'Не через ЕНТ',
    },
    {
      label: 'Доступные направления',
      icon: '🎯',
      get: (u) => u.directions.join(', '),
    },
  ];

  const handleContinue = () => {
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
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-display-md font-bold text-neutral-900 mb-2">
            Сравнение вузов
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Подробное сравнение всех важных параметров для вашего выбора
          </p>
        </div>

        {/* Карточки вузов сверху (мобильный вид) */}
        <div className="grid grid-cols-1 md:hidden gap-4 mb-8">
          {selected.map((uni) => (
            <Card key={uni.id} size="lg" variant="accent">
              <h2 className="text-heading-md font-bold text-neutral-900 mb-1">
                {uni.name}
              </h2>
              <p className="text-body-md text-neutral-600">
                📍 {uni.city}
                {uni.country !== 'Казахстан' ? `, ${uni.country}` : ''}
              </p>
              {uni.entThreshold && (
                <div className="mt-3 p-2 bg-primary-50 rounded">
                  <p className="text-body-sm text-primary-900">
                    ЕНТ проходной: ~{uni.entThreshold}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Таблица сравнения для десктопа */}
        <div className="hidden md:block mb-12 overflow-x-auto">
          <div className="min-w-max">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 font-display text-heading-md font-bold text-neutral-900 bg-primary-50 border border-primary-200 rounded-tl-lg">
                    Параметр
                  </th>
                  {selected.map((uni, idx) => (
                    <th
                      key={uni.id}
                      className={`text-left p-4 font-display text-heading-md font-bold text-neutral-900 bg-primary-50 border border-primary-200 ${
                        idx === selected.length - 1 ? 'rounded-tr-lg' : ''
                      }`}
                    >
                      {uni.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIdx) => (
                  <tr
                    key={row.label}
                    className={`${
                      rowIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
                    } border border-neutral-200`}
                  >
                    <td className="p-4 font-semibold text-neutral-900">
                      <span className="mr-2">{row.icon}</span>
                      {row.label}
                    </td>
                    {selected.map((uni) => {
                      const value = row.get(uni);
                      const isHighlighted = row.highlight && row.highlight(uni);

                      return (
                        <td
                          key={uni.id}
                          className={`p-4 text-neutral-700 ${
                            isHighlighted ? 'bg-success-50 font-semibold text-success-700' : ''
                          }`}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Мобильный вид - карточки параметров */}
        <div className="md:hidden space-y-4 mb-12">
          {comparisonRows.map((row) => (
            <Card key={row.label} size="lg">
              <h3 className="text-heading-sm font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <span>{row.icon}</span>
                {row.label}
              </h3>

              <div className="space-y-3">
                {selected.map((uni) => {
                  const value = row.get(uni);
                  const isHighlighted = row.highlight && row.highlight(uni);

                  return (
                    <div
                      key={uni.id}
                      className={`p-3 rounded-lg ${
                        isHighlighted
                          ? 'bg-success-50 border border-success-200'
                          : 'bg-neutral-100'
                      }`}
                    >
                      <p className="text-body-xs text-neutral-600 mb-1 font-medium">
                        {uni.name}
                      </p>
                      <p
                        className={`text-body-md font-semibold ${
                          isHighlighted ? 'text-success-700' : 'text-neutral-900'
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Рекомендация вузов */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {selected.map((uni) => (
            <Card key={uni.id} size="lg" variant="accent">
              <div className="mb-4 pb-4 border-b border-primary-200">
                <h3 className="text-heading-md font-bold text-neutral-900">
                  {uni.name}
                </h3>
                <p className="text-body-md text-neutral-600 mt-1">
                  📍 {uni.city}
                  {uni.country !== 'Казахстан' ? `, ${uni.country}` : ''}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-caption font-semibold text-neutral-700 mb-2">
                    ✨ Преимущества:
                  </p>
                  {uni.reasons ? (
                    <ul className="space-y-1">
                      {uni.reasons.map((reason, i) => (
                        <li key={i} className="text-body-sm text-neutral-700 flex gap-2">
                          <span className="text-primary-500">✓</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-body-sm text-neutral-600">
                      Ознакомьтесь с полной информацией на сайте вуза
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Совет */}
        <Card variant="accent" className="mb-12">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-semibold text-neutral-900">Как выбрать</p>
              <p className="text-body-sm text-neutral-700 mt-1">
                Обратите внимание на:
              </p>
              <ul className="text-body-sm text-neutral-700 mt-2 space-y-1">
                <li>• Проходной балл ЕНТ (он реалистичен для вас?)</li>
                <li>• Стоимость обучения и доступность грантов</li>
                <li>• Качество программ в ваших интересах</li>
                <li>• Локация и условия проживания</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Кнопки */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/recommendations')}
            className="order-2 md:order-1"
          >
            ← Вернуться к рекомендациям
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            isLoading={isTransitioning}
            className="order-1 md:order-2"
          >
            Построить roadmap →
          </Button>
        </div>
      </div>
    </main>
  );
}