
"use client";

import { Client, Transaction } from "@/app/actions/clients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTransactionForm } from "./admin-add-transaction-form";
import { CheckCircle, Clock, XCircle, AlertCircle, PlusCircle } from "lucide-react";
import { AdminTransferSettingsForm } from "./admin-transfer-settings-form";
import { AdminBlockSettingsForm } from "./admin-block-settings-form";
import { LoanDetailsCard } from "./client-loan-details-card";

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

interface AdminClientDetailProps {
    client: Client;
}

export function AdminClientDetail({ client }: AdminClientDetailProps) {
    const balance = client.initialBalance + client.transactions.reduce((acc, t) => acc + t.amount, 0);
    const sortedTransactions = [...client.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Détails du Client</CardTitle>
                    <CardDescription>{client.firstName} {client.lastName}</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-sm">
                    <div><strong>Email:</strong> {client.email}</div>
                    <div><strong>N° Identification:</strong> {client.identificationNumber}</div>
                    <div><strong>Solde:</strong> <span className="font-bold text-lg">{formatCurrency(balance)}</span></div>
                    <div><strong>N° Compte:</strong> {client.accountNumber}</div>
                    <div><strong>IBAN:</strong> {client.iban}</div>
                    <div><strong>SWIFT:</strong> {client.swiftCode}</div>
                    <div><strong>Créé le:</strong> {new Date(client.creationDate).toLocaleDateString()}</div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                     <Card>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>Transactions</CardTitle>
                             <Dialog>
                                <DialogTrigger asChild>
                                <Button size="sm">
                                    <PlusCircle className="mr-2 h-4 w-4"/>
                                    Ajouter une transaction
                                </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Nouvelle Transaction</DialogTitle>
                                    <DialogDescription>
                                        Créditez ou débitez manuellement le compte du client.
                                    </DialogDescription>
                                </DialogHeader>
                                <AddTransactionForm identificationNumber={client.identificationNumber} />
                                </DialogContent>
                            </Dialog>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                                {sortedTransactions.length > 0 ? sortedTransactions.map(tx => (
                                    <div key={tx.id} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
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
                                )) : <p className="text-muted-foreground text-center">Aucune transaction.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                 <div className="space-y-8">
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
                    <Card>
                        <CardHeader><CardTitle>Délai des Virements</CardTitle></CardHeader>
                        <CardContent>
                            <AdminTransferSettingsForm 
                                identificationNumber={client.identificationNumber}
                                currentSettings={client.transferSettings}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Blocage des Virements</CardTitle></CardHeader>
                        <CardContent>
                             <AdminBlockSettingsForm 
                                identificationNumber={client.identificationNumber}
                                isBlocked={client.isBlocked || false}
                                blockReason={client.blockReason || ''}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
