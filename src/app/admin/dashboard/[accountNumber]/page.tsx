
import { getClientByIdentificationNumberAction } from "@/app/actions/clients";
import { AddTransactionForm } from "@/components/admin-add-transaction-form";
import { AdminTransferSettingsForm } from "@/components/admin-transfer-settings-form";
import { LoanDetailsCard } from "@/components/client-loan-details-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, Building, Settings, Banknote, ShieldBan } from "lucide-react";
import Link from "next/link";
import { AdminBlockSettingsForm } from "@/components/admin-block-settings-form";

export default async function AdminClientDetailPage({ params }: { params: { accountNumber: string } }) {
    const { data: client, error } = await getClientByIdentificationNumberAction(params.accountNumber);

    if (error) {
        return <div className="container py-8 text-red-500">Erreur: {error}</div>;
    }

    if (!client) {
        return <div className="container py-8">Client non trouvé.</div>;
    }

    const completedTransactions = client.transactions.filter(t => t.status === 'COMPLETED');
    const balance = client.initialBalance + completedTransactions.reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="container py-8">
            <Button asChild variant="outline" size="sm" className="mb-6">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la liste
                </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-6">Détails du Client</h1>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations Personnelles</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <p><strong>Nom:</strong> {client.firstName} {client.lastName}</p>
                            <p><strong>N° d'identification:</strong> {client.identificationNumber}</p>
                            <p><strong>Email:</strong> {client.email}</p>
                            <p><strong>Client depuis:</strong> {new Date(client.creationDate).toLocaleDateString()}</p>
                            <p><strong>Type de compte:</strong> <span className={`px-2 py-1 text-xs rounded-full font-medium ${client.accountType === 'LOAN' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>{client.accountType}</span></p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5"/> Informations Bancaires</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2 font-mono">
                            <p><strong>N° de Compte:</strong> {client.accountNumber}</p>
                            <p><strong>IBAN:</strong> {client.iban}</p>
                            <p><strong>SWIFT/BIC:</strong> {client.swiftCode}</p>
                        </CardContent>
                    </Card>
                     {client.accountType === 'LOAN' && client.loanDetails && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Banknote className="h-5 w-5"/> Détails du Prêt</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <LoanDetailsCard loanDetails={client.loanDetails} />
                            </CardContent>
                        </Card>
                    )}
                     <Card>
                        <CardHeader>
                            <CardTitle>Historique des Transactions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Montant</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {client.transactions.length > 0 ? client.transactions.map(t => (
                                        <TableRow key={t.id}>
                                            <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                                            <TableCell>{t.description}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                                    t.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                    t.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    t.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {t.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className={`text-right font-medium ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {formatCurrency(t.amount)}
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground">Aucune transaction.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Solde Actuel</CardTitle>
                            <CardDescription>Basé sur les transactions complétées.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-primary">{formatCurrency(balance)}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5"/> Configuration des Virements</CardTitle>
                            <CardDescription>Définissez le délai de traitement des virements sortants pour ce client.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <AdminTransferSettingsForm 
                                identificationNumber={client.identificationNumber}
                                currentSettings={client.transferSettings}
                           />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><ShieldBan className="h-5 w-5"/> Blocage des Virements</CardTitle>
                            <CardDescription>Activez le blocage pour empêcher les virements sortants.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AdminBlockSettingsForm 
                                identificationNumber={client.identificationNumber}
                                isBlocked={client.isBlocked || false}
                                blockReason={client.blockReason || ''}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Ajouter une Transaction Manuelle</CardTitle>
                            <CardDescription>Créditez ou débitez le compte instantanément (statut "COMPLETED").</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <AddTransactionForm identificationNumber={client.identificationNumber} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
