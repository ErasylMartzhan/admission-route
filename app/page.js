'use client';

import { useRouter } from 'next/navigation';
import StepHeader from '@/components/StepHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import SourceNote from '@/components/SourceNote';

const STEPS_PREVIEW = [
  { icon: 'user', title: 'Короткая анкета', text: 'Класс, интересы, балл ЕНТ, бюджет и город — пара минут.' },
  { icon: 'scan', title: 'Разбор профиля', text: 'Показываем сильные стороны и главное ограничение.' },
  { icon: 'graduation', title: 'Подходящие вузы', text: 'Минимум три варианта — и понятно, почему именно они.' },
  { icon: 'map', title: 'План до зачисления', text: 'Экзамены, документы, гранты и ближайший шаг.' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-bg">
      <StepHeader />

      <div className="container-md py-10 md:py-16">
        <section className="text-center mb-12 md:mb-16">
          <p className="text-body-lg text-ink-soft max-w-2xl mx-auto">
            Ответьте на несколько вопросов о себе — и получите персональный план поступления
            в вузы Казахстана: подходящие направления, объяснение выбора и пошаговый маршрут
            до зачисления.
          </p>

          <div className="mt-8 flex justify-center">
            <Button variant="primary" size="lg" icon="arrowRight" onClick={() => router.push('/profile')}>
              Начать за 2 минуты
            </Button>
          </div>

          <p className="text-body-sm text-ink-muted mt-4">
            Без регистрации. Анкету можно пройти заново в любой момент.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-heading-lg font-semibold text-ink mb-5 text-center">
            Как это работает
          </h2>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS_PREVIEW.map((step, i) => (
              <li key={step.title}>
                <Card className="h-full">
                  <div className="flex gap-4">
                    <span className="flex items-center justify-center w-11 h-11 rounded-md bg-primary-50 text-primary-600 flex-shrink-0">
                      <Icon name={step.icon} className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-caption font-semibold uppercase tracking-wider text-ink-muted mb-1">
                        Шаг {i + 1}
                      </p>
                      <h3 className="text-heading-md font-semibold text-ink mb-1">{step.title}</h3>
                      <p className="text-body-sm text-ink-soft">{step.text}</p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        <Card variant="muted">
          <div className="flex gap-3">
            <span className="text-primary-600 flex-shrink-0">
              <Icon name="lock" className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-heading-md font-semibold text-ink">Данные остаются у вас</h2>
              <p className="text-body-sm text-ink-soft mt-1">
                Анкета хранится только в вашем браузере — регистрация не нужна. Сервис помогает
                сориентироваться и спланировать подготовку, но не предсказывает и не гарантирует
                результат поступления.
              </p>
              <SourceNote className="mt-3">
                Баллы и сроки на экранах — демонстрационные данные для прототипа: перед подачей
                сверяйтесь с сайтом вуза.
              </SourceNote>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
