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
import { createUserProfile } from "../../../fire_base/profileController/profileController";

// components
import RegisterFormPresentional from "./RegisterFormPresentional";

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
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Create user profile in Firestore for email/password signup
      const profileData = {
        uid: user.uid,
        email: user.email,
        username: user.displayName || null,
        bio: "",
        location: "",
        joinDate: "",
        avatarPhoto: user.photoURL || null,
        coverPhoto:
          "https://res.cloudinary.com/dlyfph65r/image/upload/v1753334626/coverDeafault_b5c8od.jpg",
        stats: {
          circles: 0,
          connections: 0,
          events: 0,
        },
        interests: [""],
        joninedEvents: [],
        connectionRequests: [],
        connections: [],
        createdAt: new Date(),
        isAdmin: false,
        joinedCircles: [],
        phoneNumber: "",
      };

      await createUserProfile(user.uid, profileData);

      dispatch(setUserInfo({ user, token }));
      toast.success("Account created successfully! Welcome to Circle!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      // Handle Firestore creation errors specifically
      if (
        error.message?.includes("Firestore") ||
        error.code?.includes("firestore")
      ) {
        toast.error(
          "Account created but profile setup failed. Please try logging in.",
        );
      } else {
        toast.error(getErrorMessage(error.code));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpWithGoogle = async () => {
    setIsGoogleLoading(true);

    try {
      const userCredential = await signInWithPopup(auth, GoogleProvider);
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Check if this is a new user (first time signing up)
      const isNewUser = userCredential._tokenResponse?.isNewUser || false;

      // Always create/update user profile in Firestore
      // This handles both new users and returning users who might not have a profile
      const profileData = {
        uid: user.uid,
        email: user.email,
        username: user.displayName || null,
        bio: "",
        location: "",
        joinDate: "",
        avatarPhoto: user.photoURL || null,
        coverPhoto:
          "https://res.cloudinary.com/dlyfph65r/image/upload/v1753334626/coverDeafault_b5c8od.jpg",
        stats: {
          circles: 0,
          connections: 0,
          events: 0,
        },
        interests: [""],
        joninedEvents: [],
        connectionRequests: [],
        connections: [],
        createdAt: new Date(),
        isAdmin: false,
        joinedCircles: [],
        phoneNumber: "",
      };

      try {
        await createUserProfile(user.uid, profileData);
        console.log("Profile created/updated successfully for Google user");
      } catch (profileError) {
        console.error(
          "Error creating/updating Google user profile:",
          profileError,
        );
        // Don't block the login process, but notify the user
        toast.warning("Signed in successfully, but profile update failed.");
      }

      dispatch(setUserInfo({ user, token }));
      toast.success(
        isNewUser
          ? "Account created successfully with Google!"
          : "Signed in successfully with Google!",
      );
      navigate("/");
    } catch (error) {
      console.error("Google signup error:", error);

      // Handle COOP policy error specifically
      if (error.message?.includes("Cross-Origin-Opener-Policy")) {
        toast.error(
          "Popup blocked by security policy. Please try again or use a different browser.",
        );
      } else if (error.code === "auth/popup-closed-by-user") {
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
  );
}

export default RegisterFormContainer;
