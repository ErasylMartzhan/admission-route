import Icon from './Icon';

/* Пометка о происхождении цифры.

   Кейс прямо запрещает «вымышленную точность»: каждый проходной балл, дедлайн
   или условие на экране должны быть либо со ссылкой на источник, либо честно
   помечены как демонстрационные. Этот компонент — единственный способ показать
   такую пометку, чтобы формулировки не расходились по экранам. */

export default function SourceNote({ variant = 'demo', href, children, className = '' }) {
  const isSource = variant === 'source' && href;

  return (
    <p
      className={`flex items-start gap-1.5 text-body-xs text-ink-muted ${className}`}
    >
      <Icon
        name={isSource ? 'externalLink' : 'info'}
        className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
      />
      <span>
        {children}
        {isSource && (
          <>
            {' '}
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-primary-600 underline underline-offset-2 rounded-xs focus-ring hover:text-primary-700"
            >
              источник
            </a>
          </>
        )}
      </span>
    </p>
  );
}
