// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "",
  authDomain: "management-app-e142b.firebaseapp.com",
  projectId: "management-app-e142b",
  storageBucket: "management-app-e142b.firebasestorage.app",
  messagingSenderId: "854521776313",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc };
