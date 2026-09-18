/** @type {import('tailwindcss').Config} */

/* Дизайн-токены проекта «Маршрут поступления».
   Правило: в компонентах и экранах используются только эти токены —
   произвольные значения (text-[13px], bg-[#fff]) не добавляем.

   Палитра намеренно уведена в индиго-фиолетовую гамму: бирюза на тёмно-синем —
   фирменные цвета LOCUS, а кейс запрещает копировать их визуальную систему. */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Фон страницы — используется в градиентах (from-bg / to-bg) на всех экранах
        bg: '#F7F7FC',

        // Основная палитра — индиго-фиолет. Несущий цвет навигации и главных действий.
        primary: {
          50: '#F4F3FF',
          100: '#EAE7FF',
          200: '#D5CFFF',
          300: '#B7AEFB',
          400: '#9286F5',
          500: '#6C5CE7',
          600: '#5847C4',
          700: '#46389F',
          800: '#362B7B',
          900: '#241D52',
        },

        // Тёплый акцент — прогресс, выделение «следующего шага», контраст к индиго.
        accent: {
          50: '#FFF8EB',
          100: '#FFEFCC',
          200: '#FFDD99',
          300: '#FFC960',
          400: '#FDB130',
          500: '#F59E0B',
          600: '#D4830A',
          700: '#A96608',
        },

        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        warning: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          900: '#7C2D12',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
        },

        // Нейтральные подтонированы в ту же (холодную, слегка фиолетовую) температуру,
        // чтобы серый текст не выглядел чужим рядом с индиго.
        neutral: {
          50: '#F8F8FC',
          100: '#F1F1F7',
          200: '#E6E5F0',
          300: '#D2D0E0',
          400: '#9D9BB3',
          500: '#6F6D8A',
          600: '#545272',
          700: '#3E3C58',
          800: '#2A2841',
          900: '#1A1830',
        },

        // Семантические алиасы — по ним читается назначение, а не оттенок.
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F7F7FC',
          subtle: '#F1F1F7',
        },
        ink: {
          DEFAULT: '#1A1830',
          soft: '#545272',
          muted: '#6F6D8A',
          inverse: '#FFFFFF',
        },
        line: {
          DEFAULT: '#E6E5F0',
          strong: '#D2D0E0',
        },
      },

      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },

      /* Типографская шкала: размер и вес заданы вместе, чтобы иерархия
         не размывалась случайным font-medium на заголовке. */
      fontSize: {
        'display-lg': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.35', fontWeight: '600' }],
        'heading-md': ['1.125rem', { lineHeight: '1.45', fontWeight: '600' }],
        'heading-sm': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55', fontWeight: '400' }],
        'body-xs': ['0.8125rem', { lineHeight: '1.45', fontWeight: '400' }],
        caption: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
        'caption-sm': ['0.6875rem', { lineHeight: '1.3', letterSpacing: '0.04em', fontWeight: '600' }],
      },

      borderRadius: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
      },

      /* Тени мягкие и холодные — под индиго-гамму, без чёрного «грязного» края. */
      boxShadow: {
        xs: '0 1px 2px 0 rgba(26, 24, 48, 0.05)',
        sm: '0 1px 3px 0 rgba(26, 24, 48, 0.08)',
        md: '0 4px 10px -2px rgba(26, 24, 48, 0.10)',
        lg: '0 12px 24px -6px rgba(26, 24, 48, 0.14)',
        xl: '0 24px 40px -12px rgba(26, 24, 48, 0.18)',
        focus: '0 0 0 3px rgba(108, 92, 231, 0.35)',
      },

      // Шаг сетки: вертикальные отступы секций и минимальный тач-таргет.
      spacing: {
        tap: '2.75rem', // 44px — минимальный интерактивный размер
        section: '4rem',
        'section-sm': '2.5rem',
      },

      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out',
        slideIn: 'slideIn 300ms ease-out',
      },
    },
  },
  plugins: [],
};
