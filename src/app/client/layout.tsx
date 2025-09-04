
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 min-h-screen">
        <div className="container py-8 md:py-12">
           {children}
        </div>
    </div>
  );
}

    