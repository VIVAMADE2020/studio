import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "QUELS DOCUMENTS DOIS-JE FOURNIR POUR UNE DEMANDE DE PRÊT ?",
    answer: "Pour une demande de prêt, vous devrez généralement fournir une pièce d'identité en cours de validité, un justificatif de domicile de moins de 3 mois, et vos trois derniers bulletins de salaire ou justificatifs de revenus."
  },
  {
    question: "QUEL EST LE DÉLAI POUR OBTENIR UNE RÉPONSE À MA DEMANDE ?",
    answer: "Nous nous efforçons de donner une première réponse de principe sous 24 à 48 heures ouvrées après la soumission de votre dossier complet."
  },
  {
    question: "PUIS-JE REMBOURSER MON PRÊT PAR ANTICIPATION ?",
    answer: "Oui, le remboursement anticipé, partiel ou total, est possible. Les conditions peuvent varier en fonction du type de prêt. N'hésitez pas à contacter votre conseiller pour plus de détails."
  },
  {
    question: "COMMENT PUIS-JE CONTACTER LE SERVICE CLIENT ?",
    answer: "Vous pouvez nous contacter via le formulaire sur notre page de contact, par email à contact@flexfond.com, ou par téléphone au +33 1 23 45 67 89. Nos conseillers sont disponibles du lundi au vendredi de 9h à 18h."
  },
  {
    question: "QUELS SONT LES TAUX D'INTÉRÊT ACTUELS ?",
    answer: "Nos taux d'intérêt sont compétitifs et varient en fonction du type de prêt, de la durée et de votre profil emprunteur. La meilleure façon d'obtenir un taux précis est de faire une simulation gratuite sur notre site."
  },
  {
    question: "LA SIMULATION EN LIGNE M'ENGAGE-T-ELLE À QUELQUE CHOSE ?",
    answer: "Non, la simulation est entièrement gratuite et sans engagement. Elle vous permet simplement d'estimer vos mensualités et de voir si votre projet est réalisable."
  }
];

export default function FAQPage() {
    return (
        <div className="bg-background">
            <section className="py-20 md:py-32 text-center bg-secondary/50">
                <div className="container">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary uppercase">Foire Aux Questions</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">Toutes les réponses à vos interrogations sur nos services et notre fonctionnement.</p>
                </div>
            </section>
            <section className="py-16 md:py-24">
              <div className="container px-4 max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
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
        </div>
    );
}
