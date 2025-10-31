
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
      <ul className="list-disc pl-5 mt-4 space-y-1">
        <li><strong>SIRET :</strong> 123 456 789 00010 (Numéro fictif pour démonstration)</li>
        <li><strong>RCS Paris :</strong> 123 456 789</li>
        <li><strong>N° ORIAS :</strong> 12345678 (Numéro fictif - Enregistré en tant que Courtier en opérations de banque et en services de paiement)</li>
      </ul>
      <p className="mt-4">FLEXFOND agit en tant que courtier et intermédiaire, fournissant des solutions de financement et des services de banque en ligne pour ses clients via son espace client sécurisé.</p>
      <p>Directeur de la publication : Alexandre Martin</p>
      <p>Contact : <a href="mailto:contact@flexfond.com">contact@flexfond.com</a> | +33 7 51 24 47 10</p>
      <p className="text-sm text-muted-foreground mt-4">Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>


      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Propriété intellectuelle</h2>
      <p>L'ensemble de ce site (contenu, textes, images, vidéos, logos) constitue une œuvre protégée par la législation en vigueur sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés. La reproduction de tout ou partie de ce site sur un support quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Données personnelles</h2>
      <p>La collecte et le traitement de vos données personnelles sont régis par notre <a href="/legal/politique-de-confidentialite">Politique de Confidentialité</a>, conformément au Règlement Général sur la Protection des Données (RGPD).</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Limitation de responsabilité</h2>
      <p>Les informations et simulations présentées sur ce site sont fournies à titre indicatif et ne constituent pas une offre de contrat. Seule l'offre de prêt qui vous sera éventuellement remise après étude de votre dossier a une valeur contractuelle. FLEXFOND s'efforce d'assurer l'exactitude des informations mais ne peut être tenu pour responsable des erreurs ou omissions.</p>
    </article>
  );
}
