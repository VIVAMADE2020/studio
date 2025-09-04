
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', label: 'Clients', icon: Home },
    { href: '/admin/dashboard/setup', label: 'Configuration', icon: Settings },
  ];

  return (
    <div className="bg-secondary/30 min-h-screen">
      <div className="container py-8">
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
