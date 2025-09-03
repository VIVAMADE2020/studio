
"use client";

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

import { AdminLoginForm } from '@/components/admin-login-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddClientForm } from '@/components/admin-add-client-form';
import { Client } from '@/lib/firebase/firestore';
import { getClientsAction } from '@/app/actions/admin-clients';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { AdminManageClientModal } from '@/components/admin-manage-client-modal';

export default function AdminDashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<Client[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const result = await getClientsAction();
            if (result.success && result.data) {
                setClients(result.data);
                setError(null);
            } else {
                 setError(result.error || "Impossible de charger les clients.");
            }
        } catch (err) {
            console.error("Erreur lors de la récupération des clients:", err);
            setError("Une erreur inattendue est survenue.");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (user) {
           fetchClients();
        }
    }, [user, refreshKey]);

    const handleLogout = async () => {
        await auth.signOut();
        setUser(null);
        setClients([]);
    };
    
    const handleLoginSuccess = (loggedInUser: User) => {
        setUser(loggedInUser);
    };
    
    const handleClientAdded = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    const handleManageClient = (client: Client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleModalClose = (wasUpdated: boolean) => {
        setIsModalOpen(false);
        setSelectedClient(null);
        if (wasUpdated) {
            setRefreshKey(oldKey => oldKey + 1);
        }
    };


    if (loading && !user) {
        return (
            <div className="container py-12">
                <Skeleton className="h-10 w-1/3 mb-8" />
                <Skeleton className="h-8 w-2/3 mb-8" />
                <div className="grid md:grid-cols-3 gap-8">
                    <Skeleton className="md:col-span-1 h-[600px]" />
                    <Skeleton className="md:col-span-2 h-[600px]" />
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
        <>
            <div className="container py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">Tableau de Bord</h1>
                        <p className="text-muted-foreground">Connecté en tant que {user.email}</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline">Se déconnecter</Button>
                </div>
                
                <p className="text-muted-foreground mb-8">Bienvenue dans l'espace d'administration. C'est ici que vous pourrez gérer vos clients et leurs comptes.</p>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                         <AddClientForm onClientAdded={handleClientAdded} />
                    </div>
                    <div className="lg:col-span-2">
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
                                            <TableHead>Client</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead className="text-right">Solde</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading && (
                                            Array.from({ length: 3 }).map((_, i) => (
                                                <TableRow key={i}>
                                                    <TableCell><Skeleton className="h-6 w-32"/></TableCell>
                                                    <TableCell><Skeleton className="h-6 w-16"/></TableCell>
                                                    <TableCell className="text-right"><Skeleton className="h-6 w-24 ml-auto"/></TableCell>
                                                    <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto"/></TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                        {!loading && clients.map((client) => (
                                            <TableRow key={client.id}>
                                                <TableCell>
                                                    <div className="font-medium">{client.firstName} {client.lastName}</div>
                                                    <div className="text-sm text-muted-foreground">{client.email}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={client.accountType === 'loan' ? 'secondary' : 'default'}>
                                                        {client.accountType === 'loan' ? 'Prêt' : 'Courant'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">{formatCurrency(client.accountBalance || 0)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm" onClick={() => handleManageClient(client)}>Gérer</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                         {!loading && clients.length === 0 && !error && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
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

            {selectedClient && (
                <AdminManageClientModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    client={selectedClient}
                />
            )}
        </>
    );
}
