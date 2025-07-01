// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4UFSaVWVNQZiXpT0K_tQXuxSqb-uj730",
  authDomain: "management-app-e142b.firebaseapp.com",
  projectId: "management-app-e142b",
  storageBucket: "management-app-e142b.firebasestorage.app",
  messagingSenderId: "854521776313",
  appId: "1:854521776313:web:9d4be081ef4dd7eeeb7368",
  measurementId: "G-TBHJ7T2F5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc };
