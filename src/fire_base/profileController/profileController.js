// firebase/profileFunctions.js
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

/**
 * Create a new profile in Firestore when user signs up
 * @param {string} userId - The UID from Firebase Auth
 * @param {Object} profileData - Custom data like name, age, etc.
 */
export const createUserProfile = async (userId, profileData) => {
  console.log("creating user", profileData);

  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...profileData,
      createdAt: new Date(),
    });
    console.log("Profile created successfully");
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};

/**
 * Update user profile in Firestore
 * @param {string} userId - The UID from Firebase Auth
 * @param {Object} updates - Fields to update
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date(),
    });
    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

// Add these imports to your existing imports

/**
 * Get user profile by ID from Firestore
 * @param {string} userId - The UID from Firebase Auth
 * @returns {Object|null} - User profile data or null if not found
 */

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log("User profile retrieved successfully");
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      console.log("No user profile found with ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};
