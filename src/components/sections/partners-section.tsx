
const partners = [
    { name: "Société Générale" },
    { name: "Crédit Agricole" },
    { name: "AXA" },
    { name: "Allianz" },
    { name: "Crédit Mutuel" },
    { name: "Visa" },
];

export function PartnersSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Nos Partenaires de Confiance</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Nous collaborons avec les plus grandes institutions financières pour vous offrir les meilleures solutions.
                </p>
                <div className="mt-12">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
                        {partners.map((partner, index) => (
                            <div key={index} className="flex justify-center">
                                <span className="text-xl font-semibold text-muted-foreground transition-colors duration-300 hover:text-primary">
                                    {partner.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
