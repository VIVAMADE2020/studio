
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Demande Envoyée | FLEXFOND",
    description: "Merci pour votre demande de prêt. Nous vous contacterons bientôt.",
};

export default function ThankYouPage() {
    return (
        <div className="bg-secondary/50">
            <div className="container flex items-center justify-center min-h-[70vh] py-16 md:py-24">
                 <Card className="w-full max-w-2xl text-center shadow-xl p-8">
                    <CardHeader>
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle className="h-10 w-10 text-green-600"/>
                        </div>
                        <CardTitle className="text-3xl font-bold text-primary">Votre demande a bien été envoyée !</CardTitle>
                        <CardDescription className="text-lg pt-2">
                            Merci de votre confiance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Un conseiller FLEXFOND va examiner votre dossier et vous contactera dans les plus brefs délais pour discuter de votre projet. Vous recevrez également un e-mail de confirmation.
                        </p>
                        <Button asChild size="lg" className="mt-8">
                            <Link href="/">Retour à l'accueil</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    