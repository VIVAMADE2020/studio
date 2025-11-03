
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminClientDetailPage() {
    const error = "Cette fonctionnalité est désactivée car aucune base de données n'est configurée.";
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
                <AlertTitle>Fonctionnalité désactivée</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        </div>
    );
}
