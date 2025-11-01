
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createServerClient } from '@/lib/supabase/server';

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

// --- Fonctions utilitaires ---
function generateAccountNumber() {
    return Math.random().toString().slice(2, 13).padStart(11, '0');
}
function generateIban(accountNumber: string) {
    const countryCode = 'FR';
    const bankCode = '30002'; // Code banque fictif
    const branchCode = '00550'; // Code guichet fictif
    const bban = `${bankCode}${branchCode}${accountNumber}`;
    
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
    beneficiaryIban: z.string().min(14, "L'IBAN du bénéficiaire est invalide.").max(34, "L'IBAN est trop long."),
    beneficiaryBankName: z.string().min(2, "Le nom de la banque est requis."),
    beneficiarySwiftCode: z.string().min(8, "Le code SWIFT/BIC est invalide.").max(11, "Le code SWIFT/BIC est trop long."),
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

// --- Nouvelle fonction pour traiter les transactions en attente ---
async function processPendingTransactions(client: Client): Promise<boolean> {
    let hasChanged = false;
    const now = new Date();

    const pendingTransactions = client.transactions.filter(t => t.status === 'PENDING');

    for (const transaction of pendingTransactions) {
        if (transaction.estimatedCompletionDate && new Date(transaction.estimatedCompletionDate) <= now) {
            hasChanged = true;
            const transactionIndex = client.transactions.findIndex(t => t.id === transaction.id);
            if (transactionIndex === -1) continue;

            if (client.isBlocked) {
                client.transactions[transactionIndex].status = 'FAILED';
                client.transactions[transactionIndex].failureReason = client.blockReason || 'Transaction refusée car le compte est bloqué.';
                continue;
            }

            const completedTransactions = client.transactions.filter(t => t.status === 'COMPLETED' && new Date(t.date) < now);
            const balanceAtProcessing = client.initialBalance + completedTransactions.reduce((acc, t) => acc + t.amount, 0);

            if (balanceAtProcessing + transaction.amount < 0) {
                client.transactions[transactionIndex].status = 'FAILED';
                client.transactions[transactionIndex].failureReason = 'Solde insuffisant au moment du traitement.';
                continue;
            }
            
            client.transactions[transactionIndex].status = 'COMPLETED';
        }
    }
    return hasChanged;
}

// --- Actions Serveur avec Supabase ---

export async function addClientAction(values: z.infer<typeof addClientSchema>) {
    const parsed = addClientSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }
    
    const supabase = createServerClient();

    try {
        const accountNumber = generateAccountNumber();
        const iban = generateIban(accountNumber);
        
        const newClientData = {
            ...parsed.data,
            identificationNumber: `VYLS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            creationDate: new Date().toISOString(),
            transactions: [],
            accountNumber,
            iban,
            swiftCode: 'VYLSFRPP',
            transferSettings: { duration: 1, unit: 'days' },
            isBlocked: false,
            blockReason: "",
        };

        const { data, error } = await supabase.from('clients').insert([newClientData]).select().single();
        
        if (error) throw error;
        
        revalidatePath('/admin/dashboard');
        return { success: true, data: data as Client };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getClientsAction(): Promise<{ data: Client[] | null; error: string | null; }> {
    const supabase = createServerClient();
    try {
        const { data: clients, error } = await supabase.from('clients').select('*');
        if (error) throw error;
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
    const supabase = createServerClient();

    try {
        const { data: client, error } = await supabase
            .from('clients')
            .select('*')
            .eq('identificationNumber', identificationNumber)
            .single();

        if (error || !client) {
            return { success: false, error: "Numéro d'identification ou mot de passe incorrect." };
        }
        
        if (!client.password) {
            return { success: false, error: "Ce compte n'a pas de mot de passe défini. Veuillez contacter le support." };
        }

        if (client.password !== password) {
            return { success: false, error: "Numéro d'identification ou mot de passe incorrect." };
        }
        
        return { success: true, data: { identificationNumber: client.identificationNumber } };
    } catch (error: any) {
        console.error(`Failed to verify client login for ${identificationNumber}:`, error);
        return { success: false, error: `Une erreur est survenue lors de la vérification: ${error.message}` };
    }
}

export async function getClientByIdentificationNumberAction(identificationNumber: string): Promise<{ data: Client | null; error: string | null; }> {
    if (!identificationNumber) {
        return { data: null, error: "Numéro d'identification non fourni." };
    }
    const supabase = createServerClient();

    try {
        const { data: client, error } = await supabase
            .from('clients')
            .select('*')
            .eq('identificationNumber', identificationNumber)
            .single();
        
        if (error || !client) {
            return { data: null, error: "Client non trouvé." };
        }

        const clientTyped = client as Client;
        const hasChanged = await processPendingTransactions(clientTyped);

        if (hasChanged) {
            const { error: updateError } = await supabase
                .from('clients')
                .update({ transactions: clientTyped.transactions })
                .eq('identificationNumber', identificationNumber);
            if (updateError) throw updateError;
        }

        return { data: clientTyped, error: null };
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
    const supabase = createServerClient();

    try {
        const { data: client, error: fetchError } = await supabase
            .from('clients')
            .select('transactions')
            .eq('identificationNumber', parsed.data.identificationNumber)
            .single();

        if (fetchError || !client) {
            return { success: false, error: "Client non trouvé." };
        }
        
        const completedTransaction: Transaction = {
            id: `TXN-${new Date().getTime()}`,
            date: new Date().toISOString(),
            description: parsed.data.description,
            amount: parsed.data.amount,
            status: 'COMPLETED',
        };

        const updatedTransactions = [...client.transactions, completedTransaction];
        
        const { error: updateError } = await supabase
            .from('clients')
            .update({ transactions: updatedTransactions })
            .eq('identificationNumber', parsed.data.identificationNumber);
        
        if(updateError) throw updateError;

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

    const supabase = createServerClient();

    try {
        const { data: sender, error: fetchError } = await supabase
            .from('clients')
            .select('*')
            .eq('identificationNumber', senderIdentificationNumber)
            .single();

        if (fetchError || !sender) {
            return { success: false, error: "Compte expéditeur non trouvé." };
        }
        
        const senderTyped = sender as Client;
        const initiationDate = new Date();
        const completedTransactions = senderTyped.transactions.filter(t => t.status === 'COMPLETED');
        const senderBalance = senderTyped.initialBalance + completedTransactions.reduce((acc, t) => acc + t.amount, 0);

        if (senderBalance < amount) {
            return { success: false, error: "Solde insuffisant pour effectuer ce virement." };
        }
        
        const { duration = 1, unit = 'days' } = senderTyped.transferSettings || {};
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
        
        const updatedTransactions = [...senderTyped.transactions, pendingTransaction];
        
        const { error: updateError } = await supabase
            .from('clients')
            .update({ transactions: updatedTransactions })
            .eq('identificationNumber', senderIdentificationNumber);
            
        if (updateError) throw updateError;
        
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
    const supabase = createServerClient();
    try {
        const { error } = await supabase
            .from('clients')
            .update({ transferSettings: { duration: parsed.data.duration, unit: parsed.data.unit } })
            .eq('identificationNumber', parsed.data.identificationNumber);

        if (error) throw error;
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
    const supabase = createServerClient();
    try {
        const { error } = await supabase
            .from('clients')
            .update({ 
                isBlocked: parsed.data.isBlocked, 
                blockReason: parsed.data.blockReason || (parsed.data.isBlocked ? 'Compte bloqué par l\\'administration.' : '') 
            })
            .eq('identificationNumber', parsed.data.identificationNumber);

        if (error) throw error;
        revalidatePath(`/admin/dashboard/${parsed.data.identificationNumber}`);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
    
    