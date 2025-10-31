
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/contact@vylscapital.com"
      method="POST"
      className="space-y-6"
    >
      {/* Configuration FormSubmit */}
      <input type="hidden" name="_subject" value="Nouveau message depuis le formulaire de contact" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://www.vylscapital.com/contact/merci" />
       
      <div className="space-y-2">
        <Label htmlFor="name">Nom complet</Label>
        <Input id="name" name="name" placeholder="John Doe" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="john.doe@email.com" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject">Sujet</Label>
        <Input id="subject" name="subject" placeholder="Demande d'information" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Votre message</Label>
        <Textarea id="message" name="message" placeholder="Bonjour, j'aimerais avoir plus d'informations sur..." required />
      </div>

      <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Envoyer le message
      </Button>
    </form>
  );
}
