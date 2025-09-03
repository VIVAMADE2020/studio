
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Send, Loader2, Upload, FileText, AlertCircle } from "lucide-react";
import { submitLoanApplication } from "@/app/actions/loan-application";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { formatCurrency } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

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
  birthDate: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Veuillez entrer une date valide (JJ/MM/AAAA)."),
  maritalStatus: z.string({ required_error: "Veuillez sélectionner votre situation familiale." }),
  address: z.string().min(5, "L'adresse est requise."),
  city: z.string().min(2, "La ville est requise."),
  country: z.string().min(2, "Le pays est requis."),
  childrenCount: z.coerce.number().min(0, "Veuillez entrer un nombre valide."),
});

const financialInfoSchema = z.object({
  employmentStatus: z.string().min(2, "La profession est requise."),
  monthlyIncome: z.coerce.number().min(500, "Le revenu minimum est de 500€."),
  monthlyExpenses: z.coerce.number().min(0, "Veuillez entrer un montant valide."),
  housingStatus: z.string({ required_error: "Veuillez sélectionner votre situation de logement." }),
});

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

const documentsSchema = z.object({
    identityProof: z.any()
        .refine((files) => files?.length == 1, "Une pièce d'identité est requise.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Taille max : 5MB.`)
        .refine(
          (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
          "Formats supportés: .jpg, .jpeg, .png, .webp et .pdf"
        ),
    residenceProof: z.any()
        .refine((files) => files?.length == 1, "Un justificatif de domicile est requis.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Taille max : 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Formats supportés: .jpg, .jpeg, .png, .webp et .pdf"
        ),
    incomeProof: z.any()
        .refine((files) => files?.length == 1, "Un justificatif de revenus est requis.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Taille max : 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            "Formats supportés: .jpg, .jpeg, .png, .webp et .pdf"
        ),
});


const formSchema = loanDetailsSchema.merge(personalInfoSchema).merge(financialInfoSchema).merge(documentsSchema);

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 'loanDetails', title: 'Détails du prêt', fields: ['loanType', 'loanAmount', 'loanDuration'], schema: loanDetailsSchema },
  { id: 'personalInfo', title: 'Informations Personnelles', fields: ['firstName', 'lastName', 'email', 'phone', 'whatsapp', 'birthDate', 'maritalStatus', 'address', 'city', 'country', 'childrenCount'], schema: personalInfoSchema },
  { id: 'financialInfo', title: 'Situation Financière', fields: ['employmentStatus', 'monthlyIncome', 'monthlyExpenses', 'housingStatus'], schema: financialInfoSchema },
  { id: 'documents', title: 'Vos Documents', fields: ['identityProof', 'residenceProof', 'incomeProof'], schema: documentsSchema },
  { id: 'summary', title: 'Récapitulatif' },
];

export function LoanApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanType: "",
      loanAmount: 10000,
      loanDuration: 120,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      whatsapp: "",
      birthDate: "",
      maritalStatus: "",
      address: "",
      city: "",
      country: "",
      childrenCount: 0,
      employmentStatus: "",
      monthlyIncome: 2500,
      monthlyExpenses: 0,
      housingStatus: "",
      identityProof: undefined,
      residenceProof: undefined,
      incomeProof: undefined,
    },
  });
  
  const formData = form.getValues();

  const handleNext = async () => {
    const currentStepSchema = steps[currentStep].schema;
    if (currentStepSchema) {
        const result = await form.trigger(steps[currentStep].fields as (keyof FormValues)[]);
        if (!result) return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };
  
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    // In a real app, you would upload files to a storage service first.
    // For this demo, we'll just pass the file info.
    const dataToSubmit = {
        ...values,
        identityProof: values.identityProof[0].name,
        residenceProof: values.residenceProof[0].name,
        incomeProof: values.incomeProof[0].name,
    };

    const result = await submitLoanApplication(dataToSubmit);
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
            <p className="text-muted-foreground">Merci pour votre demande. Un conseiller VIXCAPITAL vous contactera dans les plus brefs délais pour discuter de votre projet.</p>
          </CardContent>
        </Card>
      );
  }

  const FileInputField = ({name, label}: {name: "identityProof" | "residenceProof" | "incomeProof", label: string}) => {
      const { control } = form;
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div className="relative">
                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        type="file" 
                        className="pl-10"
                        onChange={(e) => field.onChange(e.target.files)}
                    />
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
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="loanAmount" render={({ field }) => (<FormItem><FormLabel>Montant souhaité (€)</FormLabel><FormControl><Input type="number" placeholder="ex: 10000" {...field} /></FormControl><FormMessage /></FormItem>)} />
              <FormField control={form.control} name="loanDuration" render={({ field }) => (<FormItem><FormLabel>Durée de remboursement (en mois)</FormLabel><FormControl><Input type="number" placeholder="ex: 120" {...field} /></FormControl><FormMessage /></FormItem>)} />
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
              <FormField control={form.control} name="birthDate" render={({ field }) => (<FormItem><FormLabel>Date de naissance</FormLabel><FormControl><Input type="text" placeholder="JJ/MM/AAAA" {...field} /></FormControl><FormMessage /></FormItem>)} />
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
                <FormField control={form.control} name="employmentStatus" render={({ field }) => (<FormItem><FormLabel>Profession</FormLabel><FormControl><Input placeholder="ex: Développeur web" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="monthlyIncome" render={({ field }) => (<FormItem><FormLabel>Revenu mensuel net (€)</FormLabel><FormControl><Input type="number" placeholder="ex: 2500" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="monthlyExpenses" render={({ field }) => (<FormItem><FormLabel>Charges mensuelles (€)</FormLabel><FormControl><Input type="number" placeholder="ex: 800" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                <FormField
                    control={form.control}
                    name="housingStatus"
                    render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel>Situation de logement</FormLabel>
                        <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="owner" /></FormControl><FormLabel className="font-normal">Propriétaire</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="tenant" /></FormControl><FormLabel className="font-normal">Locataire</FormLabel></FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="hosted" /></FormControl><FormLabel className="font-normal">Hébergé(e) à titre gratuit</FormLabel></FormItem>
                        </RadioGroup>
                        </FormControl>
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
                <p className="text-center text-muted-foreground">Veuillez vérifier les informations avant de soumettre.</p>
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
                            <div><strong className="text-primary">Date de naissance:</strong> {formData.birthDate}</div>
                            <div className="md:col-span-2"><strong className="text-primary">Adresse:</strong> {formData.address}, {formData.city}, {formData.country}</div>
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
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
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
