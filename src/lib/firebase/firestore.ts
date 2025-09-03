
"use server";

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, where, query, limit, getDoc } from "firebase/firestore";
import { db } from "./config";

export interface Transaction {
  id: string;
  date: string; // ISO 8601 format
  description: string;
  amount: number; // Positive for credit, negative for debit
}

export interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  loanDuration: number; // in months
  monthlyPayment: number;
}

export interface Client {
  id?: string; // Firestore document ID
  uid: string; // Firebase Auth User ID
  // Personal Info
  firstName: string;
  lastName: string;
  email: string; // Will be used for client login
  
  // Account Type
  accountType: 'current' | 'loan';

  // Banking Info
  accountNumber?: string;
  iban?: string;
  swiftCode?: string;
  accountBalance?: number;

  // Loan Account Details
  loanDetails?: LoanDetails;
  
  // Transaction History
  transactions?: Transaction[];
}

const clientsCollection = collection(db, "clients");

export async function addClient(client: Omit<Client, 'id'>) {
  try {
    const docRef = await addDoc(clientsCollection, client);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    const firebaseError = error as { code?: string, message?: string };
    if (firebaseError.code === 'permission-denied') {
        return { success: false, error: "Permission refusée. Assurez-vous que l'administrateur est correctement authentifié et que les règles de sécurité Firestore sont correctes." };
    }
    return { success: false, error: firebaseError.message || "Failed to add client." };
  }
}

export async function getClients(): Promise<Client[]> {
  try {
    const querySnapshot = await getDocs(clientsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
  } catch (error) {
      console.error("Error getting documents: ", error);
      return [];
  }
}

export async function getClientByUid(uid: string): Promise<Client | null> {
    try {
        const clientDocRef = doc(db, "clients", uid);
        const clientSnap = await getDoc(clientDocRef);

        if (clientSnap.exists()) {
            return { id: clientSnap.id, ...clientSnap.data() } as Client;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting client by UID:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
}


export async function updateClient(id: string, updates: Partial<Client>) {
  const clientDoc = doc(db, "clients", id);
  try {
    await updateDoc(clientDoc, updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update client." };
  }
}

export async function deleteClient(id: string) {
  const clientDoc = doc(db, "clients", id);
  try {
    await deleteDoc(clientDoc);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete client." };
  }
}
