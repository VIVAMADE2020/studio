
import admin from 'firebase-admin';

// Cette fonction garantit que l'application est initialisée une seule fois.
function initializeFirebaseAdmin() {
    if (admin.apps.length > 0) {
        return;
    }

    try {
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
        if (!serviceAccountString) {
            throw new Error("La variable d'environnement FIREBASE_SERVICE_ACCOUNT_KEY n'est pas définie.");
        }
        
        const serviceAccount = JSON.parse(serviceAccountString);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error: any) {
        console.error("Erreur d'initialisation de Firebase Admin:", error.message);
        // On ne lance pas d'erreur ici pour ne pas bloquer le build.
        // Les fonctions qui utilisent `authAdmin` vérifieront si l'app est initialisée.
    }
}

initializeFirebaseAdmin();

export const authAdmin = admin.apps.length ? admin.auth() : null;
export const dbAdmin = admin.apps.length ? admin.firestore() : null;
