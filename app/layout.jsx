import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';  
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';


const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'HireLyft - Job Portal',
  description: 'Connect job seekers and employers with our modern job portal platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-row">
              <Sidebar />
              <div className='flex-1'>
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
} 