import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import Image from 'next/image';

const testimonials = [
  {
    name: "Sophie L.",
    role: "Entrepreneure",
    avatar: "SL",
    image: "https://picsum.photos/100/100?random=1",
    dataAiHint: "woman smiling",
    text: "Le processus a été d'une simplicité et d'une rapidité incroyables. J'ai pu financer le lancement de ma startup grâce à VIXCAPITAL. Un grand merci à toute l'équipe !"
  },
  {
    name: "Marc D.",
    role: "Propriétaire",
    avatar: "MD",
    image: "https://picsum.photos/100/100?random=2",
    dataAiHint: "man portrait",
    text: "J'ai obtenu mon prêt immobilier à des conditions très avantageuses. Le conseiller qui m'a suivi était très professionnel et à l'écoute. Je recommande vivement."
  },
  {
    name: "Julie et Tom",
    role: "Jeune Couple",
    avatar: "JT",
    image: "https://picsum.photos/100/100?random=3",
    dataAiHint: "happy couple",
    text: "Nous avons enfin pu acheter notre première voiture familiale. VIXCAPITAL a rendu notre rêve possible avec une offre de prêt auto claire et sans surprise."
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">Ils nous font confiance</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          La satisfaction de nos clients est notre plus grande récompense.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-left bg-card pt-6">
              <CardContent className="flex flex-col h-full">
                <Quote className="w-8 h-8 text-accent mb-4" />
                <p className="text-muted-foreground flex-grow">"{testimonial.text}"</p>
                <div className="flex items-center mt-6 pt-6 border-t">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
