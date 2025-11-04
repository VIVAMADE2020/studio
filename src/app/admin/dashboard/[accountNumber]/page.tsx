
import { getClientByIdentificationNumberAction } from "@/app/actions/clients";
import { AdminClientDetail } from "@/components/admin-client-detail";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminClientDetailPage({ params }: { params: { accountNumber: string }}) {
    const { data: client, error } = await getClientByIdentificationNumberAction(params.accountNumber);

    if (error || !client) {
        return (
            <div className="container py-8">
                 <Button asChild variant="outline" size="sm" className="mb-6">
                    <Link href="/admin/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à la liste
                    </Link>
                </Button>
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Client non trouvé</AlertTitle>
                    <AlertDescription>
                        {error || "Impossible de charger les détails pour ce client."}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
       <div className="space-y-8">
            <Button asChild variant="outline" size="sm">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la liste des clients
                </Link>
            </Button>
            <AdminClientDetail client={client} />
       </div>
    );
}
