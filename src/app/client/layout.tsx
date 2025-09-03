
"use client";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Assurez-vous que le cookie est accessible sur tout le site
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Helper function to erase a cookie
const eraseCookie = (name: string) => {   
    // Assurez-vous que le path est correct lors de la suppression
    document.cookie = name+'=; Max-Age=-99999999; path=/;';  
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
        if (user) {
            // L'utilisateur est connecté, on récupère son token et on le stocke dans un cookie.
            // Ce cookie sera lu par les Server Components.
            user.getIdToken().then(token => {
                setCookie('firebaseIdToken', token, 1); // Le cookie expirera en 1 jour
            });
        } else {
            // L'utilisateur n'est pas connecté, on efface le cookie et on le redirige.
            eraseCookie('firebaseIdToken');
            router.push('/login');
        }
    }
  }, [user, loading, router]);


  if (loading) {
    // Pendant que l'état d'authentification est en cours de vérification, 
    // on affiche un skeleton loader. C'est crucial pour ne pas rendre la page enfant prématurément.
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

  if (error) {
    // En cas d'erreur avec le hook d'authentification
    return <div className="text-center py-12 text-destructive">Une erreur d'authentification est survenue.</div>;
  }
  
  if (user) {
     // Si l'utilisateur est bien connecté, on affiche la page demandée.
     return <>{children}</>;
  }

  // Si l'utilisateur n'est pas connecté et n'est plus en chargement,
  // la redirection dans useEffect aura lieu. On ne rend rien en attendant.
  return null;
}
