import { LoanCalculator } from "@/components/loan-calculator";
import { Button } from "../ui/button";
import Link from "next/link";

export function LoanCalculatorSection() {
  return (
    <section id="loan-calculator" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Planifiez votre budget avec précision</h2>
            <p className="mt-4 text-muted-foreground">
              Utilisez notre simulateur pour avoir une idée claire de votre engagement financier. Ajustez le montant et la durée pour trouver la combinaison parfaite qui correspond à votre budget et visualisez votre tableau d'amortissement complet. C'est simple, rapide et sans engagement.
            </p>
             <Button asChild size="lg" className="mt-6">
                <Link href="/demande-pret">Commencer ma demande</Link>
            </Button>
        </div>
        <div className="mt-12 flex justify-center">
          <LoanCalculator />
        </div>
      </div>
    </section>
  );
}
