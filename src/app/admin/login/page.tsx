
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Fingerprint } from "lucide-react";
import { verifyAdminPassword } from "@/app/actions/admin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await verifyAdminPassword({ password });

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
                    <CardDescription>Veuillez entrer le mot de passe pour accéder au tableau de bord.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                             <Label htmlFor="password">Mot de passe</Label>
                             <div className="relative">
                                <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    id="password" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="pl-10"
                                />
                             </div>
                        </div>
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
