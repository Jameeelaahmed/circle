import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe9otzIqGcyX1KaOzA66-DBX1gCHYa3ro",
  authDomain: "circle-50ed5.firebaseapp.com",
  projectId: "circle-50ed5",
  storageBucket: "circle-50ed5.firebasestorage.app",
  messagingSenderId: "845008921696",
  appId: "1:845008921696:web:f12ccf5921aa0bca720f05",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
