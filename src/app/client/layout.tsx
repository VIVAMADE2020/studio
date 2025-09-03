
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
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Helper function to erase a cookie
const eraseCookie = (name: string) => {   
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
            // User is signed in, get the token and set it as a cookie
            user.getIdToken().then(token => {
                setCookie('firebaseIdToken', token, 1);
            });
        } else {
            // User is signed out, remove the cookie and redirect
            eraseCookie('firebaseIdToken');
            router.push('/login');
        }
    }
  }, [user, loading, router]);


  if (loading) {
    return (
        <div className="container py-12">
            <div className="max-w-4xl mx-auto">
                <Skeleton className="h-10 w-1/3 mb-4" />
                <Skeleton className="h-6 w-1/2 mb-8" />
                <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                </div>
                <Skeleton className="h-96 mt-8" />
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="text-center py-12">Une erreur est survenue. Veuillez réessayer.</div>;
  }
  
  if (user) {
     return <>{children}</>;
  }

  return null;
}
