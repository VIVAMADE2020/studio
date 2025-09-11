
"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Typewriter } from "@/components/typewriter";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import React from "react";

const carouselImages = [
    "https://i.postimg.cc/mrt3kGjL/pexels-divinetechygirl-1181406.jpg",
    "https://i.postimg.cc/fTDxXdCg/pexels-liza-summer-6347720.jpg",
    "https://i.postimg.cc/8cPzkTdw/pexels-n-voitkevich-7172858.jpg",
    "https://i.postimg.cc/KzmZQmWF/pexels-cottonbro-3943716.jpg",
    "https://i.postimg.cc/LspR6H2f/pexels-clickerhappy-12619.jpg"
];

export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="relative w-full h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
        >
          <CarouselContent>
            {carouselImages.map((src, index) => (
              <CarouselItem key={index}>
                <Image
                  src={src}
                  alt={`Background Image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="container relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          <Typewriter
            texts={[
              "Solutions financières sur-mesure.",
              "Donnez vie à vos projets.",
              "L'avenir se construit aujourd'hui.",
            ]}
          />
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
          Que ce soit pour un projet personnel, un investissement immobilier ou l'achat d'un véhicule, FLEXFOND vous accompagne avec des solutions de financement et de banque en ligne adaptées et transparentes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/services">Découvrir nos services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
