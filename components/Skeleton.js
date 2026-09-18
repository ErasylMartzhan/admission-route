/* Плейсхолдеры загрузки. AI-текст идёт 1–2 секунды, и без скелетона
   экран в этот момент выглядит сломанным, а не занятым. */

export function Skeleton({ className = 'h-4 w-full' }) {
  return <span className={`skeleton block ${className}`} aria-hidden="true" />;
}

export function SkeletonText({ lines = 3, className = '' }) {
  // Последняя строка короче — так блок читается как абзац, а не как таблица.
  const widths = ['w-full', 'w-11/12', 'w-4/5', 'w-10/12', 'w-3/5'];

  return (
    <div className={`space-y-2.5 ${className}`} role="status" aria-label="Текст готовится">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3.5 ${i === lines - 1 ? 'w-3/5' : widths[i % widths.length]}`}
        />
      ))}
      <span className="sr-only">Готовим персональный текст…</span>
    </div>
  );
}

export default Skeleton;
