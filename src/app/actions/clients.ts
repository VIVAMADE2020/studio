
"use server";

import { createClient } from '@/lib/supabase/server';
import { z } from "zod";

// --- Types (kept for type-safety in components) ---
export type AccountType = 'GENERAL' | 'LOAN' | 'INVESTMENT';
export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type TransferDurationUnit = 'minutes' | 'hours' | 'days';

export interface LoanDetails {
    loanAmount: number;
    interestRate: number;
    loanTerm: number; // in months
    repaymentStartDate: string;
    monthlyPayment: number;
}

export interface InvestmentDetails {
    investedAmount: number;
    returnRate: number;
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
  investmentDetails?: InvestmentDetails;
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


const generateIban = (countryCode = 'FR') => {
  const randomDigits = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');
  const bankCode = randomDigits(5);
  const branchCode = randomDigits(5);
  const accountNumber = randomDigits(11);
  const nationalCheckDigits = randomDigits(2);
  return `${countryCode}76${bankCode}${branchCode}${accountNumber}${nationalCheckDigits}`;
};

const generateSwift = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const bank = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${bank}FRPPXXX`;
};

const generateAccountNumber = () => Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('');
const generateIdentificationNumber = () => `VC-${Date.now()}`;


export async function addClientAction(values: any) {
    const supabase = createClient();
    
    const newClient: Omit<Client, 'transactions'> & { transactions: any } = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password, 
        initialBalance: values.initialBalance,
        creationDate: new Date().toISOString(),
        accountNumber: generateAccountNumber(),
        iban: generateIban(),
        swiftCode: generateSwift(),
        identificationNumber: generateIdentificationNumber(),
        accountType: values.accountType,
        transactions: [],
        loanDetails: values.loanDetails,
        investmentDetails: values.investmentDetails,
    };

    const { data, error } = await supabase
        .from('clients')
        .insert([newClient])
        .select()
        .single();
    
    if (error) {
        console.error("Supabase error:", error);
        return { success: false, error: "Erreur lors de l'ajout du client." };
    }

    return { success: true, data };
}

export async function getClientsAction(): Promise<{ data: Client[] | null; error: string | null; }> {
    const supabase = createClient();
    const { data, error } = await supabase.from('clients').select('*').order('creationDate', { ascending: false });
    
    if (error) {
        console.error("Supabase error:", error);
        return { data: null, error: "Erreur lors de la récupération des clients." };
    }
    
    return { data, error: null };
}

export async function verifyClientLoginAction(values: any) {
    const supabase = createClient();
    const { email, password } = values;

    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', email)
        .single();

    if (error || !data) {
        return { success: false, error: "Email ou mot de passe incorrect." };
    }

    if (data.password === password) {
        return { success: true, data: data };
    } else {
        return { success: false, error: "Email ou mot de passe incorrect." };
    }
}

export async function getClientByIdentificationNumberAction(identificationNumber: string): Promise<{ data: Client | null; error: string | null; }> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('identificationNumber', identificationNumber)
        .single();

    if (error) {
        return { data: null, error: "Client non trouvé." };
    }
    
    return { data, error: null };
}


export async function addTransactionAction(values: any) {
    const supabase = createClient();
    const { identificationNumber, amount, description } = values;
    
    const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('transactions')
        .eq('identificationNumber', identificationNumber)
        .single();

    if (clientError || !client) {
        return { success: false, error: "Client non trouvé." };
    }
    
    const newTransaction = {
        id: `tx_${Date.now()}`,
        date: new Date().toISOString(),
        description,
        amount,
        status: 'COMPLETED' as TransactionStatus,
    };
    
    const updatedTransactions = [...client.transactions, newTransaction];
    
    const { error } = await supabase
        .from('clients')
        .update({ transactions: updatedTransactions })
        .eq('identificationNumber', identificationNumber);

    if (error) {
        return { success: false, error: "Erreur lors de l'ajout de la transaction." };
    }

    return { success: true };
}


export async function transferFundsAction(values: any) {
     const { senderIdentificationNumber, amount, ...beneficiary } = values;
     const supabase = createClient();

     const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('transactions, isBlocked, blockReason, transferSettings')
        .eq('identificationNumber', senderIdentificationNumber)
        .single();

    if (clientError || !client) {
        return { success: false, error: "Compte expéditeur non trouvé." };
    }
    
    if (client.isBlocked) {
        return { success: false, error: `Virements bloqués : ${client.blockReason}` };
    }

    const duration = client.transferSettings?.duration || 1;
    const unit = client.transferSettings?.unit || 'days';
    
    let completionDate = new Date();
    if (unit === 'minutes') completionDate.setMinutes(completionDate.getMinutes() + duration);
    if (unit === 'hours') completionDate.setHours(completionDate.getHours() + duration);
    if (unit === 'days') completionDate.setDate(completionDate.getDate() + duration);

    const newTransaction: Omit<Transaction, 'id' | 'date'> = {
        description: `Virement à ${values.beneficiaryName}`,
        amount: -amount,
        status: 'PENDING',
        estimatedCompletionDate: completionDate.toISOString(),
        beneficiary: {
            name: values.beneficiaryName,
            accountNumber: values.beneficiaryAccountNumber,
            iban: values.beneficiaryIban,
            bankName: values.beneficiaryBankName,
            swiftCode: values.beneficiarySwiftCode,
        }
    };
    
    const result = await addTransactionAction({
        identificationNumber: senderIdentificationNumber,
        amount: -amount,
        description: `Virement à ${values.beneficiaryName}`,
    });

    return result;
}


export async function updateClientTransferSettingsAction(values: any) {
    const supabase = createClient();
    const { identificationNumber, duration, unit } = values;
    
    const { error } = await supabase
        .from('clients')
        .update({ transferSettings: { duration, unit } })
        .eq('identificationNumber', identificationNumber);
        
    if (error) {
        return { success: false, error: "Erreur lors de la mise à jour." };
    }
    return { success: true };
}

export async function updateClientBlockSettingsAction(values: any) {
    const supabase = createClient();
    const { identificationNumber, isBlocked, blockReason } = values;
    
    const { error } = await supabase
        .from('clients')
        .update({ isBlocked, blockReason: isBlocked ? blockReason : null })
        .eq('identificationNumber', identificationNumber);
        
    if (error) {
        return { success: false, error: "Erreur lors de la mise à jour." };
    }
    return { success: true };
}
