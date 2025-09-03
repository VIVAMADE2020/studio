"use server";

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./config";

// NOTE: This is a placeholder for the client data structure
export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  // Add other client properties here as needed
}

const clientsCollection = collection(db, "clients");

export async function addClient(client: Omit<Client, 'id'>) {
  try {
    const docRef = await addDoc(clientsCollection, client);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: "Failed to add client." };
  }
}

export async function getClients(): Promise<Client[]> {
  const querySnapshot = await getDocs(clientsCollection);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
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
