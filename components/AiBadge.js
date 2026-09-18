import Icon from './Icon';

/* Честная пометка о происхождении текста.

   Кейс требует не выдавать шаблон за персональную аналитику: если модель
   недоступна и сработал запасной шаблон, пользователь должен это видеть. */

export default function AiBadge({ source = 'template', loading = false, className = '' }) {
  if (loading) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-body-xs text-ink-muted ${className}`}
        role="status"
      >
        <Icon name="sparkles" className="w-3.5 h-3.5 animate-pulse" />
        Готовим персональный разбор…
      </span>
    );
  }

  const isAi = source === 'ai';

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-body-xs
        ${isAi ? 'text-primary-600' : 'text-ink-muted'} ${className}`}
    >
      <Icon name={isAi ? 'sparkles' : 'document'} className="w-3.5 h-3.5" />
      {isAi ? 'Персональный разбор' : 'Базовый разбор по правилам'}
    </span>
  );
}
