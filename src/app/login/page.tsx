import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-secondary/50">
            <Card className="w-full max-w-sm mx-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Espace Client</CardTitle>
                    <CardDescription>
                        Entrez vos identifiants pour accéder à votre tableau de bord.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Se connecter</Button>
                    <div className="text-center text-sm text-muted-foreground">
                        Pas encore de compte ?{" "}
                        <Link href="/contact" className="underline text-primary">
                            Faire une demande
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
