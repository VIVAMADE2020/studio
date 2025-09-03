
"use server";

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

export interface Transaction {
  id: string;
  date: string; // ISO 8601 format
  description: string;
  amount: number; // Positive for credit, negative for debit
}

// NOTE: This is a placeholder for the client data structure
export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  // Banking Info
  iban?: string;
  accountBalance?: number;
  // Transaction History
  transactions?: Transaction[];
}

const clientsCollection = collection(db, "clients");

export async function addClient(client: Omit<Client, 'id'>) {
  try {
    // Initialize with default banking info when creating a client
    const newClient: Omit<Client, 'id'> = {
      ...client,
      iban: client.iban || "",
      accountBalance: client.accountBalance || 0,
      transactions: client.transactions || [],
    };
    const docRef = await addDoc(clientsCollection, newClient);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: "Failed to add client." };
  }
}

export async function getClients(): Promise<Client[]> {
  try {
    const querySnapshot = await getDocs(clientsCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
  } catch (error) {
      console.error("Error getting documents: ", error);
      // In case of error (e.g., permissions), return an empty array
      return [];
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
