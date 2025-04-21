import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';  
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HireLyft - Job Portal',
  description: 'Connect job seekers and employers with our modern job portal platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 