"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export async function sendContactMessage(values: z.infer<typeof formSchema>) {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "Invalid data" };
  }

  // In a real application, you would send an email here.
  // For this example, we'll just log the data to the console.
  console.log("New contact message received:");
  console.log(parsed.data);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true };
}
