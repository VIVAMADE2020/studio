
import admin from 'firebase-admin';
import { App, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { GoogleAuth } from 'google-auth-library';

// This file is only ever imported on the server.
// We use this pattern to ensure we only initialize the app once.
function getFirebaseAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // App Hosting provides the FIREBASE_CONFIG environment variable,
  // which the Firebase Admin SDK can use to initialize.
  // Using GoogleAuth with specific scopes to ensure permissions.
  const auth = new GoogleAuth({
    scopes: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/datastore',
        'https://www.googleapis.com/auth/devstorage.full_control',
        'https://www.googleapis.com/auth/firebase',
        'https://www.googleapis.com/auth/identitytoolkit',
        'https://www.googleapis.com/auth/userinfo.email',
    ],
  });

  return initializeApp({
    credential: {
      getAccessToken: () => auth.getAccessToken(),
      getCertificate: () => ({
        projectId: process.env.PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
      }),
    },
  });
}

export const adminApp = getFirebaseAdminApp();
export const auth = getAuth(adminApp);
export const db = getFirestore(adminApp);
