
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
import { FinancialChart } from "../illustrations";
import { ConferenceSpeaker } from "../illustrations";

const carouselSlides = [
    {
        imageSrc: "https://i.postimg.cc/mrt3kGjL/pexels-divinetechygirl-1181406.jpg",
        title: "SOLUTIONS FINANCIÈRES SUR MESURE",
        description: "Que vous soyez un particulier ou un professionnel, nous avons la solution de financement adaptée à vos ambitions.",
    },
    {
        imageSrc: "https://i.postimg.cc/fTDxXdCg/pexels-liza-summer-6347720.jpg",
        title: "RÉALISEZ VOS PROJETS AVEC CONFIANCE",
        description: "Nous vous accompagnons à chaque étape pour transformer vos rêves en réalité, en toute sérénité.",
    },
    {
        imageSrc: "https://i.postimg.cc/KzmZQmWF/pexels-cottonbro-3943716.jpg",
        title: "LE FINANCEMENT SIMPLIFIÉ",
        description: "Découvrez une expérience de financement simple, rapide et transparente, conçue pour vous.",
    },
];

const keyResults = [
    { icon: <Award className="w-6 h-6 text-accent" />, value: "98%", label: "Satisfaction Client" },
    { icon: <Clock className="w-6 h-6 text-accent" />, value: "24h", label: "Réponse Garantie" },
    { icon: <Users className="w-6 h-6 text-accent" />, value: "+10k", label: "Clients Satisfaits" },
];

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-secondary/30">
        <div className="container">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {carouselSlides.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <motion.div 
                            key={index + 'image'} // Ensure re-animation on slide change
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl"
                        >
                            <Image
                              src={slide.imageSrc}
                              alt={slide.title}
                              fill
                              priority={index === 0}
                              className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            key={index} // Ensure re-animation on slide change
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-left relative"
                        >
                            <ConferenceSpeaker className="absolute -top-16 -left-12 w-24 h-24 text-primary/10 -z-10" />
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary uppercase">
                                {slide.title}
                            </h1>
                            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                                {slide.description}
                            </p>
                            <div className="mt-8 flex flex-wrap justify-start gap-4">
                              <Button asChild size="lg">
                                <Link href="/#services">Découvrir nos services</Link>
                              </Button>
                              <Button asChild size="lg" variant="outline">
                                <Link href="/demande-pret">Faire une demande</Link>
                              </Button>
                            </div>

                             <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                                {keyResults.map((result, resultIndex) => (
                                    <div key={resultIndex}>
                                        <div className="flex items-center gap-2">
                                            {result.icon}
                                            <div className="text-2xl font-bold text-primary">{result.value}</div>
                                        </div>
                                        <div className="text-sm text-muted-foreground mt-1">{result.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <CarouselPrevious className="relative -left-2" />
                <CarouselNext className="relative left-2"/>
              </div>
            </Carousel>
        </div>
    </section>
  );
}
