
"use client";

import Link from "next/link";
import { Menu, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#services", label: "Services" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isTransparentPage = pathname === '/';

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full",
        isTransparentPage ? "bg-transparent" : "bg-secondary"
    )}>
      <div className="container flex h-20 max-w-screen-2xl items-center px-4 md:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className={cn("font-bold text-xl", isTransparentPage ? "text-white" : "text-primary")}>FLEXFOND</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("font-medium transition-colors hover:text-accent", isTransparentPage ? "text-white/80 hover:text-white" : "text-foreground")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild className={cn("hidden sm:inline-flex", isTransparentPage ? "text-white/80 hover:text-white hover:bg-white/10" : "text-foreground hover:bg-accent/80")}>
            <Link href="/client/access">
              <User className="mr-2 h-4 w-4" />
              Espace Client
            </Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/demande-pret">Demander un prêt</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={cn(isTransparentPage ? "text-white/80 hover:text-white hover:bg-white/10" : "text-secondary-foreground/80 hover:text-secondary-foreground")}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-secondary">
              <div className="flex flex-col h-full">
                <div className="flex items-center p-4 border-b border-border">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <span className="font-bold text-lg text-primary">FLEXFOND</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-secondary-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto p-4 flex flex-col gap-4 border-t border-border">
                   <Button asChild className="w-full justify-start text-lg" variant="outline">
                     <Link href="/client/access" onClick={() => setIsOpen(false)}>
                       <User className="mr-2 h-5 w-5" />
                       Espace Client
                      </Link>
                  </Button>
                  <Button asChild className="w-full justify-start text-lg">
                     <Link href="/demande-pret" onClick={() => setIsOpen(false)}>Faire une demande</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
