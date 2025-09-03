import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { logoutAdmin, verifyAdminAuth } from '@/app/actions/admin-auth';
import { AddClientForm } from '@/components/admin-add-client-form';
import { getClients } from '@/lib/firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { revalidatePath } from 'next/cache';

// Server action for logout
async function handleLogout() {
    'use server';
    await logoutAdmin();
    redirect('/admin/login');
}

export default async function AdminDashboardPage() {
    const isAuthenticated = await verifyAdminAuth();

    if (!isAuthenticated) {
        redirect('/admin/login');
    }

    let clients = [];
    try {
      clients = await getClients();
    } catch (error) {
        console.error("Erreur lors de la récupération des clients:", error);
        // Affiche une erreur ou un message dans le UI si nécessaire
    }


    return (
        <div className="container py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Tableau de Bord Administrateur</h1>
                <form action={handleLogout}>
                    <Button type="submit" variant="outline">Se déconnecter</Button>
                </form>
            </div>
            
            <p className="text-muted-foreground mb-8">Bienvenue dans l'espace d'administration. C'est ici que vous pourrez gérer vos clients et leurs comptes.</p>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>Ajouter un nouveau client</CardTitle>
                            <CardDescription>Créez un profil pour un nouveau client.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AddClientForm />
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Liste des Clients</CardTitle>
                             <CardDescription>Voici la liste de tous vos clients enregistrés.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Prénom</TableHead>
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Email</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clients.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>{client.firstName}</TableCell>
                                            <TableCell>{client.lastName}</TableCell>
                                            <TableCell>{client.email}</TableCell>
                                        </TableRow>
                                    ))}
                                     {clients.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                                                Aucun client pour le moment.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
