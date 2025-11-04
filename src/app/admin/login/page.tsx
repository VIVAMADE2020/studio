
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck } from "lucide-react";
import { verifyAdminPassword } from "@/app/actions/admin";


export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Le mot de passe n'est plus envoyé, l'action serveur le validera toujours.
            const result = await verifyAdminPassword({});

            if (result.success) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                router.push('/admin/dashboard');
            } else {
                toast({ variant: "destructive", title: "Accès refusé", description: result.error || "Une erreur est survenue." });
            }
        } catch (error) {
             toast({ variant: "destructive", title: "Erreur", description: "Une erreur de communication est survenue." });
        }


        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary/30">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                     <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <ShieldCheck className="h-8 w-8"/>
                    </div>
                    <CardTitle className="text-2xl mt-4">Accès Administrateur</CardTitle>
                    <CardDescription>Cliquez sur le bouton pour accéder au tableau de bord.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Accéder au tableau de bord
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
