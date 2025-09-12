
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
import { Award, Clock, Users } from "lucide-react";

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
        imageSrc: "https://i.postimg.cc/KzmZQmWF/pexels-cottonbro-3943716.jpg",
        title: "Le Financement Simplifié",
        description: "Découvrez une expérience de financement simple, rapide et transparente, conçue pour vous.",
    },
];

const keyResults = [
    { icon: <Award className="w-8 h-8" />, value: "98%", label: "Satisfaction Client" },
    { icon: <Clock className="w-8 h-8" />, value: "24h", label: "Réponse Garantie" },
    { icon: <Users className="w-8 h-8" />, value: "+10k", label: "Clients Satisfaits" },
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
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white p-4 md:p-8">
                       <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="container flex-grow flex flex-col justify-center items-center"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                                {slide.title}
                            </h1>
                            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-white/90">
                                {slide.description}
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                <Link href="/#services">Découvrir nos services</Link>
                              </Button>
                              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
                                <Link href="/demande-pret">Faire une demande</Link>
                              </Button>
                            </div>
                       </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="w-full max-w-4xl mx-auto mt-8 md:mt-16"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {keyResults.map((result, resultIndex) => (
                                    <div key={resultIndex} className="bg-black/20 backdrop-blur-sm text-white p-4 text-center rounded-lg border border-white/20">
                                        <div className="flex justify-center mb-2">{result.icon}</div>
                                        <div className="text-2xl md:text-3xl font-bold">{result.value}</div>
                                        <div className="text-sm opacity-90">{result.label}</div>
                                    </div>
                                ))}
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
