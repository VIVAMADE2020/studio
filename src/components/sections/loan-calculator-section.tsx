import { LoanCalculator } from "@/components/loan-calculator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function LoanCalculatorSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
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
          </div>
        </div>
      </div>
    </section>
  );
}
