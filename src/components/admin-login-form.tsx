
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});

interface AdminLoginFormProps {
    onLoginSuccess: (user: User) => void;
}

export function AdminLoginForm({ onLoginSuccess }: AdminLoginFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!auth) {
        throw new Error("La configuration de l'authentification Firebase n'a pas pu être chargée.");
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Connexion réussie!",
        description: `Bienvenue, ${userCredential.user.email}.`,
      });
      onLoginSuccess(userCredential.user);
    
    } catch (error: any) {
        let errorMessage = "Une erreur est survenue. Veuillez vérifier vos identifiants.";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMessage = "L'email ou le mot de passe est incorrect.";
        }
        if (error.message.includes("Firebase")) {
            console.error("Firebase Error Details:", error);
            errorMessage = "Erreur de configuration ou de connexion à Firebase.";
        }
      toast({
        variant: "destructive",
        title: "Erreur d'authentification",
        description: errorMessage,
      });
      console.error("Login Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="admin@flexfond.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Vérification..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
