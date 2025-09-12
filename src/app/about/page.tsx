
import { teamMembers } from '@/data/team-data';
import { Flag, Building, Award, Handshake, Sparkles, Target, Eye, HandHeart, Calendar, BarChart, Users, Star } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const timelineEvents = [
    { year: "2015", title: "FONDATION", description: "FLEXFOND est créé avec l'ambition de rendre les services financiers plus accessibles et transparents.", icon: <Flag /> },
    { year: "2017", title: "LANCEMENT EN LIGNE", description: "Notre plateforme numérique est lancée, permettant des demandes de prêt 100% en ligne.", icon: <Sparkles /> },
    { year: "2018", title: "EXPANSION", description: "Élargissement de notre gamme de produits pour inclure les prêts immobiliers et professionnels.", icon: <Building /> },
    { year: "2020", title: "PARTENARIATS STRATÉGIQUES", description: "Nous nouons des partenariats avec des acteurs clés de la finance et de l'immobilier.", icon: <Handshake /> },
    { year: "2024", title: "10 000 CLIENTS", description: "Nous franchissons le cap symbolique des 10 000 clients satisfaits à travers la France.", icon: <Award /> },
];

const values = [
    { icon: <Target className="h-8 w-8 text-accent" />, title: "MISSION", description: "Simplifier le financement pour permettre à chacun de réaliser ses projets de vie en toute confiance." },
    { icon: <Eye className="h-8 w-8 text-accent" />, title: "VISION", description: "Devenir le partenaire financier de référence, reconnu pour notre innovation, notre transparence et notre excellence de service." },
    { icon: <HandHeart className="h-8 w-8 text-accent" />, title: "VALEURS", description: "Confiance, intégrité, proximité, et engagement. Ces piliers guident chacune de nos actions au quotidien." },
];

const keyFigures = [
    { icon: <Calendar className="w-8 h-8 text-accent" />, value: "+9 ANS", label: "D'EXPÉRIENCE" },
    { icon: <Users className="w-8 h-8 text-accent" />, value: "10,000+", label: "CLIENTS SATISFAITS" },
    { icon: <BarChart className="w-8 h-8 text-accent" />, value: "500M+", label: "D'EUROS FINANCÉS" },
    { icon: <Star className="w-8 h-8 text-accent" />, value: "98%", label: "DE SATISFACTION" },
];

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="text-left">
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary uppercase">
                                NOTRE HISTOIRE
                            </h1>
                            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                                Au cœur de la finance, une histoire de confiance et d'innovation.
                            </p>
                        </div>
                        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://i.postimg.cc/hGzZKQP0/pexels-olly-789822.jpg"
                                alt="Notre histoire"
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

            {/* Mission & Vision Section */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {values.map(v => (
                            <div key={v.title} className="p-6">
                                <div className="flex justify-center mb-4">{v.icon}</div>
                                <h3 className="text-2xl font-semibold text-primary uppercase">{v.title}</h3>
                                <p className="mt-2 text-muted-foreground">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Timeline Section */}
            <section className="py-16 md:py-24 bg-secondary/50">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">NOS DATES CLÉS</h2>
                        <p className="mt-2 text-muted-foreground">Une croissance continue au service de nos clients.</p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block"></div>
                        {timelineEvents.map((event, index) => (
                            <div key={index} className={`flex items-center w-full mb-8 md:space-x-8 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : 'md:text-left'}`}>
                                <div className="hidden md:block w-1/2"></div>
                                <div className="md:w-1/2 w-full">
                                    <div className="p-6 bg-card rounded-lg shadow-md">
                                        <p className="font-bold text-accent text-lg">{event.year}</p>
                                        <h4 className="font-semibold text-primary mt-1 uppercase">{event.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center z-10 p-2">
                                   {event.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Team Section */}
            <section className="py-16 md:py-24">
                <div className="container text-center">
                     <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">NOTRE ÉQUIPE DIRIGEANTE</h2>
                     <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Des experts passionnés qui façonnent l'avenir de FLEXFOND.</p>
                     <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                         {teamMembers.slice(0,3).map(member => (
                            <div key={member.name} className="p-6 bg-card rounded-lg shadow-md flex flex-col items-center">
                                <Avatar className="w-24 h-24 mb-4">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${member.name}`} alt={member.name} />
                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h4 className="text-xl font-semibold text-primary">{member.name}</h4>
                                <p className="text-muted-foreground mt-2">{member.role}</p>
                            </div>
                         ))}
                     </div>
                     <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:w-2/3 lg:mx-auto">
                        {teamMembers.slice(3).map(member => (
                             <div key={member.name} className="p-6 bg-card rounded-lg shadow-md flex flex-col items-center">
                                <Avatar className="w-24 h-24 mb-4">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${member.name}`} alt={member.name} />
                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h4 className="text-xl font-semibold text-primary">{member.name}</h4>
                                <p className="text-muted-foreground mt-2">{member.role}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary uppercase">Prêt à nous rejoindre ?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Découvrez comment nous pouvons vous aider à atteindre vos objectifs.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/demande-pret">Demander un prêt</Link>
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

    