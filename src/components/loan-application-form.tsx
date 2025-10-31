
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";
import { submitLoanApplication } from "@/app/actions/loan-application";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatCurrency } from "@/lib/utils";
import { LoanCalculator } from "./loan-calculator";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Label } from "./ui/label";

const loanDetailsSchema = z.object({
  loanType: z.string({ required_error: "Veuillez sélectionner un type de prêt." }),
  loanAmount: z.coerce.number().min(1000, "Le montant minimum est de 1000€.").max(500000, "Le montant maximum est de 500 000€."),
  loanDuration: z.coerce.number().min(12, "La durée minimale est de 12 mois.").max(360, "La durée maximale est de 30 ans (360 mois)."),
});

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide."),
  whatsapp: z.string().min(10, "Le numéro WhatsApp est obligatoire."),
  birthDay: z.coerce.number({invalid_type_error: "Jour requis"}).min(1, "Jour invalide").max(31, "Jour invalide"),
  birthMonth: z.coerce.number({invalid_type_error: "Mois requis"}).min(1, "Mois invalide").max(12, "Mois invalide"),
  birthYear: z.coerce.number({invalid_type_error: "Année requise"}).min(new Date().getFullYear() - 100, "Année invalide").max(new Date().getFullYear() - 18, "Vous devez être majeur."),
  maritalStatus: z.string({ required_error: "Veuillez sélectionner votre situation familiale." }),
  address: z.string().min(5, "L'adresse est requise."),
  city: z.string().min(2, "La ville est requise."),
  country: z.string().min(2, "Le pays est requis."),
  childrenCount: z.coerce.number().min(0, "Veuillez entrer un nombre valide."),
});

const financialInfoSchema = z.object({
  employmentStatus: z.string().min(2, { message: "La profession est requise." }),
  monthlyIncome: z.coerce.number().min(500, "Le revenu minimum est de 500€."),
  monthlyExpenses: z.coerce.number().min(0, "Veuillez entrer un montant valide."),
  housingStatus: z.string({ required_error: "Veuillez sélectionner votre situation de logement." }),
});

const documentsSchema = z.object({
    identityProof: z.any().refine(file => file?.[0], "La pièce d'identité est requise."),
    residenceProof: z.any().refine(file => file?.[0], "Le justificatif de domicile est requis."),
    incomeProof: z.any().refine(file => file?.[0], "Le justificatif de revenus est requis."),
});

const legalSchema = z.object({
    legalConsent: z.boolean().refine(val => val === true, {
        message: "Vous devez accepter les conditions pour continuer."
    })
});

const formClientSchema = loanDetailsSchema.merge(personalInfoSchema).merge(financialInfoSchema).merge(documentsSchema).merge(legalSchema);

type FormValues = z.infer<typeof formClientSchema>;

export function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formClientSchema),
    mode: "onBlur",
    defaultValues: {
      loanType: undefined,
      loanAmount: 50000,
      loanDuration: 120,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      whatsapp: "",
      birthDay: undefined,
      birthMonth: undefined,
      birthYear: undefined,
      maritalStatus: undefined,
      address: "",
      city: "",
      country: "",
      childrenCount: 0,
      employmentStatus: "",
      monthlyIncome: 2500,
      monthlyExpenses: 0,
      housingStatus: undefined,
      identityProof: undefined,
      residenceProof: undefined,
      incomeProof: undefined,
      legalConsent: false,
    },
  });
  
  const formData = form.watch();

  const handleNext = async () => {
    const currentStepFields = steps[currentStep].fields as (keyof FormValues)[] | undefined;
    if (currentStepFields) {
        const result = await form.trigger(currentStepFields);
        if (!result) return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
        const birthDate = `${String(values.birthDay).padStart(2, '0')}/${String(values.birthMonth).padStart(2, '0')}/${values.birthYear}`;

        const dataToSend = {
            ...values,
            birthDate,
            identityProof: values.identityProof[0].name,
            residenceProof: values.residenceProof[0].name,
            incomeProof: values.incomeProof[0].name,
        };

        const result = await submitLoanApplication(dataToSend);
        
        if (result.success) {
            router.push('/demande-pret/merci');
        } else {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: result.error || "Une erreur est survenue lors de la soumission. Veuillez réessayer.",
            });
        }
    } catch (error) {
        console.error("Error processing form:", error);
        toast({ variant: "destructive", title: "Erreur du formulaire", description: "Impossible de traiter le formulaire."});
    } finally {
        setIsSubmitting(false);
    }
  }
  
  const progress = ((currentStep + 1) / (steps.length + 1)) * 100;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-hidden">
        <Progress value={progress} className="mb-8" />
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
          {currentStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center">{steps[0].title}</h3>
              <p className="text-center text-muted-foreground text-sm">Les simulations sont fournies à titre indicatif et ne constituent pas une offre de prêt.</p>
              <FormField
                control={form.control}
                name="loanType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de prêt</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Sélectionnez un type de prêt" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Prêt Personnel</SelectItem>
                        <SelectItem value="mortgage">Prêt Immobilier</SelectItem>
                        <SelectItem value="auto">Prêt Auto</SelectItem>
                        <SelectItem value="professional">Prêt Professionnel</SelectItem>
                        <SelectItem value="consolidation">Rachat de Crédits</SelectItem>
                        <SelectItem value="student">Prêt Étudiant</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoanCalculator 
                amount={form.watch('loanAmount')}
                duration={form.watch('loanDuration')}
                onAmountChange={(value) => form.setValue('loanAmount', value, { shouldValidate: true })}
                onDurationChange={(value) => form.setValue('loanDuration', value, { shouldValidate: true })}
                showCard={false}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-center">{steps[1].title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Jean" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Dupont" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="jean.dupont@email.com" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="whatsapp" render={({ field }) => (<FormItem><FormLabel>WhatsApp</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
              </div>
               <div>
                <Label>Date de naissance</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                    <FormField control={form.control} name="birthDay" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Jour" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="birthMonth" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Mois" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="birthYear" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Année" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                </div>
              </div>
              <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Adresse</FormLabel><FormControl><Input placeholder="123 rue de Paris" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>Ville</FormLabel><FormControl><Input placeholder="Paris" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Pays</FormLabel><FormControl><Input placeholder="France" {...field} value={field.value ?? ''} /></FormControl><FormMessage /></FormItem>)} />
              </div>
               <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="maritalStatus" render={({ field }) => (<FormItem><FormLabel>Situation familiale</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez votre situation" /></SelectTrigger></FormControl><SelectContent><SelectItem value="single">Célibataire</SelectItem><SelectItem value="married">Marié(e)</SelectItem><SelectItem value="divorced">Divorcé(e)</SelectItem><SelectItem value="widowed">Veuf(ve)</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="childrenCount" render={({ field }) => (<FormItem><FormLabel>Nombre d'enfants à charge</FormLabel><FormControl><Input type="number" placeholder="ex: 2" {...field} value={field.value ?? 0} /></FormControl><FormMessage /></FormItem>)} />
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center">{steps[2].title}</h3>
                <FormField
                  control={form.control}
                  name="employmentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
                      <FormControl><Input placeholder="ex: Développeur Web" {...field} value={field.value ?? ''} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="monthlyIncome" render={({ field }) => (<FormItem><FormLabel>Revenu mensuel net (€)</FormLabel><FormControl><Input type="number" placeholder="ex: 2500" {...field} value={field.value ?? 0} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="monthlyExpenses" render={({ field }) => (<FormItem><FormLabel>Charges mensuelles (€)</FormLabel><FormControl><Input type="number" placeholder="ex: 800" {...field} value={field.value ?? 0} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                 <FormField
                  control={form.control}
                  name="housingStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Situation de logement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Sélectionnez une option" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="owner-with-mortgage">Propriétaire (avec crédit)</SelectItem>
                          <SelectItem value="owner-no-mortgage">Propriétaire (sans crédit)</SelectItem>
                          <SelectItem value="tenant">Locataire</SelectItem>
                          <SelectItem value="hosted">Hébergé(e) à titre gratuit</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center">{steps[3].title}</h3>
                <p className="text-center text-muted-foreground text-sm">Vos documents seront utilisés uniquement pour l'analyse de votre dossier par nos partenaires financiers.</p>
                <div className="space-y-4">
                    <FormItem>
                        <FormLabel>Pièce d'identité (Recto/Verso)</FormLabel>
                        <FormControl>
                            <Input type="file" {...form.register("identityProof")} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.identityProof?.message?.toString()}</FormMessage>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Justificatif de domicile (- de 3 mois)</FormLabel>
                        <FormControl>
                            <Input type="file" {...form.register("residenceProof")} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.residenceProof?.message?.toString()}</FormMessage>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Justificatif de revenus (3 derniers bulletins)</FormLabel>
                        <FormControl>
                            <Input type="file" {...form.register("incomeProof")} />
                        </FormControl>
                        <FormMessage>{form.formState.errors.incomeProof?.message?.toString()}</FormMessage>
                    </FormItem>
                </div>
            </div>
          )}

          {currentStep === 4 && (
             <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center">{steps[4].title}</h3>
                <FormField
                    control={form.control}
                    name="legalConsent"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    En cochant cette case, je reconnais avoir lu et accepté les <Link href="/legal/conditions-dutilisation" target="_blank" className="text-primary underline">conditions d'utilisation</Link> et la <Link href="/legal/politique-de-confidentialite" target="_blank" className="text-primary underline">politique de confidentialité</Link>. Je consens au traitement de mes données personnelles pour l'étude de ma demande de prêt.
                                </FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
             </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-center">{steps[5].title}</h3>
                <p className="text-center text-muted-foreground">Veuillez vérifier les informations avant de soumettre. Un crédit vous engage et doit être remboursé.</p>
                <Card>
                    <CardContent className="pt-6 space-y-4 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div><strong className="text-primary">Type de prêt:</strong> {formData.loanType || "N/A"}</div>
                            <div><strong className="text-primary">Montant:</strong> {formatCurrency(formData.loanAmount)}</div>
                            <div><strong className="text-primary">Durée:</strong> {formData.loanDuration} mois</div>
                            <div><strong className="text-primary">Prénom:</strong> {formData.firstName}</div>
                            <div><strong className="text-primary">Nom:</strong> {formData.lastName}</div>
                            <div><strong className="text-primary">Email:</strong> {formData.email}</div>
                            <div><strong className="text-primary">Téléphone:</strong> {formData.phone}</div>
                            <div><strong className="text-primary">WhatsApp:</strong> {formData.whatsapp}</div>
                            <div><strong className="text-primary">Date de naissance:</strong> {`${String(formData.birthDay).padStart(2, '0')}/${String(formData.birthMonth).padStart(2, '0')}/${formData.birthYear}`}</div>
                            <div className="md:col-span-2"><strong className="text-primary">Adresse:</strong> {`${formData.address}, ${formData.city}, ${formData.country}`}</div>
                            <div><strong className="text-primary">Situation familiale:</strong> {formData.maritalStatus}</div>
                            <div><strong className="text-primary">Enfants à charge:</strong> {formData.childrenCount}</div>
                            <div><strong className="text-primary">Profession:</strong> {formData.employmentStatus}</div>
                            <div><strong className="text-primary">Revenu mensuel:</strong> {formatCurrency(formData.monthlyIncome)}</div>
                            <div><strong className="text-primary">Charges mensuelles:</strong> {formatCurrency(formData.monthlyExpenses)}</div>
                            <div><strong className="text-primary">Logement:</strong> {formData.housingStatus}</div>
                            <div className="md:col-span-2 pt-4 mt-4 border-t">
                                <strong className="text-primary">Documents fournis :</strong>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Pièce d'identité: <span className="text-muted-foreground">{formData.identityProof?.[0]?.name || "Non fourni"}</span></li>
                                    <li>Justificatif de domicile: <span className="text-muted-foreground">{formData.residenceProof?.[0]?.name || "Non fourni"}</span></li>
                                    <li>Justificatif de revenus: <span className="text-muted-foreground">{formData.incomeProof?.[0]?.name || "Non fourni"}</span></li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
          )}
        </motion.div>
        </AnimatePresence>

        <div className="flex justify-between pt-4">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="button" onClick={handleNext} className="ml-auto">
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="submit" className="ml-auto" disabled={isSubmitting || !form.formState.isValid}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        Soumettre ma demande <Send className="ml-2 h-4 w-4" />
                    </>
                )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

const steps = [
  { id: 'loanDetails', title: 'Détails et Simulation', fields: ['loanType', 'loanAmount', 'loanDuration'] },
  { id: 'personalInfo', title: 'Informations Personnelles', fields: ['firstName', 'lastName', 'email', 'phone', 'whatsapp', 'birthDay', 'birthMonth', 'birthYear', 'maritalStatus', 'address', 'city', 'country', 'childrenCount'] },
  { id: 'financialInfo', title: 'Situation Financière', fields: ['employmentStatus', 'monthlyIncome', 'monthlyExpenses', 'housingStatus'] },
  { id: 'documents', title: 'Téléversement des Documents', fields: ['identityProof', 'residenceProof', 'incomeProof'] },
  { id: 'legal', title: 'Consentement', fields: ['legalConsent'] },
  { id: 'summary', title: 'Récapitulatif' },
];
