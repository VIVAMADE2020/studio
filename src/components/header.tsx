"use client";

import Link from "next/link";
import { Menu, Landmark } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Landmark className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-primary hidden sm:inline-block">VIXCAPITAL</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Button asChild>
              <Link href="/demande-pret">Faire une demande</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/login">Espace Client</Link>
            </Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center p-4 border-b">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Landmark className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg text-primary">VIXCAPITAL</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto p-4 flex flex-col gap-4 border-t">
                  <Button asChild className="w-full justify-start text-lg">
                     <Link href="/demande-pret" onClick={() => setIsOpen(false)}>Faire une demande</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full justify-start text-lg">
                    <Link href="/login" onClick={() => setIsOpen(false)}>Espace Client</Link>
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
