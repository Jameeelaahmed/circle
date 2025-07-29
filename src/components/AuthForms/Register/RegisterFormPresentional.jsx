import Button from "../../../components/ui/Buttons/Button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../../../assets/icons/Logo";
import AuthButton from "../../../components/ui/Buttons/AuthButton";
import GoogleIcon from "../../../assets/icons/google.svg";
import { motion as Motion } from "framer-motion";
import EgyptCities from "../../../assets/EgyptCities.json";
import Chip from '@mui/material/Chip';

function RegisterFormPresentional({
  handleKeyPress,
  handleSignUp,
  handleSignUpWithGoogle,
  isPasswordMatch,
  showPassword,
  setShowPassword,
  isLoading,
  isGoogleLoading,
  setEmail,
  setPassword,
  email,
  password,
  repeatPassword,
  onSwitchToLogin,
  handleAgeChange,
  setUserName,
  userName,
  location,
  setLocation,
  selectedInterests,
  setSelectedInterests,
  filteredInterests,
  search,
  setSearch,
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center px-8 lg:max-w-md">
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
        <p className="text-text text-sm">Let's create an account for you</p>
      </Motion.div>

      {/* Registration Form */}
      <Motion.div
        className="min-w-xs space-y-4 md:min-w-md py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              //   onKeyUp={handleKeyPress}
              disabled={isLoading}
              className="bg-main h-12 w-full rounded-xl border-gray-600 ps-2 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50"
              required
            />
          </div>
          <div className="relative">
            <div className="absolute top-1/2 right-14 z-[1] -translate-y-1/2 text-white">
              Date of Birth
            </div>
            <input
              type="date"
              placeholder="Age"
              onChange={(e) => handleAgeChange(e)}
              disabled={isLoading}
              className="bg-main h-12 w-full rounded-xl border-gray-600 ps-2 pe-5 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50"
              required
            />
          </div>
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={handleKeyPress}
              disabled={isLoading}
              className="bg-main h-12 w-full rounded-xl border-gray-600 ps-2 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50"
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
              className="bg-main h-12 w-full rounded-xl border-gray-600 ps-2 pr-12 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50"
              required
              minLength={6}
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
          <select
            className="bg-main h-12 w-full"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            {EgyptCities.map((city) => (
              <option>{city.city_name_en}</option>
            ))}
          </select>
          {/* Password Match Indicator */}
          {repeatPassword && !isPasswordMatch && (
            <p className="mt-1 text-sm text-red-400">Passwords don't match</p>
          )}

          {/* Interests Selection */}
          <div>
            <label className="text-text mb-1 block text-sm font-medium">
              Interests
            </label>
            <input
              type="text"
              placeholder="Search interests..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="mb-2 p-2 rounded border w-full"
            />
            <div className="flex flex-wrap gap-2">
              {/* Show up to 10 interests: selected first, then unselected, always max 10 visible */}
              {[
                // Show selected interests that match the filter (max 10)
                ...filteredInterests.filter(interest => selectedInterests.includes(interest.value)),
                // Fill up to 10 with unselected filtered interests
                ...filteredInterests.filter(interest => !selectedInterests.includes(interest.value)).slice(0, 10 - filteredInterests.filter(interest => selectedInterests.includes(interest.value)).length)
              ].slice(0, 10).map(interest => (
                <Chip
                  key={interest.value}
                  label={interest.label}
                  color={"primary"}
                  variant={selectedInterests.includes(interest.value) ? "filled" : "outlined"}
                  onClick={() => {
                    setSelectedInterests(prev =>
                      prev.includes(interest.value)
                        ? prev.filter(i => i !== interest.value)
                        : [...prev, interest.value]
                    );
                    setSearch("");
                  }}
                />
              ))}
              {/* Show any selected interests that are not in the filteredInterests (e.g. from previous search) */}
              {selectedInterests
                .filter(sel => !filteredInterests.some(interest => interest.value === sel))
                .map(sel => (
                  <Chip
                    key={sel}
                    label={sel}
                    color={"primary"}
                    variant="filled"
                    onClick={() => {
                      setSelectedInterests(prev => prev.filter(i => i !== sel));
                    }}
                  />
                ))}
            </div>
          </div>
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
          className={`text-text relative flex justify-center before:absolute before:top-1/2 before:left-[55%] before:h-1 before:w-[45%] before:-translate-y-1/2 before:bg-white after:absolute after:top-1/2 after:right-[55%] after:h-1 after:w-[45%] after:-translate-y-1/2 after:bg-white`}
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
        <div className="pt-4 text-center">
          <span className="text-text text-sm">Already have an account?</span>
          {onSwitchToLogin ? (
            <button
              type="button"
              className="text-primary cursor-pointer border-0 bg-transparent ps-2 text-sm font-medium transition-colors outline-none hover:text-purple-300"
              onClick={onSwitchToLogin}
            >
              Sign in
            </button>
          ) : (
            <Link
              className="text-primary cursor-pointer ps-2 text-sm font-medium transition-colors hover:text-purple-300"
              to={"/login"}
            >
              Sign in
            </Link>
          )}
        </div>
      </Motion.div>
    </div>
  );
}

export default RegisterFormPresentional;
