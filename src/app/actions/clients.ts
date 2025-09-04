
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import fs from 'fs/promises';
import path from 'path';

// --- Configuration du fichier de base de données ---
const DB_PATH = path.resolve(process.cwd(), 'src', 'data', 'clients.json');

// --- Types ---
export type AccountType = 'GENERAL' | 'LOAN';
export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type TransferDurationUnit = 'minutes' | 'hours' | 'days';

export interface LoanDetails {
    loanAmount: number;
    interestRate: number;
    loanTerm: number; // in months
    repaymentStartDate: string;
    monthlyPayment: number;
}

export interface Client {
  identificationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  initialBalance: number;
  transactions: Transaction[];
  creationDate: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  accountType: AccountType;
  loanDetails?: LoanDetails;
  transferSettings?: {
    duration: number;
    unit: TransferDurationUnit;
  };
  isBlocked?: boolean;
  blockReason?: string;
}

export interface Transaction {
  id: string;
  date: string; // Date of initiation
  description: string;
  amount: number;
  status: TransactionStatus;
  estimatedCompletionDate?: string;
  failureReason?: string;
  beneficiary?: {
      name: string;
      accountNumber: string;
      iban: string;
      bankName: string;
      swiftCode: string;
  };
}

// --- Fonctions de bas niveau pour interagir avec le fichier JSON ---

async function readDb(): Promise<Client[]> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error: any) {
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
function generateAccountNumber() {
    return Math.random().toString().slice(2, 13).padStart(11, '0');
}
function generateIban(accountNumber: string) {
    const countryCode = 'FR';
    const bankCode = '30002'; // Code banque fictif
    const branchCode = '00550'; // Code guichet fictif
    const bban = `${bankCode}${branchCode}${accountNumber}`;
    
    // Calcul de la clé RIB
    const bbanForCalc = bban.split('').map(char => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) { // is A-Z
            return charCode - 55;
        }
        return char;
    }).join('');

    const remainder = BigInt(bbanForCalc + '152700') % 97n;
    const checkDigits = String(97n - remainder).padStart(2, '0');

    return `${countryCode}${checkDigits}${bban}`;
}


// --- Schémas de validation ---
const baseClientSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Email invalide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
  initialBalance: z.coerce.number().min(0, "Le solde initial doit être positif."),
  accountType: z.enum(['GENERAL', 'LOAN']),
});

const loanDetailsSchema = z.object({
    loanAmount: z.coerce.number().positive("Le montant du prêt doit être positif."),
    interestRate: z.coerce.number().min(0, "Le taux d'intérêt doit être positif ou nul."),
    loanTerm: z.coerce.number().positive("La durée doit être positive."),
    repaymentStartDate: z.string().min(1, "La date de début est requise."),
    monthlyPayment: z.coerce.number().positive("La mensualité doit être positive."),
});

const addClientSchema = z.discriminatedUnion("accountType", [
    baseClientSchema.extend({ accountType: z.literal("GENERAL") }),
    baseClientSchema.extend({ accountType: z.literal("LOAN"), loanDetails: loanDetailsSchema })
]);

const addTransactionSchema = z.object({
    identificationNumber: z.string(),
    description: z.string().min(3, "Description trop courte."),
    amount: z.coerce.number(),
});

const transferFundsSchema = z.object({
    senderIdentificationNumber: z.string(),
    beneficiaryName: z.string().min(2, "Le nom du titulaire est requis."),
    beneficiaryAccountNumber: z.string().min(5, "Le numéro de compte est invalide."),
    beneficiaryIban: z.string().min(14, "L'IBAN du bénéficiaire est invalide."),
    beneficiaryBankName: z.string().min(2, "Le nom de la banque est requis."),
    beneficiarySwiftCode: z.string().min(8, "Le code SWIFT/BIC est invalide."),
    amount: z.coerce.number().positive("Le montant doit être positif."),
    description: z.string().min(3, "La description est trop courte."),
});

const updateTransferSettingsSchema = z.object({
    identificationNumber: z.string(),
    duration: z.coerce.number().min(1, "La durée doit être d'au moins 1."),
    unit: z.enum(['minutes', 'hours', 'days']),
});

const updateBlockSettingsSchema = z.object({
    identificationNumber: z.string(),
    isBlocked: z.boolean(),
    blockReason: z.string().optional(),
});


// --- Actions Serveur ---

export async function addClientAction(values: z.infer<typeof addClientSchema>) {
    const parsed = addClientSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
        const clients = await readDb();
        const accountNumber = generateAccountNumber();
        const iban = generateIban(accountNumber);
        
        const newClientData = {
            ...parsed.data,
            identificationNumber: `FLEX-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            creationDate: new Date().toISOString(),
            transactions: [],
            accountNumber,
            iban,
            swiftCode: 'FLEXFRPP',
            transferSettings: { duration: 1, unit: 'days' },
            isBlocked: false,
            blockReason: "",
        };
        
        let newClient: Client;

        if(newClientData.accountType === 'LOAN') {
            newClient = {
                ...newClientData,
                loanDetails: newClientData.loanDetails
            }
        } else {
             newClient = {
                ...newClientData,
            }
        }

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
        
        // This is a manual transaction, we will not process it, just add it as completed.
        const completedTransaction: Transaction = {
            id: `TXN-${new Date().getTime()}`,
            date: new Date().toISOString(),
            description: parsed.data.description,
            amount: parsed.data.amount,
            status: 'COMPLETED',
        };

        // We also need to process pending transactions for the client if the amount is a credit
        if (completedTransaction.amount > 0) {
            // This is a simplified logic. In a real-world scenario, you would have a more complex system to handle this.
            // For now, we will just mark the oldest pending transaction as completed if the balance allows it.
            const pendingTransactions = clients[clientIndex].transactions.filter(t => t.status === 'PENDING').sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            let currentBalance = clients[clientIndex].initialBalance + clients[clientIndex].transactions.filter(t => t.status === 'COMPLETED').reduce((acc, t) => acc + t.amount, 0) + completedTransaction.amount;
            
            for(const pending of pendingTransactions) {
                if(currentBalance >= Math.abs(pending.amount)) {
                    const pendingIndex = clients[clientIndex].transactions.findIndex(t => t.id === pending.id);
                    if(pendingIndex !== -1) {
                        clients[clientIndex].transactions[pendingIndex].status = 'COMPLETED';
                        currentBalance += pending.amount; // amount is negative
                    }
                }
            }
        }
        
        clients[clientIndex].transactions.push(completedTransaction);
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
    
    const { 
        senderIdentificationNumber, 
        beneficiaryIban,
        beneficiaryAccountNumber,
        amount, 
        description, 
        beneficiaryName, 
        beneficiaryBankName, 
        beneficiarySwiftCode 
    } = parsed.data;

    try {
        const clients = await readDb();
        const senderIndex = clients.findIndex(c => c.identificationNumber === senderIdentificationNumber);

        if (senderIndex === -1) {
            return { success: false, error: "Compte expéditeur non trouvé." };
        }

        const sender = clients[senderIndex];
        const initiationDate = new Date();

        // 1. Check if the client is blocked
        if (sender.isBlocked) {
             const failedTransaction: Transaction = {
                id: `TXN-F-${initiationDate.getTime()}`,
                date: initiationDate.toISOString(),
                description: `Virement à ${beneficiaryName} - ${description}`,
                amount: -amount,
                status: 'FAILED',
                failureReason: sender.blockReason || 'Votre compte est actuellement restreint. Veuillez contacter le support.',
                beneficiary: { name: beneficiaryName, accountNumber: beneficiaryAccountNumber, iban: beneficiaryIban, bankName: beneficiaryBankName, swiftCode: beneficiarySwiftCode }
            };
            clients[senderIndex].transactions.push(failedTransaction);
            await writeDb(clients);
            revalidatePath('/client/dashboard');
            return { success: true, message: "Virement échoué en raison d'un blocage." };
        }


        // 2. Check for sufficient balance
        const completedTransactions = sender.transactions.filter(t => t.status === 'COMPLETED');
        const senderBalance = sender.initialBalance + completedTransactions.reduce((acc, t) => acc + t.amount, 0);

        if (senderBalance < amount) {
            // Not enough balance now, so fail it right away
            const failedTransaction: Transaction = {
                id: `TXN-F-${initiationDate.getTime()}`,
                date: initiationDate.toISOString(),
                description: `Virement à ${beneficiaryName} - ${description}`,
                amount: -amount,
                status: 'FAILED',
                failureReason: 'Solde insuffisant.',
                beneficiary: { name: beneficiaryName, accountNumber: beneficiaryAccountNumber, iban: beneficiaryIban, bankName: beneficiaryBankName, swiftCode: beneficiarySwiftCode }
            };
            clients[senderIndex].transactions.push(failedTransaction);
            await writeDb(clients);
            revalidatePath('/client/dashboard');
            return { success: false, error: "Solde insuffisant pour effectuer ce virement." };
        }

        // 3. Create a PENDING transaction if not blocked and balance is sufficient
        const { duration = 1, unit = 'days' } = sender.transferSettings || {};
        const estimatedCompletionDate = new Date(initiationDate);
        if (unit === 'minutes') {
            estimatedCompletionDate.setMinutes(initiationDate.getMinutes() + duration);
        } else if (unit === 'hours') {
            estimatedCompletionDate.setHours(initiationDate.getHours() + duration);
        } else if (unit === 'days') {
            estimatedCompletionDate.setDate(initiationDate.getDate() + duration);
        }

        const pendingTransaction: Transaction = {
            id: `TXN-D-${initiationDate.getTime()}`,
            date: initiationDate.toISOString(),
            description: `Virement à ${beneficiaryName} - ${description}`,
            amount: -amount,
            status: 'PENDING',
            estimatedCompletionDate: estimatedCompletionDate.toISOString(),
            beneficiary: { name: beneficiaryName, accountNumber: beneficiaryAccountNumber, iban: beneficiaryIban, bankName: beneficiaryBankName, swiftCode: beneficiarySwiftCode }
        };
        clients[senderIndex].transactions.push(pendingTransaction);
        
        await writeDb(clients);
        
        revalidatePath('/client/dashboard');
        revalidatePath(`/client/dashboard/transfer`);
        
        return { success: true, message: "Virement initié avec succès." };

    } catch (error: any) {
        console.error("Erreur lors du virement:", error);
        return { success: false, error: `Une erreur est survenue: ${error.message}` };
    }
}


export async function updateClientTransferSettingsAction(values: z.infer<typeof updateTransferSettingsSchema>) {
    const parsed = updateTransferSettingsSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
        const clients = await readDb();
        const clientIndex = clients.findIndex(c => c.identificationNumber === parsed.data.identificationNumber);

        if (clientIndex === -1) {
            return { success: false, error: "Client non trouvé." };
        }

        clients[clientIndex].transferSettings = {
            duration: parsed.data.duration,
            unit: parsed.data.unit,
        };

        await writeDb(clients);
        revalidatePath(`/admin/dashboard/${parsed.data.identificationNumber}`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateClientBlockSettingsAction(values: z.infer<typeof updateBlockSettingsSchema>) {
    const parsed = updateBlockSettingsSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    try {
        const clients = await readDb();
        const clientIndex = clients.findIndex(c => c.identificationNumber === parsed.data.identificationNumber);

        if (clientIndex === -1) {
            return { success: false, error: "Client non trouvé." };
        }

        clients[clientIndex].isBlocked = parsed.data.isBlocked;
        clients[clientIndex].blockReason = parsed.data.blockReason || (parsed.data.isBlocked ? 'Compte bloqué par l\'administration.' : '');


        await writeDb(clients);
        revalidatePath(`/admin/dashboard/${parsed.data.identificationNumber}`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
