
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ContactThankYouPage() {
    return (
        <div className="flex items-center justify-center min-h-[60vh] bg-secondary/30">
            <Card className="w-full max-w-lg text-center shadow-xl">
                <CardHeader>
                    <div className="mx-auto bg-green-100 text-green-700 p-3 rounded-full w-fit">
                        <CheckCircle className="h-8 w-8"/>
                    </div>
                    <CardTitle className="text-2xl mt-4">Message Reçu !</CardTitle>
                    <CardDescription>
                        Merci de nous avoir contactés. Votre message a bien été envoyé. Notre équipe vous répondra dans les plus brefs délais, généralement sous 24 heures ouvrées.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/">Retour à l'accueil</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
