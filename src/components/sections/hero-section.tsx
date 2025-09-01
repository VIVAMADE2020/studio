import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Typewriter } from "@/components/typewriter";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-secondary/50">
      <div className="absolute inset-0">
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      <div className="container relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight">
          <Typewriter
            texts={[
              "Solutions financières sur-mesure.",
              "Donnez vie à vos projets.",
              "L'avenir se construit aujourd'hui.",
            ]}
          />
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Que ce soit pour un projet personnel, un investissement immobilier ou l'achat d'un véhicule, VIXCAPITAL vous accompagne avec des solutions de financement adaptées et transparentes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/services">Découvrir nos services</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
