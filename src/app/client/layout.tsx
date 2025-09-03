
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
    if (!loading && !user) {
      router.push('/login');
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
