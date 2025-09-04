
import { getClientsAction } from "@/app/actions/clients";
import { AdminClientList } from "@/components/admin-client-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
    const { data: clients, error } = await getClientsAction();

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur de chargement des clients</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        )
    }
    
    if (!clients) {
        return <div className="container py-8">Chargement des clients...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Liste des Clients</CardTitle>
                <CardDescription>Gérez les comptes et les transactions des clients.</CardDescription>
            </CardHeader>
            <CardContent>
                <AdminClientList initialClients={clients} />
            </CardContent>
        </Card>
    );
}
