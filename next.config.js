// output: 'export' убран — с ним не работают API-роуты (app/api/ai/*),
// а без сервера AI-часть работать не будет вообще. Деплоим на Vercel:
// там next build идёт как обычно, ничего вручную настраивать не нужно.
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
