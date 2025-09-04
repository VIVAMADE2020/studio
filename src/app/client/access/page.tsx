
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { verifyClientLoginAction } from "@/app/actions/clients";


export default function ClientAccessPage() {
    const [identificationNumber, setIdentificationNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!identificationNumber || !password) {
            toast({ variant: "destructive", title: "Erreur", description: "Veuillez remplir tous les champs." });
            setIsLoading(false);
            return;
        }

        try {
            const result = await verifyClientLoginAction({ identificationNumber, password });

            if (result.success && result.data) {
                sessionStorage.setItem('identificationNumber', result.data.identificationNumber);
                router.push('/client/dashboard');
            } else {
                toast({ variant: "destructive", title: "Accès refusé", description: result.error || "Numéro d'identification ou mot de passe incorrect." });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Erreur", description: "Une erreur de communication est survenue." });
        }


        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] bg-secondary/30">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Accès Espace Client</CardTitle>
                    <CardDescription>Entrez vos identifiants pour consulter vos informations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="identificationNumber">Numéro d'identification</Label>
                            <Input
                                id="identificationNumber"
                                type="text"
                                placeholder="FLEX-123456"
                                value={identificationNumber}
                                onChange={(e) => setIdentificationNumber(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                             <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
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

    