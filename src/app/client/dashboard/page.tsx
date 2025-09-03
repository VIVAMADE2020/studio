import { getClientDataAction } from '@/app/actions/admin-clients';
import { auth } from '@/lib/firebase/admin';
import { ClientDashboard } from '@/components/client-dashboard';
import { cookies } from 'next/headers';


export default async function ClientDashboardPage() {
    const cookieStore = cookies();
    const idToken = cookieStore.get('firebaseIdToken')?.value;

    let user = null;
    if (idToken) {
        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            user = await auth.getUser(decodedToken.uid);
        } catch (error) {
            console.error("Token verification failed:", error);
            // The token is invalid, so the user is not authenticated.
            user = null;
        }
    }


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
