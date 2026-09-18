'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Icon from '@/components/Icon';
import SourceNote from '@/components/SourceNote';
import { SkeletonText } from '@/components/Skeleton';
import { useProfile } from '@/lib/ProfileContext';
import { buildRoadmap } from '@/lib/roadmap';

const priorityConfig = {
  high: { variant: 'error', label: 'Критично' },
  medium: { variant: 'warning', label: 'Важно' },
  low: { variant: 'neutral', label: 'Дополнительно' },
};

function getStepIcon(title) {
  const t = title.toLowerCase();
  if (t.includes('экзамен') || t.includes('тест')) return 'target';
  if (t.includes('документ') || t.includes('анкета')) return 'document';
  if (t.includes('заявк') || t.includes('регистр')) return 'list';
  if (t.includes('интервью') || t.includes('собеседование')) return 'user';
  if (t.includes('подготов')) return 'graduation';
  if (t.includes('результат') || t.includes('ответ')) return 'flag';
  return 'flag';
}

// Приоритет задаётся в данных (lib/roadmap.js): 'high' — жёсткий дедлайн, пропустить нельзя.
// Ключевые слова в описании оставлены как запасной вариант для шагов без явного приоритета.
function getPriority(step) {
  if (step.priority) return step.priority;
  const desc = (step.desc || '').toLowerCase();
  if (desc.includes('обязательно') || desc.includes('критич')) return 'high';
  if (desc.includes('рекомендуется')) return 'medium';
  return 'low';
}

export default function RoadmapPage() {
  const { profile, loaded, roadmapProgress, setRoadmapStep } = useProfile();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

  if (!profile) {
    return (
      <main className="min-h-screen bg-bg">
        <StepHeader />
        <div className="container-md py-12">
          <Card padding="lg">
            <SkeletonText lines={5} />
          </Card>
        </div>
      </main>
    );
  }

  const steps = buildRoadmap(profile);
  const completedCount = Object.values(roadmapProgress).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => router.push('/next-step'), 300);
  };

  return (
    <main className="min-h-screen bg-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        <Card padding="lg" className="mb-6">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="text-caption font-semibold uppercase tracking-wider text-ink-muted mb-1">
                Прогресс подготовки
              </p>
              <p className="text-heading-lg font-bold text-ink">
                {completedCount} из {steps.length} шагов
              </p>
            </div>
            <p className="text-display-sm font-bold text-primary-600 leading-none">
              {progressPercent}%
            </p>
          </div>

          <div
            className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden"
            role="progressbar"
            aria-valuenow={completedCount}
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-label="Выполнено шагов плана"
          >
            <div
              className="bg-primary-500 h-full rounded-full transition-all duration-slow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-body-sm text-ink-soft mt-4">
            Отмечайте шаги по мере выполнения — прогресс сохраняется в вашем браузере.
          </p>
        </Card>

        <ol className="space-y-3 mb-8">
          {steps.map((step, index) => {
            const isCompleted = !!roadmapProgress[step.id];
            const priority = getPriority(step);
            const config = priorityConfig[priority];

            return (
              <li key={step.id}>
                <Card
                  padding="md"
                  variant={isCompleted ? 'success' : 'default'}
                  className="transition-colors duration-base"
                >
                  <label className="flex gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={(e) => setRoadmapStep(step.id, e.target.checked)}
                      className="w-6 h-6 mt-0.5 flex-shrink-0 rounded accent-success-500 cursor-pointer focus-ring"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span
                            className={`flex-shrink-0 mt-0.5 ${
                              isCompleted ? 'text-success-600' : 'text-ink-muted'
                            }`}
                          >
                            <Icon
                              name={isCompleted ? 'checkCircle' : getStepIcon(step.title)}
                              className="w-5 h-5"
                            />
                          </span>
                          <div className="min-w-0">
                            <h2
                              className={`text-heading-md font-semibold ${
                                isCompleted ? 'text-ink-muted line-through' : 'text-ink'
                              }`}
                            >
                              {index + 1}. {step.title}
                            </h2>
                            <p className="flex items-center gap-1.5 text-body-xs text-ink-muted mt-1">
                              <Icon name="clock" className="w-3.5 h-3.5 flex-shrink-0" />
                              {step.due}
                            </p>
                          </div>
                        </div>

                        <Badge variant={config.variant} size="sm" className="self-start flex-shrink-0">
                          {config.label}
                        </Badge>
                      </div>

                      <p className="text-body-sm text-ink-soft mt-2">{step.desc}</p>
                    </div>
                  </label>
                </Card>
              </li>
            );
          })}
        </ol>

        <SourceNote className="mb-8">
          Сроки в плане — ориентировочные и демонстрационные: точные даты приёма документов
          и экзаменов публикует вуз и НЦТ. Сверяйтесь с официальным календарём.
        </SourceNote>

        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3">
          <Button
            variant="ghost"
            size="lg"
            icon="arrowLeft"
            iconPosition="left"
            onClick={() => router.push('/compare')}
          >
            Назад к сравнению
          </Button>
          <Button
            variant="primary"
            size="lg"
            icon="arrowRight"
            onClick={handleContinue}
            isLoading={isTransitioning}
            loadingText="Открываем…"
          >
            С чего начать прямо сейчас
          </Button>
        </div>
      </div>
    </main>
  );
}
