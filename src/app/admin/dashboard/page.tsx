
import { getClientsAction } from '@/app/actions/admin-clients';
import { Client } from '@/lib/firebase/firestore';
import { AdminDashboardClientPage } from './client-page';


export default async function AdminDashboardPage() {
    // This now runs on the server, ensuring data is fetched with admin privileges
    // before the page is rendered.
    const { data: initialClients, error } = await getClientsAction();

    // We pass the fetched data and any potential error to the client component.
    return <AdminDashboardClientPage initialClients={initialClients} error={error} />;
}
