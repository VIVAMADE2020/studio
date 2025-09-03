import { LoanApplicationForm } from "@/components/loan-application-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoanApplicationPage() {
  return (
    <div className="bg-secondary/50">
        <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-3xl">
                <Card className="shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-primary">Demande de Prêt</CardTitle>
                        <CardDescription className="text-lg">Remplissez notre formulaire sécurisé en quelques étapes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LoanApplicationForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
