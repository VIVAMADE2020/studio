
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/emails/template';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  data: z.record(z.any()),
});

export async function sendEmailAction(values: z.infer<typeof sendEmailSchema>) {
    const parsed = sendEmailSchema.safeParse(values);
    if (!parsed.success) {
        return { success: false, error: "Données invalides." };
    }

    const { to, subject, data } = parsed.data;

    try {
        const result = await resend.emails.send({
            from: 'VylsCapital <onboarding@resend.dev>', // Doit être un domaine vérifié
            to,
            subject,
            react: EmailTemplate({ data }),
        });

        if (result.error) {
            console.error("Erreur d'envoi Resend:", result.error);
            return { success: false, error: result.error.message };
        }
        
        return { success: true, data: result.data };

    } catch (error) {
        console.error("Erreur serveur lors de l'envoi d'email:", error);
        return { success: false, error: "Une erreur serveur est survenue." };
    }
}
