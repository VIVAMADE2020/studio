"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const testimonials = [
  { name: "Sophie L.", role: "Paris, France", text: "Processus simple et rapide. J'ai pu financer ma startup grâce à VIXCAPITAL." },
  { name: "Marc D.", role: "Berlin, Allemagne", text: "Prêt immobilier obtenu à des conditions très avantageuses. Conseiller très professionnel." },
  { name: "Giulia R.", role: "Rome, Italie", text: "Nous avons enfin pu acheter notre première voiture familiale. Offre claire et sans surprise." },
  { name: "Liam Smith", role: "Londres, Royaume-Uni", text: "Excellent service client, très réactif. Je recommande vivement pour tout projet personnel." },
  { name: "Javier G.", role: "Madrid, Espagne", text: "Le rachat de crédits m'a permis de respirer financièrement. Une équipe à l'écoute." },
  { name: "Ana Silva", role: "Lisbonne, Portugal", text: "J'ai financé mes études supérieures sans stress. Des conditions adaptées aux étudiants." },
  { name: "Lars K.", role: "Oslo, Norvège", text: "Solution de financement trouvée pour rénover notre maison. Efficace et transparent." },
  { name: "Maja N.", role: "Stockholm, Suède", text: "Un accompagnement sur-mesure pour mon investissement locatif. Très satisfaite." },
  { name: "Jan V.", role: "Amsterdam, Pays-Bas", text: "Le prêt auto était parfait pour ma nouvelle voiture électrique. Rapide et facile." },
  { name: "Katarzyna W.", role: "Varsovie, Pologne", text: "Équipe très professionnelle qui a su répondre à toutes mes questions sur le prêt immobilier." },
  { name: "Elena P.", role: "Athènes, Grèce", text: "J'ai pu concrétiser mon projet de voyage autour du monde grâce au prêt personnel." },
  { name: "David H.", role: "Dublin, Irlande", text: "Service fiable. J'ai obtenu le financement nécessaire pour développer mon entreprise." },
  { name: "Isabelle M.", role: "Bruxelles, Belgique", text: "Le regroupement de mes crédits a simplifié ma gestion budgétaire. Un vrai soulagement." },
  { name: "Florian S.", role: "Vienne, Autriche", text: "Conseils avisés et un prêt étudiant avec un taux très intéressant. Je suis ravi." },
  { name: "Heidi L.", role: "Helsinki, Finlande", text: "Financement rapide pour l'achat d'équipement professionnel. Service impeccable." },
  { name: "Nikolaj Jensen", role: "Copenhague, Danemark", text: "Le prêt immobilier a été une étape clé dans notre vie, et VIXCAPITAL l'a rendue simple." },
  { name: "Chloé Dubois", role: "Genève, Suisse", text: "Très bonne expérience pour mon premier achat immobilier. Je me suis sentie accompagnée." },
  { name: "Petr N.", role: "Prague, République Tchèque", text: "Le crédit auto a été approuvé en un temps record. Parfait pour ne pas rater l'occasion." },
  { name: "Maria I.", role: "Bucarest, Roumanie", text: "J'ai pu faire les travaux de rénovation que je reportais depuis des années. Merci !" },
  { name: "András V.", role: "Budapest, Hongrie", text: "Clarté des informations et rapidité du traitement de dossier. Je recommande." },
  { name: "Sofia K.", role: "Sofia, Bulgarie", text: "Une solution de prêt personnel flexible qui correspondait exactement à mes attentes." },
  { name: "Luka M.", role: "Zagreb, Croatie", text: "Financer mon master à l'étranger est devenu possible grâce à leur prêt étudiant." },
  { name: "Tomasz K.", role: "Cracovie, Pologne", text: "Leur expertise en prêt professionnel a été un atout majeur pour mon commerce." },
  { name: "Emma Johnson", role: "Édimbourg, Écosse", text: "Service client exceptionnel. Ils m'ont guidé à travers chaque étape de ma demande." },
  { name: "Miguel R.", role: "Barcelone, Espagne", text: "Le rachat de crédits a été la meilleure décision pour mes finances. L'équipe a été géniale." },
  { name: "Freja Olsen", role: "Aarhus, Danemark", text: "J'ai acheté ma première voiture grâce à eux. Un processus sans stress et très clair." },
  { name: "Alessandro F.", role: "Milan, Italie", text: "Des professionnels qui comprennent les besoins des entrepreneurs. Je ferai de nouveau appel à eux." },
  { name: "Katrin S.", role: "Hambourg, Allemagne", text: "Accompagnement parfait pour notre projet d'achat de résidence secondaire." },
  { name: "Niamh O'Kelly", role: "Cork, Irlande", text: "Le prêt personnel m'a permis de financer mon mariage de rêve. Tout était parfait." },
  { name: "Antoine L.", role: "Lyon, France", text: "Une équipe dynamique et à l'écoute, qui a su trouver la solution de financement adaptée à ma situation." }
];

export function TestimonialsSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Ils nous font confiance à travers l'Europe</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    La satisfaction de nos clients est notre plus grande récompense.
                </p>
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    className="w-full max-w-4xl mx-auto mt-12"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="text-left bg-card h-full">
                                        <CardContent className="flex flex-col h-full p-6">
                                            <Quote className="w-8 h-8 text-accent mb-4" />
                                            <p className="text-muted-foreground flex-grow">"{testimonial.text}"</p>
                                            <div className="flex items-center mt-6 pt-6 border-t">
                                                <Avatar>
                                                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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
    );
}
