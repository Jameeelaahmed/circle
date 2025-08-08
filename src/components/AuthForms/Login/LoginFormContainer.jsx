// Libs
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth, GoogleProvider } from "../../../firebase-config";
// components
import LoginFormPresentational from './LoginFormPresentational';
import { setUserInfo } from "../../../features/user/userSlice";
import { getErrorMessage } from "../../../utils/ErrorMessage";
import { validateLoginForm } from "../../../utils/FormValidator";

export default function LoginFormContainer({ onSwitchToRegister }) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Refs for form inputs
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
    }, [navigate]);

    const handleSignIn = async (e) => {
        e?.preventDefault();

        // Get values from refs
        const emailValue = emailRef.current?.value || "";
        const passwordValue = passwordRef.current?.value || "";

        const validationErrors = validateLoginForm({ email: emailValue, password: passwordValue });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                emailValue,
                passwordValue,
            );
            const token = await userCredential.user.getIdToken();
            dispatch(setUserInfo({ user: userCredential.user, token }));
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(getErrorMessage(error.code));
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignInWithGoogle = async () => {
        setIsGoogleLoading(true);

        try {
            const userCredential = await signInWithPopup(auth, GoogleProvider);
            const token = await userCredential.user.getIdToken();
            dispatch(setUserInfo({ user: userCredential.user, token }));
            navigate("/");
        } catch (error) {
            console.error("Google login error:", error);
            if (error.code === "auth/popup-closed-by-user") {
                toast.error("Sign-in was cancelled");
            } else if (error.code === "auth/popup-blocked") {
                toast.error("Popup was blocked. Please allow popups and try again");
            } else {
                toast.error("Failed to sign in with Google. Please try again");
            }
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSignIn(e);
        }
    };
    return (
        <LoginFormPresentational
            onSwitchToRegister={onSwitchToRegister}
            handleSignIn={handleSignIn}
            handleKeyPress={handleKeyPress}
            handleSignInWithGoogle={handleSignInWithGoogle}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            isLoading={isLoading}
            isGoogleLoading={isGoogleLoading}
            errors={errors}
            // Refs
            emailRef={emailRef}
            passwordRef={passwordRef}
        />
    )
}
