import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Quote } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LoanCalculator } from '@/components/loan-calculator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';


// Mock data for services
const serviceData: { [key: string]: any } = {
  'pret-personnel': {
    title: 'Prêt Personnel',
    tagline: 'Financez tous vos projets, sans contraintes, à un taux fixe de 2%.',
    description: 'Le prêt personnel est une solution de financement polyvalente qui vous permet de concrétiser vos envies sans avoir à justifier de l\'utilisation des fonds. Mariage, voyage, équipement, études... vous êtes libre de l\'utiliser comme bon vous semble, en profitant d\'un taux fixe avantageux de 2%.',
    features: ['Taux fixe exceptionnel de 2%', 'Flexibilité d\'utilisation', 'Mensualités constantes', 'Réponse de principe rapide', 'Aucun apport personnel exigé'],
    steps: [
        { title: 'Simulation en ligne', description: 'Utilisez notre simulateur pour définir le montant et la durée de votre prêt.' },
        { title: 'Demande simplifiée', description: 'Remplissez notre formulaire en quelques minutes et téléchargez vos pièces justificatives.' },
        { title: 'Réception des fonds', description: 'Après acceptation définitive, les fonds sont versés sur votre compte bancaire.' }
    ],
    faqs: [
        { question: "Puis-je utiliser le prêt personnel pour n'importe quel projet ?", answer: "Oui, c'est un prêt non affecté. Vous êtes libre d'utiliser les fonds comme bon vous semble sans fournir de justificatif d'achat." },
        { question: "Quel est le montant maximum que je peux emprunter ?", answer: "Le montant varie selon votre capacité de remboursement, mais il peut aller jusqu'à 75 000 €." },
        { question: "Le taux de 2% est-il garanti ?", answer: "Oui, il s'agit d'un taux fixe. Vos mensualités n'augmenteront pas pendant toute la durée du prêt." }
    ],
    testimonials: [
        { name: "Elena P.", role: "Athènes, Grèce", text: "J'ai pu concrétiser mon projet de voyage autour du monde grâce au prêt personnel de FLEXFOND. Le processus était simple et l'équipe très réactive." },
        { name: "Niamh O'Kelly", role: "Cork, Irlande", text: "Le prêt personnel m'a permis de financer mon mariage de rêve. Tout était parfait, clair et sans surprise." },
        { name: "Antoine L.", role: "Lyon, France", text: "Une équipe dynamique et à l'écoute, qui a su trouver la solution de financement adaptée à ma situation pour des travaux imprévus." }
    ]
  },
  'pret-immobilier': {
    title: 'Prêt Immobilier',
    tagline: 'Devenez propriétaire en toute sérénité avec notre taux fixe de 2%.',
    description: 'Que ce soit pour l\'achat de votre résidence principale, secondaire ou un investissement locatif, notre prêt immobilier vous offre les meilleures conditions pour réaliser votre projet de vie. Nos experts vous accompagnent à chaque étape, avec la garantie d\'un taux fixe de 2%.',
    features: ['Taux fixe garanti de 2%', 'Accompagnement personnalisé', 'Flexibilité des remboursements', 'Assurance emprunteur optimisée'],
    steps: [
        { title: 'Étude de votre capacité d\'emprunt', description: 'Nos conseillers évaluent avec vous votre budget et votre projet.' },
        { title: 'Montage du dossier de financement', description: 'Nous vous aidons à constituer un dossier solide pour maximiser vos chances de succès.' },
        { title: 'Signature chez le notaire', description: 'Après accord de la banque, vous signez l\'acte de vente et devenez propriétaire.' }
    ],
    faqs: [
        { question: "Dois-je avoir un apport personnel ?", answer: "Bien qu'un apport soit souvent recommandé (généralement pour couvrir les frais de notaire et de garantie), nous étudions les dossiers sans apport au cas par cas." },
        { question: "Quelle est la durée maximale d'un prêt immobilier ?", answer: "La durée de remboursement peut s'étendre jusqu'à 25, voire 30 ans dans certaines situations, en fonction de votre âge et de votre projet." },
        { question: "Puis-je moduler mes échéances ?", answer: "Oui, la plupart de nos contrats de prêt immobilier incluent des options de flexibilité, vous permettant de moduler vos mensualités à la hausse ou à la baisse sous certaines conditions." }
    ],
    testimonials: [
        { name: "Marc D.", role: "Berlin, Allemagne", text: "Prêt immobilier obtenu à des conditions très avantageuses. Mon conseiller a été très professionnel et m'a accompagné jusqu'à la signature." },
        { name: "Chloé Dubois", role: "Genève, Suisse", text: "Très bonne expérience pour mon premier achat immobilier. Je me suis sentie guidée et en confiance à chaque étape." },
        { name: "Nikolaj Jensen", role: "Copenhague, Danemark", text: "Le prêt immobilier a été une étape clé dans notre vie, et FLEXFOND l'a rendue simple et transparente. Le taux à 2% était imbattable." }
    ]
  },
   'pret-auto': {
    title: 'Prêt Auto',
    tagline: 'Prenez la route avec le véhicule de vos rêves à un taux fixe de 2%.',
    description: 'Financez l\'achat de votre voiture neuve ou d\'occasion avec un crédit auto simple et avantageux. Nous vous proposons des solutions adaptées à votre budget pour que vous puissiez conduire en toute tranquillité, grâce à notre taux fixe de 2%.',
    features: ['Taux d\'intérêt fixe de 2%', 'Pour véhicules neufs ou d\'occasion', 'Sans apport personnel obligatoire', 'Mensualités fixes', 'Processus 100% en ligne'],
    steps: [
        { title: 'Choisissez votre véhicule', description: 'Trouvez la voiture qui vous correspond chez le concessionnaire de votre choix.' },
        { title: 'Faites votre demande de prêt', description: 'Simulez et soumettez votre demande en quelques clics sur notre site.' },
        { title: 'Recevez votre financement', description: 'Une fois le prêt accordé, vous pouvez finaliser l\'achat de votre voiture.' }
    ],
    faqs: [
        { question: "Le prêt auto finance-t-il les voitures d'occasion ?", answer: "Oui, notre prêt auto couvre aussi bien l'achat de véhicules neufs que d'occasion, sans distinction d'âge ou de kilométrage." },
        { question: "Dois-je signer un bon de commande avant d'avoir la réponse du prêt ?", answer: "Non, il est fortement conseillé d'attendre l'accord définitif de votre prêt avant de vous engager auprès du vendeur." },
        { question: "Le versement des fonds se fait-il directement au garage ?", answer: "Selon votre préférence, les fonds peuvent être versés sur votre compte personnel ou directement au concessionnaire ou vendeur du véhicule." }
    ],
    testimonials: [
        { name: "Giulia R.", role: "Rome, Italie", text: "Nous avons enfin pu acheter notre première voiture familiale. L'offre de FLEXFOND était claire, le taux très bas et sans aucune surprise." },
        { name: "Jan V.", role: "Amsterdam, Pays-Bas", text: "Le prêt auto était parfait pour ma nouvelle voiture électrique. Le processus a été rapide, facile et entièrement en ligne. Je recommande." },
        { name: "Petr N.", role: "Prague, République Tchèque", text: "Le crédit auto a été approuvé en un temps record. Parfait pour ne pas rater l'occasion sur un véhicule d'occasion que je convoitais." }
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

              <h3 className="text-xl font-bold text-primary mt-12">Les avantages FLEXFOND</h3>
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
                        <p className="text-sm text-muted-foreground">Prêt à vous lancer ? Simulez votre prêt ou contactez-nous.</p>
                        <Button asChild size="lg" className="w-full">
                            <Link href="/demande-pret">Faire une demande</Link>
                        </Button>
                         <Button asChild size="lg" variant="outline" className="w-full">
                            <Link href="/contact">Nous contacter</Link>
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

      {/* Loan Calculator */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
            <div className="max-w-4xl mx-auto">
                 <LoanCalculator />
            </div>
        </div>
      </section>

      {/* Testimonials */}
      {service.testimonials && (
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Avis de nos clients</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Découvrez ce que nos clients disent de notre service de {service.title}.
            </p>
             <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-4xl mx-auto mt-12"
            >
                <CarouselContent>
                    {service.testimonials.map((testimonial: any, index: number) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                                <Card className="text-left bg-card h-full">
                                    <CardContent className="flex flex-col h-full p-6">
                                        <Quote className="w-8 h-8 text-accent mb-4" />
                                        <p className="text-muted-foreground flex-grow">"{testimonial.text}"</p>
                                        <div className="flex items-center mt-6 pt-6 border-t">
                                            <Avatar>
                                                <AvatarFallback>{testimonial.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4">
                                                <p className="font-semibold text-primary">{testimonial.name}</p>
                                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
      </section>
      )}

      {/* FAQ */}
      {service.faqs && (
        <section className="py-16 md:py-24 bg-background">
            <div className="container px-4 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Questions fréquentes sur le {service.title}</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                {service.faqs.map((faq: any, index: number) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
        </section>
      )}

    </div>
  );
}
