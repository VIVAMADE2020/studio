
"use client";

import React from 'react';

// Le layout n'a plus besoin de vérifier l'authentification
// car il n'y a plus de système de connexion.
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
