'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useProfile } from '@/lib/ProfileContext';
import { buildRoadmap } from '@/lib/roadmap';

export default function NextStepPage() {
  const { profile, loaded, roadmapProgress, setRoadmapStep } = useProfile();
  const router = useRouter();
  const [isMarking, setIsMarking] = useState(false);

  useEffect(() => {
    if (loaded && !profile) {
      router.replace('/profile');
    }
  }, [loaded, profile, router]);

  if (!profile) return null;

  const steps = buildRoadmap(profile);
  const next = steps.find((s) => !roadmapProgress[s.id]);
  const completedCount = Object.values(roadmapProgress).filter(Boolean).length;
  const totalSteps = steps.length;

  const handleMarkComplete = () => {
    setIsMarking(true);
    setRoadmapStep(next.id, true);
    setTimeout(() => {
      setIsMarking(false);
    }, 300);
  };

  // Финальный экран - все шаги выполнены
  if (!next) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-success-50 via-bg to-success-50 flex flex-col">
        <StepHeader />

        <div className="container-md py-8 md:py-12 flex-1 flex flex-col items-center justify-center">
          {/* Анимированная иконка */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="text-8xl animate-bounce mb-2">🎉</div>
              <div className="text-6xl">✨</div>
            </div>

            <h1 className="text-display-lg font-bold text-neutral-900 mb-4">
              Вы готовы!
            </h1>
            <p className="text-heading-md text-success-600 font-semibold mb-2">
              Все шаги выполнены на 100%
            </p>
            <p className="text-body-lg text-neutral-600 max-w-2xl">
              Поздравляем! Вы прошли весь путь подготовки к поступлению.
              Теперь осталось дождаться результатов и верить в успех! 🌟
            </p>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 w-full">
            <Card size="lg" variant="accent">
              <div className="text-center">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-heading-md font-bold text-primary-600">
                  {totalSteps}
                </p>
                <p className="text-body-sm text-neutral-600 mt-1">
                  Всего задач
                </p>
              </div>
            </Card>

            <Card size="lg" variant="accent">
              <div className="text-center">
                <div className="text-4xl mb-3">✓</div>
                <p className="text-heading-md font-bold text-success-600">
                  {completedCount}
                </p>
                <p className="text-body-sm text-neutral-600 mt-1">
                  Выполнено
                </p>
              </div>
            </Card>

            <Card size="lg" variant="accent">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <p className="text-heading-md font-bold text-primary-600">
                  100%
                </p>
                <p className="text-body-sm text-neutral-600 mt-1">
                  Завершено
                </p>
              </div>
            </Card>
          </div>

          {/* Сообщение */}
          <Card size="lg" className="max-w-lg w-full mb-12 bg-gradient-to-br from-success-50 to-primary-50 border-success-200">
            <div className="text-center space-y-4">
              <div className="text-5xl">🚀</div>
              <h2 className="text-heading-lg font-bold text-neutral-900">
                Вперед к успеху!
              </h2>
              <p className="text-body-md text-neutral-700">
                Вы выполнили все необходимые шаги. Теперь:
              </p>
              <ul className="text-body-sm text-neutral-700 text-left space-y-2 bg-white/50 rounded-lg p-4">
                <li className="flex gap-2">
                  <span className="text-success-600">✓</span>
                  <span>Поддерживайте контакт с приёмными комиссиями вузов</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success-600">✓</span>
                  <span>Следите за объявлениями о результатах</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success-600">✓</span>
                  <span>Подготовьте документы для регистрации в вузе</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-success-600">✓</span>
                  <span>Обсудите жилищные вопросы и общежитие</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Кнопки */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              type="secondary"
              size="lg"
              onClick={() => router.push('/roadmap')}
            >
              ← Вернуться к плану
            </Button>
            <Button
              type="primary"
              size="lg"
              onClick={() => router.push('/profile')}
            >
              Начать заново →
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // Следующий шаг - показываем его
  return (
    <main className="min-h-screen bg-gradient-to-b from-bg via-neutral-50 to-bg">
      <StepHeader />

      <div className="container-md py-8 md:py-12">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">👉</div>
          <h1 className="text-display-md font-bold text-neutral-900 mb-2">
            Ваш следующий шаг
          </h1>
          <p className="text-body-lg text-neutral-600">
            Выполните это действие, чтобы продвинуться вперёд
          </p>

          {/* Прогресс */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <Badge variant="primary" size="md">
              Шаг {steps.findIndex((s) => s.id === next.id) + 1} из {totalSteps}
            </Badge>
            <Badge variant="success" size="md">
              {completedCount} завершено
            </Badge>
          </div>
        </div>

        {/* Основная карточка шага */}
        <Card size="lg" className="max-w-2xl mx-auto mb-12 bg-gradient-to-br from-white to-primary-50 border-primary-200">
          {/* Иконка и название */}
          <div className="mb-6 pb-6 border-b border-primary-200">
            <div className="flex items-start gap-4">
              <div className="text-5xl flex-shrink-0">
                {(() => {
                  const title = next.title.toLowerCase();
                  if (title.includes('экзамен') || title.includes('тест'))
                    return '📝';
                  if (title.includes('документ') || title.includes('анкета'))
                    return '📄';
                  if (title.includes('заявк') || title.includes('регистр'))
                    return '✍️';
                  if (
                    title.includes('интервью') ||
                    title.includes('собеседование')
                  )
                    return '💬';
                  if (title.includes('подготов'))
                    return '📚';
                  if (title.includes('результат') || title.includes('ответ'))
                    return '📬';
                  return '🎯';
                })()}
              </div>
              <div className="flex-1">
                <h2 className="text-display-sm font-bold text-neutral-900">
                  {next.title}
                </h2>
                <p className="text-body-md text-primary-600 font-semibold mt-2">
                  ⏰ {next.due}
                </p>
              </div>
            </div>
          </div>

          {/* Описание */}
          <div className="mb-8">
            <p className="text-body-lg text-neutral-700 leading-relaxed">
              {next.desc}
            </p>
          </div>

          {/* Важные моменты */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-8">
            <p className="text-body-sm font-semibold text-warning-900 mb-2">
              ⚠️ Важно помнить:
            </p>
            <ul className="text-body-sm text-warning-900 space-y-1">
              <li>• Не пропустите срок выполнения</li>
              <li>• Внимательно прочитайте инструкции</li>
              <li>• Сохраняйте копии документов</li>
              <li>• При возникновении вопросов свяжитесь с вузом</li>
            </ul>
          </div>

          {/* Кнопка отметить готово */}
          <div className="flex flex-col gap-3">
            <Button
              type="primary"
              size="lg"
              fullWidth
              onClick={handleMarkComplete}
              isLoading={isMarking}
            >
              ✓ Я выполнил этот шаг
            </Button>
            <Button
              type="secondary"
              size="lg"
              fullWidth
              onClick={() => router.push('/roadmap')}
            >
              ← Вернуться к плану
            </Button>
          </div>
        </Card>

        {/* Совет */}
        <Card variant="accent" className="max-w-2xl mx-auto">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="font-semibold text-neutral-900">Совет</p>
              <p className="text-body-sm text-neutral-700 mt-1">
                Если вам нужна помощь с этим шагом, не стесняйтесь обратиться в
                приёмную комиссию вуза. Они всегда готовы помочь абитуриентам!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}