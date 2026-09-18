'use client';

import { usePathname } from 'next/navigation';
import { STEPS } from '../lib/constants';

const stepIcons = {
  auth: '🔐',
  profile: '👤',
  quiz: '📋',
  diagnostic: '🔍',
  recommendations: '⭐',
  comparison: '📊',
  roadmap: '🗺️',
  next: '🚀',
};

export default function StepHeader() {
  const pathname = usePathname();
  const currentIndex = STEPS.findIndex((s) => s.path === pathname);

  return (
    <div className="w-full border-b border-neutral-200 bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="container-md">
        <div className="py-4 md:py-6">
          {/* Прогресс-бар */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              {STEPS.map((step, i) => (
                <div key={step.path} className="flex items-center flex-1">
                  {/* Точка шага */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full font-semibold text-sm transition-all duration-300 ${
                      i === currentIndex
                        ? 'bg-primary-500 text-white scale-100 shadow-lg'
                        : i < currentIndex
                          ? 'bg-success-500 text-white scale-95'
                          : 'bg-neutral-200 text-neutral-600 scale-95'
                    }`}
                  >
                    {i < currentIndex ? (
                      <span className="text-lg">✓</span>
                    ) : (
                      <span className="text-xl">{stepIcons[step.key] || '•'}</span>
                    )}
                  </div>

                  {/* Линия между точками */}
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                        i < currentIndex
                          ? 'bg-success-500'
                          : 'bg-neutral-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Текст текущего шага */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2">
              <span className="text-caption font-semibold text-primary-500 uppercase tracking-wider">
                Шаг {currentIndex + 1} из {STEPS.length}
              </span>
            </div>
            <h1 className="text-heading-md md:text-display-sm font-bold mt-2 text-neutral-900">
              {STEPS[currentIndex]?.label || 'Начало'}
            </h1>
            {STEPS[currentIndex]?.description && (
              <p className="text-body-sm text-neutral-600 mt-2 max-w-sm mx-auto">
                {STEPS[currentIndex].description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}