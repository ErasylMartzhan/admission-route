import Icon from './Icon';

/* Бейдж — короткий статус или метка. Размер не задаётся произвольно:
   sm для подписей внутри карточек, md для заголовочных статусов. */

const variants = {
  primary: 'bg-primary-100 text-primary-700',
  accent: 'bg-accent-100 text-accent-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-600',
  error: 'bg-error-100 text-error-600',
  neutral: 'bg-neutral-100 text-neutral-700',
  outline: 'bg-transparent text-ink-soft border border-line-strong',
};

const sizes = {
  sm: 'text-caption px-2 py-0.5 gap-1',
  md: 'text-body-xs px-3 py-1 gap-1.5',
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
}) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full whitespace-nowrap
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}`}
    >
      {icon && <Icon name={icon} className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {children}
    </span>
  );
}
