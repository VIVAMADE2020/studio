import Link from "next/link";
import { Landmark, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Landmark className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-primary">FLEXFOND</span>
            </Link>
            <p className="text-sm">
              Solutions financières sur-mesure pour réaliser vos projets en toute confiance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-primary">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/services" className="text-sm hover:text-primary">Nos Services</Link></li>
              <li><Link href="/about" className="text-sm hover:text-primary">À Propos</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary">Contactez-nous</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary">Légal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/legal/mentions-legales" className="text-sm hover:text-primary">Mentions Légales</Link></li>
              <li><Link href="/legal/politique-de-confidentialite" className="text-sm hover:text-primary">Politique de confidentialité</Link></li>
              <li><Link href="/legal/conditions-dutilisation" className="text-sm hover:text-primary">Conditions d'utilisation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm">123 Rue de la Finance, 75001 Paris</li>
              <li className="text-sm">contact@flexfond.com</li>
              <li className="text-sm">+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FLEXFOND. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
