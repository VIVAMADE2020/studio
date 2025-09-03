import Image from 'next/image';
import { Flag, Building, Users, Target, Eye, Handshake, Globe, Banknote } from 'lucide-react';
import React from 'react';

const timelineEvents = [
    { year: "2015", title: "Fondation", description: "FLEXFOND est créé avec l'ambition de rendre les services financiers plus accessibles et transparents.", icon: <Flag /> },
    { year: "2017", title: "Lancement en ligne", description: "Notre plateforme numérique est lancée, permettant des demandes de prêt 100% en ligne.", icon: <Globe /> },
    { year: "2018", title: "Expansion", description: "Élargissement de notre gamme de produits pour inclure les prêts immobiliers et professionnels.", icon: <Building /> },
    { year: "2020", title: "Partenariats Stratégiques", description: "Nous nouons des partenariats avec des acteurs clés de la finance et de l'immobilier.", icon: <Handshake /> },
    { year: "2023", title: "10 000 Clients", description: "Nous franchissons le cap symbolique des 10 000 clients satisfaits à travers la France.", icon: <Users /> },
    { year: "2024", title: "Lancement de la Banque en Ligne", description: "Introduction de notre service de banque en ligne exclusif pour nos clients.", icon: <Banknote /> },
];

const values = [
    { icon: <Target className="h-8 w-8 text-accent" />, title: "Mission", description: "Simplifier le financement pour permettre à chacun de réaliser ses projets de vie en toute confiance." },
    { icon: <Eye className="h-8 w-8 text-accent" />, title: "Vision", description: "Devenir le partenaire financier de référence, reconnu pour notre innovation, notre transparence et notre excellence de service, incluant une offre bancaire complète." },
    { icon: <Handshake className="h-8 w-8 text-accent" />, title: "Valeurs", description: "Confiance, Intégrité, Proximité, et Engagement. Ces piliers guident chacune de nos actions au quotidien." },
];

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero */}
            <section className="py-20 md:py-32 text-center bg-secondary/50">
                <div className="container">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary">Notre Histoire</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">Au cœur de la finance, une histoire de confiance et d'innovation.</p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {values.map(v => (
                            <div key={v.title} className="p-6">
                                <div className="flex justify-center mb-4">{v.icon}</div>
                                <h3 className="text-2xl font-semibold text-primary">{v.title}</h3>
                                <p className="mt-2 text-muted-foreground">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Timeline */}
            <section className="py-16 md:py-24 bg-secondary/50">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary">Nos dates clés</h2>
                        <p className="mt-2 text-muted-foreground">Une croissance continue au service de nos clients.</p>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block"></div>
                        {timelineEvents.map((event, index) => (
                            <div key={index} className={`flex items-center w-full mb-8 md:space-x-8 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : 'md:text-left'}`}>
                                <div className="hidden md:block w-1/2"></div>
                                <div className="md:w-1/2 w-full">
                                    <div className="p-4 bg-card rounded-lg shadow-md">
                                        <p className="font-bold text-accent text-lg">{event.year}</p>
                                        <h4 className="font-semibold text-primary mt-1">{event.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center z-10 p-2">
                                   {React.cloneElement(event.icon, {className: "w-full h-full"})}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Team */}
            <section className="py-16 md:py-24">
                <div className="container text-center">
                     <h2 className="text-3xl md:text-4xl font-bold text-primary">Notre Équipe Dirigeante</h2>
                     <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Des experts passionnés qui façonnent l'avenir de FLEXFOND.</p>
                     <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                         {[
                            { name: 'Alexandre Martin', role: 'PDG & Fondateur' },
                            { name: 'Isabelle Dubois', role: 'Directrice Financière' },
                            { name: 'Thomas Bernard', role: 'Directeur des Opérations' },
                         ].map(member => (
                            <div key={member.name} className="p-6 bg-card rounded-lg shadow-md">
                                <h4 className="text-xl font-semibold text-primary">{member.name}</h4>
                                <p className="text-accent mt-2">{member.role}</p>
                            </div>
                         ))}
                     </div>
                </div>
            </section>
        </div>
    );
}
