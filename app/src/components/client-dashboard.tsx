
"use client";

import { Client, Transaction } from "@/app/actions/clients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, cn } from "@/lib/utils";
import { ArrowRight, PlusCircle, CheckCircle, Clock, XCircle, AlertCircle, TrendingUp, Banknote, Building, LogOut } from "lucide-react";
import Link from "next/link";
import { ClientDashboardChart } from "./client-dashboard-chart";
import { useRouter } from "next/navigation";
import { LoanDetailsCard } from "./client-loan-details-card";
import { TransactionProgress } from "./client-transaction-progress";


const TransactionStatusIcon = ({ status }: { status: Transaction['status']}) => {
    switch (status) {
        case 'COMPLETED':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'PENDING':
            return <Clock className="h-5 w-5 text-yellow-500" />;
        case 'FAILED':
            return <XCircle className="h-5 w-5 text-red-500" />;
        default:
            return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
}

const AccountTypeIcon = ({ type }: { type: Client['accountType']}) => {
     switch (type) {
        case 'LOAN':
            return <Banknote className="h-5 w-5 text-primary"/>;
        case 'INVESTMENT':
            return <TrendingUp className="h-5 w-5 text-primary"/>;
        default:
            return <Building className="h-5 w-5 text-primary"/>;
    }
}

interface ClientDashboardProps {
    client: Client;
}

export function ClientDashboard({ client }: ClientDashboardProps) {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('identificationNumber');
        router.push('/client/access');
    }

    const balance = client.initialBalance + client.transactions.reduce((acc, t) => acc + t.amount, 0);
    const sortedTransactions = [...client.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-primary">Bonjour, {client.firstName}</h1>
                    <p className="text-muted-foreground">Bienvenue sur votre espace personnel.</p>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Balance and Actions */}
                    <Card className="bg-primary text-primary-foreground shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-medium uppercase tracking-wider text-primary-foreground/80">Solde Actuel</CardTitle>
                                <CardDescription className="text-4xl font-bold text-white">{formatCurrency(balance)}</CardDescription>
                            </div>
                             <div className="flex gap-2">
                                <Button asChild variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                                    <Link href="/client/dashboard/transfer">
                                        <ArrowRight className="mr-2 h-4 w-4" />
                                        Faire un virement
                                    </Link>
                                </Button>
                             </div>
                        </CardHeader>
                    </Card>

                    {/* Transactions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Historique des Transactions</CardTitle>
                            <CardDescription>Vos 15 dernières opérations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-80 w-full text-foreground/80">
                               <ClientDashboardChart data={sortedTransactions} />
                             </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Side Column */}
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AccountTypeIcon type={client.accountType} />
                                Mon Compte
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                             <div className="flex justify-between"><span>Type:</span> <span className="font-medium">{client.accountType}</span></div>
                             <div className="flex justify-between"><span>N° de compte:</span> <span className="font-medium">{client.accountNumber}</span></div>
                             <div className="flex justify-between"><span>IBAN:</span> <span className="font-medium">{client.iban}</span></div>
                             <div className="flex justify-between"><span>SWIFT:</span> <span className="font-medium">{client.swiftCode}</span></div>
                             <div className="flex justify-between"><span>Ouvert le:</span> <span className="font-medium">{new Date(client.creationDate).toLocaleDateString()}</span></div>
                        </CardContent>
                    </Card>

                    {client.accountType === 'LOAN' && client.loanDetails && (
                        <Card>
                            <CardHeader><CardTitle>Détails du Prêt</CardTitle></CardHeader>
                            <CardContent>
                                <LoanDetailsCard loanDetails={client.loanDetails} />
                            </CardContent>
                        </Card>
                    )}
                    
                     {client.accountType === 'INVESTMENT' && client.investmentDetails && (
                        <Card>
                            <CardHeader><CardTitle>Détails de l'Investissement</CardTitle></CardHeader>
                            <CardContent className="text-sm space-y-2">
                               <div className="flex justify-between"><span>Montant investi:</span> <span className="font-medium">{formatCurrency(client.investmentDetails.investedAmount)}</span></div>
                               <div className="flex justify-between"><span>Taux de rendement:</span> <span className="font-medium">{client.investmentDetails.returnRate}% / an</span></div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

             {/* Transaction List */}
             <Card>
                <CardHeader>
                    <CardTitle>Toutes les Opérations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {sortedTransactions.slice(0, 10).map(tx => (
                            <div key={tx.id} className="p-3 rounded-lg bg-secondary/50">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <TransactionStatusIcon status={tx.status} />
                                        <div>
                                            <p className="font-semibold">{tx.description}</p>
                                            <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleString('fr-FR')}</p>
                                        </div>
                                    </div>
                                    <div className={cn("font-bold text-lg", tx.amount > 0 ? "text-green-600" : "text-red-600")}>
                                        {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                                    </div>
                                </div>
                                {tx.status === 'PENDING' && tx.estimatedCompletionDate && (
                                    <div className="mt-2 pl-8">
                                       <TransactionProgress transaction={tx} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
