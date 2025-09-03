
"use client";

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

import { AdminLoginForm } from '@/components/admin-login-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddClientForm } from '@/components/admin-add-client-form';
import { getClients, Client } from '@/lib/firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<Client[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const fetchClients = async () => {
        try {
            const clientData = await getClients();
            setClients(clientData);
            setError(null);
        } catch (err) {
            console.error("Erreur lors de la récupération des clients:", err);
            setError("Impossible de charger les clients. Vérifiez les règles de sécurité Firestore.");
        }
    };
    
    useEffect(() => {
        if (user) {
           fetchClients();
        }
    }, [user]);

    const handleLogout = async () => {
        await auth.signOut();
        setUser(null);
        setClients([]);
    };
    
    const handleLoginSuccess = (loggedInUser: User) => {
        setUser(loggedInUser);
    }
    
    const handleClientAdded = () => {
        fetchClients(); // Re-fetch clients after adding a new one
    };


    if (loading) {
        return (
            <div className="container py-12">
                <Skeleton className="h-10 w-1/3 mb-8" />
                <Skeleton className="h-8 w-2/3 mb-8" />
                <div className="grid md:grid-cols-3 gap-8">
                    <Skeleton className="md:col-span-1 h-96" />
                    <Skeleton className="md:col-span-2 h-96" />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[80vh] bg-secondary/50">
                <Card className="w-full max-w-sm mx-4 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Accès Administrateur</CardTitle>
                        <CardDescription>
                           Connectez-vous pour accéder au panneau d'administration.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AdminLoginForm onLoginSuccess={handleLoginSuccess} />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Tableau de Bord</h1>
                    <p className="text-muted-foreground">Connecté en tant que {user.email}</p>
                </div>
                <Button onClick={handleLogout} variant="outline">Se déconnecter</Button>
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
                            <AddClientForm onClientAdded={handleClientAdded} />
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
                            {error && <p className="text-destructive text-center">{error}</p>}
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
                                     {clients.length === 0 && !error && (
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
