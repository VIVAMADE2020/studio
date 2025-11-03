
"use server";

// --- NOTE: All database logic has been removed. ---
// This file is kept to prevent build errors from missing imports,
// but the actions will no longer interact with a database.

import { z } from "zod";

// --- Types (kept for type-safety in components) ---
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


// --- Empty Actions ---

const disabledFeatureError = { success: false, error: "Cette fonctionnalité est désactivée car aucune base de données n'est configurée." };

export async function addClientAction(values: any) {
    console.warn("addClientAction is disabled.");
    return disabledFeatureError;
}

export async function getClientsAction(): Promise<{ data: Client[] | null; error: string | null; }> {
    console.warn("getClientsAction is disabled.");
    return { data: [], error: null }; // Return empty array to avoid breaking list pages
}

export async function verifyClientLoginAction(values: any) {
    console.warn("verifyClientLoginAction is disabled.");
    return disabledFeatureError;
}

export async function getClientByIdentificationNumberAction(identificationNumber: string): Promise<{ data: Client | null; error: string | null; }> {
    console.warn("getClientByIdentificationNumberAction is disabled.");
    return { data: null, error: "Cette fonctionnalité est désactivée car aucune base de données n'est configurée." };
}

export async function addTransactionAction(values: any) {
    console.warn("addTransactionAction is disabled.");
    return disabledFeatureError;
}

export async function transferFundsAction(values: any) {
    console.warn("transferFundsAction is disabled.");
    return disabledFeatureError;
}

export async function updateClientTransferSettingsAction(values: any) {
    console.warn("updateClientTransferSettingsAction is disabled.");
    return disabledFeatureError;
}

export async function updateClientBlockSettingsAction(values: any) {
    console.warn("updateClientBlockSettingsAction is disabled.");
    return disabledFeatureError;
}
