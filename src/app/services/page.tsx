import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Home, Car, Building, Briefcase, GraduationCap, Banknote } from "lucide-react";
import Link from "next/link";
import React from "react";

const allServices = [
  { icon: <User />, title: "Prêt Personnel", description: "Financez vos projets personnels, voyages, ou études.", link: "/services/pret-personnel" },
  { icon: <Home />, title: "Prêt Immobilier", description: "Devenez propriétaire ou investissez dans l'immobilier.", link: "/services/pret-immobilier" },
  { icon: <Car />, title: "Prêt Auto", description: "Achetez le véhicule de vos rêves, neuf ou d'occasion.", link: "/services/pret-auto" },
  { icon: <Building />, title: "Prêt Professionnel", description: "Développez votre activité avec nos solutions pour entreprises.", link: "/services/pret-professionnel" },
  { icon: <Briefcase />, title: "Rachat de Crédits", description: "Regroupez vos prêts en un seul pour alléger vos mensualités.", link: "/services/rachat-de-credits" },
  { icon: <GraduationCap />, title: "Prêt Étudiant", description: "Financez vos études en toute sérénité.", link: "/services/pret-etudiant" },
  { icon: <Banknote />, title: "Banque en Ligne", description: "Gérez vos comptes et vos prêts depuis notre plateforme sécurisée, réservée à nos clients.", link: "/login" },
];

export default function ServicesPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="py-20 md:py-32 text-center bg-secondary/50">
                <div className="container">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary">Nos Services</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">Des solutions de financement pensées pour chaque étape de votre vie.</p>
                </div>
            </section>
            
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allServices.map((service, index) => (
                            <Card key={index} className="flex flex-col text-left hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                                        {React.cloneElement(service.icon, { className: 'w-6 h-6' })}
                                    </div>
                                    <CardTitle>{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col">
                                    <CardDescription className="flex-grow">{service.description}</CardDescription>
                                    <Button asChild variant="link" className="p-0 h-auto justify-start mt-4 text-primary font-semibold">
                                        <Link href={service.link}>
                                            Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
