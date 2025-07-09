// Libs
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

// Components
import { Eye, EyeOff } from "../assets/icons";
import IrregularCirclePaths from "../components/ui/authPages/IrregularCirclePaths";
import FloatingAvatars from "../components/ui/authPages/FloatingAvatars";
import Button from "../components/ui/Button";
import { COLORS } from "../constants";
import AuthButton from "../components/ui/AuthButton";
import GoogleIcon from "../assets/icons/google.svg";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="h-screen w-screen bg-black flex overflow-hidden">
            {/* Left Half - Background Paths and Avatars */}
            <div className="w-1/2 relative overflow-hidden">
                {/* Irregular Circle Background Paths */}
                <IrregularCirclePaths />

                {/* Floating Avatars */}
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
                            Let's create an account for you
                        </p>
                    </motion.div>

                    {/* Login Form */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 outline-0 h-12 rounded-xl backdrop-blur-sm w-full ps-2"
                                style={{
                                    background: COLORS.dark,
                                }}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 outline-0 h-12 rounded-xl pr-12 backdrop-blur-sm w-full ps-2"
                                style={{
                                    background: COLORS.dark,
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>

                        <div className="text-right">
                            <Button
                                variant={"primary"}
                                size={"xlarge"}
                                classes={"w-full"}
                            >
                                Create account
                            </Button>
                        </div>
                        <div
                            style={{ color: COLORS.text }}
                            className={`justify-center flex after:w-[45%] after:h-1 after:bg-white after:absolute relative after:top-1/2 after:right-[55%] after:-translate-y-1/2 before:w-[45%] before:h-1 before:bg-white before:absolute before:top-1/2 before:left-[55%] before:-translate-y-1/2 `}
                        >
                            OR
                        </div>
                        <AuthButton
                            iconSrc={GoogleIcon}
                            size={35}
                            authFunc={() => ""}
                        >
                            Sign up With Google
                        </AuthButton>
                         <div className="text-center pt-4">
                            <span
                                className="text-sm"
                                style={{ color: COLORS.text }}
                            >
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
