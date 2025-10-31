
"use client";

import { LoanApplicationForm } from "@/components/loan-application-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function LoanApplicationPage() {
  return (
    <div className="bg-secondary/50">
      <div className="container py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
              <Card className="shadow-lg">
                  <CardHeader className="text-center">
                      <CardTitle className="text-3xl font-bold text-primary uppercase">Demande de Financement</CardTitle>
                      <CardDescription className="text-lg">Remplissez le formulaire pour soumettre votre demande. C'est simple et sécurisé.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <LoanApplicationForm />
                  </CardContent>
              </Card>
          </div>
          <div className="lg:col-span-1 sticky top-24">
             <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-primary">
                        <ShieldCheck className="h-6 w-6" />
                        Transparence et Sécurité
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Les informations que vous nous confiez sont précieuses. Elles sont utilisées exclusivement pour l'étude de votre dossier de financement.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                        Toutes vos données sont transmises de manière sécurisée (cryptage SSL) et stockées sur des serveurs en Europe, conformément au RGPD.
                    </p>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
