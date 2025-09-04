
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientByIdentificationNumberAction, Client } from "@/app/actions/clients";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogOut, Landmark, Copy, User, Mail, Hash, Calendar, Wallet, History, BarChart3, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ClientDashboardChart } from "@/components/client-dashboard-chart";

const DashboardSkeleton = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <Card><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-40 w-full" /></CardContent></Card>
            </div>
            <div className="lg:col-span-2 space-y-8">
                <Card><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
                <Card><CardContent className="p-6"><Skeleton className="h-48 w-full" /></CardContent></Card>
            </div>
        </div>
    </div>
);

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
            description: "Le texte a bien été copié dans le presse-papiers.",
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
        );
    }

    if (!client) {
        return null; // Should be redirected
    }

    const balance = client.initialBalance + client.transactions.reduce((acc, t) => acc + t.amount, 0);
    const sortedTransactions = [...client.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const totalIncome = client.transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = client.transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);


    return (
        <div className="space-y-8">
             <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center"
            >
                 <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Bonjour, {client.firstName}</h1>
                    <p className="text-muted-foreground">Bienvenue sur votre espace personnel.</p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        <Card className="shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Solde Actuel</CardTitle>
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-primary">{formatCurrency(balance)}</div>
                                <div className="grid grid-cols-2 gap-4 text-xs mt-4 text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                        <span>{formatCurrency(totalIncome)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                        <span>{formatCurrency(totalExpenses)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <Card>
                             <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Mon Profil</CardTitle>
                                <User className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm pt-4">
                                <div className="flex items-center gap-3 font-semibold text-card-foreground">
                                    <span>{client.firstName} {client.lastName}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" /> <span className="truncate">{client.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Hash className="h-4 w-4 text-muted-foreground flex-shrink-0" /> <span>{client.identificationNumber}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" /> <span>Client depuis le {new Date(client.creationDate).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                         <Card>
                             <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Coordonnées Bancaires</CardTitle>
                                <Landmark className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4 text-sm font-mono">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-muted-foreground font-sans text-xs uppercase tracking-wider">IBAN</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(client.iban, 'IBAN')}>
                                            <Copy className="h-3 w-3"/>
                                        </Button>
                                    </div>
                                    <p className="break-all">{client.iban}</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-muted-foreground font-sans text-xs uppercase tracking-wider">SWIFT/BIC</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(client.swiftCode, 'SWIFT/BIC')}>
                                            <Copy className="h-3 w-3"/>
                                        </Button>
                                    </div>
                                    <p>{client.swiftCode}</p>
                                </div>
                            </CardContent>
                         </Card>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2 space-y-8">
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                        <Card>
                             <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle>Activité Récente</CardTitle>
                                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                {sortedTransactions.length > 0 ? (
                                    <div className="h-80 w-full">
                                         <ClientDashboardChart data={sortedTransactions} />
                                    </div>
                                ) : (
                                    <div className="h-80 flex flex-col items-center justify-center text-center text-muted-foreground">
                                        <BarChart3 className="h-12 w-12 mb-4" />
                                        <p>Le graphique de vos activités apparaîtra ici dès que vous aurez des transactions.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle>Historique des Transactions</CardTitle>
                                <History className="h-5 w-5 text-muted-foreground" />
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
                                        {sortedTransactions.length > 0 ? sortedTransactions.slice(0, 10).map(t => (
                                            <TableRow key={t.id}>
                                                <TableCell className="text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString()}</TableCell>
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
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

    