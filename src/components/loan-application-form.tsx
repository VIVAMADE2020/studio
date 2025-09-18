
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";

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
import { ArrowLeft, ArrowRight, Send, Loader2, Upload, AlertCircle, FileCheck } from "lucide-react";
import { submitLoanApplication } from "@/app/actions/loan-application";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { formatCurrency } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { LoanCalculator } from "./loan-calculator";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const loanDetailsSchema = z.object({
  loanType: z.string({ required_error: "Veuillez sélectionner un type de prêt." }),
  loanReason: z.string().min(10, "Veuillez décrire brièvement la raison de votre prêt."),
  loanAmount: z.coerce.number().min(1000, "Le montant minimum est de 1000€.").max(500000, "Le montant maximum est de 500 000€."),
  loanDuration: z.coerce.number().min(12, "La durée minimale est de 12 mois.").max(360, "La durée maximale est de 30 ans (360 mois)."),
});

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis."),
  lastName: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Veuillez entrer une adresse email valide."),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide."),
  whatsapp: z.string().min(10, "Le numéro WhatsApp est obligatoire."),
  birthDay: z.coerce.number().min(1, "Jour invalide").max(31, "Jour invalide"),
  birthMonth: z.coerce.number().min(1, "Mois invalide").max(12, "Mois invalide"),
  birthYear: z.coerce.number().min(new Date().getFullYear() - 100, "Année invalide").max(new Date().getFullYear() - 18, "Vous devez être majeur."),
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

// Le schéma de validation des fichiers est simplifié pour le client
const fileClientSchema = z.any()
  .refine((file) => file, "Ce document est requis.")
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Taille max : 5MB.`)
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
    "Formats supportés: .jpg, .jpeg, .png, .webp et .pdf"
  );
  
const documentsSchema = z.object({
    identityProof: fileClientSchema,
    residenceProof: fileClientSchema,
    incomeProof: fileClientSchema,
});

const legalSchema = z.object({
    legalConsent: z.boolean().refine(val => val === true, {
        message: "Vous devez accepter les conditions pour continuer."
    })
});

// Schéma complet utilisé par le formulaire côté client
const formClientSchema = loanDetailsSchema.merge(personalInfoSchema).merge(financialInfoSchema).merge(documentsSchema).merge(legalSchema);

type FormValues = z.infer<typeof formClientSchema>;

export function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formClientSchema),
    mode: "onBlur",
    defaultValues: {
      loanType: undefined,
      loanReason: "",
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
            // On envoie uniquement les noms des fichiers
            identityProof: values.identityProof.name,
            residenceProof: values.residenceProof.name,
            incomeProof: values.incomeProof.name,
        };
        
        // delete dataToSend.birthDay;
        // delete dataToSend.birthMonth;
        // delete dataToSend.birthYear;

        const result = await submitLoanApplication(dataToSend);
        setIsSubmitting(false);

        if (result.success) {
            setIsSubmitted(true);
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
        setIsSubmitting(false);
    }
  }
  
  const progress = ((currentStep + 1) / (steps.length + 1)) * 100;
  
  if (isSubmitted) {
      return (
        <Card className="text-center p-8 border-green-500">
          <CardHeader>
            <Send className="mx-auto h-12 w-12 text-green-500"/>
            <CardTitle className="text-2xl mt-4">Demande Envoyée !</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Merci pour votre demande. Un conseiller FLEXFOND vous contactera dans les plus brefs délais pour discuter de votre projet.</p>
          </CardContent>
        </Card>
      );
  }

  const FileInputField = ({name, label}: {name: "identityProof" | "residenceProof" | "incomeProof", label: string}) => {
    const file = form.watch(name);
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                             <Input
                                type="file"
                                onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : undefined)}
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                            {file && <FileCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 pointer-events-none" />}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
  }


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
              <FormField
                control={form.control}
                name="loanReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raison du prêt</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Décrivez brièvement la raison de votre demande (ex: achat d'un véhicule, travaux de rénovation, etc.)" {...field} />
                    </FormControl>
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
                <FormField control={form.control} name="firstName" render={({ field }) => (<FormItem><FormLabel>Prénom</FormLabel><FormControl><Input placeholder="Jean" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="lastName" render={({ field }) => (<FormItem><FormLabel>Nom</FormLabel><FormControl><Input placeholder="Dupont" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
              <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="jean.dupont@email.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="whatsapp" render={({ field }) => (<FormItem><FormLabel>WhatsApp</FormLabel><FormControl><Input type="tel" placeholder="0612345678" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
               <div>
                <Label>Date de naissance</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                    <FormField control={form.control} name="birthDay" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Jour" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="birthMonth" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Mois" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="birthYear" render={({ field }) => (<FormItem><FormControl><Input type="number" placeholder="Année" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
              </div>
              <FormField control={form.control} name="address" render={({ field }) => (<FormItem><FormLabel>Adresse</FormLabel><FormControl><Input placeholder="123 rue de Paris" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>Ville</FormLabel><FormControl><Input placeholder="Paris" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="country" render={({ field }) => (<FormItem><FormLabel>Pays</FormLabel><FormControl><Input placeholder="France" {...field} /></FormControl><FormMessage /></FormItem>)} />
              </div>
               <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="maritalStatus" render={({ field }) => (<FormItem><FormLabel>Situation familiale</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez votre situation" /></SelectTrigger></FormControl><SelectContent><SelectItem value="single">Célibataire</SelectItem><SelectItem value="married">Marié(e)</SelectItem><SelectItem value="divorced">Divorcé(e)</SelectItem><SelectItem value="widowed">Veuf(ve)</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="childrenCount" render={({ field }) => (<FormItem><FormLabel>Nombre d'enfants à charge</FormLabel><FormControl><Input type="number" placeholder="ex: 2" {...field} /></FormControl><FormMessage /></FormItem>)} />
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
                      <FormControl><Input placeholder="ex: Développeur Web" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="monthlyIncome" render={({ field }) => (<FormItem><FormLabel>Revenu mensuel net (€)</FormLabel><FormControl><Input type="number" placeholder="ex: 2500" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="monthlyExpenses" render={({ field }) => (<FormItem><FormLabel>Charges mensuelles (€)</FormLabel><FormControl><Input type="number" placeholder="ex: 800" {...field} /></FormControl><FormMessage /></FormItem>)} />
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
                <p className="text-center text-muted-foreground">Veuillez fournir les documents requis pour l'étude de votre dossier.</p>
                <div className="space-y-4">
                    <FileInputField name="identityProof" label="Pièce d'identité (Recto/Verso)" />
                    <FileInputField name="residenceProof" label="Justificatif de domicile (- de 3 mois)" />
                    <FileInputField name="incomeProof" label="Justificatif de revenus (3 derniers bulletins)" />
                </div>
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Information importante</AlertTitle>
                    <AlertDescription>
                        Si votre dossier est accepté après étude de ces documents, vos informations bancaires vous seront demandées pour finaliser le contrat de prêt.
                    </AlertDescription>
                </Alert>
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
                                    J'ai lu et j'accepte les <Link href="/legal/mentions-legales" className="text-primary underline">mentions légales</Link> et la <Link href="/legal/politique-de-confidentialite" className="text-primary underline">politique de confidentialité</Link>.
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
                <p className="text-center text-muted-foreground">Veuillez vérifier les informations avant de soumettre.</p>
                <Card>
                    <CardContent className="pt-6 space-y-4 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div><strong className="text-primary">Type de prêt:</strong> {formData.loanType || "N/A"}</div>
                            <div><strong className="text-primary">Montant:</strong> {formatCurrency(formData.loanAmount)}</div>
                            <div className="md:col-span-2"><strong className="text-primary">Raison du prêt:</strong> {formData.loanReason}</div>
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
                                    <li>Pièce d'identité: <span className="text-muted-foreground">{formData.identityProof?.name || "Non fourni"}</span></li>
                                    <li>Justificatif de domicile: <span className="text-muted-foreground">{formData.residenceProof?.name || "Non fourni"}</span></li>
                                    <li>Justificatif de revenus: <span className="text-muted-foreground">{formData.incomeProof?.name || "Non fourni"}</span></li>
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
  { id: 'loanDetails', title: 'Détails et Simulation', fields: ['loanType', 'loanReason', 'loanAmount', 'loanDuration'] },
  { id: 'personalInfo', title: 'Informations Personnelles', fields: ['firstName', 'lastName', 'email', 'phone', 'whatsapp', 'birthDay', 'birthMonth', 'birthYear', 'maritalStatus', 'address', 'city', 'country', 'childrenCount'] },
  { id: 'financialInfo', title: 'Situation Financière', fields: ['employmentStatus', 'monthlyIncome', 'monthlyExpenses', 'housingStatus'] },
  { id: 'documents', title: 'Vos Documents', fields: ['identityProof', 'residenceProof', 'incomeProof'] },
  { id: 'legal', title: 'Consentement', fields: ['legalConsent'] },
  { id: 'summary', title: 'Récapitulatif' },
];
