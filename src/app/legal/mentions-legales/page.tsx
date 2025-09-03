import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | FLEXFOND",
};

export default function MentionsLegalesPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-primary mb-8">Mentions Légales</h1>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Éditeur du site</h2>
      <p>Le site internet FLEXFOND, accessible à l'adresse www.flexfond.com, est édité par FLEXFOND, une institution privée dont le siège social est situé au 123 Rue de la Finance, 75001 Paris, France.</p>
      <p>FLEXFOND agit en tant que fournisseur de solutions de financement et de services de banque en ligne pour ses clients via son espace client sécurisé.</p>
      <p>Directeur de la publication : Alexandre Martin</p>
      <p>Contact : <a href="mailto:contact@flexfond.com">contact@flexfond.com</a> | +33 1 23 45 67 89</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Propriété intellectuelle</h2>
      <p>L'ensemble de ce site (contenu, textes, images, vidéos, logos) constitue une œuvre protégée par la législation en vigueur sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés. La reproduction de tout ou partie de ce site sur un support quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Données personnelles</h2>
      <p>Les informations recueillies via les formulaires du site sont nécessaires pour répondre à vos demandes. Elles sont destinées à FLEXFOND, qui s'engage à préserver la confidentialité de vos informations. Pour plus d'informations, veuillez consulter notre <a href="/legal/politique-de-confidentialite">Politique de Confidentialité</a>.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Responsabilité</h2>
      <p>FLEXFOND s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, FLEXFOND ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à la disposition sur ce site. En conséquence, FLEXFOND décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.</p>
    </article>
  );
}
