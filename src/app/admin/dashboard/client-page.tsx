
"use client";

import { useState, useEffect } from 'react';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

function AdminDashboard({ initialClients, error }: { initialClients: Client[] | null, error: string | null }) {
    const [clients, setClients] = useState<Client[]>(initialClients || []);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageError, setPageError] = useState<string | null>(error);

    const fetchClients = async () => {
        try {
            const { data, error: fetchError } = await getClientsAction();
            if (fetchError) {
                throw new Error(fetchError);
            }
            setClients(data || []);
            setPageError(null);
        } catch (err: any) {
            console.error("Erreur lors de la récupération des clients:", err);
            setPageError(err.message || "Une erreur inattendue est survenue.");
        }
    };
    
    const handleClientAdded = () => {
        fetchClients();
    };

    const handleManageClient = (client: Client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const handleModalClose = (wasUpdated: boolean) => {
        setIsModalOpen(false);
        setSelectedClient(null);
        if (wasUpdated) {
            fetchClients();
        }
    };

    return (
        <>
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
                            {pageError && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Erreur</AlertTitle>
                                    <AlertDescription>{pageError}</AlertDescription>
                                </Alert>
                            )}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Numéro de compte</TableHead>
                                        <TableHead className="text-right">Solde</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {clients.map((client) => (
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
                                            <TableCell>
                                                <div className="font-mono text-xs">{client.accountNumber}</div>
                                            </TableCell>
                                            <TableCell className="text-right">{formatCurrency(client.accountBalance || 0)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" onClick={() => handleManageClient(client)}>Gérer</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                     {clients.length === 0 && !pageError && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
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


export function AdminDashboardClientPage({ initialClients, error }: { initialClients: Client[] | null, error: string | null }) {
     return (
        <div className="container py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Tableau de Bord Administrateur</h1>
                </div>
            </div>
            
            <p className="text-muted-foreground mb-8">Bienvenue dans l'espace d'administration. C'est ici que vous pourrez gérer vos clients et leurs comptes.</p>
            <AdminDashboard initialClients={initialClients} error={error} />
        </div>
    );
}
