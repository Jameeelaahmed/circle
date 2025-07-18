// Libs
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import { auth, GoogleProvider } from "../../../firebase-config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../features/user/userSlice";
import { getErrorMessage } from "../../../utils/ErrorMessage";
import { validateForm } from "../../../utils/FormValidator";

// components
import RegisterFormPresentional from './RegisterFormPresentional';

function RegisterFormContainer({ onSwitchToLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
    }, []);

    const handleSignUp = async (e) => {
        e?.preventDefault();
        const isvalid = validateForm({
            email,
            password,
            repeatPassword,
        });
        if (!isvalid) return;

        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const token = await userCredential.user.getIdToken();
            dispatch(setUserInfo({ user: userCredential.user, token }));
            toast.success("Account created successfully! Welcome to Circle!");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            toast.error(getErrorMessage(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUpWithGoogle = async () => {
        setIsGoogleLoading(true);

        try {
            const userCredential = await signInWithPopup(auth, GoogleProvider);
            const token = await userCredential.user.getIdToken();
            dispatch(setUserInfo({ user: userCredential.user, token }));
            toast.success("Account created successfully with Google!");
            navigate("/");
        } catch (error) {
            console.error("Google signup error:", error);
            if (error.code === "auth/popup-closed-by-user") {
                toast.error("Sign-up was cancelled");
            } else if (error.code === "auth/popup-blocked") {
                toast.error("Popup was blocked. Please allow popups and try again");
            } else if (
                error.code === "auth/account-exists-with-different-credential"
            ) {
                toast.error(
                    "An account with this email already exists. Please try signing in instead.",
                );
            } else {
                toast.error("Failed to sign up with Google. Please try again.");
            }
        } finally {
            setIsGoogleLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSignUp(e);
        }
    };

    // Real-time password match validation
    const isPasswordMatch = repeatPassword === "" || password === repeatPassword;

    return (
        <RegisterFormPresentional
            setShowRepeatPassword={setShowRepeatPassword}
            handleKeyPress={handleKeyPress}
            handleSignUp={handleSignUp}
            handleSignUpWithGoogle={handleSignUpWithGoogle}
            isPasswordMatch={isPasswordMatch}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            isGoogleLoading={isGoogleLoading}
            showRepeatPassword={showRepeatPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            setRepeatPassword={setRepeatPassword}
            email={email}
            password={password}
            repeatPassword={repeatPassword}
            onSwitchToLogin={onSwitchToLogin}
        />
    )
}

export default RegisterFormContainer
