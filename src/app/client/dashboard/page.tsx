
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClientByIdentificationNumberAction, Client } from '@/app/actions/clients';
import { ClientDashboard } from '@/components/client-dashboard';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ClientDashboardPage() {
    const [client, setClient] = useState<Client | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchClientData = async () => {
            const identificationNumber = sessionStorage.getItem('identificationNumber');
            if (!identificationNumber) {
                router.replace('/client/access');
                return;
            }

            try {
                const result = await getClientByIdentificationNumberAction(identificationNumber);
                if (result.success && result.data) {
                    setClient(result.data);
                } else {
                    setError(result.error || "Impossible de récupérer les informations du client.");
                    // Clear session if client not found
                    sessionStorage.removeItem('identificationNumber');
                }
            } catch (e) {
                setError("Une erreur de communication est survenue.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientData();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (error) {
        return (
             <div className="flex items-center justify-center min-h-[60vh]">
                 <Alert variant="destructive" className="max-w-md">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        {error} Veuillez vous <a href="/client/access" className="underline">reconnecter</a>.
                    </AlertDescription>
                </Alert>
             </div>
        );
    }

    if (!client) {
         router.replace('/client/access');
         return null;
    }

    return <ClientDashboard client={client} />;
}
