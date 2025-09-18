
import { Metadata } from "next";
import { Code, Database, Server, Users, LayoutDashboard, Component, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Détails Techniques | FLEXFOND",
  description: "Explication de l'architecture technique de la plateforme de banque en ligne FLEXFOND.",
};

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-secondary/50 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
        </div>
        <div className="text-muted-foreground space-y-2">
            {children}
        </div>
    </div>
);

export default function TechDetailsPage() {
  return (
    <div className="bg-background">
        <section className="py-20 md:py-32 text-center bg-secondary/30">
            <div className="container">
                <h1 className="text-4xl md:text-6xl font-bold text-primary uppercase">Architecture Technique</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Une explication détaillée de la manière dont la plateforme de banque en ligne FLEXFOND a été construite avec Next.js et les Server Actions.
                </p>
            </div>
        </section>

        <section className="py-16 md:py-24">
            <div className="container max-w-5xl mx-auto space-y-12">

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-primary mb-4">Introduction</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        L'application FLEXFOND est une démonstration d'une plateforme bancaire moderne construite avec des technologies web de pointe. Elle est conçue pour être performante, sécurisée et maintenable. L'architecture repose sur un principe clé : utiliser la puissance du serveur au maximum pour alléger le client (le navigateur de l'utilisateur). Voici comment tout s'articule.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <FeatureCard icon={<Database className="w-7 h-7" />} title="La "Base de Données" : Un Fichier JSON">
                        <p>Pour ce prototype, il n'y a pas de base de données complexe. Toutes les informations des clients (comptes, transactions, soldes) sont stockées dans un simple fichier : <strong>`src/data/clients.json`</strong>.</p>
                        <p>Dans une application réelle, ce fichier serait remplacé par une base de données robuste comme <strong>Firestore</strong>, <strong>PostgreSQL</strong> ou <strong>MongoDB</strong> pour garantir la sécurité, la performance et la capacité à gérer un grand nombre d'utilisateurs.</p>
                    </FeatureCard>

                    <FeatureCard icon={<Server className="w-7 h-7" />} title="Le Cerveau : Les Server Actions">
                        <p>Le fichier <strong>`src/app/actions/clients.ts`</strong> est le cœur de la logique métier. Il contient des fonctions spéciales appelées "Server Actions" (marquées par `'use server'`).</p>
                        <p>Ces fonctions s'exécutent <strong>uniquement sur le serveur</strong>, jamais dans le navigateur du client. Elles sont responsables de :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Lire et écrire dans le fichier `clients.json`.</li>
                            <li>Créer des clients, ajouter des transactions, vérifier les mots de passe.</li>
                            <li>Contenir toute la logique sécurisée.</li>
                        </ul>
                    </FeatureCard>
                </div>

                 <div>
                    <h2 className="text-3xl font-bold text-primary text-center my-12">Le Parcours Utilisateur Expliqué</h2>
                    <div className="space-y-8">
                        <FeatureCard icon={<Lock className="w-7 h-7" />} title="1. Connexion du Client">
                            <p>Quand un client se connecte sur la page <strong>`/client/access`</strong>, le formulaire n'envoie pas directement le mot de passe. Il appelle la Server Action `verifyClientLoginAction`.</p>
                            <p>Cette fonction s'exécute sur le serveur, compare les informations avec le fichier `clients.json` et renvoie une réponse : succès ou échec. Si c'est un succès, l'identifiant du client est stocké de manière sécurisée dans la `sessionStorage` du navigateur pour le garder connecté.</p>
                        </FeatureCard>

                        <FeatureCard icon={<LayoutDashboard className="w-7 h-7" />} title="2. Affichage du Tableau de Bord">
                            <p>Une fois connecté, l'utilisateur est redirigé vers <strong>`/client/dashboard`</strong>. Cette page utilise l'identifiant stocké en session pour appeler la Server Action `getClientByIdentificationNumberAction`.</p>
                            <p>Sur le serveur, cette fonction lit `clients.json`, trouve le bon client, <strong>simule le passage du temps pour traiter les virements en attente</strong> (change leur statut de `PENDING` à `COMPLETED` ou `FAILED`), puis renvoie les données à jour.</p>
                            <p>La page affiche ensuite ces données (solde, transactions, etc.) à l'aide de composants React (comme les cartes, les tableaux...).</p>
                        </FeatureCard>
                        
                        <FeatureCard icon={<Component className="w-7 h-7" />} title="3. L'Interface : Des Composants React et ShadCN/UI">
                            <p>Toutes les pages de l'application (`/client/dashboard`, `/admin/dashboard`, etc.) sont construites avec des composants <strong>React</strong>. La plupart des éléments visuels (boutons, cartes, formulaires) proviennent de la librairie <strong>ShadCN/UI</strong>, ce qui garantit une interface cohérente et professionnelle.</p>
                            <p>Ces composants sont "intelligents" : ils prennent les données brutes envoyées par le serveur (comme une liste de transactions) et les transforment en une interface claire et interactive pour l'utilisateur.</p>
                        </FeatureCard>

                        <FeatureCard icon={<Users className="w-7 h-7" />} title="4. La Partie Administrateur">
                            <p>La section `/admin` fonctionne sur le même principe, mais avec des droits différents. La connexion se fait via la page `/admin/login` qui vérifie un mot de passe stocké dans les variables d'environnement.</p>
                            <p>Le tableau de bord admin (`/admin/dashboard`) appelle `getClientsAction` pour afficher la liste de tous les clients. L'administrateur peut alors cliquer sur un client pour voir ses détails, ajouter des transactions manuellement ou configurer des paramètres (comme le blocage de compte), toujours via des Server Actions sécurisées.</p>
                        </FeatureCard>
                    </div>
                </div>

                <div className="text-center pt-8 border-t">
                     <h2 className="text-3xl font-bold text-primary mb-4">Conclusion</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        En résumé, cette architecture sépare clairement les responsabilités :
                    </p>
                    <ul className="list-none mt-6 space-y-2 inline-block text-left">
                        <li><strong className="text-primary">Le Client (Navigateur) :</strong> Affiche l'interface et collecte les actions de l'utilisateur (clics, saisie de formulaire).</li>
                        <li><strong className="text-primary">Le Serveur (Next.js) :</strong> Exécute toute la logique métier via les Server Actions, manipule les données et garantit la sécurité.</li>
                    </ul>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-6">
                        C'est une approche moderne qui rend l'application rapide, car le navigateur fait très peu de calculs, et sécurisée, car le code sensible ne quitte jamais le serveur.
                    </p>
                </div>
            </div>
        </section>
    </div>
  );
}
