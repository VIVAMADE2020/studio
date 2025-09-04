
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "vixcapital-web",
  "appId": "1:144942449435:web:923321c8c29bdefdaf09be",
  "storageBucket": "vixcapital-web.firebasestorage.app",
  "apiKey": "AIzaSyDxvZ0-E_mJRL8AohGCWRLgQO3PxTrEmFA",
  "authDomain": "vixcapital-web.firebaseapp.com",
  "messagingSenderId": "144942449435"
};

// Initialize Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const db = getFirestore(app);

// L'authentification a été retirée
// const auth = getAuth(app);

export { app, db };
