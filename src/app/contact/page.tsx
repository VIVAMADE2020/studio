import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Contactez-nous</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Une question ? Un projet ? Notre équipe est à votre écoute.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Envoyez-nous un message</CardTitle>
                    <CardDescription>Nous vous répondrons dans les plus brefs délais.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
            <div className="space-y-8 pt-4">
                <h2 className="text-2xl font-bold text-primary">Nos coordonnées</h2>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary">Adresse</h3>
                        <p className="text-muted-foreground">123 Rue de la Finance<br/>75001 Paris, France</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                        <Phone className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary">Téléphone</h3>
                        <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary">Email</h3>
                        <p className="text-muted-foreground">contact@vixcapital.fr</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
