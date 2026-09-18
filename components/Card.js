/* Карточка — основной контейнер контента.

   Кликабельная карточка рендерится как <button>: получает hover/active/focus-visible
   и попадает в таб-навигацию. Статичная остаётся <div> — чтобы скринридер
   не объявлял некликабельный блок как элемент управления. */

const variants = {
  default: 'bg-surface border border-line shadow-sm',
  accent: 'bg-primary-50 border border-primary-200',
  muted: 'bg-surface-subtle border border-line',
  warning: 'bg-warning-50 border border-warning-200',
  success: 'bg-success-50 border border-success-200',
};

const paddings = {
  sm: 'p-4',
  md: 'p-5 md:p-6',
  lg: 'p-6 md:p-8',
};

export default function Card({
  children,
  title,
  variant = 'default',
  padding = 'md',
  selected = false,
  onClick,
  className = '',
  ...rest
}) {
  const base = `${variants[variant] || variants.default} ${paddings[padding] || paddings.md}
    rounded-lg transition-all duration-base
    ${selected ? 'ring-2 ring-primary-500 ring-offset-1 ring-offset-bg border-primary-300' : ''}`;

  const content = (
    <>
      {title && <h3 className="text-heading-md text-ink mb-3">{title}</h3>}
      {children}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={`${base} w-full text-left focus-ring
          hover:shadow-md hover:border-primary-300 active:shadow-xs
          ${className}`}
        {...rest}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={`${base} ${className}`} {...rest}>
      {content}
    </div>
  );
}
