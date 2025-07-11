import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAW0f0DzBx3e769VkVdUimATL6-gnW4cTo",
  authDomain: "circle-26a87.firebaseapp.com",
  projectId: "circle-26a87",
  storageBucket: "circle-26a87.firebasestorage.app",
  messagingSenderId: "141731835688",
  appId: "1:141731835688:web:d6007596d6eb3e81eb6a1d",
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider()