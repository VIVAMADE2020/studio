import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Flag, Building, Users } from "lucide-react";

const timelineEvents = [
  {
    icon: <Flag className="h-5 w-5 text-accent" />,
    year: "2015",
    title: "Fondation de FLEXFOND",
    description: "Création avec la mission de simplifier l'accès au financement."
  },
  {
    icon: <Building className="h-5 w-5 text-accent" />,
    year: "2018",
    title: "Expansion Nationale",
    description: "Ouverture de nouveaux bureaux et élargissement de notre offre de services."
  },
  {
    icon: <Users className="h-5 w-5 text-accent" />,
    year: "2023",
    title: "10,000 Clients Satisfaits",
    description: "Nous célébrons une étape majeure de confiance et de croissance."
  }
];

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Bâtir l'avenir, ensemble.</h2>
            <p className="mt-4 text-muted-foreground">
              Depuis 2015, FLEXFOND s'engage à offrir des services financiers transparents et personnalisés. Notre expertise et notre dévouement nous permettent de transformer vos ambitions en réalité.
            </p>
            <Button asChild variant="link" className="p-0 h-auto mt-6 text-primary font-semibold">
              <Link href="/about">
                Notre histoire complète <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="space-y-8 relative">
             <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border -z-10"></div>
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-card border flex items-center justify-center mt-1">
                  {event.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{event.year} - {event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
