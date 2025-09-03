import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">Prêt à démarrer votre projet ?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Contactez l'un de nos conseillers pour un accompagnement personnalisé.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Nous contacter</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">Voir nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
