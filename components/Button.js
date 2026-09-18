import Icon from './Icon';

/* Кнопка — единственный источник стилей действий в интерфейсе.

   Иерархия вариантов несёт смысл маршрута: на экране всегда ровно одна primary
   («следующий шаг»), остальные действия — secondary/outline/ghost, чтобы
   главное действие читалось без дополнительных подписей. */

const variants = {
  primary:
    'bg-primary-500 text-ink-inverse shadow-sm hover:bg-primary-600 hover:shadow-md active:bg-primary-700 active:shadow-xs',
  secondary:
    'bg-surface text-ink border border-line-strong shadow-xs hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100',
  outline:
    'bg-transparent text-primary-600 border border-primary-300 hover:bg-primary-50 hover:border-primary-400 active:bg-primary-100',
  ghost: 'bg-transparent text-ink-soft hover:bg-neutral-100 hover:text-ink active:bg-neutral-200',
  danger: 'bg-error-500 text-ink-inverse shadow-sm hover:bg-error-600 active:bg-error-600',
};

const sizes = {
  // min-h-tap (44px) держит тач-таргет в норме на любом размере
  sm: 'min-h-tap px-4 py-2 text-body-sm gap-1.5',
  md: 'min-h-tap px-5 py-2.5 text-body-md gap-2',
  lg: 'min-h-tap px-6 py-3.5 text-body-lg gap-2.5',
};

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  icon,
  iconPosition = 'right',
  loadingText = 'Загружаем…',
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`inline-flex items-center justify-center rounded-md font-semibold
        transition-all duration-base focus-ring
        disabled:opacity-45 disabled:pointer-events-none
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}`}
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <Icon name={icon} className="w-5 h-5 flex-shrink-0" />}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <Icon name={icon} className="w-5 h-5 flex-shrink-0" />}
        </>
      )}
    </button>
  );
}
