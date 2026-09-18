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

export default function NextStepPage() {
  const { profile, loaded, roadmapProgress, setRoadmapStep } = useProfile();
  const router = useRouter();
  const [isMarking, setIsMarking] = useState(false);

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
            <SkeletonText lines={4} />
          </Card>
        </div>
      </main>
    );
  }

  const steps = buildRoadmap(profile);
  const next = steps.find((s) => !roadmapProgress[s.id]);
  const completedCount = Object.values(roadmapProgress).filter(Boolean).length;
  const totalSteps = steps.length;

  const handleMarkComplete = () => {
    setIsMarking(true);
    setRoadmapStep(next.id, true);
    setTimeout(() => setIsMarking(false), 300);
  };

  if (!next) {
    return (
      <main className="min-h-screen bg-bg">
        <StepHeader />

        <div className="container-md py-8 md:py-12">
          <Card variant="success" padding="lg" className="mb-6">
            <div className="flex items-start gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-success-500 text-ink-inverse flex-shrink-0">
                <Icon name="checkCircle" className="w-6 h-6" />
              </span>
              <div>
                <h2 className="text-display-sm font-bold text-ink">
                  План пройден полностью
                </h2>
                <p className="text-body-md text-ink-soft mt-2">
                  Все {totalSteps} шагов отмечены. Подготовительная часть закончена — дальше
                  результат зависит от приёмной комиссии, а не от плана.
                </p>
              </div>
            </div>
          </Card>

          <Card padding="lg" className="mb-6">
            <h2 className="text-heading-lg font-semibold text-ink mb-3">Что делать дальше</h2>
            <ul className="space-y-2.5">
              {[
                'Держите связь с приёмной комиссией выбранного вуза.',
                'Следите за публикацией результатов на официальном сайте.',
                'Соберите документы для зачисления заранее, не в последний день.',
                'Уточните вопрос с общежитием — места распределяют отдельно.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="text-success-600 flex-shrink-0 mt-0.5">
                    <Icon name="check" className="w-4 h-4" strokeWidth={2} />
                  </span>
                  <span className="text-body-md text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="flex flex-col-reverse md:flex-row md:justify-between gap-3">
            <Button
              variant="ghost"
              size="lg"
              icon="arrowLeft"
              iconPosition="left"
              onClick={() => router.push('/roadmap')}
            >
              Вернуться к плану
            </Button>
            <Button
              variant="primary"
              size="lg"
              icon="refresh"
              onClick={() => router.push('/profile')}
            >
              Пройти маршрут заново
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const stepNumber = steps.findIndex((s) => s.id === next.id) + 1;

  return (
    <main className="min-h-screen bg-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <Badge variant="primary" icon="flag">
            Шаг {stepNumber} из {totalSteps}
          </Badge>
          <Badge variant="neutral">Отмечено выполненными: {completedCount}</Badge>
        </div>

        <Card padding="lg" className="mb-6">
          <div className="flex items-start gap-4 pb-5 border-b border-line">
            <span className="flex items-center justify-center w-12 h-12 rounded-md bg-primary-50 text-primary-600 flex-shrink-0">
              <Icon name={getStepIcon(next.title)} className="w-6 h-6" />
            </span>
            <div className="min-w-0">
              <h2 className="text-display-sm font-bold text-ink">{next.title}</h2>
              <p className="flex items-center gap-1.5 text-body-sm font-medium text-primary-600 mt-2">
                <Icon name="clock" className="w-4 h-4 flex-shrink-0" />
                {next.due}
              </p>
            </div>
          </div>

          <p className="text-body-lg text-ink-soft leading-relaxed py-5">{next.desc}</p>

          <div className="rounded-md border border-warning-200 bg-warning-50 p-4 mb-6">
            <h3 className="flex items-center gap-2 text-body-sm font-semibold text-warning-900 mb-2">
              <Icon name="alert" className="w-4 h-4 flex-shrink-0" />
              О чём легко забыть
            </h3>
            <ul className="text-body-sm text-warning-900 space-y-1">
              <li>Проверьте срок на официальном сайте — он мог сдвинуться.</li>
              <li>Сохраняйте копии всех поданных документов.</li>
              <li>Непонятный пункт лучше уточнить в приёмной комиссии, чем угадать.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon="check"
              iconPosition="left"
              onClick={handleMarkComplete}
              isLoading={isMarking}
              loadingText="Отмечаем…"
            >
              Я выполнил этот шаг
            </Button>
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              icon="arrowLeft"
              iconPosition="left"
              onClick={() => router.push('/roadmap')}
            >
              Вернуться к плану
            </Button>
          </div>
        </Card>

        <SourceNote>
          Срок этого шага — ориентировочный и демонстрационный. Официальные даты публикуют вуз
          и НЦТ.
        </SourceNote>
      </div>
    </main>
  );
}
