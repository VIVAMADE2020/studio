
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { getClientByAccountNumberAction } from "@/app/actions/clients";


export default function ClientAccessPage() {
    const [accountNumber, setAccountNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!accountNumber) {
            toast({ variant: "destructive", title: "Erreur", description: "Veuillez entrer un numéro de compte." });
            setIsLoading(false);
            return;
        }

        const { data, error } = await getClientByAccountNumberAction(accountNumber);

        if (error || !data) {
            toast({ variant: "destructive", title: "Accès refusé", description: "Numéro de compte invalide ou introuvable." });
        } else {
            // Stocker dans le session storage est une alternative simple au lieu des cookies pour ce cas d'usage.
            // Ce n'est PAS une méthode de "connexion" sécurisée.
            sessionStorage.setItem('accountNumber', accountNumber);
            router.push('/client/dashboard');
        }

        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] bg-secondary/30">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Accès Espace Client</CardTitle>
                    <CardDescription>Entrez votre numéro de compte pour consulter vos informations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="accountNumber">Numéro de Compte</Label>
                            <Input
                                id="accountNumber"
                                type="text"
                                placeholder="FLEX-123456"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Accéder à mon compte
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
