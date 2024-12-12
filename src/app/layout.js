import './globals.scss';
import { Providers } from './providers';

export const metadata = {
  title: 'IBM - AI for New Students',
  description: 'AI chatbot for new students of UoN',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
