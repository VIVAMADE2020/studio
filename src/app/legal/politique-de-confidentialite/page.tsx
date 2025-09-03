import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | FLEXFOND",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <article>
      <h1 className="text-4xl font-bold text-primary mb-8">Politique de Confidentialité</h1>
      <p className="text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

      <p className="mt-6">FLEXFOND s'engage à protéger la vie privée de ses utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web www.flexfond.com.</p>
      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Collecte de vos informations</h2>
      <p>Nous pouvons collecter des informations vous concernant de différentes manières. Les informations que nous pouvons collecter sur le site comprennent :</p>
      <ul>
        <li><strong>Données personnelles :</strong> Informations d'identification personnelle, telles que votre nom, adresse e-mail, numéro de téléphone, et informations démographiques, que vous nous fournissez volontairement lorsque vous remplissez un formulaire de contact ou de demande de prêt.</li>
        <li><strong>Données financières :</strong> Informations financières, telles que les données relatives à vos revenus, dépenses et situation professionnelle, que vous fournissez lors d'une demande de financement.</li>
        <li><strong>Données bancaires et de transaction :</strong> Dans le cadre de notre service de banque en ligne réservé à nos clients, nous pouvons collecter des informations sur vos comptes, soldes, et historique de transactions pour fournir les services demandés.</li>
        <li><strong>Données de navigation :</strong> Informations que votre navigateur envoie automatiquement lorsque vous visitez le site, comme votre adresse IP, le type de navigateur, les temps d'accès.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Utilisation de vos informations</h2>
      <p>Avoir des informations précises sur vous nous permet de vous offrir une expérience fluide, efficace et personnalisée. Spécifiquement, nous pouvons utiliser les informations collectées à votre sujet via le site pour :</p>
      <ul>
        <li>Gérer votre compte et votre demande de prêt.</li>
        <li>Fournir des services de banque en ligne, y compris l'affichage des soldes et l'historique des transactions.</li>
        <li>Vous envoyer des notifications par e-mail concernant votre dossier ou vos comptes.</li>
        <li>Augmenter l'efficacité et le fonctionnement du site.</li>
        <li>Respecter nos obligations légales et réglementaires.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Sécurité de vos informations</h2>
      <p>Nous utilisons des mesures de sécurité administratives, techniques et physiques pour aider à protéger vos informations personnelles. Bien que nous ayons pris des mesures raisonnables pour sécuriser les informations personnelles que vous nous fournissez, sachez que malgré nos efforts, aucune mesure de sécurité n'est parfaite ou impénétrable.</p>

      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Vos droits concernant vos informations</h2>
      <p>Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles. Vous pouvez également vous opposer à leur traitement. Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : <a href="mailto:contact@flexfond.com">contact@flexfond.com</a>.</p>
    </article>
  );
}
