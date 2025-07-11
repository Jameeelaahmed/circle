// Libs
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, GoogleProvider } from "../../firebase-config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

// Components
import { Eye, EyeOff } from "../../assets/icons";
import IrregularCirclePaths from "../../components/ui/authPages/IrregularCirclePaths";
import FloatingAvatars from "../../components/ui/authPages/FloatingAvatars";
import Button from '../../components/ui/Buttons/Button';
import { COLORS } from "../../constants";
import AuthButton from "../../components/ui/Buttons/AuthButton";
import GoogleIcon from "../../assets/icons/google.svg";
import { setUserInfo } from "../../features/Slices/userSlice";

// CONTEXTS

export default function Register() {
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
      } else {
        navigate("/login");
      }
    });
  }, []);

  // Form validation
  const validateForm = () => {
    // Email validation
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (!password.trim()) {
      toast.error("Please enter a password");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    // Repeat password validation
    if (!repeatPassword.trim()) {
      toast.error("Please confirm your password");
      return false;
    }

    if (password !== repeatPassword) {
      toast.error("Passwords don't match. Please try again.");
      return false;
    }

    return true;
  };

  // Get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "An account with this email already exists. Please try signing in instead.";
      case "auth/weak-password":
        return "Password is too weak. Please use at least 6 characters.";
      case "auth/invalid-email":
        return "Please enter a valid email address";
      case "auth/network-request-failed":
        return "Network error. Please check your connection and try again.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled. Please contact support.";
      default:
        return "Failed to create account. Please try again.";
    }
  };

  const handleSignUp = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUserInfo(userCredential.user));
      toast.success("Account created successfully! Welcome to Circle!");
      navigate("/");
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
      const result = await signInWithPopup(auth, GoogleProvider);
      dispatch(setUserInfo(userCredential.user));
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
          "An account with this email already exists. Please try signing in instead."
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
    <div className="h-screen w-screen bg-black flex overflow-hidden">
      {/* Left Half - Background Paths and Avatars */}
      <div className="w-1/2 relative overflow-hidden">
        <IrregularCirclePaths />
        <FloatingAvatars />
      </div>

      {/* Right Half - Clean Registration Form */}
      <div className="w-1/2 bg-black flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          {/* Logo */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-black rounded-lg transform rotate-45"></div>
            </div>
          </motion.div>

          {/* Welcome Text */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-white text-3xl font-bold mb-2 font-quick-sand">
              Welcome to Circle
            </h1>
            <p className="text-sm" style={{ color: COLORS.text }}>
              Let's create an account for you
            </p>
          </motion.div>

          {/* Registration Form */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={handleKeyPress}
                  disabled={isLoading}
                  className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 outline-0 h-12 rounded-xl backdrop-blur-sm w-full ps-2 disabled:opacity-50"
                  style={{
                    background: COLORS.dark,
                  }}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 outline-0 h-12 rounded-xl pr-12 backdrop-blur-sm w-full ps-2 disabled:opacity-50"
                  style={{
                    background: COLORS.dark,
                  }}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Repeat Password Input */}
              <div className="relative">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className={`bg-white/10 border-gray-600 text-white placeholder:text-gray-400 outline-0 h-12 rounded-xl pr-12 backdrop-blur-sm w-full ps-2 disabled:opacity-50 ${repeatPassword && !isPasswordMatch ? "border-red-500" : ""
                    }`}
                  style={{
                    background: COLORS.dark,
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  {showRepeatPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {repeatPassword && !isPasswordMatch && (
                <p className="text-red-400 text-sm mt-1">
                  Passwords don't match
                </p>
              )}

              {/* Submit Button */}
              <div className="text-right">
                <Button
                  variant={"primary"}
                  size={"xlarge"}
                  classes={"w-full"}
                  type="submit"
                  disabled={isLoading || !isPasswordMatch}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>

            {/* Divider */}
            <div
              style={{ color: COLORS.text }}
              className={`justify-center flex after:w-[45%] after:h-1 after:bg-white after:absolute relative after:top-1/2 after:right-[55%] after:-translate-y-1/2 before:w-[45%] before:h-1 before:bg-white before:absolute before:top-1/2 before:left-[55%] before:-translate-y-1/2 `}
            >
              OR
            </div>

            {/* Google Sign Up Button */}
            <AuthButton
              iconSrc={GoogleIcon}
              size={35}
              authFunc={handleSignUpWithGoogle}
              disabled={isGoogleLoading || isLoading}
            >
              {isGoogleLoading ? "Creating account..." : "Sign up With Google"}
            </AuthButton>

            {/* Redirect to sign in page */}
            <div className="text-center pt-4">
              <span className="text-sm" style={{ color: COLORS.text }}>
                Already have an account?
              </span>
              <Link
                className="text-purple-400 text-sm hover:text-purple-300 transition-colors font-medium ps-2 cursor-pointer"
                style={{ color: COLORS.primary }}
                to={"/login"}
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
