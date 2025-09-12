import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary uppercase">
                PRENDRE CONTACT
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Une question ? Un projet ? Notre équipe d'experts est à votre entière disposition pour vous accompagner.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                    src="https://i.postimg.cc/NMjBjxSH/arlington-research-k-N-k-Vi-Dch-A0-unsplash.jpg"
                    alt="Équipe de contact"
                    fill
                    className="object-cover"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Form & Details Section */}
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="uppercase">ENVOYEZ-NOUS UN MESSAGE</CardTitle>
                    <CardDescription>Nous vous répondrons dans les plus brefs délais.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
            <div className="space-y-8 pt-4">
                <h2 className="text-2xl font-bold text-primary uppercase">NOS COORDONNÉES</h2>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary uppercase">ADRESSE</h3>
                        <p className="text-muted-foreground">123 Rue de la Finance<br/>75001 Paris, France</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                        <Phone className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary uppercase">TÉLÉPHONE</h3>
                        <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary uppercase">EMAIL</h3>
                        <p className="text-muted-foreground">contact@flexfond.com</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
