export const INTERESTS = [
  'IT и программирование',
  'Инженерия и технологии',
  'Бизнес и экономика',
  'Медицина',
  'Право',
  'Дизайн и креативные индустрии',
  'Гуманитарные науки',
  'Естественные науки',
];

export const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Любой город'];

export const BUDGETS = [
  { value: 'grant', label: 'Нужен грант (бесплатно)' },
  { value: 'flexible', label: 'Грант или недорогое платное' },
  { value: 'paid', label: 'Готовы к платному обучению' },
];

export const GRADES = [
  { value: '9', label: '9 класс' },
  { value: '10', label: '10 класс' },
  { value: '11', label: '11 класс' },
  { value: 'graduate', label: 'Выпускник(ца)' },
];

export const STEPS = [
  // key — используется в components/StepHeader.js для иконки шага
  { path: '/', label: 'Вход', key: 'auth' },
  { path: '/profile', label: 'Профиль', key: 'profile' },
  { path: '/diagnosis', label: 'Диагностика', key: 'diagnostic' },
  { path: '/recommendations', label: 'Рекомендации', key: 'recommendations' },
  { path: '/compare', label: 'Сравнение', key: 'comparison' },
  { path: '/roadmap', label: 'Roadmap', key: 'roadmap' },
  { path: '/next-step', label: 'Шаг', key: 'next' },
];
