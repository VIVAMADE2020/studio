
import { ClientTransferForm } from "@/components/client-transfer-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientTransferPage() {
    return (
        <div className="space-y-8">
            <Button asChild variant="outline" size="sm">
                <Link href="/client/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour au tableau de bord
                </Link>
            </Button>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Effectuer un Virement</CardTitle>
                    <CardDescription>Remplissez les informations du bénéficiaire et le montant à envoyer.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ClientTransferForm />
                </CardContent>
            </Card>
        </div>
    );
}
