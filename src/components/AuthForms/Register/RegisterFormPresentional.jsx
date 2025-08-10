import Button from "../../../components/ui/Buttons/Button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../../../assets/icons/Logo";
import AuthButton from "../../../components/ui/Buttons/AuthButton";
import GoogleIcon from "../../../assets/icons/google.svg";
import { motion as Motion } from "framer-motion";
import EgyptCities from "../../../assets/EgyptCities.json";
import Chip from "@mui/material/Chip";

function RegisterFormPresentional({
  handleKeyPress,
  handleSignUp,
  handleSignUpWithGoogle,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isLoading,
  isGoogleLoading,
  email,
  password,
  confirmPassword,
  onSwitchToLogin,
  handleAgeChange,
  setUserName,
  userName,
  usernameValidation,
  location,
  handleLocation,
  setLocation,
  selectedInterests,
  setSelectedInterests,
  filteredInterests,
  search,
  handleSearchChange,
  errors,
  clearFieldError,
  usernameRef,
  emailRef,
  passwordRef,
  confirmPasswordRef,
  searchRef,
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
        className="min-w-xs space-y-4 py-4 md:min-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (e.target.value && errors.username) {
                  clearFieldError("username");
                }
              }}
              disabled={isLoading}
              className={`inputsBg h-12 w-full rounded-xl border-gray-600 ps-2 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${usernameValidation?.isValid === false || errors.username
                ? "border-2 border-red-500"
                : usernameValidation?.isValid === true
                  ? "border-2 border-green-500"
                  : ""
                }`}
            />
            {usernameValidation?.isChecking && (
              <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-white"></div>
              </div>
            )}
            {(errors.username || usernameValidation?.message) && (
              <p
                className={`mt-1 text-xs ${errors.username
                  ? "text-red-400"
                  : usernameValidation?.isValid
                    ? "text-green-400"
                    : "text-red-400"
                  }`}
              >
                {errors.username || usernameValidation.message}
              </p>
            )}
          </div>
          {/* Age */}
          <div className="relative">
            <div className="absolute top-1/2 right-14 z-[1] -translate-y-1/2 text-white">
              Date of Birth
            </div>
            <input
              type="date"
              placeholder="Age"
              onChange={handleAgeChange}
              disabled={isLoading}
              className={`inputsBg h-12 w-full rounded-xl border-gray-600 ps-2 pe-5 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.age ? "border-2 border-red-500" : ""
                }`}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-400">{errors.age}</p>
            )}
          </div>
          {/* Email Input */}
          <div>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email address"
              defaultValue={email}
              onKeyUp={handleKeyPress}
              onBlur={() => {
                const emailValue = emailRef.current?.value || "";
                if (emailValue && errors.email) {
                  clearFieldError("email");
                }
              }}
              disabled={isLoading}
              className={`inputsBg h-12 w-full rounded-xl border-gray-600 ps-2 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.email ? "border-2 border-red-500" : ""
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password (min. 6 characters)"
              defaultValue={password}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                const passwordValue = passwordRef.current?.value || "";
                if (passwordValue && errors.password) {
                  clearFieldError("password");
                }
              }}
              disabled={isLoading}
              className={`inputsBg h-12 w-full rounded-xl border-gray-600 ps-2 pr-12 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.password ? "border-2 border-red-500" : ""
                }`}
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
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              defaultValue={confirmPassword}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                const confirmPasswordValue =
                  confirmPasswordRef.current?.value || "";
                if (confirmPasswordValue && errors.confirmPassword) {
                  clearFieldError("confirmPassword");
                }
              }}
              disabled={isLoading}
              className={`inputsBg h-12 w-full rounded-xl border-gray-600 ps-2 pr-12 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.confirmPassword ? "border-2 border-red-500" : ""
                }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white disabled:opacity-50"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* City Select */}
          <div>
            <select
              className={`inputsBg h-12 w-full rounded-xl border-gray-600 ps-2 text-white outline-0 backdrop-blur-sm disabled:opacity-50 ${errors.location ? "border-2 border-red-500" : ""
                }`}
              onChange={(e) => setLocation(e.target.value)}
              value={location || ""}
              disabled={isLoading}
            >
              <option value="" disabled>
                Select your city
              </option>
              {EgyptCities.map((city, index) => (
                <option key={index} value={city.city_name_en}>
                  {city.city_name_en}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="mt-1 text-xs text-red-400">{errors.location}</p>
            )}
          </div>
          {/* Location */}
          <div className="relative">
            <input
              type="text"
              value={location}
              disabled
              className="inputsBg h-12 w-full rounded-xl border-gray-600 ps-2 pr-12 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50"
              required
              minLength={6}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white disabled:opacity-50"
              onClick={handleLocation}
            >
              Get Location
            </button>
          </div>

          {/* Interests Selection */}
          <div className="relative">
            <label
              className={`text-text mb-1 block text-sm font-medium ${errors.interests ? "text-red-400" : ""}`}
            >
              Interests {errors.interests && "(Required)"}
            </label>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search interests..."
              defaultValue={search}
              onChange={handleSearchChange}
              className={`inputsBg h-12 w-full rounded-xl border-gray-600 ps-2 text-white outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.interests ? "border-2 border-red-500" : ""} mb-2`}
            />
            <div className="flex flex-wrap gap-2">
              {/* Show up to 10 interests: selected first, then unselected, always max 10 visible */}
              {[
                ...filteredInterests.filter((interest) =>
                  selectedInterests.includes(interest.value),
                ),
                ...filteredInterests
                  .filter(
                    (interest) => !selectedInterests.includes(interest.value),
                  )
                  .slice(
                    0,
                    10 -
                    filteredInterests.filter((interest) =>
                      selectedInterests.includes(interest.value),
                    ).length,
                  ),
              ]
                .slice(0, 10)
                .map((interest) => (
                  <Chip
                    key={interest.value}
                    label={interest.label}
                    color={"primary"}
                    variant={
                      selectedInterests.includes(interest.value)
                        ? "filled"
                        : "outlined"
                    }
                    onClick={() => {
                      const newInterests = selectedInterests.includes(
                        interest.value,
                      )
                        ? selectedInterests.filter((i) => i !== interest.value)
                        : [...selectedInterests, interest.value];
                      setSelectedInterests(newInterests);
                      if (searchRef.current) {
                        searchRef.current.value = "";
                        handleSearchChange();
                      }
                    }}
                  />
                ))}
              {selectedInterests
                .filter(
                  (sel) =>
                    !filteredInterests.some(
                      (interest) => interest.value === sel,
                    ),
                )
                .map((sel) => (
                  <Chip
                    key={sel}
                    label={sel}
                    color={"primary"}
                    variant="filled"
                    onClick={() => {
                      const newInterests = selectedInterests.filter(
                        (i) => i !== sel,
                      );
                      setSelectedInterests(newInterests);
                    }}
                  />
                ))}
            </div>
            {errors.interests && (
              <p className="mt-1 text-xs text-red-400">{errors.interests}</p>
            )}
          </div>
          {/* Submit Button */}
          <div className="text-right">
            <Button
              variant={"primary"}
              size={"xlarge"}
              classes={"w-full"}
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
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
