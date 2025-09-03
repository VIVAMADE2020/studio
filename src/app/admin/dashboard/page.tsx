import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { logoutAdmin, verifyAdminAuth } from '@/app/actions/admin-auth';

// Server action for logout
async function logout() {
    'use server';
    await logoutAdmin();
    redirect('/admin/login');
}

export default async function AdminDashboardPage() {
    const isAuthenticated = await verifyAdminAuth();

    if (!isAuthenticated) {
        redirect('/admin/login');
    }

    return (
        <div className="container py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Tableau de Bord Administrateur</h1>
                <form action={logout}>
                    <Button type="submit" variant="outline">Se déconnecter</Button>
                </form>
            </div>
            
            <p className="text-muted-foreground mb-8">Bienvenue dans l'espace d'administration. C'est ici que vous pourrez gérer vos clients et leurs comptes.</p>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Prochaines étapes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Nous allons maintenant construire ici la fonctionnalité pour créer et gérer vos clients.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
