
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Quote, FileText, User, Home, Car, Building, Briefcase, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { LoanCalculator } from '@/components/loan-calculator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";

interface ServiceDetailClientPageProps {
    service: any;
}

const icons: { [key: string]: React.ElementType } = {
  User,
  Home,
  Car,
  Building,
  Briefcase,
  GraduationCap
};


export function ServiceDetailClientPage({ service }: ServiceDetailClientPageProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  
  const SectionIcon = service.icon && icons[service.icon] ? React.createElement(icons[service.icon], { className: 'w-8 h-8' }) : null;


  return (
    <div className="bg-background">
      {/* Hero */}
       <section className="py-20 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-left">
               <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    {SectionIcon && React.cloneElement(SectionIcon, {className: "w-5 h-5"})}
                    <span>{service.title}</span>
                </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary uppercase">
                {service.tagline}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Découvrez comment nous pouvons vous aider à financer ce projet important avec une solution simple et transparente.
              </p>
            </div>
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-3 uppercase">
                {SectionIcon}
                <span>Qu'est-ce que le {service.title} ?</span>
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.description }} />

              <h3 className="text-xl font-bold text-primary mt-12 uppercase">Les avantages FLEXFOND</h3>
              <ul className="mt-6 space-y-4">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader>
                        <CardTitle className="uppercase">Votre projet commence ici</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">Prêt à vous lancer ? Simulez votre prêt ou contactez-nous.</p>
                        <Button asChild size="lg" className="w-full">
                            <Link href="/demande-pret">Faire une demande</Link>
                        </Button>
                         <Button asChild size="lg" variant="outline" className="w-full">
                            <Link href="/contact">Nous contacter</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Steps */}
       <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container text-center">
            <h2 className="text-3xl font-bold text-primary uppercase">Le processus en 3 étapes simples</h2>
            <p className="mt-2 text-muted-foreground">Obtenir votre financement n'a jamais été aussi facile.</p>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-left relative">
                <div className="absolute top-8 left-0 w-full h-0.5 border-t-2 border-dashed border-border hidden md:block"></div>
                {service.steps.map((step: any, index: number) => (
                     <div key={index} className="relative z-10">
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                                        {index + 1}
                                    </div>
                                    <CardTitle className="uppercase">{step.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{step.description}</p>
                            </CardContent>
                        </Card>
                     </div>
                ))}
            </div>
        </div>
      </section>

      {/* Key Documents Section */}
      {service.documents && (
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary uppercase">Les Documents Clés de Votre Projet</h2>
                <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">
                  La transparence est au cœur de notre démarche. Voici les documents essentiels qui jalonnent votre parcours de financement et leur rôle.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.documents.map((doc: any, index: number) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                          <FileText className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl uppercase">{doc.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Loan Calculator */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4">
            <div className="max-w-4xl mx-auto">
                 <LoanCalculator />
            </div>
        </div>
      </section>

      {/* Testimonials */}
      {service.testimonials && (
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Avis de nos clients</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Découvrez ce que nos clients disent de notre service de {service.title}.
            </p>
             <Carousel
                plugins={[plugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                className="w-full max-w-4xl mx-auto mt-12"
            >
                <CarouselContent>
                    {service.testimonials.map((testimonial: any, index: number) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                                <Card className="text-left bg-card h-full">
                                    <CardContent className="flex flex-col h-full p-6">
                                        <Quote className="w-8 h-8 text-accent mb-4" />
                                        <p className="text-muted-foreground flex-grow">"{testimonial.text}"</p>
                                        <div className="flex items-center mt-6 pt-6 border-t">
                                            <Avatar>
                                                <AvatarFallback>{testimonial.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4">
                                                <p className="font-semibold text-primary">{testimonial.name}</p>
                                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
      </section>
      )}

      {/* FAQ */}
      {service.faqs && (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container px-4 max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Questions fréquentes sur le {service.title}</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                {service.faqs.map((faq: any, index: number) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-left text-lg font-semibold uppercase">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
        </section>
      )}

    </div>
  );
}
