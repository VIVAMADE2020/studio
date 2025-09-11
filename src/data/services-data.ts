import { siteConfig } from "@/config/site";
import { User, Home, Car, Building, Briefcase, GraduationCap, TrendingUp, HandCoins, ShieldCheck, FileCheck, CheckCircle } from "lucide-react";
import React from 'react';

export const servicesData = {
    "pret-personnel": {
      icon: <User className="w-8 h-8" />,
      image: siteConfig.services[0].image,
      title: "Prêt Personnel",
      tagline: "Donnez vie à tous vos projets, sans contraintes.",
      description: "<p>Le Prêt Personnel FLEXFOND est une solution de financement polyvalente conçue pour vous aider à concrétiser une grande variété de projets sans avoir à justifier leur nature. Que ce soit pour un voyage, l'achat d'équipement, le financement d'un mariage ou pour faire face à un imprévu, le prêt personnel vous offre la liberté et la flexibilité dont vous avez besoin.</p>",
      features: [
        "Financement de 1 000€ à 75 000€.",
        "Taux fixe et mensualités constantes sur toute la durée.",
        "Aucun justificatif d'utilisation des fonds requis.",
        "Réponse de principe immédiate en ligne."
      ],
      steps: [
        { title: "Simulation", description: "Utilisez notre simulateur pour définir votre projet et estimer vos mensualités." },
        { title: "Demande en ligne", description: "Remplissez notre formulaire sécurisé en quelques minutes seulement." },
        { title: "Réception des fonds", description: "Après acceptation, recevez les fonds directement sur votre compte." }
      ],
      documents: [
        { title: "Contrat de Prêt", description: "Le document officiel qui scelle votre accord avec le prêteur. Il détaille toutes les conditions : montant, durée, taux, et vos obligations." },
        { title: "Attestation d'Assurance", description: "Essentielle pour vous protéger, ainsi que vos proches. Elle garantit le remboursement du prêt en cas d'imprévus graves (décès, invalidité)." }
      ],
      faqs: [
        { question: "Puis-je utiliser le prêt personnel pour n'importe quel projet ?", answer: "Oui, c'est l'un des grands avantages du prêt personnel. Vous n'avez pas à justifier l'utilisation des fonds, que ce soit pour un voyage, des travaux, ou l'achat d'un bien." },
        { question: "Quel est le montant maximum que je peux emprunter ?", answer: "Le montant varie selon votre capacité de remboursement, mais nos prêts personnels vont généralement jusqu'à 75 000€." }
      ]
    },
    "pret-immobilier": {
      icon: <Home className="w-8 h-8" />,
      image: siteConfig.services[1].image,
      title: "Prêt Immobilier",
      tagline: "Devenez propriétaire avec un financement adapté à votre avenir.",
      description: "<p>Le Prêt Immobilier FLEXFOND est la clé pour réaliser votre rêve d'accession à la propriété. Que ce soit pour l'achat de votre résidence principale, secondaire ou un investissement locatif, nous structurons une solution de financement sur-mesure. Notre expertise nous permet de négocier les meilleures conditions pour vous, en tenant compte de votre apport, de la durée souhaitée et de votre profil.</p>",
      features: [
        "Accompagnement personnalisé par un expert dédié.",
        "Recherche des meilleures conditions de taux du marché.",
        "Flexibilité des modalités de remboursement.",
        "Solutions pour tous les projets : achat, construction, travaux."
      ],
      steps: [
        { title: "Étude de votre capacité", description: "Un conseiller évalue votre budget et votre capacité d'emprunt." },
        { title: "Montage du dossier", description: "Nous vous aidons à rassembler toutes les pièces nécessaires pour un dossier solide." },
        { title: "Signature chez le notaire", description: "Après acceptation de l'offre de prêt, vous finalisez votre achat." }
      ],
      documents: [
        { title: "Certificat de Solvabilité", description: "Un atout majeur pour rassurer le vendeur. Ce document atteste de votre capacité à obtenir un financement, renforçant votre position de négociation." },
        { title: "Contrat de Prêt", description: "Le document central de votre projet immobilier. Il formalise l'engagement entre vous et la banque et fixe toutes les règles du jeu." },
        { title: "Acte de Cautionnement", description: "Une garantie souvent demandée par la banque. Elle assure au prêteur qu'une tierce partie (souvent un organisme spécialisé) se porte garante pour vous." }
      ],
      faqs: [
        { question: "Quel apport personnel est nécessaire pour un prêt immobilier ?", answer: "Généralement, un apport d'au moins 10% du prix d'achat est recommandé pour couvrir les frais de notaire et de garantie. Un apport plus conséquent peut vous aider à obtenir de meilleures conditions." },
        { question: "Quelle est la durée maximale d'un prêt immobilier ?", answer: "La durée peut aller jusqu'à 25 ans, voire 30 ans dans certains cas spécifiques. La durée idéale dépend de votre projet et de votre capacité de remboursement." }
      ]
    },
    "pret-auto": {
      icon: <Car className="w-8 h-8" />,
      image: siteConfig.services[2].image,
      title: "Prêt Auto",
      tagline: "Prenez la route avec le véhicule de vos rêves.",
      description: "<p>Le Prêt Auto FLEXFOND vous permet de financer l'achat de votre véhicule, qu'il soit neuf ou d'occasion, thermique, hybride ou électrique. Nous vous proposons une solution simple et rapide pour que vous puissiez prendre le volant sans attendre. Nos offres sont claires, sans frais cachés, et avec des mensualités adaptées à votre budget pour un achat en toute sérénité.</p>",
      features: [
        "Financement jusqu'à 100% du prix d'achat du véhicule.",
        "Adapté pour les voitures, motos et scooters, neufs ou d'occasion.",
        "Processus de demande simple et réponse rapide.",
        "Pas de frais de dossier sur la plupart de nos offres."
      ],
      steps: [
        { title: "Choisissez votre véhicule", description: "Trouvez la voiture ou la moto qui vous correspond." },
        { title: "Faites votre demande", description: "Simulez votre prêt et remplissez le formulaire en quelques minutes." },
        { title: "Recevez votre financement", description: "Après validation, les fonds sont débloqués pour finaliser votre achat." }
      ],
      documents: [
        { title: "Contrat de Prêt", description: "Ce document formalise votre crédit auto. Lisez-le attentivement, car il contient le taux, la durée et le montant de vos mensualités." },
        { title: "Attestation d'Assurance", description: "L'assurance emprunteur est une sécurité pour vous. Elle prend le relais de vos remboursements en cas de coup dur." },
        { title: "Reconnaissance de Dette", description: "Ce document est votre engagement formel à rembourser le montant emprunté. C'est une pièce juridique qui protège à la fois le prêteur et vous." }
      ],
      faqs: [
        { question: "Puis-je financer un véhicule d'occasion acheté à un particulier ?", answer: "Oui, nos solutions de prêt auto couvrent aussi bien les achats auprès de professionnels que de particuliers." },
        { question: "Dois-je commencer à rembourser immédiatement ?", answer: "Non, vous pouvez bénéficier d'un différé de remboursement, ce qui vous permet de commencer à payer vos mensualités quelques mois après votre achat." }
      ]
    },
    "pret-professionnel": {
      icon: <Building className="w-8 h-8" />,
      image: siteConfig.services[3].image,
      title: "Prêt Professionnel",
      tagline: "Investissez dans la croissance de votre entreprise.",
      description: "<p>Le Prêt Professionnel FLEXFOND est dédié aux entrepreneurs, artisans, commerçants et professions libérales qui souhaitent investir dans leur activité. Que ce soit pour l'acquisition de matériel, l'achat de locaux, le financement de stocks ou le renforcement de votre fonds de roulement, nous vous apportons une solution adaptée aux défis de votre entreprise.</p>",
      features: [
        "Solutions pour la création, la reprise ou le développement d'entreprise.",
        "Analyse de votre business plan par nos experts.",
        "Montages financiers optimisés (crédit-bail, etc.).",
        "Partenaire de confiance pour vos investissements stratégiques."
      ],
      steps: [
        { title: "Analyse du projet", description: "Vous nous présentez votre projet et votre business plan." },
        { title: "Proposition de financement", description: "Nous élaborons une offre sur-mesure alignée sur vos objectifs." },
        { title: "Déblocage des fonds", description: "Les fonds sont mis à votre disposition pour lancer vos investissements." }
      ],
      documents: [
        { title: "Facture de Frais", description: "Ce document transparent détaille les frais de dossier liés à l'étude et au montage de votre financement professionnel." },
        { title: "Contrat de Prêt", description: "La pierre angulaire de votre financement. Il formalise toutes les conditions de l'emprunt et sécurise l'opération." },
        { title: "Acte de Cautionnement", description: "Une garantie demandée pour les prêts aux entreprises. Le dirigeant se porte souvent caution, montrant son engagement personnel dans le projet." }
      ],
      faqs: [
        { question: "Quels sont les critères d'éligibilité pour un prêt professionnel ?", answer: "Nous étudions la viabilité de votre projet, la santé financière de votre entreprise, votre expérience et votre apport personnel. Chaque dossier est unique." },
        { question: "Faut-il une assurance pour un prêt professionnel ?", answer: "Oui, une assurance emprunteur sur la tête du dirigeant est presque toujours exigée pour garantir la continuité du remboursement en cas de problème." }
      ]
    },
    "rachat-de-credits": {
      icon: <Briefcase className="w-8 h-8" />,
      image: siteConfig.services[4].image,
      title: "Rachat de Crédits",
      tagline: "Simplifiez votre budget et retrouvez votre sérénité financière.",
      description: "<p>Le rachat de crédits consiste à regrouper l'ensemble de vos prêts en cours (crédit immobilier, prêts à la consommation, etc.) en une seule et unique mensualité. Cette opération vous permet de réduire votre taux d'endettement, de simplifier la gestion de votre budget et, souvent, d'obtenir une trésorerie supplémentaire pour un nouveau projet. C'est une solution efficace pour retrouver une meilleure visibilité et plus de souplesse financière.</p>",
      features: [
        "Réduction de vos mensualités jusqu'à -60%.",
        "Un seul prêt, une seule mensualité, un seul interlocuteur.",
        "Possibilité d'inclure une trésorerie pour un nouveau projet.",
        "Étude gratuite et sans engagement de votre situation."
      ],
      steps: [
        { title: "Analyse de vos prêts", description: "Nous faisons le point sur tous vos crédits en cours." },
        { title: "Proposition de regroupement", description: "Nous vous proposons une nouvelle mensualité unique et un nouveau taux." },
        { title: "Mise en place", description: "Nous nous occupons de solder vos anciens crédits et de mettre en place le nouveau prêt." }
      ],
      documents: [
        { title: "Contrat de Prêt", description: "Ce nouveau contrat remplace tous vos anciens crédits. Il formalise votre nouvelle mensualité unique, le nouveau taux et la durée de remboursement." },
        { title: "Attestation d'Assurance", description: "Comme pour tout prêt, l'assurance est une sécurité indispensable qui couvre le remboursement en cas de difficultés." }
      ],
      faqs: [
        { question: "Suis-je obligé de changer de banque ?", answer: "Non, vous n'êtes pas obligé de changer de banque. Nous pouvons mettre en place le rachat de crédits tout en conservant vos comptes actuels." },
        { question: "Puis-je inclure une dette familiale ou un découvert ?", answer: "Oui, dans de nombreux cas, il est possible d'inclure des dettes familiales (reconnues par écrit) ou des découverts bancaires dans l'opération de rachat." }
      ]
    },
    "pret-etudiant": {
      icon: <GraduationCap className="w-8 h-8" />,
      image: siteConfig.services[5].image,
      title: "Prêt Étudiant",
      tagline: "Financez vos études et construisez votre avenir en toute tranquillité.",
      description: "<p>Le Prêt Étudiant FLEXFOND est spécialement conçu pour vous aider à financer vos frais de scolarité, votre logement, votre matériel informatique ou un séjour d'études à l'étranger. Avec des conditions avantageuses et un remboursement différé, vous pouvez vous concentrer sur votre réussite sans vous soucier de l'aspect financier. C'est un investissement sur votre avenir, avec un partenaire qui croit en votre potentiel.</p>",
      features: [
        "Taux d'intérêt avantageux réservés aux étudiants.",
        "Remboursement différé : commencez à rembourser après la fin de vos études.",
        "Pas besoin de justificatif de revenus des parents dans certains cas.",
        "Financement des frais de scolarité, du logement et des dépenses courantes."
      ],
      steps: [
        { title: "Demande simplifiée", description: "Faites votre demande en ligne avec votre certificat de scolarité." },
        { title: "Étude du dossier", description: "Nous analysons votre demande et celle de votre garant si nécessaire." },
        { title: "Déblocage des fonds", description: "Recevez les fonds pour couvrir vos dépenses tout au long de l'année." }
      ],
      documents: [
        { title: "Contrat de Prêt Étudiant", description: "Ce contrat est adapté à votre situation. Il précise les conditions de déblocage des fonds et surtout les modalités du remboursement différé." },
        { title: "Acte de Cautionnement", description: "Souvent, un parent ou un proche se porte garant pour vous. Ce document officialise leur engagement à vos côtés." }
      ],
      faqs: [
        { question: "Dois-je avoir un garant pour obtenir un prêt étudiant ?", answer: "Dans la plupart des cas, oui. Un garant (souvent un parent) est demandé pour sécuriser le prêt. Cependant, il existe des prêts étudiants garantis par l'État sous certaines conditions." },
        { question: "Quand dois-je commencer à rembourser ?", answer: "L'un des principaux avantages est le différé de remboursement. Vous pouvez choisir de ne commencer à rembourser que 1 ou 2 ans après la fin de vos études, le temps de trouver un emploi." }
      ]
    }
  }
  