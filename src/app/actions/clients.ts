
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import path from 'path';

// --- Configuration du fichier de base de données ---
const DB_PATH = path.resolve(process.cwd(), 'src', 'data', 'clients.json');

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

// --- Fonctions de bas niveau pour interagir avec le fichier JSON ---

async function readDb(): Promise<Client[]> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error: any) {
        // Si le fichier n'existe pas, on le crée avec un tableau vide
        if (error.code === 'ENOENT') {
            await writeDb([]);
            return [];
        }
        console.error("Erreur de lecture de la base de données:", error);
        throw new Error("Impossible de lire la base de données locale.");
    }
}

async function writeDb(data: Client[]): Promise<void> {
    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Erreur d'écriture dans la base de données:", error);
        throw new Error("Impossible d'écrire dans la base de données locale.");
    }
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

// --- Actions Serveur ---

export async function addClientAction(values: z.infer<typeof addClientSchema>) {
    const parsed = addClientSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
        const clients = await readDb();
        const newClient: Client = {
            ...parsed.data,
            accountNumber: `FLEX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            creationDate: new Date().toISOString(),
            transactions: [],
        };
        clients.push(newClient);
        await writeDb(clients);
        
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}


export async function getClientsAction(): Promise<{ data: Client[] | null; error: string | null; }> {
    try {
        const clients = await readDb();
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
        const clients = await readDb();
        const client = clients.find(c => c.accountNumber === accountNumber) || null;
        if (!client) {
            return { data: null, error: "Client non trouvé." };
        }
        return { data: client, error: null };
    } catch (error: any) {
        console.error(`Failed to get client ${accountNumber}:`, error);
        return { data: null, error: `Impossible de récupérer les informations du client: ${error.message}` };
    }
}

export async function addTransactionAction(values: z.infer<typeof addTransactionSchema>) {
    const parsed = addTransactionSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données de transaction invalides." };
    }

    try {
        const clients = await readDb();
        const clientIndex = clients.findIndex(c => c.accountNumber === parsed.data.accountNumber);

        if (clientIndex === -1) {
            return { success: false, error: "Client non trouvé." };
        }

        const newTransaction: Transaction = {
            id: `TXN-${new Date().getTime()}`,
            date: new Date().toISOString(),
            description: parsed.data.description,
            amount: parsed.data.amount,
        };

        clients[clientIndex].transactions.push(newTransaction);
        await writeDb(clients);

        revalidatePath(`/admin/dashboard/${parsed.data.accountNumber}`);
        revalidatePath('/client/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
