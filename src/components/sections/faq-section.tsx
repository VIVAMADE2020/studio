import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quels documents dois-je fournir pour une demande de prêt ?",
    answer: "Pour une demande de prêt, vous devrez généralement fournir une pièce d'identité en cours de validité, un justificatif de domicile de moins de 3 mois, et vos trois derniers bulletins de salaire ou justificatifs de revenus."
  },
  {
    question: "Quel est le délai pour obtenir une réponse à ma demande ?",
    answer: "Nous nous efforçons de donner une première réponse de principe sous 24 à 48 heures ouvrées après la soumission de votre dossier complet."
  },
  {
    question: "Puis-je rembourser mon prêt par anticipation ?",
    answer: "Oui, le remboursement anticipé, partiel ou total, est possible. Les conditions peuvent varier en fonction du type de prêt. N'hésitez pas à contacter votre conseiller pour plus de détails."
  },
  {
    question: "Comment puis-je contacter le service client ?",
    answer: "Vous pouvez nous contacter via le formulaire sur notre page de contact, par email à contact@flexfond.com, ou par téléphone au +33 1 23 45 67 89. Nos conseillers sont disponibles du lundi au vendredi de 9h à 18h."
  }
];

export function FaqSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase">Questions fréquentes</h2>
            <p className="mt-4 text-muted-foreground">
                Trouvez les réponses à vos questions les plus courantes.
            </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left uppercase">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
