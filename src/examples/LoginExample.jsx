// Example Login component
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../features/user/userSlice';
import { auth } from '../firebase-config';

function Login() {
    const dispatch = useDispatch();

    const handleLogin = async (email, password) => {
        try {
            // Firebase login
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get token immediately
            const token = await user.getIdToken();

            // Update Redux state immediately (optional but good for UX)
            dispatch(setUserInfo({ user, token }));

            // Navigate to dashboard or home
            // navigate('/dashboard');

        } catch (error) {
            console.error('Login error:', error);
            // Handle error (show toast, etc.)
        }
    };

    return (
        // Your login form JSX
        <form onSubmit={(e) => {
            e.preventDefault();
            handleLogin(email, password);
        }}>
            {/* form fields */}
        </form>
    );
}
