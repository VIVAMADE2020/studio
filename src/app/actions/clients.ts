
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import path from 'path';

// --- Configuration du fichier de base de données ---
const DB_PATH = path.resolve(process.cwd(), 'src', 'data', 'clients.json');

// --- Types ---
export interface Client {
  identificationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  initialBalance: number;
  transactions: Transaction[];
  creationDate: string;
  iban: string;
  swiftCode: string;
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
        const dataDir = path.dirname(DB_PATH);
        await fs.mkdir(dataDir, { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Erreur d'écriture dans la base de données:", error);
        throw new Error("Impossible d'écrire dans la base de données locale.");
    }
}


// --- Fonctions utilitaires ---
function generateIban() {
    const countryCode = 'FR';
    const bankCode = '30002'; // Code banque fictif
    const branchCode = '00550'; // Code guichet fictif
    const accountNumber = Math.random().toString().slice(2, 13).padStart(11, '0');
    const bban = `${bankCode}${branchCode}${accountNumber}`;
    // Calcul simple de la clé RIB (non conforme à la norme)
    const ribKey = 97 - (parseInt(bban.replace(/./g, char => char.charCodeAt(0) - 'A'.charCodeAt(0) + 10), 10) % 97);
    const checkDigits = String(ribKey).padStart(2, '0');
    return `${countryCode}${checkDigits}${bban}`;
}

// --- Schémas de validation ---

const addClientSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Email invalide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif."),
});

const addTransactionSchema = z.object({
    identificationNumber: z.string(),
    description: z.string().min(3, "Description trop courte."),
    amount: z.coerce.number(),
});

const transferFundsSchema = z.object({
    senderIdentificationNumber: z.string(),
    beneficiaryName: z.string().min(2, "Le nom du bénéficiaire est requis."),
    beneficiaryIban: z.string().min(14, "L'IBAN du bénéficiaire est invalide."),
    amount: z.coerce.number().positive("Le montant doit être positif."),
    description: z.string().min(3, "La description est trop courte."),
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
            identificationNumber: `FLEX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            creationDate: new Date().toISOString(),
            transactions: [],
            iban: generateIban(),
            swiftCode: 'FLEXFRPP',
        };
        clients.push(newClient);
        await writeDb(clients);
        
        revalidatePath('/admin/dashboard');
        return { success: true, data: newClient };
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

const clientLoginSchema = z.object({
  identificationNumber: z.string().min(1, "Le numéro d'identification est requis."),
  password: z.string().min(1, "Le mot de passe est requis."),
});

export async function verifyClientLoginAction(values: z.infer<typeof clientLoginSchema>) {
    const parsed = clientLoginSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données de connexion invalides." };
    }
    
    const { identificationNumber, password } = parsed.data;

    try {
        const clients = await readDb();
        const client = clients.find(c => c.identificationNumber === identificationNumber);

        if (!client) {
            return { success: false, error: "Numéro d'identification ou mot de passe incorrect." };
        }

        if (!client.password) {
            return { success: false, error: "Ce compte n'a pas de mot de passe défini. Veuillez contacter le support." };
        }

        if (client.password !== password) {
            return { success: false, error: "Numéro d'identification ou mot de passe incorrect." };
        }

        return { success: true, data: client };
    } catch (error: any) {
        console.error(`Failed to verify client login for ${identificationNumber}:`, error);
        return { success: false, error: `Une erreur est survenue lors de la vérification: ${error.message}` };
    }
}


export async function getClientByIdentificationNumberAction(identificationNumber: string): Promise<{ data: Client | null; error: string | null; }> {
    if (!identificationNumber) {
        return { data: null, error: "Numéro d'identification non fourni." };
    }
    try {
        const clients = await readDb();
        const client = clients.find(c => c.identificationNumber === identificationNumber) || null;
        if (!client) {
            return { data: null, error: "Client non trouvé." };
        }
        return { data: client, error: null };
    } catch (error: any) {
        console.error(`Failed to get client ${identificationNumber}:`, error);
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
        const clientIndex = clients.findIndex(c => c.identificationNumber === parsed.data.identificationNumber);

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

        revalidatePath(`/admin/dashboard/${parsed.data.identificationNumber}`);
        revalidatePath('/client/dashboard');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function transferFundsAction(values: z.infer<typeof transferFundsSchema>) {
    const parsed = transferFundsSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données de virement invalides." };
    }
    
    const { senderIdentificationNumber, beneficiaryIban, amount, description, beneficiaryName } = parsed.data;

    try {
        const clients = await readDb();
        const senderIndex = clients.findIndex(c => c.identificationNumber === senderIdentificationNumber);

        if (senderIndex === -1) {
            return { success: false, error: "Compte expéditeur non trouvé." };
        }

        const sender = clients[senderIndex];
        const senderBalance = sender.initialBalance + sender.transactions.reduce((acc, t) => acc + t.amount, 0);

        if (senderBalance < amount) {
            return { success: false, error: "Solde insuffisant pour effectuer ce virement." };
        }

        // Créer la transaction de débit pour l'expéditeur
        const debitTransaction: Transaction = {
            id: `TXN-D-${new Date().getTime()}`,
            date: new Date().toISOString(),
            description: `Virement à ${beneficiaryName} - ${description}`,
            amount: -amount,
        };
        clients[senderIndex].transactions.push(debitTransaction);

        // Chercher le bénéficiaire parmi les clients
        const beneficiaryIndex = clients.findIndex(c => c.iban === beneficiaryIban);
        if (beneficiaryIndex !== -1) {
            // Si le bénéficiaire est un client, créditer son compte
            const creditTransaction: Transaction = {
                id: `TXN-C-${new Date().getTime()}`,
                date: new Date().toISOString(),
                description: `Virement de ${sender.firstName} ${sender.lastName} - ${description}`,
                amount: amount,
            };
            clients[beneficiaryIndex].transactions.push(creditTransaction);
        } else {
            // Si le bénéficiaire n'est pas un client, on ne fait rien de plus (dans une vraie app, on enverrait à un système interbancaire)
        }
        
        await writeDb(clients);
        
        revalidatePath('/client/dashboard');
        revalidatePath(`/client/dashboard/transfer`);
        
        return { success: true };

    } catch (error: any) {
        console.error("Erreur lors du virement:", error);
        return { success: false, error: `Une erreur est survenue: ${error.message}` };
    }
}
