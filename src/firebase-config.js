import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW0f0DzBx3e769VkVdUimATL6-gnW4cTo",
  authDomain: "circle-26a87.firebaseapp.com",
  projectId: "circle-26a87",
  storageBucket: "circle-26a87.firebasestorage.app",
  messagingSenderId: "141731835688",
  appId: "1:141731835688:web:69bd763eeda258b0eb6a1d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const currentUser = auth.currentUser;
export const GoogleProvider = new GoogleAuthProvider();

export async function checkIfBlocked(user) {
  if (!user) return false;

  try {
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.isBlocked === true;
    }

    return false;
  } catch (error) {
    console.error("Error checking blocked status:", error);
    return false;
  }
}
export default app;
