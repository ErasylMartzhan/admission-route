'use client';

import { usePathname } from 'next/navigation';
import { STEPS } from '../lib/constants';

export default function StepHeader() {
  const pathname = usePathname();
  const currentIndex = STEPS.findIndex((s) => s.path === pathname);

  return (
    <div className="w-full border-b border-border bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto">
        {STEPS.map((step, i) => (
          <div key={step.path} className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${
                i === currentIndex
                  ? 'bg-accent text-white font-semibold'
                  : i < currentIndex
                  ? 'bg-accent-soft text-accent'
                  : 'text-ink-soft'
              }`}
            >
              {i + 1}. {step.label}
            </span>
            {i < STEPS.length - 1 && <span className="text-ink-soft">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
