import { Landmark } from "lucide-react";

const partners = [
    { name: "BNP Paribas" },
    { name: "Société Générale" },
    { name: "Crédit Agricole" },
    { name: "AXA" },
    { name: "Allianz" },
    { name: "Crédit Mutuel" },
    { name: "Visa" },
    { name: "Mastercard" },
];

export function PartnersSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Nos Partenaires de Confiance</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Nous collaborons avec les plus grandes institutions financières pour vous offrir les meilleures solutions.
                </p>
                <div className="mt-12">
                    <div className="relative flex overflow-hidden group">
                        <div className="flex space-x-24 animate-marquee group-hover:paused">
                            {partners.map((partner, index) => (
                                <div key={index} className="flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl font-semibold text-muted-foreground">{partner.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-0 flex space-x-24 animate-marquee2 group-hover:paused">
                             {partners.map((partner, index) => (
                                <div key={index + partners.length} className="flex items-center justify-center flex-shrink-0">
                                    <span className="text-2xl font-semibold text-muted-foreground">{partner.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Add animation to tailwind config
// tailwind.config.ts
// theme: {
//   extend: {
//     animation: {
//       marquee: 'marquee 25s linear infinite',
//       marquee2: 'marquee2 25s linear infinite',
//     },
//     keyframes: {
//       marquee: {
//         '0%': { transform: 'translateX(0%)' },
//         '100%': { transform: 'translateX(-100%)' },
//       },
//       marquee2: {
//         '0%': { transform: 'translateX(100%)' },
//         '100%': { transform: 'translateX(0%)' },
//       },
//     },
//   },
// },
