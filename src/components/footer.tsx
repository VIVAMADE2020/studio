
import Link from "next/link";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="glassmorphism-effect text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl text-white">FLEXFOND</span>
            </Link>
            <p className="text-sm">
              Solutions financières sur-mesure pour réaliser vos projets en toute confiance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/#services" className="text-sm text-white/80 hover:text-white">Nos Services</Link></li>
              <li><Link href="/about" className="text-sm text-white/80 hover:text-white">À Propos</Link></li>
              <li><Link href="/contact" className="text-sm text-white/80 hover:text-white">Contactez-nous</Link></li>
              <li><Link href="/faq" className="text-sm text-white/80 hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Légal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/legal/mentions-legales" className="text-sm text-white/80 hover:text-white">Mentions Légales</Link></li>
              <li><Link href="/legal/politique-de-confidentialite" className="text-sm text-white/80 hover:text-white">Politique de confidentialité</Link></li>
              <li><Link href="/legal/conditions-dutilisation" className="text-sm text-white/80 hover:text-white">Conditions d'utilisation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm">123 Rue de la Finance, 75001 Paris</li>
              <li className="text-sm">contact@flexfond.com</li>
              <li className="text-sm">+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8 text-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} FLEXFOND. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
