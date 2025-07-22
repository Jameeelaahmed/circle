import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUserInfo, clearUserInfo, setAuthLoading } from "../features/user/userSlice";
import { auth } from "../firebase-config";

/**
 * AuthProvider: Listens to Firebase auth changes and updates Redux store.
 * Place this at the root of your app (e.g., in App.jsx or main.jsx).
 */
const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthLoading(true));
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const serializableUser = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
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
                } catch (error) {
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
