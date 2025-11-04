
"use client";

import { InvestmentAccountForm } from "@/components/investment-account-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, TrendingUp, Zap } from "lucide-react";

export default function OpenInvestmentAccountPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
              <Card className="shadow-lg">
                  <CardHeader className="text-center">
                      <CardTitle className="text-3xl font-bold text-primary uppercase">Demande d'Ouverture de Compte d'Investissement</CardTitle>
                      <CardDescription className="text-lg">Rejoignez-nous en quelques minutes. C'est simple, rapide et 100% sécurisé.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <InvestmentAccountForm />
                  </CardContent>
              </Card>
          </div>
          <div className="lg:col-span-1 sticky top-24 space-y-8">
             <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-primary">
                        <ShieldCheck className="h-6 w-6" />
                        Un Investissement Sécurisé
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Toutes vos données sont chiffrées (SSL) et stockées en Europe. Nous appliquons les plus hauts standards de sécurité pour protéger votre capital et vos informations.
                    </p>
                </CardContent>
            </Card>
             <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-primary">
                        <TrendingUp className="h-6 w-6" />
                        Pourquoi nous faire confiance ?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">
                            <strong>Haut rendement :</strong> Visez 6% de performance annuelle.
                        </p>
                     </div>
                     <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                         <p className="text-sm text-muted-foreground">
                            <strong>Simplicité :</strong> Un processus 100% en ligne et une interface claire.
                        </p>
                     </div>
                     <div className="flex items-start gap-3">
                        <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                         <p className="text-sm text-muted-foreground">
                            <strong>Transparence :</strong> Pas de frais cachés, un suivi en temps réel de vos performances.
                        </p>
                     </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
