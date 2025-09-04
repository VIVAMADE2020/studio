
import { getClientsAction } from "@/app/actions/clients";
import { AdminClientList } from "@/components/admin-client-list";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboardPage() {
    const { data: clients, error } = await getClientsAction();

    if (error) {
        return <div className="container py-8 text-red-500">Erreur: {error}</div>;
    }
    
    if (!clients) {
        return <div className="container py-8">Chargement des clients...</div>;
    }

    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-6">Tableau de Bord Administrateur</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Liste des Clients</CardTitle>
                    <CardDescription>Gérez les comptes et les transactions des clients.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AdminClientList initialClients={clients} />
                </CardContent>
            </Card>
        </div>
    );
}
