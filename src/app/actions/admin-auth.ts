"use server";

import { cookies } from 'next/headers';
import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const ADMIN_AUTH_COOKIE = "admin-auth-token";

// NOTE: This server-side authentication is a simplified example.
// For a real production app, you would use Firebase Admin SDK to mint custom tokens
// and verify them. We are using client-side SDK authentication here for simplicity
// since we don't have a full Node.js backend environment to use the Admin SDK.

export async function authenticateAdmin(email: string, password: string) {
  try {
    // We can't directly use Firebase Auth on the server-side without the Admin SDK.
    // This is a conceptual representation. The actual sign-in will happen on the client
    // and the token will be sent to the server.
    // For now, we will just check against env variables as a placeholder.
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // In a real app, we would get the token from the client, verify it, and then set the cookie.
        // As a placeholder, we'll set a simple cookie value.
        const token = "logged-in"; // Placeholder token
        cookies().set(ADMIN_AUTH_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return { success: true };
    }
    return { success: false, error: "Identifiants administrateur invalides." };
  } catch (error: any) {
    return { success: false, error: "Erreur d'authentification." };
  }
}

export async function verifyAdminAuth() {
    const cookieStore = cookies();
    const authToken = cookieStore.get(ADMIN_AUTH_COOKIE);
    // This is a simplified check. In a real app, you'd verify the JWT.
    return authToken?.value === "logged-in";
}

export async function logoutAdmin() {
    'use server';
    cookies().delete(ADMIN_AUTH_COOKIE);
}
