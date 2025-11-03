
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientAccessDisabledPage() {
    return (
        <div className="flex items-center justify-center min-h-[60vh] bg-secondary/30">
            <Card className="w-full max-w-md shadow-xl text-center">
                <CardHeader>
                    <div className="mx-auto bg-yellow-100 text-yellow-700 p-3 rounded-full w-fit">
                        <AlertTriangle className="h-8 w-8"/>
                    </div>
                    <CardTitle className="text-2xl mt-4">Espace Client Indisponible</CardTitle>
                    <CardDescription>
                        Cette fonctionnalité est actuellement désactivée car l'application n'est pas connectée à une base de données pour gérer les informations des clients.
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
