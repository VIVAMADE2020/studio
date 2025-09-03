"use server";

import { cookies } from 'next/headers';

// This value should be in your .env.local, but for simplicity we keep it here
// This is a simple auth mechanism. For production, use a robust auth library.
const ADMIN_AUTH_TOKEN = "secret-admin-token-789123";

export async function authenticateAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { success: false, error: "Le mot de passe administrateur n'est pas configuré sur le serveur." };
  }

  if (password === adminPassword) {
    cookies().set('admin-auth', ADMIN_AUTH_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    return { success: true };
  }

  return { success: false, error: "Mot de passe incorrect." };
}

export async function verifyAdminAuth() {
    const cookieStore = cookies();
    const authCookie = cookieStore.get('admin-auth');
    return authCookie?.value === ADMIN_AUTH_TOKEN;
}

export async function logoutAdmin() {
    'use server';
    cookies().delete('admin-auth');
}
