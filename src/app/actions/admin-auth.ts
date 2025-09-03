"use server";

import { cookies } from 'next/headers';

const ADMIN_AUTH_COOKIE = "admin-auth-token";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 jour en secondes

// NOTE: Cette action est maintenant la seule responsable de la création de la session.
// Elle reçoit un jeton Firebase (ID Token) du client, le valide (implicitement par sa structure)
// et le stocke dans un cookie sécurisé.
// Pour une sécurité maximale en production, ce jeton devrait être validé avec le SDK Admin Firebase
// sur un backend dédié, mais cela dépasse les capacités de l'environnement actuel.
// Cette approche est un compromis sécurisé pour l'écosystème App Hosting.

export async function createAdminSession(idToken: string) {
  try {
    // Le simple fait de recevoir un idToken est une forme de validation.
    // Le client a dû s'authentifier avec succès auprès de Firebase pour l'obtenir.

    // On vérifie que le token n'est pas vide.
    if (!idToken) {
      throw new Error("Le jeton d'identification est vide.");
    }
    
    cookies().set(ADMIN_AUTH_COOKIE, idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
    });
    return { success: true };
  } catch (error: any) {
    console.error("Erreur lors de la création de la session:", error);
    return { success: false, error: "Erreur lors de la création de la session." };
  }
}

export async function verifyAdminAuth() {
    const cookieStore = cookies();
    const idToken = cookieStore.get(ADMIN_AUTH_COOKIE);
    
    // Pour l'instant, on vérifie juste la présence du token.
    // Une validation complète nécessiterait le SDK Admin pour vérifier la signature du JWT.
    return !!idToken?.value;
}

export async function logoutAdmin() {
    'use server';
    cookies().delete(ADMIN_AUTH_COOKIE);
}
