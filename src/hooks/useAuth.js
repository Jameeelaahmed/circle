import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserInfo,
  getToken,
  getIsAuthenticated,
} from "../features/user/userSlice";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export const useAuth = () => {
  const user = useSelector(getUserInfo);
  const token = useSelector(getToken);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAuthLoading = useSelector((state) => state.user.isAuthLoading);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state change
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // ...set user...
      setIsLoading(false); // Only set to false after user is resolved
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    photoURL: user?.photoURL,
    user,
    token,
    isLoggedIn: isAuthenticated,
    isLoading: isAuthLoading || isLoading,
    userId: user?.uid,
    userEmail: user?.email,
    userName: user?.username,
  };
};

export const useAuthToken = () => {
  return useSelector(getToken);
};

export const useIsAuthenticated = () => {
  return useSelector(getIsAuthenticated);
};
