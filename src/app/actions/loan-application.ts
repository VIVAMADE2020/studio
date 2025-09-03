
"use server";

import { z } from "zod";

// Note: In a real app, file handling would be more complex, 
// likely involving uploads to a storage service and storing URLs.
// For this demo, we'll just accept the file names as strings.

const formSchema = z.object({
  loanType: z.string(),
  loanAmount: z.number(),
  loanDuration: z.number().min(12).max(360),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  whatsapp: z.string(),
  birthDate: z.string(),
  maritalStatus: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  childrenCount: z.number().min(0),
  employmentStatus: z.string(),
  monthlyIncome: z.number(),
  monthlyExpenses: z.number().min(0),
  housingStatus: z.string(),
  identityProof: z.string(),
  residenceProof: z.string(),
  incomeProof: z.string(),
});

export async function submitLoanApplication(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    console.error("Validation failed:", parsed.error.format());
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
