
"use client";

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { getClientDataAction } from '@/app/actions/admin-clients';
import { Client } from '@/lib/firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Banknote, Landmark, Percent, Calendar, FileText, AlertCircle } from 'lucide-react';

export function ClientDashboard() {
    const [user, authLoading] = useAuthState(auth);
    const [clientData, setClientData] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading) {
            setLoading(true);
            return;
        }
        
        if (user) {
            const fetchClientData = async () => {
                setLoading(true);
                try {
                    const idToken = await user.getIdToken(true);
                    const { data, error: fetchError } = await getClientDataAction(user.uid, idToken);
                    
                    if (fetchError) {
                        setError(fetchError);
                        setClientData(null);
                    } else if (data) {
                        setClientData(data);
                        setError(null);
                    } else {
                        // This case handles when data is null but there is no error,
                        // meaning the profile was not found.
                        setError("Le profil client associé à votre compte est introuvable.");
                        setClientData(null);
                    }
                } catch(e: any) {
                    setError("Une erreur est survenue lors de la récupération de votre session.");
                } finally {
                     setLoading(false);
                }
            };
            fetchClientData();
        } else {
            // User is not logged in, layout will handle redirection.
            setLoading(false);
        }
    }, [user, authLoading]);

    if (loading || authLoading) {
        return (
             <div className="container py-12">
                <div className="max-w-5xl mx-auto">
                    <Skeleton className="h-10 w-1/3 mb-4" />
                    <Skeleton className="h-6 w-1/2 mb-8" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        <Skeleton className="h-32" />
                        <Skeleton className="h-32" />
                        <Skeleton className="h-32" />
                    </div>
                    <Skeleton className="h-48 mb-8" />
                    <Skeleton className="h-96" />
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="container py-12">
                 <div className="max-w-xl mx-auto">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erreur de chargement</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }
    
    if (!clientData) {
        // This case is for when loading is finished but there's no user.
        // It should be handled by the layout redirecting to /login
        return null;
    }

    const sortedTransactions = [...(clientData.transactions || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="bg-secondary/50 min-h-screen">
            <div className="container py-12">
                 <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary">Bonjour, {clientData.firstName}</h1>
                        <p className="text-muted-foreground">Bienvenue sur votre espace client sécurisé.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Solde Actuel</CardTitle>
                                <Banknote className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(clientData.accountBalance || 0)}</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Type de Compte</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold capitalize">{clientData.accountType === 'loan' ? 'Prêt' : 'Courant'}</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Numéro de Compte</CardTitle>
                                <Landmark className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-semibold font-mono">{clientData.accountNumber}</div>
                            </CardContent>
                        </Card>
                    </div>

                    {clientData.accountType === 'loan' && clientData.loanDetails && (
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Détails de votre prêt</CardTitle>
                            </CardHeader>
                            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="flex items-center gap-3">
                                    <Banknote className="h-6 w-6 text-accent"/>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Montant Emprunté</p>
                                        <p className="font-bold">{formatCurrency(clientData.loanDetails.loanAmount)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Percent className="h-6 w-6 text-accent"/>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Taux Annuel</p>
                                        <p className="font-bold">{clientData.loanDetails.interestRate}%</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-6 w-6 text-accent"/>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Durée</p>
                                        <p className="font-bold">{clientData.loanDetails.loanDuration} mois</p>
                                    </div>
                                </div>
                                 <Alert>
                                    <Banknote className="h-4 w-4"/>
                                    <AlertTitle className="font-bold">Mensualité</AlertTitle>
                                    <AlertDescription>
                                        {formatCurrency(clientData.loanDetails.monthlyPayment)}
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Historique des transactions</CardTitle>
                            <CardDescription>Retrouvez ici la liste de vos dernières opérations.</CardDescription>
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
                                    {sortedTransactions.length > 0 ? sortedTransactions.map((tx) => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</TableCell>
                                            <TableCell>{tx.description}</TableCell>
                                            <TableCell className="text-right font-mono">
                                                <span className={tx.amount > 0 ? 'text-green-600' : 'text-destructive'}>
                                                    {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                                Aucune transaction pour le moment.
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
