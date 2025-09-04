
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClientByIdentificationNumberAction, Client } from "@/app/actions/clients";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogOut, Landmark, Copy, User, Mail, Hash, Calendar, Wallet, History, BarChart3, TrendingUp, TrendingDown, Send, FileText, MessageSquare, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const StatCard = ({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-4xl font-bold text-primary">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);

const DashboardSkeleton = () => (
    <div className="space-y-8">
         <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <Skeleton className="h-48 rounded-lg" />
                <Skeleton className="h-48 rounded-lg" />
            </div>
             <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-48 rounded-lg" />
                 <Skeleton className="h-64 rounded-lg" />
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
                className="flex justify-between items-start"
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
            
            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.1 }}
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <StatCard icon={<Wallet className="h-5 w-5 text-muted-foreground"/>} title="Solde Actuel" value={formatCurrency(balance)} description="Solde disponible sur votre compte"/>
                <StatCard icon={<TrendingUp className="h-5 w-5 text-green-500"/>} title="Revenus (30j)" value={formatCurrency(totalIncome)} description="Total des crédits ce mois-ci"/>
                <StatCard icon={<TrendingDown className="h-5 w-5 text-red-500"/>} title="Dépenses (30j)" value={formatCurrency(totalExpenses)} description="Total des débits ce mois-ci"/>
            </motion.div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Column */}
                <div className="lg:col-span-1 space-y-8">
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary"/> Mon Profil</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="font-semibold">
                                    {client.firstName} {client.lastName}
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" /> <span className="truncate">{client.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Hash className="h-4 w-4 text-muted-foreground flex-shrink-0" /> <span>{client.identificationNumber}</span>
                                </div>
                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" /> <span>Client depuis le {new Date(client.creationDate).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <Card>
                            <CardHeader>
                                 <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5 text-primary"/> Informations Bancaires</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm font-mono">
                                 <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-muted-foreground font-sans text-xs uppercase tracking-wider">IBAN</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-accent/10" onClick={() => copyToClipboard(client.iban, 'IBAN')}>
                                            <Copy className="h-3 w-3"/>
                                        </Button>
                                    </div>
                                    <p className="break-all">{client.iban}</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-muted-foreground font-sans text-xs uppercase tracking-wider">SWIFT/BIC</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-accent/10" onClick={() => copyToClipboard(client.swiftCode, 'SWIFT/BIC')}>
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
                        <h3 className="text-lg font-semibold mb-4">Raccourcis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button asChild variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2"><Link href="/client/dashboard/transfer"><Send /><span>Faire un virement</span></Link></Button>
                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2"><FileText /><span>Demander un relevé</span></Button>
                            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2"><MessageSquare /><span>Contacter mon conseiller</span></Button>
                        </div>
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
                                                    <div className="flex items-center justify-end gap-2">
                                                        <CircleDollarSign className="h-4 w-4 opacity-70" />
                                                        <span>{t.amount >= 0 ? '+' : ''}{formatCurrency(t.amount)}</span>
                                                    </div>
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
