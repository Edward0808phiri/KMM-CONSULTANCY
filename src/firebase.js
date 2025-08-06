// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrt-4v2I0bB-SNhhKAAHoij04iTY9ll14",
  authDomain: "kmm-consultants-limited.firebaseapp.com",
  projectId: "kmm-consultants-limited",
  storageBucket: "kmm-consultants-limited.firebasestorage.app",
  messagingSenderId: "588908651718",
  appId: "1:588908651718:web:3265b25a0e9fd54130a3c7"
};

const app = initializeApp(firebaseConfig);

// Export Firestore & Auth so we can use them elsewhere
export const db = getFirestore(app);
export const auth = getAuth(app);
