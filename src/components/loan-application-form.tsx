
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Lock } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

export function LoanApplicationForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // La première fois que vous utiliserez ce formulaire, vous recevrez un e-mail d'activation de formsubmit.co.
  // Vous devrez cliquer sur le lien pour autoriser les envois.
  return (
    <form
      action="https://formsubmit.co/contact@vylscapital.com"
      method="POST"
      className="space-y-6"
      onSubmit={() => setIsSubmitting(true)}
    >
      {/* Configuration FormSubmit */}
      <input type="hidden" name="_subject" value="Nouvelle Demande de Prêt" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
       
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input id="firstName" name="Prénom" placeholder="Jean" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input id="lastName" name="Nom" placeholder="Dupont" required />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Montant du Prêt (€)</Label>
          <Input id="loanAmount" name="Montant du Prêt" type="number" placeholder="50000" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="loanDuration">Durée (mois)</Label>
          <Input id="loanDuration" name="Durée en mois" type="number" placeholder="120" required />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Adresse Email</Label>
          <Input id="email" name="Email" type="email" placeholder="vous@exemple.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Numéro de Téléphone</Label>
          <Input id="phone" name="Téléphone" type="tel" placeholder="+33 6 12 34 56 78" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">Pays de résidence</Label>
        <Select name="Pays de résidence" required>
          <SelectTrigger id="country">
            <SelectValue placeholder="Sélectionnez un pays" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="France">France</SelectItem>
            <SelectItem value="Belgium">Belgique</SelectItem>
            <SelectItem value="Switzerland">Suisse</SelectItem>
            <SelectItem value="Luxembourg">Luxembourg</SelectItem>
            <SelectItem value="Germany">Allemagne</SelectItem>
            <SelectItem value="Spain">Espagne</SelectItem>
            <SelectItem value="Italy">Italie</SelectItem>
            <SelectItem value="Other">Autre</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="employmentStatus">Profession</Label>
          <Input id="employmentStatus" name="Profession" placeholder="Développeur" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Revenu mensuel net (€)</Label>
          <Input id="monthlyIncome" name="Revenu mensuel net" type="number" placeholder="3000" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="loanReason">Motif de la demande</Label>
        <Textarea
          id="loanReason"
          name="Motif de la demande"
          placeholder="Décrivez brièvement votre projet (ex: Achat d'un véhicule, rénovation, etc.)"
          required
        />
      </div>
      <div className="flex items-start space-x-3">
        <Checkbox id="legalConsent" name="Consentement" required />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="legalConsent"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Je reconnais avoir lu et j'accepte la <Link href="/legal/politique-de-confidentialite" target="_blank" className="text-primary underline hover:text-accent">politique de confidentialité</Link>.
          </label>
          <p className="text-xs text-muted-foreground">
            En soumettant ce formulaire, je consens à ce que VylsCapital collecte et traite mes données personnelles pour l'étude de ma demande de financement.
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          <Send className="mr-2 h-4 w-4" />
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
        </Button>
        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
          <Lock className="h-3 w-3" /> Vos informations sont chiffrées et sécurisées.
        </p>
        <p className="text-xs text-center text-muted-foreground pt-2">
          Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
        </p>
      </div>
    </form>
  );
}
