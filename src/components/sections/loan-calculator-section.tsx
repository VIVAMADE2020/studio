import { LoanCalculator } from "@/components/loan-calculator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export function LoanCalculatorSection() {
  return (
    <section id="loan-calculator" className="py-16 md:py-24 bg-background scroll-mt-20">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Simulateur de prêt</CardTitle>
                    <CardDescription>Estimez vos mensualités en quelques clics.</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoanCalculator />
                </CardContent>
            </Card>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Planifiez votre budget avec précision</h2>
            <p className="mt-4 text-muted-foreground">
              Utilisez notre simulateur pour avoir une idée claire de votre engagement financier. Ajustez le montant et la durée pour trouver la combinaison parfaite qui correspond à votre budget. C'est simple, rapide et sans engagement.
            </p>
             <Button asChild size="lg" className="mt-6">
                <Link href="/demande-pret">Commencer ma demande</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
