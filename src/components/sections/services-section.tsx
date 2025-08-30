import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Home, Car } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <User className="h-10 w-10 text-accent" />,
    title: "Prêt Personnel",
    description: "Financez vos projets personnels, voyages, ou études avec un prêt flexible et des taux compétitifs.",
    link: "/services/pret-personnel",
  },
  {
    icon: <Home className="h-10 w-10 text-accent" />,
    title: "Prêt Immobilier",
    description: "Devenez propriétaire ou investissez dans l'immobilier avec nos solutions de financement sur-mesure.",
    link: "/services/pret-immobilier",
  },
  {
    icon: <Car className="h-10 w-10 text-accent" />,
    title: "Prêt Auto",
    description: "Achetez le véhicule de vos rêves, neuf ou d'occasion, grâce à nos offres de crédit auto avantageuses.",
    link: "/services/pret-auto",
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
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col text-left hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                {service.icon}
                <CardTitle className="pt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground flex-grow">{service.description}</p>
                <Button asChild variant="link" className="p-0 h-auto justify-start mt-4 text-primary font-semibold">
                  <Link href={service.link}>
                    En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
