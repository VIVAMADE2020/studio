import { getClientDataAction } from '@/app/actions/admin-clients';
import { auth } from '@/lib/firebase/config';
import { ClientDashboard } from '@/components/client-dashboard';
import { getCurrentUser } from '@/lib/firebase/auth';


export default async function ClientDashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        // This case should be handled by the layout, but as a safeguard:
        return (
            <div className="container py-12 text-center">
                <p>Vous devez être connecté pour voir cette page.</p>
            </div>
        );
    }
    
    // This now runs on the server, ensuring data is fetched with admin privileges
    // before the page is rendered.
    const { data: initialClientData, error } = await getClientDataAction(user.uid);

    // We pass the fetched data and any potential error to the client component.
    return <ClientDashboard initialClientData={initialClientData} error={error} />;
}
