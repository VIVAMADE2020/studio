

import { ClientDashboard } from '@/components/client-dashboard';

export default async function ClientDashboardPage() {
    // Cette page est maintenant un simple conteneur.
    // Toute la logique d'authentification et de récupération de données
    // est déplacée dans le composant ClientDashboard.
    return <ClientDashboard />;
}
