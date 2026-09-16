import './globals.css';
import { IBM_Plex_Serif, IBM_Plex_Sans } from 'next/font/google';
import { ProfileProvider } from '../lib/ProfileContext';

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Маршрут поступления',
  description: 'Персональный маршрут поступления в вузы Казахстана',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${plexSerif.variable} ${plexSans.variable}`}>
      <body className="font-body bg-bg text-ink min-h-screen">
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  );
}
