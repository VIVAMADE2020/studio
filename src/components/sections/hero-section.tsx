
"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { motion } from "framer-motion";
import { Home, Car, Briefcase, GraduationCap, Banknote } from "lucide-react";

const carouselSlides = [
    {
        imageSrc: "https://i.postimg.cc/mrt3kGjL/pexels-divinetechygirl-1181406.jpg",
        icon: <Home className="h-16 w-16" />,
        title: "Devenez Propriétaire de Vos Rêves",
        description: "Avec notre prêt immobilier à taux fixe de 2%, l'achat de votre maison n'a jamais été aussi simple et accessible.",
        button1_text: "Découvrir le Prêt Immo",
        button1_link: "/services/pret-immobilier",
        button2_text: "Simuler mon prêt",
        button2_link: "/#loan-calculator"
    },
    {
        imageSrc: "https://i.postimg.cc/fTDxXdCg/pexels-liza-summer-6347720.jpg",
        icon: <Car className="h-16 w-16" />,
        title: "Prenez la Route en Toute Sérénité",
        description: "Financez votre nouveau véhicule, neuf ou d'occasion, avec des conditions exceptionnelles et une réponse rapide.",
        button1_text: "Explorer le Prêt Auto",
        button1_link: "/services/pret-auto",
        button2_text: "Faire une demande",
        button2_link: "/demande-pret"
    },
    {
        imageSrc: "https://i.postimg.cc/8cPzkTdw/pexels-n-voitkevich-7172858.jpg",
        icon: <Briefcase className="h-16 w-16" />,
        title: "Boostez Votre Carrière Professionnelle",
        description: "Nos solutions de financement sont conçues pour les entrepreneurs et les entreprises qui visent la croissance.",
        button1_text: "Solutions Pro",
        button1_link: "/services/pret-professionnel",
        button2_text: "Nous contacter",
        button2_link: "/contact"
    },
    {
        imageSrc: "https://i.postimg.cc/KzmZQmWF/pexels-cottonbro-3943716.jpg",
        icon: <GraduationCap className="h-16 w-16" />,
        title: "Investissez dans Votre Avenir",
        description: "Financez vos études ou celles de vos enfants avec des prêts étudiants flexibles et des taux avantageux.",
        button1_text: "Voir le Prêt Étudiant",
        button1_link: "/services/pret-etudiant",
        button2_text: "Faire une demande",
        button2_link: "/demande-pret"
    },
    {
        imageSrc: "https://i.postimg.cc/LspR6H2f/pexels-clickerhappy-12619.jpg",
        icon: <Banknote className="h-16 w-16" />,
        title: "Réalisez Tous Vos Projets Personnels",
        description: "Voyage, mariage, rénovations... Donnez vie à vos envies avec un prêt personnel adapté à vos besoins.",
        button1_text: "Nos Prêts Personnels",
        button1_link: "/services/pret-personnel",
        button2_text: "Simuler mon prêt",
        button2_link: "/#loan-calculator"
    }
];

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="relative w-full h-screen">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {carouselSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-screen">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
                       <motion.div
                            key={index} // Force re-render on slide change
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="container p-8 glassmorphism-content"
                        >
                            <div className="mb-4 text-accent">
                                {slide.icon}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
                                {slide.description}
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                <Link href={slide.button1_link}>{slide.button1_text}</Link>
                              </Button>
                              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                                <Link href={slide.button2_link}>{slide.button2_text}</Link>
                              </Button>
                            </div>
                       </motion.div>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
        </Carousel>
    </section>
  );
}
