// firebase/profileFunctions.js
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export const createUserProfile = async (userId, profileData) => {

  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...profileData,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

export const getUserProfile = async (userId) => {
  if (!userId) throw new Error("No userId provided to getUserProfile");

  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};
