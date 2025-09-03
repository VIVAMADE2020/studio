"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function authenticateAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { success: false, error: "Le mot de passe administrateur n'est pas configuré sur le serveur." };
  }

  if (password === adminPassword) {
    // This is a simple auth mechanism. For production, use a robust auth library.
    const authToken = Math.random().toString(36).substring(2);
    
    cookies().set('admin-auth', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    
    process.env.ADMIN_AUTH_TOKEN = authToken;


    return { success: true };
  }

  return { success: false, error: "Mot de passe incorrect." };
}
