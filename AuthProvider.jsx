import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { setUserInfo, clearUserInfo, setAuthLoading } from "./src/features/user/userSlice";
import { auth } from "./src/firebase-config";

/**
 * AuthProvider: Listens to Firebase auth changes and updates Redux store.
 */
const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthLoading(true));
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Fetch user profile from Firestore to get username
                let username = null;
                try {
                    const db = getFirestore();
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        const profileData = userDocSnap.data();
                        username = profileData.username || null;
                    }
                } catch (profileError) {
                    console.error("Error fetching Firestore profile:", profileError);
                }
                const serializableUser = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    username: username,
                    photoURL: currentUser.photoURL,
                    emailVerified: currentUser.emailVerified,
                    phoneNumber: currentUser.phoneNumber,
                    providerId: currentUser.providerId,
                };
                try {
                    const token = await currentUser.getIdToken();
                    dispatch(setUserInfo({
                        user: serializableUser,
                        token: token,
                    }));
                } catch {
                    dispatch(setUserInfo({
                        user: serializableUser,
                        token: null,
                    }));
                }
            } else {
                dispatch(clearUserInfo());
            }
        });
        dispatch(setAuthLoading(false));
        return () => unsubscribe();
    }, [dispatch]);

    return children;
};

export default AuthProvider;
