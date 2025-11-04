
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation | VylsCapital",
};

export default function ConditionsDUtilisationPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-primary mb-8">Conditions Générales d'Utilisation</h1>
      <p className="text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Accord sur les conditions</h2>
      <p>En accédant au site web www.vylscapital.com, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect de toutes les lois locales applicables. Si vous n'êtes pas d'accord avec l'une de ces conditions, il vous est interdit d'utiliser ou d'accéder à ce site.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Licence d'utilisation</h2>
      <p>La permission est accordée de télécharger temporairement une copie du matériel (information ou logiciel) sur le site web de VylsCapital pour une visualisation transitoire personnelle et non commerciale uniquement. Ceci est l'octroi d'une licence, pas un transfert de titre.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Services Financiers</h2>
      <p>VylsCapital propose des services de courtage en financement et en investissement. Les informations et simulations présentées sur le site sont fournies à titre indicatif et ne sauraient constituer une offre contractuelle ou un conseil personnalisé.</p>
      <p><strong>Services de Banque en Ligne :</strong> VylsCapital propose des services de banque en ligne exclusivement à ses clients via un Espace Client sécurisé. L'accès et l'utilisation de ces services sont soumis à des conditions contractuelles spécifiques. Vous êtes responsable de la confidentialité de vos identifiants.</p>
      <p><strong>Services d'Investissement :</strong> Les informations relatives à l'investissement ne constituent pas un conseil en investissement. Elles sont une présentation de nos services de courtage. Tout investissement comporte des risques, notamment un risque de perte en capital. Il vous incombe de vous assurer que les produits d'investissement sont adaptés à votre situation personnelle et à votre profil de risque.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Limites de Responsabilité</h2>
      <p>En aucun cas, VylsCapital ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'impossibilité d'utiliser le matériel sur le site web de VylsCapital.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Modifications</h2>
      <p>VylsCapital peut réviser ces conditions d'utilisation pour son site web à tout moment sans préavis. En utilisant ce site web, vous acceptez d'être lié par la version alors en vigueur de ces conditions d'utilisation.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Droit applicable</h2>
      <p>Ces termes et conditions sont régis et interprétés conformément aux lois de France et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux de cet État ou de ce lieu.</p>
    </article>
  );
}
