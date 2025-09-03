
import admin from 'firebase-admin';

// Pour éviter les réinitialisations lors du hot-reload en développement
if (!admin.apps.length) {
    try {
        // Cette variable d'environnement doit être configurée dans les secrets de votre hébergement
        // (ex: App Hosting secrets) ou dans un fichier .env.local pour le développement.
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error: any) {
        console.error("Firebase Admin initialization error:", error.message);
        // Ne pas lancer d'erreur bloquante si la clé n'est pas là, 
        // car cela peut bloquer le build de l'application si la clé n'est pas encore définie.
        // Les fonctions qui dépendent de `authAdmin` échoueront avec un message clair.
    }
}

export const authAdmin = admin.apps.length ? admin.auth() : null;
export const dbAdmin = admin.apps.length ? admin.firestore() : null;
