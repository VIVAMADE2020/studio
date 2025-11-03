
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart, Briefcase, Calendar, CheckCircle, Handshake, Quote, Star, Target, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const keyFigures = [
    { icon: <Calendar className="w-8 h-8 text-accent" />, value: "+9 ANS", label: "D'EXPÉRIENCE" },
    { icon: <Users className="w-8 h-8 text-accent" />, value: "10,000+", label: "CLIENTS SATISFAITS" },
    { icon: <BarChart className="w-8 h-8 text-accent" />, value: "500M+", label: "D'EUROS FINANCÉS" },
    { icon: <Star className="w-8 h-8 text-accent" />, value: "98%", label: "DE SATISFACTION" },
];

const expertisePoints = [
    { icon: <Target className="h-6 w-6 text-primary" />, title: "Analyse sur Mesure", description: "Nous étudions votre profil et vos objectifs pour vous proposer les meilleures stratégies." },
    { icon: <Handshake className="h-6 w-6 text-primary" />, title: "Accès Privilégié", description: "Notre réseau de partenaires nous donne accès à des conditions de financement exclusives." },
    { icon: <Briefcase className="h-6 w-6 text-primary" />, title: "Accompagnement Complet", description: "De la première simulation à la signature finale, nous sommes à vos côtés à chaque étape." },
];

const testimonials = [
  { name: "Sophie L.", role: "Paris, France", text: "Processus simple et rapide. J'ai pu financer ma startup grâce à VylsCapital." },
  { name: "Marc D.", role: "Berlin, Allemagne", text: "Prêt immobilier obtenu à des conditions très avantageuses. Conseiller très professionnel." },
  { name: "Giulia R.", role: "Rome, Italie", text: "Nous avons enfin pu acheter notre première voiture familiale. Offre claire et sans surprise." },
];

export default function InvestirPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary uppercase">
                                VylsCapital Courtier
                            </h1>
                            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                                Votre partenaire expert pour des solutions de financement optimisées. Nous négocions pour vous les meilleures conditions du marché.
                            </p>
                            <Button asChild size="lg" className="mt-8">
                                <Link href="/contact">Prendre rendez-vous</Link>
                            </Button>
                        </div>
                        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://i.postimg.cc/4y8czLv2/pexels-pixabay-210607.jpg"
                                alt="VylsCapital Courtier"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

             {/* Key Figures Section */}
            <section className="py-16 bg-secondary/50">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {keyFigures.map(figure => (
                            <div key={figure.label}>
                                <div className="flex justify-center mb-2">{figure.icon}</div>
                                <p className="text-3xl md:text-4xl font-bold text-primary">{figure.value}</p>
                                <p className="text-sm font-semibold text-muted-foreground mt-1">{figure.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-16 md:py-24">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Notre Expertise de Courtier à Votre Service</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                        Faire appel à VylsCapital, c'est choisir un allié qui défend vos intérêts pour vous assurer un gain de temps, d'argent et de sérénité.
                    </p>
                    <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
                        {expertisePoints.map(point => (
                            <Card key={point.title} className="bg-card hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center gap-4">
                                     <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        {point.icon}
                                    </div>
                                    <CardTitle>{point.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{point.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* How it works */}
            <section className="py-16 md:py-24 bg-secondary/50">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Un Processus Simple et Transparent</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative text-center">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border hidden md:block"></div>
                         <div className="flex flex-col items-center relative">
                            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-background z-10">1</div>
                            <h3 className="mt-4 text-xl font-semibold text-primary">Analyse de votre Projet</h3>
                            <p className="mt-2 text-muted-foreground">Nous étudions votre demande et vos documents pour bâtir un dossier solide et convaincant.</p>
                        </div>
                         <div className="flex flex-col items-center relative">
                             <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-background z-10">2</div>
                            <h3 className="mt-4 text-xl font-semibold text-primary">Négociation Bancaire</h3>
                            <p className="mt-2 text-muted-foreground">Nous mettons en concurrence nos partenaires pour obtenir les meilleures conditions de prêt pour vous.</p>
                        </div>
                         <div className="flex flex-col items-center relative">
                             <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-background z-10">3</div>
                            <h3 className="mt-4 text-xl font-semibold text-primary">Signature de l'Offre</h3>
                            <p className="mt-2 text-muted-foreground">Nous vous accompagnons dans le choix de la meilleure offre jusqu'à la signature finale.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
             <section className="py-16 md:py-24 bg-background">
                <div className="container text-center">
                     <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Ce que nos clients disent de nous</h2>
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                         {testimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-card">
                                <CardContent className="p-6 text-left">
                                    <Quote className="w-8 h-8 text-accent mb-4" />
                                    <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                                    <div className="flex items-center mt-4 pt-4 border-t">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4">
                                            <p className="font-semibold text-primary">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                         ))}
                     </div>
                </div>
            </section>

             {/* CTA Section */}
            <section className="py-16 md:py-24 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase">Prêt à optimiser votre financement ?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Confiez-nous votre projet. Nos experts sont prêts à trouver la meilleure solution pour vous. L'étude est gratuite et sans engagement.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/demande-pret">Soumettre mon projet</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/contact">Nous Contacter</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
