
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary/20 dark:bg-background">
        <div className="container ml-auto mr-0 py-8 md:py-12">
           {children}
        </div>
    </div>
  );
}
