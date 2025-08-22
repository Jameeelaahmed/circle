import Button from "../../../components/ui/Buttons/Button";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../../../assets/icons/Logo";
import { motion as Motion } from "framer-motion";
import EgyptCities from "../../../assets/EgyptCities.json";
import Chip from "@mui/material/Chip";
import Select from "react-select";
import customSelectStyles from "../../ui/Modal/CreateCircleModal/customSelectStyles";
function RegisterFormPresentional({
  handleKeyPress,
  handleSignUp,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isLoading,
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
  selectCity,
  usernameRef,
  emailRef,
  passwordRef,
  confirmPasswordRef,
  searchRef,
}) {
  const cityOptions = EgyptCities.map((city) => ({
    value: city.city_name_en,
    label: city.city_name_en,
  }));

  return (
    <div className="flex w-full flex-col items-center justify-center px-8 py-4 lg:max-w-md">
      {/* Logo */}
      <Motion.div
        className="mb-4 flex justify-center text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Logo className="h-24 w-24" />
      </Motion.div>

      {/* Welcome Text */}
      <Motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h1 className="font-quick-sand mb-1 text-2xl font-bold text-">
          Welcome to Circle
        </h1>
        <p className="text-text text-sm">Create your account to get started</p>
      </Motion.div>

      {/* Registration Form */}
      <Motion.div
        className="max-h-[70vh] w-full min-w-xs space-y-3 py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <form onSubmit={handleSignUp} className="space-y-3">
          {/* Username */}
          <div className="relative">
            <label
              htmlFor="username"
              className="text-text mb-1 block text-sm font-medium"
            >
              Username
            </label>
            <input
              id="username"
              ref={usernameRef}
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (e.target.value && errors.username) {
                  clearFieldError("username");
                }
              }}
              disabled={isLoading}
              className={`bg-inputsBg h-11 w-full rounded-lg border-gray-600 ps-2 text-text outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${usernameValidation?.isValid === false || errors.username
                ? "border-2 border-red-500"
                : usernameValidation?.isValid === true
                  ? "border-2 border-green-500"
                  : ""
                }`}
            />
            {usernameValidation?.isChecking && (
              <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-text"></div>
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
            <label
              htmlFor="age"
              className="text-text mb-1 block text-sm font-medium"
            >
              Date of Birth
            </label>
            <input
              id="age"
              type="date"
              placeholder="Age"
              onChange={handleAgeChange}
              disabled={isLoading}
              className={`bg-inputsBg h-11 w-full rounded-lg border-gray-600 ps-2 pe-5 text-text outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.age ? "border-2 border-red-500" : ""
                }`}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-400">{errors.age}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="text-text mb-1 block text-sm font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              placeholder="your.email@example.com"
              defaultValue={email}
              onKeyUp={handleKeyPress}
              onBlur={() => {
                const emailValue = emailRef.current?.value || "";
                if (emailValue && errors.email) {
                  clearFieldError("email");
                }
              }}
              disabled={isLoading}
              className={`bg-inputsBg h-11 w-full rounded-lg border-gray-600 ps-2 text-text outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.email ? "border-2 border-red-500" : ""
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="text-text mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 6 characters"
              defaultValue={password}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                const passwordValue = passwordRef.current?.value || "";
                if (passwordValue && errors.password) {
                  clearFieldError("password");
                }
              }}
              disabled={isLoading}
              className={`bg-inputsBg h-11 w-full rounded-lg border-gray-600 ps-2 pr-12 text-text outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.password ? "border-2 border-red-500" : ""
                }`}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-text disabled:opacity-50"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="text-text mb-1 block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
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
              className={`bg-inputsBg h-11 w-full rounded-lg border-gray-600 ps-2 pr-12 text-text outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.confirmPassword ? "border-2 border-red-500" : ""
                }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-text disabled:opacity-50"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* City Select */}
            <div>
              <label
                htmlFor="city"
                className="text-text mb-1 block text-sm font-medium"
              >
                City
              </label>
              <Select
                inputId="city"
                options={cityOptions}
                value={
                  cityOptions.find((opt) => opt.value === location) || null
                }
                onChange={(opt) => setLocation(opt ? opt.value : "")}
                isDisabled={isLoading || !selectCity}
                placeholder="Select your city"
                styles={customSelectStyles}
                classNamePrefix="react-select"
                className={`${!selectCity && "opacity-20"}`}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-400">{errors.location}</p>
              )}
            </div>

            {/* Location Detection */}
            <div className="relative">
              <label className="text-text mb-1 block text-sm font-medium">
                Detect Location
              </label>
              <div className="flex">
                <div
                  type="text"
                  disabled
                  className="bg-inputsBg h-11 w-full rounded-l-lg border-gray-600 ps-2 leading-11 text-text outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50"
                  required
                  minLength={6}
                >
                  {location}
                </div>
                <button
                  type="button"
                  className="bg-primary h-11 rounded-r-lg px-4 text-text transition-colors hover:bg-purple-700"
                  onClick={handleLocation}
                >
                  Detect
                </button>
              </div>
            </div>
          </div>

          {/* Interests Selection */}
          <div className="relative pt-1">
            <label
              htmlFor="interests-search"
              className={`text-text mb-1 block text-sm font-medium ${errors.interests ? "text-red-400" : ""
                }`}
            >
              Interests {errors.interests && "(Required)"}
            </label>
            <input
              id="interests-search"
              ref={searchRef}
              type="text"
              placeholder="Search interests..."
              defaultValue={search}
              onChange={handleSearchChange}
              className={`bg-inputsBg h-11 w-full rounded-lg border-gray-600 ps-2 text-text outline-0 backdrop-blur-sm placeholder:text-gray-400 disabled:opacity-50 ${errors.interests ? "border-2 border-red-500" : ""
                } mb-2`}
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
          <div className="pt-2">
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

        {/* Redirect to sign in page */}
        <div className="py-10 pt-3 text-center">
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
