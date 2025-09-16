
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import Script from 'next/script';


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
           <div className="gtranslate_wrapper"></div>
           <Script id="gtranslate-settings">
            {`window.gtranslateSettings = {"default_language":"fr","native_language_names":true,"languages":["fr","it","es","de","en","pt"],"wrapper_selector":".gtranslate_wrapper","switcher_horizontal_position":"right"}`}
          </Script>
          <Script src="https://cdn.gtranslate.net/widgets/latest/float.js" strategy="lazyOnload" />
        </ThemeProvider>
      </body>
    </html>
  );
}
