
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { sendEmailAction } from '@/app/actions/send-email';

const formSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  email: z.string().email("L'adresse email est invalide."),
  subject: z.string().min(3, "Le sujet est trop court."),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères."),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await sendEmailAction({
        to: 'contact@vylscapital.com',
        subject: `Contact: ${data.subject}`,
        data,
      });

      if (result.success) {
        router.push('/contact/merci');
      } else {
        toast({
          variant: "destructive",
          title: "Erreur d'envoi",
          description: result.error || "Une erreur est survenue.",
        });
      }
    } catch (error) {
       toast({
          variant: "destructive",
          title: "Erreur inattendue",
          description: "Impossible d'envoyer le message. Veuillez réessayer plus tard.",
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label>Nom complet</Label>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl><Input type="email" placeholder="john.doe@email.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <Label>Sujet</Label>
              <FormControl><Input placeholder="Demande d'information" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <Label>Votre message</Label>
              <FormControl><Textarea placeholder="Bonjour, j'aimerais avoir plus d'informations sur..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Envoyer le message
        </Button>
      </form>
    </Form>
  );
}
