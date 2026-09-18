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
  { path: '/', label: 'Начало', key: 'auth', description: 'Как устроен маршрут и что вы получите в конце.' },
  { path: '/profile', label: 'Профиль', key: 'profile', description: 'Класс, интересы, балл и бюджет — на этом строится весь подбор.' },
  { path: '/diagnosis', label: 'Диагностика', key: 'diagnostic', description: 'Сильные стороны и главное ограничение вашего профиля.' },
  { path: '/recommendations', label: 'Рекомендации', key: 'recommendations', description: 'Подходящие вузы и объяснение, почему именно они.' },
  { path: '/compare', label: 'Сравнение', key: 'comparison', description: 'Два варианта рядом — по баллам, стоимости и городу.' },
  { path: '/roadmap', label: 'План', key: 'roadmap', description: 'Пошаговый маршрут от подготовки до зачисления.' },
  { path: '/next-step', label: 'Ближайший шаг', key: 'next', description: 'Одно конкретное действие, с которого стоит начать.' },
];
