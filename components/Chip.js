import Icon from './Icon';

/* Чип выбора — вариант ответа в анкете.

   Выбранное состояние показано не только цветом, но и галочкой: цвет один
   не читается при дальтонизме и на плохом экране проектора. */

export default function Chip({ children, selected = false, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex items-center gap-2 min-h-tap px-4 py-2.5 rounded-md border
        text-body-sm font-medium transition-all duration-base focus-ring
        ${
          selected
            ? 'bg-primary-500 text-ink-inverse border-primary-500 shadow-sm hover:bg-primary-600 active:bg-primary-700'
            : 'bg-surface text-ink border-line-strong hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100'
        }
        ${className}`}
    >
      {selected && <Icon name="check" className="w-4 h-4 flex-shrink-0" strokeWidth={2} />}
      {children}
    </button>
  );
}
