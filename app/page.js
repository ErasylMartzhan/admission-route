'use client';

import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';

const STEPS_PREVIEW = [
  { icon: '📝', title: 'Короткая анкета', text: 'Класс, интересы, балл ЕНТ, бюджет и город — пара минут.' },
  { icon: '🔍', title: 'Разбор профиля', text: 'Показываем сильные стороны и главное ограничение.' },
  { icon: '🎓', title: 'Подходящие вузы', text: 'Минимум три варианта — и понятно, почему именно они.' },
  { icon: '🗺️', title: 'План до зачисления', text: 'Экзамены, документы, гранты и ближайший шаг.' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-bg via-neutral-50 to-bg">
      <StepHeader />

      <div className="container-md py-10 md:py-16">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🧭</div>
          <h1 className="text-display-md md:text-display-lg font-bold text-neutral-900 mb-4">
            Маршрут поступления
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Ответьте на несколько вопросов о себе — и получите персональный план поступления
            в вузы Казахстана: подходящие направления, объяснение выбора и пошаговый roadmap
            до зачисления.
          </p>

          <div className="mt-8 flex justify-center">
            <Button variant="primary" size="lg" onClick={() => router.push('/profile')}>
              Начать за 2 минуты →
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {STEPS_PREVIEW.map((step, i) => (
            <Card key={step.title}>
              <div className="flex gap-4">
                <div className="text-3xl flex-shrink-0">{step.icon}</div>
                <div>
                  <p className="text-caption-sm uppercase tracking-wide text-primary-600 mb-1">
                    Шаг {i + 1}
                  </p>
                  <p className="text-heading-md font-semibold text-neutral-900 mb-1">
                    {step.title}
                  </p>
                  <p className="text-body-sm text-neutral-600">{step.text}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card variant="accent">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">🔒</span>
            <div>
              <p className="font-semibold text-neutral-900">Данные остаются у вас</p>
              <p className="text-body-sm text-neutral-700 mt-1">
                Анкета хранится только в вашем браузере — регистрация не нужна. Проходные баллы
                берутся из открытых источников, а не выдумываются: у каждого вуза на экране
                рекомендаций есть ссылка на источник.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
