// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
