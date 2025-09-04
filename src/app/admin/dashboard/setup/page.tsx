
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function SetupPage() {
    const [formScriptUrl, setFormScriptUrl] = useState('');
    const dbScriptUrl = "https://script.google.com/macros/s/AKfycbyWzj486ByUiPNxw_a0L0deWTORGxCnskp5HtYly0Njmi4wtEPX3Sa3bZVbp3AZjdVy/exec";
    const { toast } = useToast();

    const envFileContent = `
# URL pour les formulaires (contact, demande de prêt)
GOOGLE_SCRIPT_WEB_APP_URL=${formScriptUrl}

# URL pour la base de données clients sur Google Drive
GOOGLE_SCRIPT_DB_URL=${dbScriptUrl}
`.trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(envFileContent);
        toast({
            title: "Copié !",
            description: "Le contenu a été copié dans votre presse-papiers.",
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Configuration de l'Application</CardTitle>
                    <CardDescription>
                        Suivez ces étapes pour finaliser la connexion entre votre application et vos scripts Google.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="formScriptUrl">1. URL du script pour les formulaires</Label>
                        <p className="text-xs text-muted-foreground">
                            Collez ici l'URL de votre script Google qui gère les formulaires de contact et de demande de prêt.
                        </p>
                        <Input
                            id="formScriptUrl"
                            placeholder="https://script.google.com/macros/s/..."
                            value={formScriptUrl}
                            onChange={(e) => setFormScriptUrl(e.target.value)}
                        />
                    </div>
                     <div className="space-y-2">
                        <Label>2. URL du script pour la base de données</Label>
                         <p className="text-xs text-muted-foreground">
                            Cette URL est déjà configurée pour le script de base de données que je vous ai fourni.
                        </p>
                        <Input
                            id="dbScriptUrl"
                            value={dbScriptUrl}
                            readOnly
                            className="bg-muted"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>3. Créez votre fichier d'environnement</Label>
                            <Button variant="outline" size="sm" onClick={handleCopy}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copier le contenu
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                           À la racine de votre projet, créez un fichier nommé <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> et collez-y le contenu ci-dessous.
                        </p>
                        <Textarea
                            readOnly
                            value={envFileContent}
                            rows={5}
                            className="font-mono bg-muted"
                        />
                    </div>
                </CardContent>
            </Card>

            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>N'oubliez pas de redémarrer !</AlertTitle>
                <AlertDescription>
                    Après avoir créé ou modifié le fichier <code className="bg-muted px-1 py-0.5 rounded">.env.local</code>, vous devez redémarrer votre serveur de développement pour que les changements soient pris en compte.
                </AlertDescription>
            </Alert>
        </div>
    );
}
