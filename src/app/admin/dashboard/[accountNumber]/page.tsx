
import { getClientByIdentificationNumberAction } from "@/app/actions/clients";
import { AddTransactionForm } from "@/components/admin-add-transaction-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ArrowLeft, Landmark } from "lucide-react";
import Link from "next/link";

export default async function AdminClientDetailPage({ params }: { params: { accountNumber: string } }) {
    const { data: client, error } = await getClientByIdentificationNumberAction(params.accountNumber);

    if (error) {
        return <div className="container py-8 text-red-500">Erreur: {error}</div>;
    }

    if (!client) {
        return <div className="container py-8">Client non trouvé.</div>;
    }

    const balance = client.initialBalance + client.transactions.reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="container py-8">
            <Button asChild variant="outline" size="sm" className="mb-6">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la liste
                </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-6">Détails du Client</h1>

            <div className="grid lg:grid-cols-3 gap-8">
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
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5"/> Informations Bancaires</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2 font-mono">
                            <p><strong>IBAN:</strong> {client.iban}</p>
                            <p><strong>SWIFT/BIC:</strong> {client.swiftCode}</p>
                        </CardContent>
                    </Card>
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
                                            <TableCell colSpan={3} className="text-center text-muted-foreground">Aucune transaction.</TableCell>
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
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-primary">{formatCurrency(balance)}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Ajouter une Transaction</CardTitle>
                            <CardDescription>Créditez ou débitez le compte.</CardDescription>
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
