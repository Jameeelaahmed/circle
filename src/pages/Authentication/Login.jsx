// Libs
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, GoogleProvider } from "../../firebase-config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
// Components
import FloatingAvatars from "../../components/ui/authPages/FloatingAvatars";
import IrregularCirclePaths from "../../components/ui/authPages/IrregularCirclePaths";
import { Eye, EyeOff } from "../../assets/icons";
import { COLORS } from "../../constants";
import Button from "../../components/ui/Buttons/Button";
import AuthButton from "../../components/ui/Buttons/AuthButton";
import GoogleIcon from "../../assets/icons/google.svg";
import { setUserInfo } from "../../features/Slices/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password.trim()) {
      toast.error("Please enter your password");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  // Get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No account found with this email address";
      case "auth/wrong-password":
        return "Incorrect password. Please try again";
      case "auth/invalid-email":
        return "Please enter a valid email address";
      case "auth/user-disabled":
        return "This account has been disabled";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later";
      case "auth/network-request-failed":
        return "Network error. Please check your connection";
      default:
        return "Invalid email or password. Please try again";
    }
  };

  const handleSignIn = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUserInfo(userCredential.user));
      toast.success("Successfully logged in!");

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
      const result = await signInWithPopup(auth, GoogleProvider);
      dispatch(setUserInfo(userCredential.user));
      toast.success("Successfully logged in with Google!");
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

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignIn(e);
    }
  };

  return (
    <div className="h-screen w-screen bg-black flex overflow-hidden">
      <div className="w-1/2 relative overflow-hidden">
        <IrregularCirclePaths />
        <FloatingAvatars />
      </div>

      {/* Right Half - Clean Login Form */}
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
              Let's sign you in
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <form onSubmit={handleSignIn} className="space-y-4">
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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 outline-0 h-12 rounded-xl pr-12 backdrop-blur-sm w-full ps-2 disabled:opacity-50"
                  style={{
                    background: COLORS.dark,
                  }}
                  required
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

              <div className="text-right flex justify-between">
                <Button
                  variant={"primary"}
                  size={"xlarge"}
                  classes={"!w-full"}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Login"}
                </Button>
              </div>
            </form>

            <div
              style={{ color: COLORS.text }}
              className={`justify-center flex after:w-[45%] after:h-1 after:bg-white after:absolute relative after:top-1/2 after:right-[55%] after:-translate-y-1/2 before:w-[45%] before:h-1 before:bg-white before:absolute before:top-1/2 before:left-[55%] before:-translate-y-1/2 `}
            >
              OR
            </div>

            <AuthButton
              iconSrc={GoogleIcon}
              size={35}
              authFunc={handleSignInWithGoogle}
              disabled={isGoogleLoading || isLoading}
            >
              {isGoogleLoading ? "Signing in..." : "Sign in With Google"}
            </AuthButton>

            <div className="text-center pt-4">
              <span className="text-sm" style={{ color: COLORS.text }}>
                Don't have an account?
              </span>
              <Link
                className="text-purple-400 text-sm hover:text-purple-300 transition-colors font-medium ps-2 cursor-pointer"
                style={{ color: COLORS.primary }}
                to={"/register"}
              >
                Create an account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
