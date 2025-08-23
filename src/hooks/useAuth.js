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
  const isAuthLoading = useSelector((state) => state.user.isAuthLoading);

  return {
    photoURL: user?.photoURL,
    user,
    token,
    isLoggedIn: isAuthenticated,
    isLoading: isAuthLoading,
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
