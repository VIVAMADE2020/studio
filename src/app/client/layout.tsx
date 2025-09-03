
"use client";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    // Si le chargement est terminé et qu'il n'y a pas d'utilisateur,
    // on redirige vers la page de connexion.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);


  // Pendant le chargement de l'état d'authentification, on affiche un skeleton.
  // C'est crucial pour empêcher le rendu des pages enfants (comme le tableau de bord)
  // avant que l'on soit certain que l'utilisateur est bien connecté.
  if (loading) {
    return (
        <div className="container py-12">
            <div className="max-w-5xl mx-auto">
                <Skeleton className="h-10 w-1/3 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
                <Skeleton className="h-96" />
            </div>
        </div>
    );
  }

  // En cas d'erreur d'authentification.
  if (error) {
    return <div className="text-center py-12 text-destructive">Une erreur d'authentification est survenue.</div>;
  }
  
  // Si l'utilisateur est bien connecté, on affiche la page demandée.
  if (user) {
     return <>{children}</>;
  }

  // Si l'utilisateur n'est pas connecté et que le chargement est terminé,
  // la redirection dans useEffect aura déjà été déclenchée. On ne rend rien en attendant.
  return null;
}
