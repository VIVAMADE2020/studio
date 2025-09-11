
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentGenerator } from "@/components/admin-document-generator";

export default function AdminDocumentsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Générateur de Documents</CardTitle>
                <CardDescription>Sélectionnez un type de document, remplissez les informations et téléchargez le PDF.</CardDescription>
            </CardHeader>
            <CardContent>
                <DocumentGenerator />
            </CardContent>
        </Card>
    );
}
