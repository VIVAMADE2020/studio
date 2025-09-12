
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="container px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Prêt à démarrer votre projet ?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Simulez votre prêt ou déposez une demande en quelques clics. C'est simple, rapide et sécurisé.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/demande-pret">Faire une demande en ligne</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#loan-calculator">Simuler mon prêt</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
