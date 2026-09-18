// НЕ добавляйте сюда output: 'export' — статический экспорт несовместим с серверными
// роутами app/api/ai/*, на которых держится AI-слой (диагностика и объяснения).
// Деплой идёт на Vercel, там обычный next build, ничего настраивать не нужно.
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
