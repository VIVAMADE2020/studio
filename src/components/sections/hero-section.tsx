
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

const carouselSlides = [
    {
        imageSrc: "https://i.postimg.cc/mrt3kGjL/pexels-divinetechygirl-1181406.jpg",
        title: "Solutions Financières sur Mesure",
        description: "Que vous soyez un particulier ou un professionnel, nous avons la solution de financement adaptée à vos ambitions.",
    },
    {
        imageSrc: "https://i.postimg.cc/fTDxXdCg/pexels-liza-summer-6347720.jpg",
        title: "Réalisez Vos Projets avec Confiance",
        description: "Nous vous accompagnons à chaque étape pour transformer vos rêves en réalité, en toute sérénité.",
    },
    {
        imageSrc: "https://i.postimg.cc/8cPzkTdw/pexels-n-voitkevich-7172858.jpg",
        title: "Un Partenaire Fiable pour Votre Avenir",
        description: "Bénéficiez de notre expertise et de nos conditions avantageuses pour tous vos besoins financiers.",
    },
    {
        imageSrc: "https://i.postimg.cc/KzmZQmWF/pexels-cottonbro-3943716.jpg",
        title: "Le Financement Simplifié",
        description: "Découvrez une expérience de financement simple, rapide et transparente, conçue pour vous.",
    },
    {
        imageSrc: "https://i.postimg.cc/LspR6H2f/pexels-clickerhappy-12619.jpg",
        title: "Votre Vision, Notre Mission",
        description: "De l'idée à la concrétisation, FLEXFOND est à vos côtés pour vous donner les moyens de réussir.",
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
                            className="container p-8"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
                                {slide.description}
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                              <Button asChild size="lg" className="bg-orange-web text-white hover:bg-orange-web/90">
                                <Link href="/#services">Découvrir nos services</Link>
                              </Button>
                              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                                <Link href="/demande-pret">Faire une demande</Link>
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
