// Libs
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, GoogleProvider } from "../../../firebase-config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../../features/user/userSlice";
import { getErrorMessage } from "../../../utils/ErrorMessage";
import { validateText, validateEmail, validatePassword } from "../../../utils/FormValidator";
import { validateUsername } from "../../../utils/usernameValidator";
import { createUserProfile } from "../../../fire_base/profileController/profileController";
import interests from '../../../constants/interests';

// components
import RegisterFormPresentional from "./RegisterFormPresentional";
import { Timestamp } from "firebase/firestore";

function RegisterFormContainer({ onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [usernameValidation, setUsernameValidation] = useState({
    isValid: null,
    message: "",
    isChecking: false
  });
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [errors, setErrors] = useState({});
  const interestOptions = interests;

  // Refs for form inputs
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const searchRef = useRef(null);

  const filteredInterests = interestOptions.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Username validation with useEffect
  useEffect(() => {
    const validateUsernameAsync = async () => {
      if (!userName || userName.length < 3) {
        setUsernameValidation({
          isValid: null,
          message: "",
          isChecking: false
        });
        return;
      }

      setUsernameValidation(prev => ({ ...prev, isChecking: true }));

      try {
        const validation = await validateUsername(userName);
        setUsernameValidation({
          isValid: validation.isValid,
          message: validation.message,
          isChecking: false
        });
      } catch (error) {
        console.error("Username validation error:", error);
        setUsernameValidation({
          isValid: false,
          message: "Error checking username availability",
          isChecking: false
        });
      }
    };

    // Add a small delay to avoid too many API calls while typing
    const timeoutId = setTimeout(validateUsernameAsync, 500);

    return () => clearTimeout(timeoutId);
  }, [userName]);

  // Handle search input change with ref
  const handleSearchChange = () => {
    setSearch(searchRef.current?.value || "");
  };

  // Clear specific field errors
  const clearFieldError = (fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  // Handle location change and clear error
  const handleLocationChange = (value) => {
    setLocation(value);
    if (value) {
      clearFieldError('location');
    }
  };

  // Handle interests change and clear error
  const handleInterestsChange = (newInterests) => {
    setSelectedInterests(newInterests);
    if (newInterests.length > 0) {
      clearFieldError('interests');
    }
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigate("/");
  //     }
  //   });
  // }, []);

  const handleSignUp = async (e) => {
    e?.preventDefault();

    // Get values from refs
    const emailValue = emailRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";
    const confirmPasswordValue = confirmPasswordRef.current?.value || "";

    // Validate all fields
    const validationErrors = {};

    // Username validation
    const usernameError = validateText(userName, "username");
    if (usernameError) validationErrors.username = usernameError;

    // Email validation
    const emailError = validateEmail(emailValue);
    if (emailError) validationErrors.email = emailError;

    // Password validation
    const passwordError = validatePassword(passwordValue);
    if (passwordError) validationErrors.password = passwordError;

    // Confirm password validation
    if (!confirmPasswordValue) {
      validationErrors.confirmPassword = "Please confirm your password";
    } else if (passwordValue !== confirmPasswordValue) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    // Age validation
    if (!userAge || userAge < 18) {
      validationErrors.age = "You must be at least 18 years old to register";
    }

    // Location validation
    if (!location) {
      validationErrors.location = "Please select your location";
    }

    // Interests validation
    if (selectedInterests.length === 0) {
      validationErrors.interests = "Please select at least one interest";
    }

    // If there are validation errors, display them and stop
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});

    setIsLoading(true);

    try {
      // Validate username availability before creating account
      const usernameValidationResult = await validateUsername(userName);
      if (!usernameValidationResult.isValid) {
        setErrors({ username: usernameValidationResult.message });
        setIsLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Create user profile in Firestore for email/password signup
      const profileData = {
        uid: user.uid,
        email: user.email,
        provider: "email",
        emailVerified: user.emailVerified,
        username: userName || "",
        age: userAge || null,
        bio: "",
        location: location || "",
        joinDate: "",
        avatarPhoto: user.photoURL || null,
        coverPhoto:
          "https://res.cloudinary.com/dlyfph65r/image/upload/v1753334626/coverDeafault_b5c8od.jpg",
        stats: {
          circles: 0,
          connections: 0,
          events: 0,
        },
        interests: selectedInterests,
        joninedEvents: [],
        connectionRequests: [],
        connections: [],
        createdAt: Timestamp.now(),
        isAdmin: false,
        joinedCircles: [],
        phoneNumber: "",
      };

      await createUserProfile(user.uid, profileData);

      dispatch(setUserInfo({ user, token }));
      toast.success("Account created successfully! Welcome to Circle!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(getErrorMessage(error.code));
      // Handle Firestore creation errors specifically
      // if (
      //   error.message?.includes("Firestore") ||
      //   error.code?.includes("firestore")
      // ) {
      //   toast.error(
      //     "Account created but profile setup failed. Please try logging in.",
      //   );
      // }
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
        provider: "email",
        emailVerified: user.emailVerified,
        username: userName || "",
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
        interests: selectedInterests,
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

  const handleAgeChange = (e) => {
    const age = new Date(e.target.value);
    const today = new Date();
    const calculatedAge = today.getFullYear() - age.getFullYear();

    if (calculatedAge < 18) {
      setErrors(prev => ({ ...prev, age: "You must be at least 18 years old to register" }));
      setUserAge(null);
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.age;
        return newErrors;
      });
      setUserAge(calculatedAge);
    }
  };

  return (
    <RegisterFormPresentional
      handleKeyPress={handleKeyPress}
      handleSignUp={handleSignUp}
      handleSignUpWithGoogle={handleSignUpWithGoogle}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      isLoading={isLoading}
      isGoogleLoading={isGoogleLoading}
      onSwitchToLogin={onSwitchToLogin}
      handleAgeChange={handleAgeChange}
      setUserName={setUserName}
      userName={userName}
      usernameValidation={usernameValidation}
      location={location}
      setLocation={handleLocationChange}
      selectedInterests={selectedInterests}
      setSelectedInterests={handleInterestsChange}
      interestOptions={interestOptions}
      filteredInterests={filteredInterests}
      search={search}
      handleSearchChange={handleSearchChange}
      errors={errors}
      clearFieldError={clearFieldError}
      // Refs
      usernameRef={usernameRef}
      emailRef={emailRef}
      passwordRef={passwordRef}
      confirmPasswordRef={confirmPasswordRef}
      searchRef={searchRef}
    />
  );
}

export default RegisterFormContainer;
