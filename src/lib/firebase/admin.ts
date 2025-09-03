
import admin from 'firebase-admin';

if (!admin.apps.length) {
    // Les variables d'environnement sont nécessaires pour que le SDK Admin puisse s'authentifier
    // auprès de votre projet Firebase côté serveur.
    // Assurez-vous que GOOGLE_APPLICATION_CREDENTIALS est défini dans votre environnement.
    // Pour App Hosting, cela se configure via les secrets.
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const authAdmin = admin.auth();
export const dbAdmin = admin.firestore();
