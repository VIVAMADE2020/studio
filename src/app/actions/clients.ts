
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

// --- Types ---
export interface Client {
  accountNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  initialBalance: number;
  transactions: Transaction[];
  creationDate: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

// --- Schémas de validation ---

const addClientSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Email invalide."),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif."),
});

const addTransactionSchema = z.object({
    accountNumber: z.string(),
    description: z.string().min(3, "Description trop courte."),
    amount: z.coerce.number(),
});


// --- Fonctions d'interaction avec Google Apps Script ---

const SCRIPT_URL = process.env.GOOGLE_SCRIPT_WEB_APP_URL!;

async function callGoogleScript(action: string, payload: object) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, ...payload }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Google Script Error (${response.status}): ${errorText}`);
        }

        const result = await response.json();
        
        if (result.status === 'error') {
            throw new Error(result.message || 'An unknown error occurred in Google Script.');
        }

        return result.data;

    } catch (error: any) {
        console.error(`Error calling Google Script action '${action}':`, error.message);
        throw new Error(`Failed to execute action ${action}.`);
    }
}


// --- Actions Serveur ---

export async function addClientAction(values: z.infer<typeof addClientSchema>) {
    const parsed = addClientSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
        await callGoogleScript('addClient', parsed.data);
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}


export async function getClientsAction(): Promise<{ data: Client[] | null; error: string | null; }> {
    try {
        const clients = await callGoogleScript('getClients', {});
        return { data: clients, error: null };
    } catch (error: any) {
        return { data: null, error: error.message };
    }
}

export async function getClientByAccountNumberAction(accountNumber: string): Promise<{ data: Client | null; error: string | null; }> {
    if (!accountNumber) {
        return { data: null, error: "Numéro de compte non fourni." };
    }
    try {
        const client = await callGoogleScript('getClient', { accountNumber });
        return { data: client, error: null };
    } catch (error: any) {
        console.error(`Failed to get client ${accountNumber}:`, error);
        return { data: null, error: "Impossible de récupérer les informations du client." };
    }
}

export async function addTransactionAction(values: z.infer<typeof addTransactionSchema>) {
    const parsed = addTransactionSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données de transaction invalides." };
    }

    try {
        await callGoogleScript('addTransaction', parsed.data);
        revalidatePath(`/admin/dashboard/${parsed.data.accountNumber}`);
        revalidatePath('/client/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
