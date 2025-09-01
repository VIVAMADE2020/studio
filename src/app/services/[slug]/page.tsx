import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock data for services
const serviceData: { [key: string]: any } = {
  'pret-personnel': {
    title: 'Prêt Personnel',
    tagline: 'Financez tous vos projets, sans contraintes.',
    description: 'Le prêt personnel est une solution de financement polyvalente qui vous permet de concrétiser vos envies sans avoir à justifier de l\'utilisation des fonds. Mariage, voyage, équipement, études... vous êtes libre de l\'utiliser comme bon vous semble.',
    image: 'https://picsum.photos/1200/800?random=10',
    dataAiHint: 'happy person traveling',
    features: ['Flexibilité d\'utilisation', 'Taux fixe et mensualités constantes', 'Réponse de principe rapide', 'Aucun apport personnel exigé'],
    steps: [
        { title: 'Simulation en ligne', description: 'Utilisez notre simulateur pour définir le montant et la durée de votre prêt.' },
        { title: 'Demande simplifiée', description: 'Remplissez notre formulaire en quelques minutes et téléchargez vos pièces justificatives.' },
        { title: 'Réception des fonds', description: 'Après acceptation définitive, les fonds sont versés sur votre compte bancaire.' }
    ]
  },
  'pret-immobilier': {
    title: 'Prêt Immobilier',
    tagline: 'Devenez propriétaire en toute sérénité.',
    description: 'Que ce soit pour l\'achat de votre résidence principale, secondaire ou un investissement locatif, notre prêt immobilier vous offre les meilleures conditions pour réaliser votre projet de vie. Nos experts vous accompagnent à chaque étape.',
    image: 'https://picsum.photos/1200/800?random=11',
    dataAiHint: 'modern house exterior',
    features: ['Accompagnement personnalisé', 'Taux parmi les plus compétitifs du marché', 'Flexibilité des remboursements', 'Assurance emprunteur optimisée'],
    steps: [
        { title: 'Étude de votre capacité d\'emprunt', description: 'Nos conseillers évaluent avec vous votre budget et votre projet.' },
        { title: 'Montage du dossier de financement', description: 'Nous vous aidons à constituer un dossier solide pour maximiser vos chances de succès.' },
        { title: 'Signature chez le notaire', description: 'Après accord de la banque, vous signez l\'acte de vente et devenez propriétaire.' }
    ]
  },
   'pret-auto': {
    title: 'Prêt Auto',
    tagline: 'Prenez la route avec le véhicule de vos rêves.',
    description: 'Financez l\'achat de votre voiture neuve ou d\'occasion avec un crédit auto simple et avantageux. Nous vous proposons des solutions adaptées à votre budget pour que vous puissiez conduire en toute tranquillité.',
    image: 'https://picsum.photos/1200/800?random=12',
    dataAiHint: 'new car road',
    features: ['Pour véhicules neufs ou d\'occasion', 'Sans apport personnel obligatoire', 'Mensualités fixes', 'Processus 100% en ligne'],
    steps: [
        { title: 'Choisissez votre véhicule', description: 'Trouvez la voiture qui vous correspond chez le concessionnaire de votre choix.' },
        { title: 'Faites votre demande de prêt', description: 'Simulez et soumettez votre demande en quelques clics sur notre site.' },
        { title: 'Recevez votre financement', description: 'Une fois le prêt accordé, vous pouvez finaliser l\'achat de votre voiture.' }
    ]
  },
};

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({
    slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = serviceData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-secondary/50">
        <div className="container relative text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">{service.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{service.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary">Qu'est-ce que le {service.title} ?</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.description }} />

              <h3 className="text-xl font-bold text-primary mt-12">Les avantages VIXCAPITAL</h3>
              <ul className="mt-6 space-y-4">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader>
                        <CardTitle>Votre projet commence ici</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Prêt à vous lancer ? Faites une demande en ligne et obtenez une réponse rapidement.</p>
                        <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href="/demande-pret">Demander un {service.title}</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Steps */}
       <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container text-center">
            <h2 className="text-3xl font-bold text-primary">Le processus en 3 étapes simples</h2>
            <p className="mt-2 text-muted-foreground">Obtenir votre financement n'a jamais été aussi facile.</p>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-left relative">
                <div className="absolute top-8 left-0 w-full h-0.5 border-t-2 border-dashed border-border hidden md:block"></div>
                {service.steps.map((step: any, index: number) => (
                     <div key={index} className="relative z-10">
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                                        {index + 1}
                                    </div>
                                    <CardTitle>{step.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{step.description}</p>
                            </CardContent>
                        </Card>
                     </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
