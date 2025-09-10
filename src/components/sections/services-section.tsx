
"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Home, Car, Building, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const services = [
  {
    icon: <User className="w-8 h-8" />,
    image: siteConfig.services[0].image,
    title: "Prêt Personnel",
    description: "Financez vos projets personnels, voyages, ou études avec un prêt flexible.",
    link: "/services/pret-personnel",
  },
  {
    icon: <Home className="w-8 h-8" />,
    image: siteConfig.services[1].image,
    title: "Prêt Immobilier",
    description: "Devenez propriétaire ou investissez dans l'immobilier avec nos solutions sur-mesure.",
    link: "/services/pret-immobilier",
  },
  {
    icon: <Car className="w-8 h-8" />,
    image: siteConfig.services[2].image,
    title: "Prêt Auto",
    description: "Achetez le véhicule de vos rêves, neuf ou d'occasion, grâce à nos offres de crédit.",
    link: "/services/pret-auto",
  },
  {
    icon: <Building className="w-8 h-8" />,
    image: siteConfig.services[3].image,
    title: "Prêt Professionnel",
    description: "Développez votre activité avec nos solutions de financement pour entreprises.",
    link: "/services/pret-professionnel",
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    image: siteConfig.services[4].image,
    title: "Rachat de Crédits",
    description: "Regroupez vos prêts en un seul pour alléger vos mensualités et simplifier votre budget.",
    link: "/services/rachat-de-credits",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    image: siteConfig.services[5].image,
    title: "Prêt Étudiant",
    description: "Financez vos études et préparez votre avenir en toute sérénité avec un prêt adapté.",
    link: "/services/pret-etudiant",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">Nos Solutions de Financement</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Découvrez une gamme complète de services conçus pour répondre à chacun de vos besoins financiers.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col text-left hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative w-full h-48 overflow-hidden">
                    <Image 
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                     <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                        <div className="w-16 h-16 rounded-lg bg-white/10 text-white flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
                            {service.icon}
                        </div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-muted-foreground mt-2 flex-grow">{service.description}</p>
                    <Button asChild variant="link" className="p-0 h-auto justify-start mt-4 text-primary font-semibold">
                      <Link href={service.link}>
                        En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
