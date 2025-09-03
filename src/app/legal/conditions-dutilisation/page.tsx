import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation | FLEXFOND",
};

export default function ConditionsDUtilisationPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-primary mb-8">Conditions Générales d'Utilisation</h1>
      <p className="text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Accord sur les conditions</h2>
      <p>En accédant au site web www.flexfond.com, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect de toutes les lois locales applicables. Si vous n'êtes pas d'accord avec l'une de ces conditions, il vous est interdit d'utiliser ou d'accéder à ce site.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Licence d'utilisation</h2>
      <p>La permission est accordée de télécharger temporairement une copie du matériel (information ou logiciel) sur le site web de FLEXFOND pour une visualisation transitoire personnelle et non commerciale uniquement. Ceci est l'octroi d'une licence, pas un transfert de titre.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Services de Banque en Ligne</h2>
      <p>FLEXFOND propose des services de banque en ligne exclusivement à ses clients via un Espace Client sécurisé. L'accès et l'utilisation de ces services sont soumis à des conditions contractuelles spécifiques qui vous seront communiquées lors de votre souscription. Vous êtes responsable de la confidentialité de vos identifiants de connexion et de toutes les activités effectuées depuis votre compte.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Limites</h2>
      <p>En aucun cas, FLEXFOND ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation ou de l'impossibilité d'utiliser le matériel sur le site web de FLEXFOND.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Modifications</h2>
      <p>FLEXFOND peut réviser ces conditions d'utilisation pour son site web à tout moment sans préavis. En utilisant ce site web, vous acceptez d'être lié par la version alors en vigueur de ces conditions d'utilisation.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Droit applicable</h2>
      <p>Ces termes et conditions sont régis et interprétés conformément aux lois de France et vous vous soumettez irrévocablement à la juridiction exclusive des tribunaux de cet État ou de ce lieu.</p>
    </article>
  );
}
