import { LoanApplicationForm } from '@/components/loan-application-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LoanApplicationPage() {
  return (
    <div className="bg-secondary/20">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Demande de Prêt</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Suivez les étapes pour compléter votre demande en quelques minutes.
            </p>
        </div>
        <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Votre Projet de Financement</CardTitle>
                    <CardDescription>Un processus simple, rapide et sécurisé.</CardDescription>
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
