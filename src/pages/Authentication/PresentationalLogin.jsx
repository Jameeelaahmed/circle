import { Eye, EyeOff } from "lucide-react";
import { motion as Motion } from "framer-motion";

import FloatingAvatarContainer from "../../components/ui/FloatingAvatars/FloatingAvatarContainer";
import IrregularCirclePaths from "../../components/ui/IrregularCirclePathes/IrregularCirclePaths";
import Button from "../../components/ui/Buttons/Button";
import AuthButton from "../../components/ui/Buttons/AuthButton";
import GoogleIcon from "../../assets/icons/google.svg";
import { Link } from "react-router";
import { Logo } from "../../assets/icons/Logo";

function PresentationalLogin({
  handleSignIn,
  handleKeyPress,
  handleSignInWithGoogle,
  setEmail,
  setPassword,
  setShowPassword,
  email,
  isLoading,
  isGoogleLoading,
  showPassword,
  password,
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <div className="relative w-1/2 overflow-hidden">
        <IrregularCirclePaths />
        <FloatingAvatarContainer />
      </div>

      {/* Right Half - Clean Login Form */}
      <div className="flex w-1/2 items-center justify-center bg-black">
        <div className="w-full max-w-md px-8">
          {/* Logo */}
          <Motion.div
            className="mb-8 flex justify-center text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Logo />
          </Motion.div>

          {/* Welcome Text */}
          <Motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="font-quick-sand mb-2 text-3xl font-bold text-white">
              Welcome to Circle
            </h1>
            <p className="text-text text-sm">Let's sign you in</p>
          </Motion.div>

          {/* Login Form */}
          <Motion.div
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
                  className="bg-dark h-12 w-full rounded-xl border-gray-600 ps-2 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50"
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
                  className="bg-dark h-12 w-full rounded-xl border-gray-600 ps-2 pr-12 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-right">
                <Button
                  variant={"primary"}
                  size={"xlarge"}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Login"}
                </Button>
                <Link
                  to={"/forget-password"}
                  className="text-text cursor-pointer hover:underline"
                >
                  forget password?
                </Link>
              </div>
            </form>

            <div
              className={`text-text relative flex justify-center before:absolute before:top-1/2 before:left-[55%] before:h-1 before:w-[45%] before:-translate-y-1/2 before:bg-white after:absolute after:top-1/2 after:right-[55%] after:h-1 after:w-[45%] after:-translate-y-1/2 after:bg-white`}
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

            <div className="pt-4 text-center">
              <span className="text-text text-sm">Don't have an account?</span>
              <Link
                className="text-primary cursor-pointer ps-2 text-sm font-medium transition-colors hover:text-purple-300"
                to={"/register"}
              >
                Create an account
              </Link>
            </div>
          </Motion.div>
        </div>
      </div>
    </div>
  );
}
export default PresentationalLogin;
