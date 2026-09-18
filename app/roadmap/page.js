'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useProfile } from '@/lib/ProfileContext';
import { buildRoadmap } from '@/lib/roadmap';

export default function RoadmapPage() {
  const { profile, loaded, roadmapProgress, setRoadmapStep } = useProfile();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

  if (!profile) return null;

  const steps = buildRoadmap(profile);
  const completedCount = Object.values(roadmapProgress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/next-step');
    }, 300);
  };

  // Определяем иконки для разных типов шагов
  const getStepIcon = (title) => {
    if (title.toLowerCase().includes('экзамен') || title.toLowerCase().includes('тест'))
      return '📝';
    if (title.toLowerCase().includes('документ') || title.toLowerCase().includes('анкета'))
      return '📄';
    if (title.toLowerCase().includes('заявк') || title.toLowerCase().includes('регистр'))
      return '✍️';
    if (title.toLowerCase().includes('интервью') || title.toLowerCase().includes('собеседование'))
      return '💬';
    if (title.toLowerCase().includes('подготов'))
      return '📚';
    if (title.toLowerCase().includes('результат') || title.toLowerCase().includes('ответ'))
      return '📬';
    return '🎯';
  };

  // Приоритет задаётся в данных (lib/roadmap.js): 'high' — жёсткий дедлайн, пропустить нельзя.
  // Ключевые слова в описании оставлены как запасной вариант для шагов без явного приоритета.
  const getPriority = (step) => {
    if (step.priority) return step.priority;
    const desc = (step.desc || '').toLowerCase();
    if (desc.includes('обязательно') || desc.includes('критич')) return 'high';
    if (desc.includes('рекомендуется')) return 'medium';
    return 'low';
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg via-neutral-50 to-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🗺️</div>
          <h1 className="text-display-md font-bold text-neutral-900 mb-2">
            Ваш маршрут поступления
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Пошаговый план действий для успешного поступления в выбранный вуз
          </p>
        </div>

        {/* Прогресс */}
        <Card size="lg" variant="accent" className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-body-sm font-semibold text-neutral-700 mb-1">
                Ваш прогресс
              </p>
              <p className="text-heading-lg font-bold text-primary-600">
                {completedCount} из {steps.length} шагов
              </p>
            </div>
            <div className="text-center">
              <div className="text-display-sm font-bold text-primary-500">
                {progressPercent}%
              </div>
              <p className="text-caption text-neutral-600">готово</p>
            </div>
          </div>

          {/* Прогресс бар */}
          <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-success-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </Card>

        {/* Легенда приоритетов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="flex items-center gap-2 text-body-sm">
            <div className="w-3 h-3 rounded-full bg-error-500" />
            <span className="text-neutral-700">Критично</span>
          </div>
          <div className="flex items-center gap-2 text-body-sm">
            <div className="w-3 h-3 rounded-full bg-warning-500" />
            <span className="text-neutral-700">Важно</span>
          </div>
          <div className="flex items-center gap-2 text-body-sm">
            <div className="w-3 h-3 rounded-full bg-neutral-300" />
            <span className="text-neutral-700">Дополнительно</span>
          </div>
        </div>

        {/* Timeline шагов */}
        <div className="space-y-4 mb-12">
          {steps.map((step, index) => {
            const isCompleted = !!roadmapProgress[step.id];
            const icon = getStepIcon(step.title);
            const priority = getPriority(step);

            const priorityConfig = {
              high: { color: 'error', label: 'Критично' },
              medium: { color: 'warning', label: 'Важно' },
              low: { color: 'neutral', label: 'Дополнительно' },
            };

            const config = priorityConfig[priority];

            return (
              <div key={step.id} className="relative">
                {/* Линия между шагами */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute left-7 top-20 w-1 h-12 ${
                      isCompleted ? 'bg-success-400' : 'bg-neutral-200'
                    }`}
                  />
                )}

                <Card
                  className={`transition-all duration-300 ${
                    isCompleted
                      ? 'bg-success-50 border-success-200'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Чекбокс */}
                    <div className="flex-shrink-0 pt-1">
                      <label className="flex items-center justify-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={(e) =>
                            setRoadmapStep(step.id, e.target.checked)
                          }
                          className="w-6 h-6 rounded-full border-2 border-current appearance-none cursor-pointer transition-all checked:bg-success-500 checked:border-success-500"
                          style={{
                            accentColor: '#22C55E',
                          }}
                        />
                      </label>
                    </div>

                    {/* Контент */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <div className="flex items-start gap-2 flex-1">
                          <span className="text-2xl flex-shrink-0">{icon}</span>
                          <div className="flex-1">
                            <h3
                              className={`text-heading-sm font-bold ${
                                isCompleted
                                  ? 'text-neutral-600 line-through'
                                  : 'text-neutral-900'
                              }`}
                            >
                              {index + 1}. {step.title}
                            </h3>

                            {/* Срок */}
                            <p className="text-body-xs text-neutral-600 mt-1">
                              ⏰ {step.due}
                            </p>
                          </div>
                        </div>

                        {/* Бейджи */}
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={
                              priority === 'high'
                                ? 'error'
                                : priority === 'medium'
                                  ? 'warning'
                                  : 'primary'
                            }
                            size="sm"
                          >
                            {config.label}
                          </Badge>

                          {isCompleted && (
                            <Badge variant="success" size="sm">
                              ✓ Готово
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Описание */}
                      <p
                        className={`text-body-sm ${
                          isCompleted
                            ? 'text-neutral-600'
                            : 'text-neutral-700'
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card size="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-heading-md font-bold text-success-600">
                {completedCount}
              </p>
              <p className="text-body-sm text-neutral-600 mt-1">
                Выполнено
              </p>
            </div>
          </Card>

          <Card size="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">⏳</div>
              <p className="text-heading-md font-bold text-primary-600">
                {steps.length - completedCount}
              </p>
              <p className="text-body-sm text-neutral-600 mt-1">
                В процессе
              </p>
            </div>
          </Card>

          <Card size="lg">
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-heading-md font-bold text-neutral-600">
                {progressPercent}%
              </p>
              <p className="text-body-sm text-neutral-600 mt-1">
                Завершено
              </p>
            </div>
          </Card>
        </div>

        {/* Совет */}
        <Card variant="accent" className="mb-12">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-semibold text-neutral-900">Советы для успеха</p>
              <ul className="text-body-sm text-neutral-700 mt-2 space-y-1">
                <li>✓ Отмечайте шаги по мере их выполнения</li>
                <li>✓ Приоритизируйте критичные шаги (красные)</li>
                <li>✓ Планируйте время заранее, не откладывайте на последний момент</li>
                <li>✓ Свяжитесь с вузом, если что-то непонятно</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Кнопки */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push('/compare')}
            className="order-2 md:order-1"
          >
            ← Вернуться к сравнению
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleContinue}
            isLoading={isTransitioning}
            className="order-1 md:order-2"
          >
            Финальные советы →
          </Button>
        </div>
      </div>
    </main>
  );
}