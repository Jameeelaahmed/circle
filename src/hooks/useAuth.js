import { useSelector } from 'react-redux';
import { getUserInfo, getToken, getIsAuthenticated } from '../features/user/userSlice';

/**
 * Custom hook to get all authentication data
 * @returns {Object} - { user, token, isAuthenticated }
 */
export const useAuth = () => {
    const user = useSelector(getUserInfo);
    const token = useSelector(getToken);
    const isAuthenticated = useSelector(getIsAuthenticated);
    return {
        user,
        token,
        // Derived values for convenience
        isLoggedIn: isAuthenticated,
        userId: user?.uid,
        userEmail: user?.email,
        userName: user?.username,
    };
};

/**
 * Hook to get only the authentication token
 * Useful for API calls
 */
export const useAuthToken = () => {
    return useSelector(getToken);
};

/**
 * Hook to check if user is authenticated
 * Useful for conditional rendering
 */
export const useIsAuthenticated = () => {
    return useSelector(getIsAuthenticated);
};
