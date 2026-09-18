import Icon from './Icon';
import Button from './Button';

/* Пустое состояние — экран без данных не должен быть тупиком.
   Поэтому действие обязательно: всегда есть куда пойти дальше. */

export default function EmptyState({
  icon = 'info',
  title,
  description,
  actionLabel,
  onAction,
  actionIcon = 'arrowRight',
  secondaryLabel,
  onSecondary,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center text-center rounded-lg border border-dashed border-line-strong
        bg-surface px-6 py-10 md:py-12 ${className}`}
    >
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 text-primary-500 mb-4">
        <Icon name={icon} className="w-6 h-6" />
      </span>

      <h2 className="text-heading-lg text-ink mb-2">{title}</h2>

      {description && (
        <p className="text-body-sm text-ink-soft max-w-sm mb-6">{description}</p>
      )}

      {(actionLabel || secondaryLabel) && (
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {actionLabel && (
            <Button onClick={onAction} icon={actionIcon} fullWidth>
              {actionLabel}
            </Button>
          )}
          {secondaryLabel && (
            <Button variant="ghost" onClick={onSecondary} fullWidth>
              {secondaryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
