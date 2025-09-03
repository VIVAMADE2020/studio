import React from 'react';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 md:py-24 px-4">
        <div className="prose prose-lg max-w-4xl mx-auto text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
