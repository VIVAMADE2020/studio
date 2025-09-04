
import admin from 'firebase-admin';
import { App, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// This file is only ever imported on the server.
// We use this pattern to ensure we only initialize the app once.
function getFirebaseAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // When running in a Google Cloud environment like App Hosting,
  // the SDK automatically discovers the service account credentials
  // and initializes correctly without any explicit configuration.
  return initializeApp();
}

export const adminApp = getFirebaseAdminApp();
export const auth = getAuth(adminApp);
export const db = getFirestore(adminApp);
