
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientByAccountNumberAction, Client, Transaction } from "@/app/actions/clients";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardSkeleton = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
             <Skeleton className="h-8 w-64" />
             <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card><CardHeader><Skeleton className="h-5 w-32 mb-2" /><Skeleton className="h-8 w-40" /></CardHeader></Card>
            <Card><CardHeader><Skeleton className="h-5 w-32 mb-2" /><Skeleton className="h-8 w-40" /></CardHeader></Card>
            <Card><CardHeader><Skeleton className="h-5 w-32 mb-2" /><Skeleton className="h-8 w-40" /></CardHeader></Card>
            <Card><CardHeader><Skeleton className="h-5 w-32 mb-2" /><Skeleton className="h-8 w-40" /></CardHeader></Card>
        </div>
         <Card>
            <CardHeader><CardTitle>Historique des Transactions</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
    </div>
)

export default function ClientDashboardPage() {
    const [client, setClient] = useState<Client | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const accountNumber = sessionStorage.getItem('accountNumber');
        if (!accountNumber) {
            router.push('/client/access');
            return;
        }

        const fetchClientData = async () => {
            setIsLoading(true);
            const result = await getClientByAccountNumberAction(accountNumber);
            if (result.error || !result.data) {
                setError(result.error || "Impossible de charger les données.");
                sessionStorage.removeItem('accountNumber');
            } else {
                setClient(result.data);
            }
            setIsLoading(false);
        };

        fetchClientData();
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('accountNumber');
        router.push('/');
    }

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return (
             <Alert variant="destructive">
                <AlertTitle>Erreur d'accès</AlertTitle>
                <AlertDescription>{error} Veuillez <Link href="/client/access" className="underline">réessayer</Link>.</AlertDescription>
            </Alert>
        )
    }

    if (!client) {
        return null; // Should be redirected
    }

    const balance = client.initialBalance + client.transactions.reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Bienvenue, {client.firstName}</h1>
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Solde Actuel</CardTitle>
                        <CardDescription className="text-3xl font-bold text-primary pt-2">{formatCurrency(balance)}</CardDescription>
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Numéro de Compte</CardTitle>
                        <CardDescription className="text-xl font-semibold text-muted-foreground pt-2">{client.accountNumber}</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Client Depuis</CardTitle>
                        <CardDescription className="text-xl font-semibold text-muted-foreground pt-2">{new Date(client.creationDate).toLocaleDateString()}</CardDescription>
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription className="text-xl font-semibold text-muted-foreground pt-2">{client.transactions.length}</CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historique des Transactions</CardTitle>
                    <CardDescription>Voici la liste de vos dernières opérations.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Montant</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {client.transactions.length > 0 ? client.transactions.map(t => (
                                <TableRow key={t.id}>
                                    <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{t.description}</TableCell>
                                    <TableCell className={`text-right font-medium ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(t.amount)}
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-muted-foreground py-12">
                                        Vous n'avez aucune transaction pour le moment.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
