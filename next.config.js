const isGithubPages = process.env.GITHUB_PAGES === 'true';
// Меняйте только если репозиторий переименуете — должно совпадать с его именем.
const repoName = 'admission-route';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : '',
  assetPrefix: isGithubPages ? `/${repoName}/` : '',
};

module.exports = nextConfig;
