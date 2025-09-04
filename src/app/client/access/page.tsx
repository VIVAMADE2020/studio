
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getClientByAccountNumberAction } from "@/app/actions/client-access";

const formSchema = z.object({
  accountNumber: z.string().min(10, { message: "Veuillez entrer un numéro de compte valide." }),
});

export default function ClientAccessPage() {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            accountNumber: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { data, error } = await getClientByAccountNumberAction(values.accountNumber);

            if (error || !data) {
                 toast({
                    variant: "destructive",
                    title: "Accès refusé",
                    description: error || "Aucun compte client trouvé pour ce numéro.",
                });
                return;
            }
            
            toast({
                title: "Accès autorisé !",
                description: `Chargement du tableau de bord pour ${data.firstName}.`,
            });
            
            router.push(`/client/dashboard?accountNumber=${values.accountNumber}`);

        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Une erreur inattendue est survenue.",
            });
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-secondary/50">
            <Card className="w-full max-w-sm mx-4">
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Espace Client</CardTitle>
                            <CardDescription>
                                Entrez votre numéro de compte pour accéder à votre tableau de bord.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="accountNumber"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Numéro de Compte</FormLabel>
                                    <FormControl>
                                        <Input placeholder="FLX1234567890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Vérification..." : "Accéder à mon compte"}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
