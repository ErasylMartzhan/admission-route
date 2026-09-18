'use client';

import { usePathname, useRouter } from 'next/navigation';
import { STEPS } from '../lib/constants';
import Icon from './Icon';

/* Навигация по маршруту.

   Шаг читается по состоянию, а не по подписи: пройденный — галочка и переход
   назад, текущий — заливка с кольцом, будущий — приглушённый и некликабельный.
   Возврат назад разрешён только на пройденные шаги: вперёд «перепрыгнуть»
   нельзя, иначе экран откроется без данных и путь станет тупиком.

   На узком экране семь кружков нечитаемы, поэтому там компактный вид:
   иконка текущего шага, счётчик и полоса прогресса. */

const stepIcons = {
  auth: 'compass',
  profile: 'user',
  diagnostic: 'scan',
  recommendations: 'star',
  comparison: 'columns',
  roadmap: 'map',
  next: 'flag',
};

export default function StepHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const foundIndex = STEPS.findIndex((s) => s.path === pathname);
  const currentIndex = foundIndex === -1 ? 0 : foundIndex;
  const current = STEPS[currentIndex];
  const progress = ((currentIndex + 1) / STEPS.length) * 100;

  return (
    <header className="w-full border-b border-line bg-surface/80 backdrop-blur sticky top-0 z-10">
      <div className="container-md py-4 md:py-6">
        {/* Компактный вид: до md семь кружков не помещаются */}
        <div className="md:hidden mb-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-ink-inverse flex-shrink-0">
              <Icon name={stepIcons[current.key]} className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="text-caption font-semibold uppercase tracking-wider text-primary-600">
                Шаг {currentIndex + 1} из {STEPS.length}
              </p>
              <p className="text-body-sm font-medium text-ink truncate">{current.label}</p>
            </div>
            {currentIndex > 0 && (
              <button
                type="button"
                onClick={() => router.push(STEPS[currentIndex - 1].path)}
                className="ml-auto flex items-center justify-center min-w-tap min-h-tap -mr-2 rounded-md
                  text-ink-soft transition-colors duration-base focus-ring
                  hover:bg-neutral-100 hover:text-ink active:bg-neutral-200"
                aria-label={`Назад: ${STEPS[currentIndex - 1].label}`}
              >
                <Icon name="arrowLeft" className="w-5 h-5" />
              </button>
            )}
          </div>

          <div
            className="h-1.5 rounded-full bg-neutral-200 overflow-hidden"
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-label="Прогресс маршрута"
          >
            <div
              className="h-full rounded-full bg-primary-500 transition-all duration-slow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Полный вид */}
        <nav aria-label="Шаги маршрута" className="hidden md:block mb-6">
          <ol className="flex items-center gap-2">
            {STEPS.map((step, i) => {
              const done = i < currentIndex;
              const active = i === currentIndex;

              return (
                <li key={step.path} className="flex items-center flex-1 min-w-0 last:flex-none">
                  {done ? (
                    <button
                      type="button"
                      onClick={() => router.push(step.path)}
                      title={`Вернуться: ${step.label}`}
                      className="flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-full
                        bg-success-500 text-ink-inverse transition-all duration-base focus-ring
                        hover:bg-success-600 hover:scale-105 active:scale-100"
                      aria-label={`Пройден: ${step.label}. Вернуться`}
                    >
                      <Icon name="check" className="w-5 h-5" strokeWidth={2} />
                    </button>
                  ) : (
                    <span
                      className={`flex flex-shrink-0 items-center justify-center w-11 h-11 rounded-full
                        transition-all duration-base ${
                          active
                            ? 'bg-primary-500 text-ink-inverse ring-4 ring-primary-100 shadow-md'
                            : 'bg-neutral-100 text-ink-muted'
                        }`}
                      aria-current={active ? 'step' : undefined}
                      title={active ? step.label : `${step.label} — ещё не пройден`}
                    >
                      <Icon
                        name={active ? stepIcons[step.key] : 'lock'}
                        className="w-5 h-5"
                      />
                      <span className="sr-only">
                        {active ? `Текущий шаг: ${step.label}` : `${step.label}: недоступен`}
                      </span>
                    </span>
                  )}

                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`flex-1 min-w-[8px] h-1 mx-2 rounded-full transition-colors duration-slow ${
                        done ? 'bg-success-500' : 'bg-neutral-200'
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="text-center">
          <p className="hidden md:block text-caption font-semibold uppercase tracking-wider text-primary-600">
            Шаг {currentIndex + 1} из {STEPS.length}
          </p>
          <h1 className="text-heading-lg md:text-display-sm font-bold text-ink mt-1.5">
            {current.label}
          </h1>
          {current.description && (
            <p className="text-body-sm text-ink-soft mt-2 max-w-md mx-auto">
              {current.description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
