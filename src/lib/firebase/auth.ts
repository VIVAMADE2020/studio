
import { auth } from '@/lib/firebase/admin';
import { headers } from 'next/headers';
import type { User } from 'firebase-admin/auth';

export async function getCurrentUser(): Promise<User | null> {
  const idToken = headers().get('Authorization')?.split('Bearer ')[1]

  if (!idToken) {
    return null;
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return await auth.getUser(decodedToken.uid);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}
