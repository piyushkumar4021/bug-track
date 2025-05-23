import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import Navbar from './Navbar';
import { Theme, Container } from '@radix-ui/themes';
import AuthProvider from './auth/AuthProvider';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <Theme>
            <Navbar />
            <main className='p-4'>
              <Container>{children}</Container>
            </main>
            <Toaster position='bottom-right' />
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
