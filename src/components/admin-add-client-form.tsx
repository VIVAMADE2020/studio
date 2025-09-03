
"use client";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";


export function AddClientForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des clients</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            La création de nouveaux clients se fait désormais via la page d'inscription dédiée. Les administrateurs peuvent ensuite gérer les comptes et les transactions des clients depuis ce tableau de bord.
             <br/><br/>
             <Link href="/signup" className="font-bold text-primary underline">
                Accéder à la page d'inscription
             </Link>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
