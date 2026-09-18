/* Единый набор иконок проекта.

   Все иконки живут на одной сетке 24×24, рисуются одной обводкой 1.5 и наследуют
   currentColor — поэтому набор невозможно расстроить: цвет и размер задаются
   классами снаружи, а форма приходит отсюда. Внешних зависимостей нет.

   Использование: <Icon name="star" className="w-5 h-5 text-primary-500" /> */

const paths = {
  // — шаги маршрута —
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1z" />
    </>
  ),
  user: (
    <>
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
      <path d="M5 20a7 7 0 0114 0" />
    </>
  ),
  scan: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.3-4.3" />
      <path d="M9 11h4M11 9v4" />
    </>
  ),
  star: <path d="M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4L4.2 9.7l5.4-.8L12 4z" />,
  columns: (
    <>
      <rect x="3.5" y="4.5" width="7" height="15" rx="1.5" />
      <rect x="13.5" y="4.5" width="7" height="15" rx="1.5" />
    </>
  ),
  map: (
    <>
      <path d="M3.5 6.5l5.5-2 6 2 5.5-2v13l-5.5 2-6-2-5.5 2v-13z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  flag: (
    <>
      <path d="M6 20V4.5" />
      <path d="M6 5.2h11l-2.2 3.4L17 12H6" />
    </>
  ),

  // — статусы и навигация —
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.9" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4.5 12h15" />
      <path d="M13.5 6l6 6-6 6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19.5 12h-15" />
      <path d="M10.5 6l-6 6 6 6" />
    </>
  ),
  chevronRight: <path d="M9.5 5.5l6.5 6.5-6.5 6.5" />,
  chevronDown: <path d="M5.5 9.5l6.5 6.5 6.5-6.5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,

  // — содержательные —
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9" rx="2" />
      <path d="M8 10.5V8a4 4 0 118 0v2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="14" rx="2" />
      <path d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h7l5 5v12H6v-17z" />
      <path d="M13 3.5v5h5" />
      <path d="M9 13h6M9 16.5h6" />
    </>
  ),
  wallet: (
    <>
      <rect x="3.5" y="6" width="17" height="13" rx="2.5" />
      <path d="M3.5 10h17" />
      <circle cx="16.5" cy="14" r="1.1" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 10-13 0C5.5 15 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5z" />
    </>
  ),
  externalLink: (
    <>
      <path d="M14 5h5v5" />
      <path d="M19 5l-7.5 7.5" />
      <path d="M18 14v4.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 014 18.5v-11A1.5 1.5 0 015.5 6H10" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5" />
      <path d="M12 7.8h.01" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4.5L21 19.5H3L12 4.5z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z" />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 01-13.7 5.6L4 15.3" />
      <path d="M4 12a8 8 0 0113.7-5.6L20 8.7" />
      <path d="M4 20v-4.7h4.7M20 4v4.7h-4.7" />
    </>
  ),
  list: (
    <>
      <path d="M9 6.5h11M9 12h11M9 17.5h11" />
      <path d="M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" />
    </>
  ),
  graduation: (
    <>
      <path d="M12 4.5L21.5 9 12 13.5 2.5 9 12 4.5z" />
      <path d="M6.5 11v4.8c0 .9 2.5 2.7 5.5 2.7s5.5-1.8 5.5-2.7V11" />
    </>
  ),
};

export default function Icon({ name, className = 'w-5 h-5', title, strokeWidth = 1.5 }) {
  const shape = paths[name];
  if (!shape) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {shape}
    </svg>
  );
}
