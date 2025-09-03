"use server";

import { z } from "zod";

const formSchema = z.object({
  loanType: z.string(),
  loanAmount: z.number(),
  loanDuration: z.number().min(12).max(360), // Durée en mois
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  birthDate: z.string(),
  maritalStatus: z.string(),
  employmentStatus: z.string(),
  monthlyIncome: z.number(),
  housingStatus: z.string(),
});

export async function submitLoanApplication(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Les données fournies sont invalides." };
  }

  // Dans une application réelle, vous enregistreriez ces données
  // dans une base de données et notifieriez les équipes compétentes.
  console.log("Nouvelle demande de prêt reçue :");
  console.log(parsed.data);
  
  // Simule une latence réseau
  await new Promise(resolve => setTimeout(resolve, 1500));

  return { success: true };
}
