
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  title: 'FLEXFOND | Solutions Financières',
  description: 'FLEXFOND propose des solutions financières sur-mesure pour tous vos projets. Prêts personnels, immobiliers, et plus encore.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="https://i.postimg.cc/XJSfHfQt/Black-Vintage-badges-family-farm-logo-removebg-preview.png" type="image/png" />
        <link rel="shortcut icon" href="https://i.postimg.cc/XJSfHfQt/Black-Vintage-badges-family-farm-logo-removebg-preview.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://i.postimg.cc/XJSfHfQt/Black-Vintage-badges-family-farm-logo-removebg-preview.png" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', 'flex flex-col')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow w-full">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
