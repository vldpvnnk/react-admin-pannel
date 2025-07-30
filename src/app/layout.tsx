import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Моё приложение',
  description: 'Описание...',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}