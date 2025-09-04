
import { getClientsAction } from "@/app/actions/clients";
import { AdminClientList } from "@/components/admin-client-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
    // Affiche une alerte si les variables d'environnement ne sont pas configurées
    if (!process.env.GOOGLE_SCRIPT_DB_URL || !process.env.GOOGLE_SCRIPT_WEB_APP_URL) {
        return (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Configuration Requise</AlertTitle>
                <AlertDescription>
                    Les URLs de vos scripts Google ne sont pas configurées. Veuillez vous rendre sur la page de <Link href="/admin/dashboard/setup" className="underline font-semibold">Configuration</Link> pour finaliser l'installation.
                </AlertDescription>
            </Alert>
        )
    }

    const { data: clients, error } = await getClientsAction();

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur de chargement des clients</AlertTitle>
                <AlertDescription>
                    {error}
                    <p className="mt-2 text-xs">Assurez-vous que l'URL du script de base de données est correcte dans la page de <Link href="/admin/dashboard/setup" className="underline font-semibold">Configuration</Link> et que le script est bien déployé avec un accès pour "Tout le monde".</p>
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
