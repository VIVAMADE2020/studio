
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientByIdentificationNumberAction, Client } from "@/app/actions/clients";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogOut, Landmark, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const DashboardSkeleton = () => (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column Skeleton */}
        <div className="lg:col-span-1 space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-64" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-12 w-40" />
                </CardHeader>
            </Card>
            <div className="space-y-4">
                 <Skeleton className="h-5 w-32" />
                 <Skeleton className="h-5 w-full" />
                 <Skeleton className="h-5 w-full" />
            </div>
             <Skeleton className="h-10 w-32" />
        </div>
        {/* Right Column Skeleton */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-64" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
)

export default function ClientDashboardPage() {
    const [client, setClient] = useState<Client | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const identificationNumber = sessionStorage.getItem('identificationNumber');
        if (!identificationNumber) {
            router.push('/client/access');
            return;
        }

        const fetchClientData = async () => {
            setIsLoading(true);
            const result = await getClientByIdentificationNumberAction(identificationNumber);
            if (result.error || !result.data) {
                setError(result.error || "Impossible de charger les données.");
                sessionStorage.removeItem('identificationNumber');
            } else {
                setClient(result.data);
            }
            setIsLoading(false);
        };

        fetchClientData();
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('identificationNumber');
        router.push('/');
    };
    
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: `${label} copié !`,
            description: "Le numéro a bien été copié dans le presse-papiers.",
        });
    };

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
    const sortedTransactions = [...client.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return (
        <div className="grid lg:grid-cols-3 gap-12 items-start">
           
            {/* Left Column */}
            <div className="lg:col-span-1 flex flex-col gap-8 sticky top-24">
                <div>
                    <h1 className="text-2xl font-bold">Bonjour, {client.firstName}</h1>
                    <p className="text-muted-foreground">Bienvenue sur votre espace personnel.</p>
                </div>

                <Card className="w-full shadow-lg">
                    <CardHeader>
                        <CardDescription>Solde disponible</CardDescription>
                        <CardTitle className="text-4xl">{formatCurrency(balance)}</CardTitle>
                    </CardHeader>
                </Card>

                <div className="space-y-4 text-sm">
                    <h3 className="font-semibold text-primary">Vos coordonnées bancaires</h3>
                    <div className="font-mono">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">IBAN</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(client.iban, 'IBAN')}>
                                <Copy className="h-4 w-4"/>
                            </Button>
                        </div>
                        <p>{client.iban}</p>
                    </div>
                     <div className="font-mono">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">SWIFT/BIC</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyToClipboard(client.swiftCode, 'SWIFT/BIC')}>
                                <Copy className="h-4 w-4"/>
                            </Button>
                        </div>
                        <p>{client.swiftCode}</p>
                    </div>
                </div>
                
                <Button variant="outline" onClick={handleLogout} className="w-fit">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Button>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
                 <Card className="shadow-lg">
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
                                {sortedTransactions.length > 0 ? sortedTransactions.map(t => (
                                    <TableRow key={t.id}>
                                        <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{t.description}</TableCell>
                                        <TableCell className={`text-right font-medium ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {t.amount >= 0 ? '+' : ''}{formatCurrency(t.amount)}
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
        </div>
    );
}

