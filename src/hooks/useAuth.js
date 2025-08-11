import { useSelector } from "react-redux";
import {
  getUserInfo,
  getToken,
  getIsAuthenticated,
} from "../features/user/userSlice";

export const useAuth = () => {
  const user = useSelector(getUserInfo);
  const token = useSelector(getToken);
  const isAuthenticated = useSelector(getIsAuthenticated);
  return {
    photoURL: user?.avatarPhoto,
    user,
    token,
    // Derived values for convenience
    isLoggedIn: isAuthenticated,
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
