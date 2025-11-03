
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, ShieldCheck, Zap, DollarSign, Quote, Percent, Users, BarChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const keyFigures = [
    { icon: <Percent className="w-8 h-8 text-accent" />, value: "14%", label: "RETOURS ANNUELS" },
    { icon: <Users className="w-8 h-8 text-accent" />, value: "1,200+", label: "INVESTISSEURS ACTIFS" },
    { icon: <BarChart className="w-8 h-8 text-accent" />, value: "25M+", label: "D'EUROS SOUS GESTION" },
    { icon: <DollarSign className="w-8 h-8 text-accent" />, value: "1000€", label: "INVESTISSEMENT MINIMUM" },
];

const expertisePoints = [
    { icon: <TrendingUp className="h-6 w-6 text-primary" />, title: "Haut Rendement", description: "Visez une performance cible de 14% par an grâce à nos stratégies d'investissement diversifiées." },
    { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Sécurité et Transparence", description: "Nous investissons dans des actifs tangibles et vous offrons une visibilité totale sur votre portefeuille." },
    { icon: <Zap className="h-6 w-6 text-primary" />, title: "Simplicité d'Accès", description: "Ouvrez votre compte en quelques minutes et commencez à investir avec seulement 1000€." },
];

const testimonials = [
  { name: "Sophie L.", role: "Investisseuse Particulière", text: "Processus simple et transparent. J'ai vu mon capital croître régulièrement. Très satisfaite du rendement de 14%." },
  { name: "Marc D.", role: "Chef d'entreprise", text: "Une excellente alternative aux placements traditionnels. L'équipe est professionnelle et réactive." },
  { name: "Giulia R.", role: "Préparation Retraite", text: "Enfin une solution d'investissement accessible qui tient ses promesses. Je recommande pour faire fructifier son épargne." },
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
                                INVESTISSEZ ET VISEZ 14% DE RETOUR ANNUEL
                            </h1>
                            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                                Ouvrez les portes de l'investissement à haut rendement. VylsCapital vous donne accès à des opportunités exclusives pour faire fructifier votre capital.
                            </p>
                            <Button asChild size="lg" className="mt-8">
                                <Link href="/investir/ouvrir-un-compte">Demander une ouverture de compte</Link>
                            </Button>
                        </div>
                        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://i.postimg.cc/4y8czLv2/pexels-pixabay-210607.jpg"
                                alt="Investissement à haut rendement"
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
                    <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Une Stratégie d'Investissement Performante et Accessible</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                        Chez VylsCapital, nous démocratisons l'accès à des stratégies d'investissement autrefois réservées à une élite. Notre mission est de vous offrir une performance solide et régulière.
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
                        <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Comment ça marche ?</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 relative text-center">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border hidden md:block"></div>
                         <div className="flex flex-col items-center relative">
                            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-background z-10">1</div>
                            <h3 className="mt-4 text-xl font-semibold text-primary">Faites votre demande</h3>
                            <p className="mt-2 text-muted-foreground">Remplissez notre formulaire en ligne en moins de 5 minutes. C'est simple, rapide et sécurisé.</p>
                        </div>
                         <div className="flex flex-col items-center relative">
                             <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-background z-10">2</div>
                            <h3 className="mt-4 text-xl font-semibold text-primary">Alimentez votre portefeuille</h3>
                            <p className="mt-2 text-muted-foreground">Après validation de votre compte par nos équipes, effectuez votre premier virement à partir de 1000€ pour commencer à investir.</p>
                        </div>
                         <div className="flex flex-col items-center relative">
                             <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold border-4 border-background z-10">3</div>
                            <h3 className="mt-4 text-xl font-semibold text-primary">Suivez vos performances</h3>
                            <p className="mt-2 text-muted-foreground">Accédez à votre espace client pour suivre la croissance de votre capital et percevoir vos rendements.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
             <section className="py-16 md:py-24 bg-background">
                <div className="container text-center">
                     <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Ce que nos investisseurs en disent</h2>
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
                    <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase">Prêt à faire travailler votre argent ?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Rejoignez des centaines d'investisseurs satisfaits et commencez à construire votre avenir financier dès aujourd'hui. L'ouverture de compte est gratuite.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/investir/ouvrir-un-compte">Démarrer mon investissement</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/contact">Contacter un conseiller</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
