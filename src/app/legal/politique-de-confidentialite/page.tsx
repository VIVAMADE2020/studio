
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | VylsCapital",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-primary mb-8">Politique de Confidentialité</h1>
      <p className="text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

      <p className="mt-6">VylsCapital, en tant que responsable de traitement, s'engage à protéger la vie privée de ses utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD). Cette politique explique comment nous collectons, utilisons, sécurisons et partageons vos informations lorsque vous visitez notre site web www.vylscapital.com.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Collecte de vos informations</h2>
      <p>Nous collectons des informations vous concernant lorsque vous utilisez nos services, notamment lorsque vous remplissez nos formulaires.</p>
      <ul className="list-disc pl-5 mt-4 space-y-2">
        <li><strong>Données d'identification :</strong> Nom, prénom, date de naissance, adresse e-mail, numéro de téléphone, adresse postale.</li>
        <li><strong>Données financières et professionnelles :</strong> Revenus, charges, profession, situation de logement, montant d'investissement souhaité. Ces données sont collectées uniquement dans le cadre d'une demande de prêt ou d'une demande d'ouverture de compte d'investissement pour évaluer votre éligibilité.</li>
        <li><strong>Documents justificatifs :</strong> Pièce d'identité, justificatif de domicile et de revenus. Ces documents sont nécessaires à l'analyse de votre dossier par nos partenaires.</li>
        <li><strong>Données de connexion :</strong> Adresse IP, type de navigateur, pour la sécurité de notre site et l'amélioration de nos services.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Finalité du traitement des données</h2>
      <p>Avoir des informations précises sur vous nous permet de vous offrir une expérience fluide, efficace et personnalisée. Spécifiquement, nous utilisons vos informations pour :</p>
      <ul className="list-disc pl-5 mt-4 space-y-2">
        <li>Analyser et transmettre votre demande de prêt à nos partenaires financiers.</li>
        <li>Analyser votre demande d'ouverture de compte d'investissement et vérifier votre adéquation avec nos offres.</li>
        <li>Vous fournir les services de banque en ligne (consultation de compte, virements).</li>
        <li>Communiquer avec vous concernant l'avancement de votre dossier.</li>
        <li>Prévenir et lutter contre la fraude.</li>
        <li>Respecter nos obligations légales et réglementaires (notamment la lutte contre le blanchiment d'argent et le financement du terrorisme).</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Sécurité de vos informations</h2>
      <p>Nous mettons en œuvre des mesures de sécurité administratives, techniques et physiques robustes pour protéger vos informations personnelles. Les données sensibles sont transmises via des canaux sécurisés (HTTPS). L'accès à vos données est strictement limité au personnel habilité et à nos partenaires (financiers ou d'investissement) impliqués dans votre dossier, qui sont eux-mêmes soumis à des obligations de confidentialité strictes.</p>

       <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Durée de conservation</h2>
      <p>Vos données sont conservées pour la durée nécessaire au traitement de votre demande. En cas d'acceptation, elles sont conservées pendant toute la durée de la relation contractuelle, puis archivées conformément aux délais de prescription légaux. En cas de refus, vos données sont conservées pour une durée limitée nous permettant de justifier de nos diligences, puis sont supprimées.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Vos droits concernant vos informations</h2>
      <p>Conformément à la réglementation, vous disposez des droits suivants :</p>
       <ul className="list-disc pl-5 mt-4 space-y-2">
        <li><strong>Droit d'accès :</strong> Vous pouvez demander à consulter les données que nous détenons sur vous.</li>
        <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction de données inexactes.</li>
        <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données, sous réserve de nos obligations légales de conservation.</li>
        <li><strong>Droit à la limitation du traitement et droit d'opposition.</strong></li>
      </ul>
      <p className="mt-4">Pour exercer ces droits, veuillez nous contacter par email à <a href="mailto:dpo@vylscapital.com">dpo@vylscapital.com</a> ou par courrier à l'adresse suivante : VylsCapital, Délégué à la Protection des Données, 123 Rue de la Finance, 75001 Paris, France, en joignant une copie de votre pièce d'identité.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Partage de vos informations</h2>
      <p>Dans le strict cadre de l'étude de votre demande (financement ou investissement), nous pouvons être amenés à transmettre vos données à nos partenaires (établissements de crédit, compagnies d'assurance, sociétés de gestion). Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins de marketing.</p>
    </article>
  );
}
