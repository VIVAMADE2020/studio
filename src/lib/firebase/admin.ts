
import admin from 'firebase-admin';

// This file is only ever imported on the server, so we can use the `getApps`
// check to ensure we only initialize the app once per server instance.
if (!admin.apps.length) {
  try {
    // App Hosting provides the FIREBASE_CONFIG environment variable,
    // which the Firebase Admin SDK can use to initialize.
    admin.initializeApp();
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

export const auth = admin.auth();
export const db = admin.firestore();
