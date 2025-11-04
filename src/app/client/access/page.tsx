
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn } from "lucide-react";
import { verifyClientLoginAction } from "@/app/actions/clients";


export default function ClientLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // L'action ne prend plus de paramètres, elle connecte le premier client trouvé
            const result = await verifyClientLoginAction();

            if (result.success && result.data) {
                // Store minimal info, but NOT the full client object for security
                sessionStorage.setItem('identificationNumber', result.data.identificationNumber);
                toast({
                  title: "Connexion réussie",
                  description: `Connecté en tant que ${result.data.firstName} ${result.data.lastName}.`,
                });
                router.push('/client/dashboard');
            } else {
                toast({ variant: "destructive", title: "Accès refusé", description: result.error || "Aucun compte client trouvé pour la connexion simplifiée." });
            }
        } catch(e) {
            toast({ variant: "destructive", title: "Erreur", description: "Une erreur de communication est survenue." });
        }

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary/30">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <LogIn className="h-8 w-8"/>
                    </div>
                    <CardTitle className="text-2xl mt-4">Espace Client</CardTitle>
                    <CardDescription>Cliquez sur le bouton pour vous connecter.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Se connecter
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
