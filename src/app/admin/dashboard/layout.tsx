
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Loader2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    try {
      const adminLoggedIn = sessionStorage.getItem('adminLoggedIn');
      if (adminLoggedIn !== 'true') {
        router.replace('/admin/login');
      } else {
        setIsVerifying(false);
      }
    } catch (error) {
      router.replace('/admin/login');
    }
  }, [router]);
  

  const navItems = [
    { href: '/admin/dashboard', label: 'Clients', icon: Home },
    { href: '/admin/dashboard/documents', label: 'Documents', icon: FileText },
  ];

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="bg-secondary/30 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          <aside>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-foreground transition-colors hover:bg-primary/10",
                    pathname === item.href ? "bg-primary/20 font-semibold" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
